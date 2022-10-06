package eventlog

import (
	tmevents "github.com/tendermint/tendermint/libs/events"
	"github.com/tendermint/tendermint/libs/events/eventlog/cursor"
)

// An Item is a single event item.
type Item struct {
	Cursor cursor.Cursor
	Data   tmevents.EventData
	Events tmevents.Events
}
