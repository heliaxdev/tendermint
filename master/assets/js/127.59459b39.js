(window.webpackJsonp=window.webpackJsonp||[]).push([[127],{669:function(e,t,n){"use strict";n.r(t);var a=n(1),i=Object(a.a)({},(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h1",{attrs:{id:"adr-065-custom-event-indexing"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#adr-065-custom-event-indexing"}},[e._v("#")]),e._v(" ADR 065: Custom Event Indexing")]),e._v(" "),n("ul",[n("li",[n("a",{attrs:{href:"#adr-065-custom-event-indexing"}},[e._v("ADR 065: Custom Event Indexing")]),e._v(" "),n("ul",[n("li",[n("a",{attrs:{href:"#changelog"}},[e._v("Changelog")])]),e._v(" "),n("li",[n("a",{attrs:{href:"#status"}},[e._v("Status")])]),e._v(" "),n("li",[n("a",{attrs:{href:"#context"}},[e._v("Context")])]),e._v(" "),n("li",[n("a",{attrs:{href:"#alternative-approaches"}},[e._v("Alternative Approaches")])]),e._v(" "),n("li",[n("a",{attrs:{href:"#decision"}},[e._v("Decision")])]),e._v(" "),n("li",[n("a",{attrs:{href:"#detailed-design"}},[e._v("Detailed Design")]),e._v(" "),n("ul",[n("li",[n("a",{attrs:{href:"#eventsink"}},[e._v("EventSink")])]),e._v(" "),n("li",[n("a",{attrs:{href:"#supported-sinks"}},[e._v("Supported Sinks")]),e._v(" "),n("ul",[n("li",[n("a",{attrs:{href:"#kveventsink"}},[n("code",[e._v("KVEventSink")])])]),e._v(" "),n("li",[n("a",{attrs:{href:"#psqleventsink"}},[n("code",[e._v("PSQLEventSink")])])])])]),e._v(" "),n("li",[n("a",{attrs:{href:"#configuration"}},[e._v("Configuration")])])])]),e._v(" "),n("li",[n("a",{attrs:{href:"#future-improvements"}},[e._v("Future Improvements")])]),e._v(" "),n("li",[n("a",{attrs:{href:"#consequences"}},[e._v("Consequences")]),e._v(" "),n("ul",[n("li",[n("a",{attrs:{href:"#positive"}},[e._v("Positive")])]),e._v(" "),n("li",[n("a",{attrs:{href:"#negative"}},[e._v("Negative")])]),e._v(" "),n("li",[n("a",{attrs:{href:"#neutral"}},[e._v("Neutral")])])])]),e._v(" "),n("li",[n("a",{attrs:{href:"#references"}},[e._v("References")])])])])]),e._v(" "),n("h2",{attrs:{id:"changelog"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#changelog"}},[e._v("#")]),e._v(" Changelog")]),e._v(" "),n("ul",[n("li",[e._v("April 1, 2021: Initial Draft (@alexanderbez)")]),e._v(" "),n("li",[e._v("April 28, 2021: Specify search capabilities are only supported through the KV indexer (@marbar3778)")])]),e._v(" "),n("h2",{attrs:{id:"status"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#status"}},[e._v("#")]),e._v(" Status")]),e._v(" "),n("p",[e._v("Accepted")]),e._v(" "),n("h2",{attrs:{id:"context"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#context"}},[e._v("#")]),e._v(" Context")]),e._v(" "),n("p",[e._v("Currently, Tendermint Core supports block and transaction event indexing through\nthe "),n("code",[e._v("tx_index.indexer")]),e._v(" configuration. Events are captured in transactions and\nare indexed via a "),n("code",[e._v("TxIndexer")]),e._v(" type. Events are captured in blocks, specifically\nfrom "),n("code",[e._v("BeginBlock")]),e._v(" and "),n("code",[e._v("EndBlock")]),e._v(" application responses, and are indexed via a\n"),n("code",[e._v("BlockIndexer")]),e._v(" type. Both of these types are managed by a single "),n("code",[e._v("IndexerService")]),e._v("\nwhich is responsible for consuming events and sending those events off to be\nindexed by the respective type.")]),e._v(" "),n("p",[e._v("In addition to indexing, Tendermint Core also supports the ability to query for\nboth indexed transaction and block events via Tendermint's RPC layer. The ability\nto query for these indexed events facilitates a great multitude of upstream client\nand application capabilities, e.g. block explorers, IBC relayers, and auxiliary\ndata availability and indexing services.")]),e._v(" "),n("p",[e._v("Currently, Tendermint only supports indexing via a "),n("code",[e._v("kv")]),e._v(" indexer, which is supported\nby an underlying embedded key/value store database. The "),n("code",[e._v("kv")]),e._v(" indexer implements\nits own indexing and query mechanisms. While the former is somewhat trivial,\nproviding a rich and flexible query layer is not as trivial and has caused many\nissues and UX concerns for upstream clients and applications.")]),e._v(" "),n("p",[e._v("The fragile nature of the proprietary "),n("code",[e._v("kv")]),e._v(" query engine and the potential\nperformance and scaling issues that arise when a large number of consumers are\nintroduced, motivate the need for a more robust and flexible indexing and query\nsolution.")]),e._v(" "),n("h2",{attrs:{id:"alternative-approaches"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#alternative-approaches"}},[e._v("#")]),e._v(" Alternative Approaches")]),e._v(" "),n("p",[e._v("With regards to alternative approaches to a more robust solution, the only serious\ncontender that was considered was to transition to using "),n("a",{attrs:{href:"https://www.sqlite.org/index.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("SQLite"),n("OutboundLink")],1),e._v(".")]),e._v(" "),n("p",[e._v("While the approach would work, it locks us into a specific query language and\nstorage layer, so in some ways it's only a bit better than our current approach.\nIn addition, the implementation would require the introduction of CGO into the\nTendermint Core stack, whereas right now CGO is only introduced depending on\nthe database used.")]),e._v(" "),n("h2",{attrs:{id:"decision"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#decision"}},[e._v("#")]),e._v(" Decision")]),e._v(" "),n("p",[e._v("We will adopt a similar approach to that of the Cosmos SDK's "),n("code",[e._v("KVStore")]),e._v(" state\nlistening described in "),n("a",{attrs:{href:"https://github.com/cosmos/cosmos-sdk/blob/master/docs/architecture/adr-038-state-listening.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("ADR-038"),n("OutboundLink")],1),e._v(".")]),e._v(" "),n("p",[e._v("Namely, we will perform the following:")]),e._v(" "),n("ul",[n("li",[e._v("Introduce a new interface, "),n("code",[e._v("EventSink")]),e._v(", that all data sinks must implement.")]),e._v(" "),n("li",[e._v("Augment the existing "),n("code",[e._v("tx_index.indexer")]),e._v(" configuration to now accept a series\nof one or more indexer types, i.e sinks.")]),e._v(" "),n("li",[e._v("Combine the current "),n("code",[e._v("TxIndexer")]),e._v(" and "),n("code",[e._v("BlockIndexer")]),e._v(" into a single "),n("code",[e._v("KVEventSink")]),e._v("\nthat implements the "),n("code",[e._v("EventSink")]),e._v(" interface.")]),e._v(" "),n("li",[e._v("Introduce an additional "),n("code",[e._v("EventSink")]),e._v(" that is backed by "),n("a",{attrs:{href:"https://www.postgresql.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("PostgreSQL"),n("OutboundLink")],1),e._v(".\n"),n("ul",[n("li",[e._v("Implement the necessary schemas to support both block and transaction event\nindexing.")])])]),e._v(" "),n("li",[e._v("Update "),n("code",[e._v("IndexerService")]),e._v(" to use a series of "),n("code",[e._v("EventSinks")]),e._v(".")]),e._v(" "),n("li",[e._v("Proxy queries to the relevant sink's native query layer.")]),e._v(" "),n("li",[e._v("Update all relevant RPC methods.")])]),e._v(" "),n("h2",{attrs:{id:"detailed-design"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#detailed-design"}},[e._v("#")]),e._v(" Detailed Design")]),e._v(" "),n("h3",{attrs:{id:"eventsink"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#eventsink"}},[e._v("#")]),e._v(" EventSink")]),e._v(" "),n("p",[e._v("We introduce the "),n("code",[e._v("EventSink")]),e._v(" interface type that all supported sinks must implement.\nThe interface is defined as follows:")]),e._v(" "),n("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"dHlwZSBFdmVudFNpbmsgaW50ZXJmYWNlIHsKICBJbmRleEJsb2NrRXZlbnRzKHR5cGVzLkV2ZW50RGF0YU5ld0Jsb2NrSGVhZGVyKSBlcnJvcgogIEluZGV4VHhFdmVudHMoKmFiY2kuVHhSZXN1bHQpIGVycm9yCgogIFNlYXJjaEJsb2NrRXZlbnRzKGNvbnRleHQuQ29udGV4dCwgKnF1ZXJ5LlF1ZXJ5KSAoW11pbnQ2NCwgZXJyb3IpCiAgU2VhcmNoVHhFdmVudHMoY29udGV4dC5Db250ZXh0LCAqcXVlcnkuUXVlcnkpIChbXSphYmNpLlR4UmVzdWx0LCBlcnJvcikKCiAgR2V0VHhCeUhhc2goW11ieXRlKSAoKmFiY2kuVHhSZXN1bHQsIGVycm9yKQogIEhhc0Jsb2NrKGludDY0KSAoYm9vbCwgZXJyb3IpCn0K"}}),e._v(" "),n("p",[e._v("The "),n("code",[e._v("IndexerService")]),e._v("  will accept a list of one or more "),n("code",[e._v("EventSink")]),e._v(" types. During\nthe "),n("code",[e._v("OnStart")]),e._v(" method it will call the appropriate APIs on each "),n("code",[e._v("EventSink")]),e._v(" to\nindex both block and transaction events.")]),e._v(" "),n("h3",{attrs:{id:"supported-sinks"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#supported-sinks"}},[e._v("#")]),e._v(" Supported Sinks")]),e._v(" "),n("p",[e._v("We will initially support two "),n("code",[e._v("EventSink")]),e._v(" types out of the box.")]),e._v(" "),n("h4",{attrs:{id:"kveventsink"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#kveventsink"}},[e._v("#")]),e._v(" "),n("code",[e._v("KVEventSink")])]),e._v(" "),n("p",[e._v("This type of "),n("code",[e._v("EventSink")]),e._v(" is a combination of the  "),n("code",[e._v("TxIndexer")]),e._v(" and "),n("code",[e._v("BlockIndexer")]),e._v("\nindexers, both of which are backed by a single embedded key/value database.")]),e._v(" "),n("p",[e._v("A bulk of the existing business logic will remain the same, but the existing APIs\nmapped to the new "),n("code",[e._v("EventSink")]),e._v(" API. Both types will be removed in favor of a single\n"),n("code",[e._v("KVEventSink")]),e._v(" type.")]),e._v(" "),n("p",[e._v("The "),n("code",[e._v("KVEventSink")]),e._v(" will be the only "),n("code",[e._v("EventSink")]),e._v(" enabled by default, so from a UX\nperspective, operators should not notice a difference apart from a configuration\nchange.")]),e._v(" "),n("p",[e._v("We omit "),n("code",[e._v("EventSink")]),e._v(" implementation details as it should be fairly straightforward\nto map the existing business logic to the new APIs.")]),e._v(" "),n("h4",{attrs:{id:"psqleventsink"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#psqleventsink"}},[e._v("#")]),e._v(" "),n("code",[e._v("PSQLEventSink")])]),e._v(" "),n("p",[e._v("This type of "),n("code",[e._v("EventSink")]),e._v(" indexes block and transaction events into a "),n("a",{attrs:{href:"https://www.postgresql.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("PostgreSQL"),n("OutboundLink")],1),e._v(".\ndatabase. We define and automatically migrate the following schema when the\n"),n("code",[e._v("IndexerService")]),e._v(" starts.")]),e._v(" "),n("p",[e._v("The postgres eventsink will not support "),n("code",[e._v("tx_search")]),e._v(" and "),n("code",[e._v("block_search")]),e._v(".")]),e._v(" "),n("tm-code-block",{staticClass:"codeblock",attrs:{language:"sql",base64:"LS0gVGFibGUgRGVmaW5pdGlvbiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tCgpDUkVBVEUgVFlQRSBJRiBOT1QgRVhJU1RTIGJsb2NrX2V2ZW50X3R5cGUgQVMgRU5VTSAoJ2JlZ2luX2Jsb2NrJywgJ2VuZF9ibG9jaycpOwoKQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgYmxvY2tfZXZlbnRzICgKICAgIGlkIFNFUklBTCBQUklNQVJZIEtFWSwKICAgIGtleSBWQVJDSEFSIE5PVCBOVUxMLAogICAgdmFsdWUgVkFSQ0hBUiBOT1QgTlVMTCwKICAgIGhlaWdodCBJTlRFR0VSIE5PVCBOVUxMLAogICAgdHlwZSBibG9ja19ldmVudF90eXBlCik7CgpDUkVBVEUgVEFCTEUgSUYgTk9UIEVYSVNUUyB0eF9yZXN1bHRzIHsKICBpZCBTRVJJQUwgUFJJTUFSWSBLRVksCiAgdHhfcmVzdWx0IEJZVEVBIE5PVCBOVUxMCn0KCkNSRUFURSBUQUJMRSBJRiBOT1QgRVhJU1RTIHR4X2V2ZW50cyAoCiAgICBpZCBTRVJJQUwgUFJJTUFSWSBLRVksCiAgICBrZXkgVkFSQ0hBUiBOT1QgTlVMTCwKICAgIHZhbHVlIFZBUkNIQVIgTk9UIE5VTEwsCiAgICBoZWlnaHQgSU5URUdFUiBOT1QgTlVMTCwKICAgIGhhc2ggVkFSQ0hBUiBOT1QgTlVMTCwKICAgIEZPUkVJR04gS0VZICh0eF9yZXN1bHRfaWQpIFJFRkVSRU5DRVMgdHhfcmVzdWx0cyhpZCkgT04gREVMRVRFIENBU0NBREUKKTsKCi0tIEluZGljZXMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQoKQ1JFQVRFIElOREVYIGlkeF9ibG9ja19ldmVudHNfa2V5X3ZhbHVlIE9OIGJsb2NrX2V2ZW50cyhrZXksIHZhbHVlKTsKQ1JFQVRFIElOREVYIGlkeF90eF9ldmVudHNfa2V5X3ZhbHVlIE9OIHR4X2V2ZW50cyhrZXksIHZhbHVlKTsKQ1JFQVRFIElOREVYIGlkeF90eF9ldmVudHNfaGFzaCBPTiB0eF9ldmVudHMoaGFzaCk7Cg=="}}),e._v(" "),n("p",[e._v("The "),n("code",[e._v("PSQLEventSink")]),e._v(" will implement the "),n("code",[e._v("EventSink")]),e._v(" interface as follows\n(some details omitted for brevity):")]),e._v(" "),n("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"ZnVuYyBOZXdQU1FMRXZlbnRTaW5rKGNvbm5TdHIgc3RyaW5nKSAoKlBTUUxFdmVudFNpbmssIGVycm9yKSB7CiAgZGIsIGVyciA6PSBzcWwuT3BlbigmcXVvdDtwb3N0Z3JlcyZxdW90OywgY29ublN0cikKICBpZiBlcnIgIT0gbmlsIHsKICAgIHJldHVybiBuaWwsIGVycgogIH0KCiAgLy8gLi4uCn0KCmZ1bmMgKGVzICpQU1FMRXZlbnRTaW5rKSBJbmRleEJsb2NrRXZlbnRzKGggdHlwZXMuRXZlbnREYXRhTmV3QmxvY2tIZWFkZXIpIGVycm9yIHsKICBzcWxTdG10IDo9IHNxLkluc2VydCgmcXVvdDtibG9ja19ldmVudHMmcXVvdDspLkNvbHVtbnMoJnF1b3Q7a2V5JnF1b3Q7LCAmcXVvdDt2YWx1ZSZxdW90OywgJnF1b3Q7aGVpZ2h0JnF1b3Q7LCAmcXVvdDt0eXBlJnF1b3Q7KQoKICAvLyBpbmRleCB0aGUgcmVzZXJ2ZWQgYmxvY2sgaGVpZ2h0IGluZGV4CiAgc3FsU3RtdCA9IHNxbFN0bXQuVmFsdWVzKHR5cGVzLkJsb2NrSGVpZ2h0S2V5LCBoLkhlYWRlci5IZWlnaHQsIGguSGVhZGVyLkhlaWdodCwgJnF1b3Q7JnF1b3Q7KQoKICBmb3IgXywgZXZlbnQgOj0gcmFuZ2UgaC5SZXN1bHRCZWdpbkJsb2NrLkV2ZW50cyB7CiAgICAvLyBvbmx5IGluZGV4IGV2ZW50cyB3aXRoIGEgbm9uLWVtcHR5IHR5cGUKICAgIGlmIGxlbihldmVudC5UeXBlKSA9PSAwIHsKICAgICAgY29udGludWUKICAgIH0KCiAgICBmb3IgXywgYXR0ciA6PSByYW5nZSBldmVudC5BdHRyaWJ1dGVzIHsKICAgICAgaWYgbGVuKGF0dHIuS2V5KSA9PSAwIHsKICAgICAgICBjb250aW51ZQogICAgICB9CgogICAgICAvLyBpbmRleCBpZmYgdGhlIGV2ZW50IHNwZWNpZmllZCBpbmRleDp0cnVlIGFuZCBpdCdzIG5vdCBhIHJlc2VydmVkIGV2ZW50CiAgICAgIGNvbXBvc2l0ZUtleSA6PSBmbXQuU3ByaW50ZigmcXVvdDslcy4lcyZxdW90OywgZXZlbnQuVHlwZSwgc3RyaW5nKGF0dHIuS2V5KSkKICAgICAgaWYgY29tcG9zaXRlS2V5ID09IHR5cGVzLkJsb2NrSGVpZ2h0S2V5IHsKICAgICAgICByZXR1cm4gZm10LkVycm9yZigmcXVvdDtldmVudCB0eXBlIGFuZCBhdHRyaWJ1dGUga2V5IFwmcXVvdDslc1wmcXVvdDsgaXMgcmVzZXJ2ZWQ7IHBsZWFzZSB1c2UgYSBkaWZmZXJlbnQga2V5JnF1b3Q7LCBjb21wb3NpdGVLZXkpCiAgICAgIH0KCiAgICAgIGlmIGF0dHIuR2V0SW5kZXgoKSB7CiAgICAgICAgc3FsU3RtdCA9IHNxbFN0bXQuVmFsdWVzKGNvbXBvc2l0ZUtleSwgc3RyaW5nKGF0dHIuVmFsdWUpLCBoLkhlYWRlci5IZWlnaHQsIEJsb2NrRXZlbnRUeXBlQmVnaW5CbG9jaykKICAgICAgfQogICAgfQogIH0KCiAgLy8gaW5kZXggZW5kX2Jsb2NrIGV2ZW50cy4uLgogIC8vIGV4ZWN1dGUgc3FsU3RtdCBkYiBxdWVyeS4uLgp9CgpmdW5jIChlcyAqUFNRTEV2ZW50U2luaykgSW5kZXhUeEV2ZW50cyh0eHIgKmFiY2kuVHhSZXN1bHQpIGVycm9yIHsKICBzcWxTdG10RXZlbnRzIDo9IHNxLkluc2VydCgmcXVvdDt0eF9ldmVudHMmcXVvdDspLkNvbHVtbnMoJnF1b3Q7a2V5JnF1b3Q7LCAmcXVvdDt2YWx1ZSZxdW90OywgJnF1b3Q7aGVpZ2h0JnF1b3Q7LCAmcXVvdDtoYXNoJnF1b3Q7LCAmcXVvdDt0eF9yZXN1bHRfaWQmcXVvdDspCiAgc3FsU3RtdFR4UmVzdWx0IDo9IHNxLkluc2VydCgmcXVvdDt0eF9yZXN1bHRzJnF1b3Q7KS5Db2x1bW5zKCZxdW90O3R4X3Jlc3VsdCZxdW90OykKCgogIC8vIHN0b3JlIHRoZSB0eCByZXN1bHQKICB0eEJ6LCBlcnIgOj0gcHJvdG8uTWFyc2hhbCh0eHIpCiAgaWYgZXJyICE9IG5pbCB7CiAgICByZXR1cm4gZXJyCiAgfQoKICBzcWxTdG10VHhSZXN1bHQgPSBzcWxTdG10VHhSZXN1bHQuVmFsdWVzKHR4QnopCgogIC8vIGV4ZWN1dGUgc3FsU3RtdFR4UmVzdWx0IGRiIHF1ZXJ5Li4uCgogIC8vIGluZGV4IHRoZSByZXNlcnZlZCBoZWlnaHQgYW5kIGhhc2ggaW5kaWNlcwogIGhhc2ggOj0gdHlwZXMuVHgodHhyLlR4KS5IYXNoKCkKICBzcWxTdG10RXZlbnRzID0gc3FsU3RtdEV2ZW50cy5WYWx1ZXModHlwZXMuVHhIYXNoS2V5LCBoYXNoLCB0eHIuSGVpZ2h0LCBoYXNoLCB0eHJJRCkKICBzcWxTdG10RXZlbnRzID0gc3FsU3RtdEV2ZW50cy5WYWx1ZXModHlwZXMuVHhIZWlnaHRLZXksIHR4ci5IZWlnaHQsIHR4ci5IZWlnaHQsIGhhc2gsIHR4cklEKQoKICBmb3IgXywgZXZlbnQgOj0gcmFuZ2UgcmVzdWx0LlJlc3VsdC5FdmVudHMgewogICAgLy8gb25seSBpbmRleCBldmVudHMgd2l0aCBhIG5vbi1lbXB0eSB0eXBlCiAgICBpZiBsZW4oZXZlbnQuVHlwZSkgPT0gMCB7CiAgICAgIGNvbnRpbnVlCiAgICB9CgogICAgZm9yIF8sIGF0dHIgOj0gcmFuZ2UgZXZlbnQuQXR0cmlidXRlcyB7CiAgICAgIGlmIGxlbihhdHRyLktleSkgPT0gMCB7CiAgICAgICAgY29udGludWUKICAgICAgfQoKICAgICAgLy8gaW5kZXggaWYgYGluZGV4OiB0cnVlYCBpcyBzZXQKICAgICAgY29tcG9zaXRlVGFnIDo9IGZtdC5TcHJpbnRmKCZxdW90OyVzLiVzJnF1b3Q7LCBldmVudC5UeXBlLCBzdHJpbmcoYXR0ci5LZXkpKQoJCQkKICAgICAgLy8gZW5zdXJlIGV2ZW50IGRvZXMgbm90IGNvbmZsaWN0IHdpdGggYSByZXNlcnZlZCBwcmVmaXgga2V5CiAgICAgIGlmIGNvbXBvc2l0ZVRhZyA9PSB0eXBlcy5UeEhhc2hLZXkgfHwgY29tcG9zaXRlVGFnID09IHR5cGVzLlR4SGVpZ2h0S2V5IHsKICAgICAgICByZXR1cm4gZm10LkVycm9yZigmcXVvdDtldmVudCB0eXBlIGFuZCBhdHRyaWJ1dGUga2V5IFwmcXVvdDslc1wmcXVvdDsgaXMgcmVzZXJ2ZWQ7IHBsZWFzZSB1c2UgYSBkaWZmZXJlbnQga2V5JnF1b3Q7LCBjb21wb3NpdGVUYWcpCiAgICAgIH0KCQkKICAgICAgaWYgYXR0ci5HZXRJbmRleCgpIHsKICAgICAgICBzcWxTdG10RXZlbnRzID0gc3FsU3RtdEV2ZW50cy5WYWx1ZXMoY29tcG9zaXRlS2V5LCBzdHJpbmcoYXR0ci5WYWx1ZSksIHR4ci5IZWlnaHQsIGhhc2gsIHR4cklEKQogICAgICB9CiAgICB9CiAgfQoKICAvLyBleGVjdXRlIHNxbFN0bXRFdmVudHMgZGIgcXVlcnkuLi4KfQoKZnVuYyAoZXMgKlBTUUxFdmVudFNpbmspIFNlYXJjaEJsb2NrRXZlbnRzKGN0eCBjb250ZXh0LkNvbnRleHQsIHEgKnF1ZXJ5LlF1ZXJ5KSAoW11pbnQ2NCwgZXJyb3IpIHsKICByZXR1cm4gbmlsLCBlcnJvcnMuTmV3KCZxdW90O2Jsb2NrIHNlYXJjaCBpcyBub3Qgc3VwcG9ydGVkIHZpYSB0aGUgcG9zdGdyZXMgZXZlbnQgc2luayZxdW90OykKfQoKZnVuYyAoZXMgKlBTUUxFdmVudFNpbmspIFNlYXJjaFR4RXZlbnRzKGN0eCBjb250ZXh0LkNvbnRleHQsIHEgKnF1ZXJ5LlF1ZXJ5KSAoW10qYWJjaS5UeFJlc3VsdCwgZXJyb3IpIHsKICByZXR1cm4gbmlsLCBlcnJvcnMuTmV3KCZxdW90O3R4IHNlYXJjaCBpcyBub3Qgc3VwcG9ydGVkIHZpYSB0aGUgcG9zdGdyZXMgZXZlbnQgc2luayZxdW90OykKfQo="}}),e._v(" "),n("h3",{attrs:{id:"configuration"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#configuration"}},[e._v("#")]),e._v(" Configuration")]),e._v(" "),n("p",[e._v("The current "),n("code",[e._v("tx_index.indexer")]),e._v(" configuration would be changed to accept a list\nof supported "),n("code",[e._v("EventSink")]),e._v(" types instead of a single value.")]),e._v(" "),n("p",[e._v("Example:")]),e._v(" "),n("tm-code-block",{staticClass:"codeblock",attrs:{language:"toml",base64:"W3R4X2luZGV4XQoKaW5kZXhlciA9IFsKICAmcXVvdDtrdiZxdW90OywKICAmcXVvdDtwc3FsJnF1b3Q7Cl0K"}}),e._v(" "),n("p",[e._v("If the "),n("code",[e._v("indexer")]),e._v(" list contains the "),n("code",[e._v("null")]),e._v(" indexer, then no indexers will be used\nregardless of what other values may exist.")]),e._v(" "),n("p",[e._v("Additional configuration parameters might be required depending on what event\nsinks are supplied to "),n("code",[e._v("tx_index.indexer")]),e._v(". The "),n("code",[e._v("psql")]),e._v(" will require an additional\nconnection configuration.")]),e._v(" "),n("tm-code-block",{staticClass:"codeblock",attrs:{language:"toml",base64:"W3R4X2luZGV4XQoKaW5kZXhlciA9IFsKICAmcXVvdDtrdiZxdW90OywKICAmcXVvdDtwc3FsJnF1b3Q7Cl0KCnBxc3FsX2Nvbm4gPSAmcXVvdDtwb3N0Z3Jlc3FsOi8vJmx0O3VzZXImZ3Q7OiZsdDtwYXNzd29yZCZndDtAJmx0O2hvc3QmZ3Q7OiZsdDtwb3J0Jmd0Oy8mbHQ7ZGImZ3Q7PyZsdDtvcHRzJmd0OyZxdW90Owo="}}),e._v(" "),n("p",[e._v("Any invalid or misconfigured "),n("code",[e._v("tx_index")]),e._v(" configuration should yield an error as\nearly as possible.")]),e._v(" "),n("h2",{attrs:{id:"future-improvements"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#future-improvements"}},[e._v("#")]),e._v(" Future Improvements")]),e._v(" "),n("p",[e._v('Although not technically required to maintain feature parity with the current\nexisting Tendermint indexer, it would be beneficial for operators to have a method\nof performing a "re-index". Specifically, Tendermint operators could invoke an\nRPC method that allows the Tendermint node to perform a re-indexing of all block\nand transaction events between two given heights, H'),n("sub",[e._v("1")]),e._v(" and H"),n("sub",[e._v("2")]),e._v(",\nso long as the block store contains the blocks and transaction results for all\nthe heights specified in a given range.")]),e._v(" "),n("h2",{attrs:{id:"consequences"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#consequences"}},[e._v("#")]),e._v(" Consequences")]),e._v(" "),n("h3",{attrs:{id:"positive"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#positive"}},[e._v("#")]),e._v(" Positive")]),e._v(" "),n("ul",[n("li",[e._v("A more robust and flexible indexing and query engine for indexing and search\nblock and transaction events.")]),e._v(" "),n("li",[e._v("The ability to not have to support a custom indexing and query engine beyond\nthe legacy "),n("code",[e._v("kv")]),e._v(" type.")]),e._v(" "),n("li",[e._v("The ability to offload/proxy indexing and querying to the underling sink.")]),e._v(" "),n("li",[e._v('Scalability and reliability that essentially comes "for free" from the underlying\nsink, if it supports it.')])]),e._v(" "),n("h3",{attrs:{id:"negative"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#negative"}},[e._v("#")]),e._v(" Negative")]),e._v(" "),n("ul",[n("li",[e._v("The need to support multiple and potentially a growing set of custom "),n("code",[e._v("EventSink")]),e._v("\ntypes.")])]),e._v(" "),n("h3",{attrs:{id:"neutral"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#neutral"}},[e._v("#")]),e._v(" Neutral")]),e._v(" "),n("h2",{attrs:{id:"references"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#references"}},[e._v("#")]),e._v(" References")]),e._v(" "),n("ul",[n("li",[n("a",{attrs:{href:"https://github.com/cosmos/cosmos-sdk/blob/master/docs/architecture/adr-038-state-listening.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("Cosmos SDK ADR-038"),n("OutboundLink")],1)]),e._v(" "),n("li",[n("a",{attrs:{href:"https://www.postgresql.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("PostgreSQL"),n("OutboundLink")],1)]),e._v(" "),n("li",[n("a",{attrs:{href:"https://www.sqlite.org/index.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("SQLite"),n("OutboundLink")],1)])])],1)}),[],!1,null,null,null);t.default=i.exports}}]);