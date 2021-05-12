package statesync

import (
	"math/rand"
	"sync"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"github.com/tendermint/tendermint/internal/test/factory"
	"github.com/tendermint/tendermint/p2p"
)

var (
	startHeight int64 = 200
	stopHeight  int64 = 100
	stopTime          = time.Date(2019, 1, 1, 1, 0, 0, 0, time.UTC)
	endTime           = stopTime.Add(-1 * time.Second)
	numWorkers        = 1
)

func TestBlockQueueBasic(t *testing.T) {
	peerID, err := p2p.NewNodeID("0011223344556677889900112233445566778899")
	require.NoError(t, err)

	queue := newBlockQueue(startHeight, stopHeight, stopTime, 1)
	wg := &sync.WaitGroup{}

	// asynchronously fetch blocks and add it to the queue
	for i := 0; i <= numWorkers; i++ {
		wg.Add(1)
		go func() {
			for {
				select {
				case height := <-queue.NextHeight():
					queue.Add(mockLBResp(t, peerID, height, endTime))
				case <-queue.Done():
					wg.Done()
					return
				}
			}
		}()
	}

	trackingHeight := startHeight
	wg.Add(1)

loop:
	for {
		select {
		case <-queue.Done():
			wg.Done()
			break loop

		case resp := <-queue.VerifyNext():
			// assert that the queue serializes the blocks
			assert.Equal(t, resp.block.Height, trackingHeight)
			trackingHeight--
			queue.Success(resp.block.Height)
		}

	}

	wg.Wait()
	assert.Less(t, trackingHeight, stopHeight)

	select {
	case <-queue.doneCh:
	default:
		t.Fatal("queue's done channel is not closed")
	}

}

// Test with spurious failures and retries
func TestBlockQueueWithFailures(t *testing.T) {
	peerID, err := p2p.NewNodeID("0011223344556677889900112233445566778899")
	require.NoError(t, err)

	queue := newBlockQueue(startHeight, stopHeight, stopTime, 100)
	wg := &sync.WaitGroup{}

	failureRate := 4
	for i := 0; i <= numWorkers; i++ {
		wg.Add(1)
		go func() {
			for {
				select {
				case height := <-queue.NextHeight():
					if rand.Intn(failureRate) == 0 {
						queue.Retry(height)
					} else {
						queue.Add(mockLBResp(t, peerID, height, endTime))
					}
				case <-queue.Done():
					wg.Done()
					return
				}
			}
		}()
	}

	trackingHeight := startHeight
	for {
		select {
		case resp := <-queue.VerifyNext():
			// assert that the queue serializes the blocks
			assert.Equal(t, resp.block.Height, trackingHeight)
			if rand.Intn(failureRate) == 0 {
				queue.Retry(resp.block.Height)
			} else {
				trackingHeight--
				queue.Success(resp.block.Height)
			}

		case <-queue.Done():
			wg.Wait()
			assert.Less(t, trackingHeight, stopHeight)
			return
		}
	}
}

// Test that when all the blocks are retrieved that the queue still holds on to
// it's workers and in the event of failure can still fetch the failed block
func TestBlockQueueBlocks(t *testing.T) {
	peerID, err := p2p.NewNodeID("0011223344556677889900112233445566778899")
	require.NoError(t, err)
	queue := newBlockQueue(startHeight, stopHeight, stopTime, 2)
	expectedHeight := startHeight
	retryHeight := stopHeight + 2

loop:
	for {
		select {
		case height := <-queue.NextHeight():
			require.Equal(t, height, expectedHeight)
			require.GreaterOrEqual(t, height, stopHeight)
			expectedHeight--
			queue.Add(mockLBResp(t, peerID, height, endTime))
		case <-time.After(1 * time.Second):
			if expectedHeight >= stopHeight {
				t.Fatalf("expected next height %d", expectedHeight)
			}
			break loop
		}
	}

	// close any waiter channels that the previous worker left hanging
	for _, ch := range queue.waiters {
		close(ch)
	}
	queue.waiters = make([]chan int64, 0)

	wg := &sync.WaitGroup{}
	wg.Add(1)
	// so far so good. The worker is waiting. Now we fail a previous
	// block and check that the worker fetches them
	go func(t *testing.T) {
		defer wg.Done()
		select {
		case height := <-queue.NextHeight():
			require.Equal(t, retryHeight, height)
		case <-time.After(1 * time.Second):
			require.Fail(t, "queue didn't ask worker to fetch failed height")
		}
	}(t)
	queue.Retry(retryHeight)
	wg.Wait()

}

func TestBlockQueueAcceptsNoMoreBlocks(t *testing.T) {
	peerID, err := p2p.NewNodeID("0011223344556677889900112233445566778899")
	require.NoError(t, err)
	queue := newBlockQueue(startHeight, stopHeight, stopTime, 1)
	defer queue.Close()

loop:
	for {
		select {
		case height := <-queue.NextHeight():
			require.GreaterOrEqual(t, height, stopHeight)
			queue.Add(mockLBResp(t, peerID, height, endTime))
		case <-time.After(1 * time.Second):
			break loop
		}
	}

	require.Len(t, queue.pending, int(startHeight-stopHeight)+1)

	queue.Add(mockLBResp(t, peerID, stopHeight-1, endTime))
	require.Len(t, queue.pending, int(startHeight-stopHeight)+1)
}

// Test a scenario where more blocks are needed then just the stopheight because
// we haven't found a block with a small enough time.
func TestBlockQueueStopTime(t *testing.T) {
	peerID, err := p2p.NewNodeID("0011223344556677889900112233445566778899")
	require.NoError(t, err)

	queue := newBlockQueue(startHeight, stopHeight, stopTime, 1)
	wg := &sync.WaitGroup{}

	baseTime := stopTime.Add(-50 * time.Second)

	// asynchronously fetch blocks and add it to the queue
	for i := 0; i <= numWorkers; i++ {
		wg.Add(1)
		go func() {
			for {
				select {
				case height := <-queue.NextHeight():
					blockTime := baseTime.Add(time.Duration(height) * time.Second)
					queue.Add(mockLBResp(t, peerID, height, blockTime))
				case <-queue.Done():
					wg.Done()
					return
				}
			}
		}()
	}

	trackingHeight := startHeight
	for {
		select {
		case resp := <-queue.VerifyNext():
			// assert that the queue serializes the blocks
			assert.Equal(t, resp.block.Height, trackingHeight)
			trackingHeight--
			queue.Success(resp.block.Height)

		case <-queue.Done():
			wg.Wait()
			assert.Less(t, trackingHeight, stopHeight-50)
			return
		}
	}
}

func mockLBResp(t *testing.T, peer p2p.NodeID, height int64, time time.Time) lightBlockResponse {
	return lightBlockResponse{
		block: mockLB(t, height, time, factory.MakeBlockID()),
		peer:  peer,
	}
}
