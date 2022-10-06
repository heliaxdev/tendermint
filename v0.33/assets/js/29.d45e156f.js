(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{601:function(e,t,a){e.exports=a.p+"assets/img/tm-amnesia-attack.605cabaf.png"},712:function(e,t,a){"use strict";a.r(t);var n=a(1),i=Object(n.a)({},(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h1",{attrs:{id:"adr-056-proving-amnesia-attacks"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#adr-056-proving-amnesia-attacks"}},[e._v("#")]),e._v(" ADR 056: Proving amnesia attacks")]),e._v(" "),n("h2",{attrs:{id:"changelog"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#changelog"}},[e._v("#")]),e._v(" Changelog")]),e._v(" "),n("ul",[n("li",[e._v("02.04.20: Initial Draft")]),e._v(" "),n("li",[e._v("06.04.20: Second Draft")])]),e._v(" "),n("h2",{attrs:{id:"context"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#context"}},[e._v("#")]),e._v(" Context")]),e._v(" "),n("p",[e._v("Whilst most created evidence of malicious behaviour is self evident such that any individual can verify them independently there are types of evidence, known collectively as global evidence, that require further collaboration from the network in order to accumulate enough information to create evidence that is individually verifiable and can therefore be processed through consensus. "),n("a",{attrs:{href:"https://github.com/tendermint/spec/blob/master/spec/consensus/light-client/accountability.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("Fork Accountability"),n("OutboundLink")],1),e._v(" has been coined to describe the entire process of detection, proving and punishing of malicious behaviour. This ADR addresses specifically how to prove an amnesia attack but also generally outlines how global evidence can be converted to individual evidence.")]),e._v(" "),n("h3",{attrs:{id:"amnesia-attack"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#amnesia-attack"}},[e._v("#")]),e._v(" Amnesia Attack")]),e._v(" "),n("p",[e._v("The currently only known form of global evidence stems from "),n("a",{attrs:{href:"https://github.com/tendermint/spec/blob/master/spec/consensus/light-client/accountability.md#flip-flopping",target:"_blank",rel:"noopener noreferrer"}},[e._v("flip flopping"),n("OutboundLink")],1),e._v(" attacks. The schematic below explains one scenario where an amnesia attack, a form of flip flopping, can occur such that two sets of honest nodes, C1 and C2, commit different blocks.")]),e._v(" "),n("p",[n("img",{attrs:{src:a(601),alt:""}})]),e._v(" "),n("ol",[n("li",[e._v("C1 and F send PREVOTE messages for block A.")]),e._v(" "),n("li",[e._v("C1 sends PRECOMMIT for round 1 for block A.")]),e._v(" "),n("li",[e._v("A new round is started, C2 and F send PREVOTE messages for a different block B.")]),e._v(" "),n("li",[e._v("C2 and F then send PRECOMMIT messages for block B.")]),e._v(" "),n("li",[e._v("F breaks the lock and goes back and sends PRECOMMIT messages in round 1 for block A.")])]),e._v(" "),n("p",[e._v("This creates a fork on the main chain.  Back to the past, another form of flip flopping, creates a light fork (capable of fooling those not involved in consensus), in a similar way, with F taking the precommits from C1 and forging a commit from them.")]),e._v(" "),n("h2",{attrs:{id:"decision"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#decision"}},[e._v("#")]),e._v(" Decision")]),e._v(" "),n("p",[e._v("As the distinction between these two attacks (amnesia and back to the past) can only be distinguished by confirming with all validators (to see if it is a full fork or a light fork), for the purpose of simplicity, these attacks will be treated as the same.")]),e._v(" "),n("p",[e._v("Currently, the evidence reactor is used to simply broadcast and store evidence. Instead of perhaps creating a new reactor for the specific task of verifying these attacks, the current evidence reactor will be extended.")]),e._v(" "),n("p",[e._v("The process begins with a light client receiving conflicting headers (in the future this could also be a full node during fast sync), which it sends to a full node to analyse. As part of "),n("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/master/docs/architecture/adr-047-handling-evidence-from-light-client.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("evidence handling"),n("OutboundLink")],1),e._v(", this could be deduced into potential amnesia evidence")]),e._v(" "),n("tm-code-block",{staticClass:"codeblock",attrs:{language:"golang",base64:"dHlwZSBQb3RlbnRpYWxBbW5lc2lhRXZpZGVuY2Ugc3RydWN0IHsKCVYxIFtdKnR5cGVzLlZvdGUKCVYyIFtdKnR5cGVzLlZvdGUKCgl0aW1lc3RhbXAgdGltZS5UaW1lCn0K"}}),e._v(" "),n("p",[n("em",[e._v("NOTE: Unlike prior evidence types, "),n("code",[e._v("PotentialAmnesiaEvidence")]),e._v(" and "),n("code",[e._v("AmnesiaEvidence")]),e._v(" are processed as a batch instead\nof individually. This will require changes to much of the API.")])]),e._v(" "),n("p",[n("em",[e._v("NOTE: "),n("code",[e._v("PotentialAmnesiaEvidence")]),e._v(" could be constructed for when 1/3 or less vote in two different rounds but as it is not currently detected nor can it cause a fork, it will be ignored.")])]),e._v(" "),n("p",[e._v("The evidence should contain the precommit votes for the intersection of validators that voted for both rounds. The votes should be all valid and the height and time that the infringement was made should be within:")]),e._v(" "),n("p",[n("code",[e._v("MaxEvidenceAge - Amnesia trial period")])]),e._v(" "),n("p",[e._v("where "),n("code",[e._v("Amnesia trial period")]),e._v(" is a configurable duration defaulted at 1 day.")]),e._v(" "),n("p",[e._v("With reference to the honest nodes, C1 and C2, in the schematic, C2 will not PRECOMMIT an earlier round, but it is likely, if a node in C1 were to receive +2/3 PREVOTE's or PRECOMMIT's for a higher round, that it would remove the lock and PREVOTE and PRECOMMIT for the later round. Therefore, unfortunately it is not a case of simply punishing all nodes that have double voted in the "),n("code",[e._v("PotentialAmnesiaEvidence")]),e._v(".")]),e._v(" "),n("p",[e._v("Instead we use the Proof of Lock Change (PoLC) referred to in the "),n("a",{attrs:{href:"https://github.com/tendermint/spec/blob/master/spec/consensus/consensus.md#terms",target:"_blank",rel:"noopener noreferrer"}},[e._v("consensus spec"),n("OutboundLink")],1),e._v(". When an honest node votes again for a different block in a later round\n(which will only occur in very rare cases), it will generate the PoLC and store it in the evidence reactor for a time equal to the "),n("code",[e._v("MaxEvidenceAge")])]),e._v(" "),n("tm-code-block",{staticClass:"codeblock",attrs:{language:"golang",base64:"dHlwZSBQcm9vZk9mTG9ja0NoYW5nZSBzdHJ1Y3QgewoJVm90ZXMgW10qdHlwZXMuVm90ZQp9Cg=="}}),e._v(" "),n("p",[e._v("This can be either evidence of +2/3 PREVOTES or PRECOMMITS (either warrants the honest node the right to vote) and is valid, among other checks, so long as the PRECOMMIT vote of the node in V2 came after all the votes in the "),n("code",[e._v("ProofOfLockChange")]),e._v(" i.e. it received +2/3 votes for a block and then voted for that block thereafter (F is unable to prove this).")]),e._v(" "),n("p",[e._v("In the event that an honest node receives "),n("code",[e._v("PotentialAmnesiaEvidence")]),e._v(" it will first "),n("code",[e._v("Verify()")]),e._v(" it and then will check if it is among the suspected nodes in the evidence. If so, it will retrieve the "),n("code",[e._v("ProofOfLockChange")]),e._v(" and combine it with "),n("code",[e._v("PotentialAmensiaEvidence")]),e._v(" to form "),n("code",[e._v("AmensiaEvidence")]),e._v(":")]),e._v(" "),n("tm-code-block",{staticClass:"codeblock",attrs:{language:"golang",base64:"dHlwZSBBbW5lc2lhRXZpZGVuY2Ugc3RydWN0IHsKCUV2aWRlbmNlICp0eXBlcy5Qb3RlbnRpYWxBbW5lc2lhRXZpZGVuY2UKCVByb29mcwkgW10qdHlwZXMuUHJvb2ZPZkxvY2tDaGFuZ2UKfQo="}}),e._v(" "),n("p",[e._v("If the node is not required to submit any proof than it will simply broadcast the "),n("code",[e._v("PotentialAmnesiaEvidence")]),e._v(" .")]),e._v(" "),n("p",[e._v("When a node has successfully validated "),n("code",[e._v("PotentialAmnesiaEvidence")]),e._v(" it timestamps it and refuses to receive the same form of "),n("code",[e._v("PotentialAmnesiaEvidence")]),e._v(". If a node receives "),n("code",[e._v("AmnesiaEvidence")]),e._v(" it checks it against any current "),n("code",[e._v("AmnesiaEvidence")]),e._v(" it might have and if so merges the two by adding the proofs, if it doesn't have it yet it run's "),n("code",[e._v("Verify()")]),e._v(" and stores it.")]),e._v(" "),n("p",[e._v("There can only be one "),n("code",[e._v("AmnesiaEvidence")]),e._v(" and one "),n("code",[e._v("PotentialAmneisaEvidence")]),e._v(" stored for each attack (i.e. for each height).")]),e._v(" "),n("p",[e._v("When, "),n("code",[e._v("time.Now() > PotentialAmnesiaEvidence.timestamp + AmnesiaTrialPeriod")]),e._v(", honest validators of the current validator set can begin proposing the block that contains the "),n("code",[e._v("AmnesiaEvidence")]),e._v(".")]),e._v(" "),n("p",[n("em",[e._v("NOTE: Even before the evidence is proposed and committed, the off-chain process of gossiping valid evidence could be\nenough for honest nodes to recognize the fork and halt.")])]),e._v(" "),n("p",[e._v("Other validators will vote <nil> if:")]),e._v(" "),n("ul",[n("li",[e._v("The Amnesia Evidence is not valid")]),e._v(" "),n("li",[e._v("The Amensia Evidence is not within the validators trial period i.e. too soon.")]),e._v(" "),n("li",[e._v("The Amensia Evidence is of the same height but is different to the Amnesia Evidence that they have. i.e. is missing proofs.\n(In this case, the validator will try again to gossip the latest Amnesia Evidence that it has)")]),e._v(" "),n("li",[e._v("Is of an AmnesiaEvidence that has already been committed to the chain.")])]),e._v(" "),n("h2",{attrs:{id:"status"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#status"}},[e._v("#")]),e._v(" Status")]),e._v(" "),n("p",[e._v("Proposed")]),e._v(" "),n("h2",{attrs:{id:"consequences"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#consequences"}},[e._v("#")]),e._v(" Consequences")]),e._v(" "),n("h3",{attrs:{id:"positive"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#positive"}},[e._v("#")]),e._v(" Positive")]),e._v(" "),n("p",[e._v("Increasing fork detection makes the system more secure")]),e._v(" "),n("h3",{attrs:{id:"negative"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#negative"}},[e._v("#")]),e._v(" Negative")]),e._v(" "),n("p",[e._v("Non-responsive but honest nodes that are part of the suspect group that don't produce a proof will be punished")]),e._v(" "),n("p",[e._v("A delay between the detection of a fork and the punishment of one")]),e._v(" "),n("h3",{attrs:{id:"neutral"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#neutral"}},[e._v("#")]),e._v(" Neutral")]),e._v(" "),n("p",[e._v("Evidence package will need to be able to handle batch evidence as well as individual evidence (i.e. extra work)")]),e._v(" "),n("h2",{attrs:{id:"references"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#references"}},[e._v("#")]),e._v(" References")]),e._v(" "),n("ul",[n("li",[n("a",{attrs:{href:"https://docs.google.com/document/d/11ZhMsCj3y7zIZz4udO9l25xqb0kl7gmWqNpGVRzOeyY/edit",target:"_blank",rel:"noopener noreferrer"}},[e._v("Fork accountability algorithm"),n("OutboundLink")],1)]),e._v(" "),n("li",[n("a",{attrs:{href:"https://github.com/tendermint/spec/blob/master/spec/consensus/light-client/accountability.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("Fork accountability spec"),n("OutboundLink")],1)])])],1)}),[],!1,null,null,null);t.default=i.exports}}]);