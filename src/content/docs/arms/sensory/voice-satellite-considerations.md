---
title: Voice Satellite Considerations
description: How Pepa handles voice satellites
template: doc
sidebar:
  label: Voice Satellite Considerations
  badge:
    text: New
    variant: tip
draft: false
---
<p>
  <span class="a4a-badge ai-generated">AI Generated</span> &nbsp;
  <span class="a4a-badge human-curated">Human Curated</span>
</p>

A voice assistant is not one thing. It is a pipeline — microphone, speech recognition, intent, policy, action, speech synthesis — and the box you talk to is only the first and last link. Which link it is, and which links it refuses to be, turns out to matter more than the hardware inside it.

This is a guide to that distinction, written while building one. We call the thing you talk to a **satellite**. Everything that thinks lives elsewhere.

## The line that defines a satellite

Most smart speakers are not satellites, they are assistants: they hear you, decide what you meant, and act — all in the same box or the same vendor's cloud. That is a reasonable design, and it is not the one described here.

A satellite is a **thin endpoint**. In general, it carries audio in one direction and audio back in the other. Three properties define it:

- **No model answers the user on the device.** Every utterance goes upstream to the system that owns the policy, the guardrails and the memory. A device that can answer on its own is not a satellite; it is a second assistant that happens to share your house.
- **It holds no conversation state.** Session, context and history live upstream. The device forgets between utterances, deliberately.
- **It proposes nothing and actuates nothing.** It cannot switch on a light by itself. It is a microphone, a speaker and, sometimes, a screen.

The test we use is blunt: **unplug the server. It should stop speaking answers — yet still tell you so.** We explain later in this guide.

A device that keeps answering when the brain is gone was never a satellite. It was an assistant wearing the right clothes. But a device that simply goes silent has failed the test too, for a reason worth spelling out below.

The reason to be strict about this in an eldercare context is not purity. It is that every behavior the system might exhibit — what it will say about a medication, when it refuses, when it escalates to a human — has to be enforceable in one place. A device that can answer locally is a hole in that guarantee, and holes in that guarantee are the whole risk.

## Push-to-talk and wake word are not two settings

They are two different devices.

A **wake-word satellite** listens continuously. A local detector runs on the audio stream, and when it hears the phrase, the stream opens upstream. A **push-to-talk satellite** listens only while a human is actively engaging its capture control.

The difference people notice is convenience. The difference that matters is what the microphone is doing when nobody is talking to it:

|  | Push-to-talk | Wake word |
| --- | --- | --- |
| Opens a stream on | A deliberate press or tap of the capture control | A detected phrase |
| Microphone at rest | **Closed** — nothing is captured until the capture control is used | Open, feeding the detector |
| Idle cost | Effectively zero | A continuous detector, always |
| Failure mode | A missed press: nothing happens | False accepts, false rejects, waking on its own voice |

So: **a push-to-talk device never offers a wake word.** Not as a fallback, not as a setting, not as "enable both and let the user choose." The entire claim a PTT device makes is that its microphone is closed until a person opens it. Load a wake-word model and that claim is void — and you can no longer describe the device honestly to the person holding it.

<u>The asymmetry runs one way only</u>. A wake-word device **may** also offer a button that starts listening; several commercial and open source ones do, and it is a genuine convenience. Its microphone was already open. A wake-word satellite is a *superset*; a push-to-talk satellite is a strict *subset*.

One corollary that is easy to miss: **only one thing on the device opens the microphone.**

The tempting way to write that rule is *touching a screen is never talking* — and it is wrong, as we found out. On an Apple Watch used as a satellite, the tap on the watch face **is** the trigger; there is no other surface for it to live on. The same is true of a screen-only wall panel with no physical button. What the rule was actually reaching for is narrower: **incidental interaction must not open the microphone.**

So: a PTT satellite has exactly one **designated capture control**, and it says which one it is. The physical form does not matter — a button, a dial, or a specific on-screen control where the screen is all the device has. Everything else is inert with respect to capture. It may stop, cancel, adjust volume, open settings. It never starts listening. What stays forbidden is the thing the sloppier rule was aimed at: an interface where poking around can begin a recording nobody asked for.

When the capture control is on-screen, it should be visually distinct and kept away from routine controls. An accidental tap is a much easier mistake than an accidental press, which puts more weight on the mic-open indication discussed below.

How firmly you can hold this depends on who built the device. On hardware you control, it is provable — you wrote every input path. On a commercial device the vendor decides what each gesture does and may change it in an update, so the most you can honestly do is verify the current behavior, state it, and check it again after the platform moves.

<u>And the reverse of the rule holds everywhere</u>, with no such asterisk: volume, muting, pairing and setup must all be reachable **without speaking**. A device you have to talk to in order to configure cannot be set up quietly by a caregiver, and cannot be set up at all by someone who has lost their voice today.

## What a satellite may carry

The peripheral list is open. A satellite needs a microphone, and some way to answer — normally a speaker, occasionally a screen. Beyond that it may have a display, a touch panel, buttons and dials, a hardware microphone kill switch, and sensors: temperature, humidity, light, motion, orientation, proximity, battery.

One rule governs all of them: **a peripheral observes and reports. It never decides, and it never actuates.**

The tempting violation is a sensor. It is very natural to write, on a device with an accelerometer, *if the accelerometer spikes, call for help*. It is a few lines of code and it feels like safety. It is the thing we most deliberately do not do.

A satellite publishes its sensor readings the way any other sensor in the house does. What those readings *mean* — whether a spike is a fall, whether a fall warrants a call, who gets called and after what attempt to check in first — is decided upstream, where the logic can be inspected, changed and audited. Not by a hard-coded condition on a device in somebody's pocket that nobody will read again for five years.

There is a subtler point underneath. A device reporting its own orientation is **attesting about itself**. It is not observing the person. Treating "the device is horizontal" as "the person has fallen" is an inference, and inference belongs where inference can be checked against everything else the system knows.

And the last rule about sensors is social rather than technical: **every peripheral is declared.** An undeclared sensor on a device in an older person's home is a surveillance surface regardless of the intent behind it.

### The exception that proves the scope

There is an obvious objection to all of this, and it is worn on the reader's wrist.

An Apple Watch detects falls and offers to call emergency services. That is exactly the hard-coded local threshold rule this section just forbade — and it is a rule nobody outside Apple can inspect, tune or audit. It is also, in practice, quite easy to trip: bend your wrist hard and fast enough and the watch thinks you went down.

The tidy response is to disable it. That is the wrong call, and noticing why sharpens the rule.

The rule governs **what the system builds and authorizes** — not everything a device happens to do. Vendor fall detection is not the system deciding; it is a **second, independent net**, with its own threshold and its own escalation path, that keeps working when the network is down, when the server is down, and when the person is nowhere near home. Turning off a real safety net to preserve a clean architecture diagram is a bad trade. Redundancy that only functions while the main system functions is not redundancy at all.

So it stays on, under four conditions:

- **It is declared**, along with its known false-positive mode.
- **It is never presented as the system's own capability.** If the watch calls, the watch called. The household needs to understand that two systems may act independently — so nobody assumes the assistant is watching when it is not, and nobody reads its silence as an all-clear.
- **It never counts as corroboration.** This is the one that matters most. If the assistant were to treat a watch SOS as confirming its own suspicion that something happened, a wrist-bend becomes "the watch confirms he fell," and a vendor false positive has been laundered into a fact. It is one noisy sensor using somebody else's threshold, not independent evidence about the person. Record that *the watch raised an alarm*; never record that *a fall occurred*.
- **Escalation assumes it may already have fired.** One hazard, two callers, is its own kind of failure.

What stays absolute is the part you control: **you never ship the threshold rule yourself.** The vendor's net is inherited, disclosed and bounded. Yours would be invisible, unauditable, and yours to answer for.

## Silence is a failure, not a fallback

When the server is unreachable, a satellite must say so. That sounds obvious until you ask *how*, and notice the trap: the natural way to report an error is to speak it — and speech is the thing that just became unavailable. **A failure indicator that depends on the failed component is not an indicator.**

So the signal has to come from as low in the stack as possible. Something generated on the device, surviving not just a dead server but a dead application process. No network. No text-to-speech. Nothing upstream.

The good news is that this is settled practice rather than a novel demand. Every off-the-shelf satellite we have tested — M5Stack Atom Echo, Home Assistant Voice Preview Edition, FutureProofHomes Satellite1 — already does it: lose the connection to the server and the status LED falls into a distinct blink pattern, driven by firmware, with nothing upstream involved. The mechanism exists, it is conventional, and anyone building a satellite should inherit it rather than invent it.

What is *not* solved is who the signal is for.

A firmware blink code is a **diagnostic**, addressed to whoever maintains the device. It is visual-only, and it is not legible. An older person who sees a light blinking differently learns that something is wrong — not that the server is down, and specifically not that the problem is not them.

That gap is the part worth designing. A younger user meeting silence troubleshoots: *the wifi's out, the server's down, I'll check later.* An older user meeting silence does not reach for that explanation. They conclude they weren't heard — or worse, that they didn't hear. Unexplained silence gets read as personal failure, and after it happens twice the device stops being trusted and starts being avoided.

So the requirement is the firmware indicator **plus** a human-legible one: a tone, a line of text on a screen if there is one, in the language the household actually speaks. The blink keeps the engineer informed. Something else has to keep the user's confidence intact.

**That is a dignity cost, and it is the kind of thing that decides whether assistive technology gets used at all.**

## Knowing the microphone is open

The same logic applies at the other end of the interaction. A push-to-talk device makes a promise — *the microphone is closed until you open it* — and a promise the user cannot verify is not worth much.

The usual answer is a light. For a device that sits on a shelf, a light is fine. For a carried one it is not enough: it may be in a hand, in a pocket, or held by someone whose vision has narrowed. So: **at least two modalities, and at least one of them non-visual.** A tone qualifies. Haptic feedback is better wherever the hardware allows it, because it reaches a person who cannot see the screen and may not hear the tone either.

One small piece of hard-won ordering: **sound the tone before the microphone opens, not after.** On a device without acoustic echo cancellation — which is most small, cheap, hand-held ones — a confirmation tone fired after capture begins ends up inside the recording and clips the first syllable of whatever the person said. The cue that tells someone to start talking should finish before the listening does.

## Two axes, not one ladder

It is tempting to rank satellites from best to worst — open hardware at the top, a phone app at the bottom. That ranking is wrong, and it fell apart for us the moment we admitted something obvious: **an Apple Watch, used as a push-to-talk endpoint into a self-hosted pipeline, is a real satellite.** It meets every line above. It is also, for most people, the device most likely to be within reach when it matters.

So instead of a ladder, two independent axes.

**Who built it.**

- *Open* — purpose-built hardware running firmware you control, top to bottom. No vendor account, no phone-home, no remote service required to boot. You can read everything it does.
- *Commercial* — a device you do not own the software of, running a vendor OS that usually has its own assistant already on it. You gain reach and an object already on the person's body; you give up end-to-end auditability.

**Does it move.**

- *Fixed* — it sits in a room or hangs from its ceiling/walls. Provisioned once; the room it is in is a fact about it.
- *Carried* — it changes networks during normal use. Patio, car, a relative's house.
- *Self-propelled* — **this is not a satellite nor an interface**; it requires intelligence for mobility so it's a semi-autonomous mobile arm. _Design pending, not discussed here..._

These cross. A car head unit is commercial and fixed. A home-built pendant is open and carried. A wall speaker is open and fixed. A phone is commercial and carried. Requirements that seem universal usually belong to one axis: *fixed IP address* is not an open-hardware requirement, it is a **fixed-device** requirement, and it took us three revisions to notice.

The honest framing for commercial devices is to state what they cannot claim, rather than to pretend otherwise. They are not cloud-free. They are not a supply chain you control — the vendor changes the platform on its own schedule, and your integration can break or lapse unmaintained on someone else's timetable. They are not auditable end to end. None of that stops them being useful, and for reach they are often unmatched. It does mean the claims made about them should be narrower than the claims made about hardware you built.

A related nuance: a device does not have to *announce* what it is. A third-party device cannot be made to declare its own trigger class, and does not need to. Whether a device is push-to-talk is a fact about how the system uses it, recorded where the system is configured. Self-attestation was never the strong form of the guarantee anyway — what makes a device push-to-talk is that no wake-word model is installed, and that is established by inspection, not by a claim.

## "Here" is the hard problem

A fixed satellite knows where it is, so *"turn on the lights here"* resolves. A carried satellite does not, and this is where a lot of designs quietly go wrong.

Home automation systems conflate two uses of the word *area*:

- an **inventory label** — where a device belongs, how dashboards group it;
- a **resolution context** — what "here" means.

Giving a roaming device an area called something like "House Roaming" does the first job honestly and the second job badly. Badly in the dangerous direction, because "here" then resolves to something *plausible* instead of failing. Standing in the bedroom, you say "turn off the lights here," and the living room goes dark.

So the two jobs get split. Every area assignment carries a resolution authority, and for a carried device that authority is **none**. Area-relative phrasing then has exactly two honest outcomes: **ask which room, or decline.** Never guess. In an eldercare system a wrong action is worse than no action, and a confident answer from a stale anchor is the single most expensive kind of bug we have had to design against.

That is a floor, not a ceiling. Nearest-speaker triangulation, access-point association, room beacons, or simply saying the room out loud — all of these can sit above it later. Written as a fallback rather than as the answer, adding them is an extension instead of a rebuild.

And one state is not a resting state: **no area at all means unprovisioned.** A device sitting on the network with no area is unfinished setup, and unfinished setup is something someone should be told about — quietly, ambiently, without a dashboard anyone has to remember to check.

## Provisioning is the feature nobody specs

For a fixed device, provisioning happens once and is never thought about again. For a carried one it is a recurring event, and it is the part of the design most likely to be left until last and then bolted on.

Four things fall out.

**Networks change, and so does reachability.** At home, the server can reach the device. Elsewhere, nothing can reach inward, so the device needs a tunnel home — one you operate, not a commercial VPN service; the requirement is control of the path, not encryption of it. This matters more than it sounds, because the protocols these satellites speak typically have **no authentication and no encryption at all** by design. They assume a trusted network. A satellite on somebody else's Wi-Fi is precisely the case that assumption does not cover — and so, for that matter, is a satellite on a home VLAN shared with smart TVs and a third-party voice assistant. Where every peer is not trusted, the port is firewalled to the server alone.

**Typing is not available.** A device with one button and a small screen can pick a network from a list but cannot enter a passphrase. The honest options are to pre-seed credentials in the image, to bring up a temporary access point with a captive portal, to provision over Bluetooth from a phone, or to accept plugging in a keyboard once. What you cannot do is assume a keyboard is there every time the device changes networks.

**State should be small.** The device should know how to reach home and fetch the rest. A satellite ought to be an object you pick up, not a computer you administer.

**And the person holding it is not the person configuring it.** This is the assumption commercial config menus get wrong for this use case. They are built for an owner-operator — one person who buys, sets up and uses the device. Eldercare is not that shape. A caregiver provisions; someone else uses. Which raises a question worth asking deliberately rather than inheriting from a vendor's defaults: **should the device in the user's hands expose a settings menu at all?** On a pendant, a config screen reachable by button-mashing is arguably a liability rather than a feature.

## What we have not settled

In the spirit of not overclaiming, the open questions as of this writing:

- **Where speech recognition happens on a commercial device.** If the platform transcribes on-device and hands the system text rather than audio, that is efficient — but the audio is gone, and with it the ability to review what was actually said and to bias recognition toward the languages a household actually speaks.
- **How "here" resolves for a carried device**, beyond ask-or-decline.
- **How credentials get in** without a keyboard.
- **Whether the user-facing device should have a configuration surface at all.**
- **Whether a commercial device may ever be the only satellite on a path that matters for safety.** The constraints are clear; what they imply is not yet decided.

## The short version

A voice satellite is a microphone, a speaker, maybe a screen, and a strict refusal to be anything more. Decide once whether it listens continuously or only when held, and never blur the two. Let its sensors report and never decide. Tell it what it is rather than asking it. Do not let it guess where it is. And judge it by the only test that matters:

**Unplug the brain. It should stop speaking answers — and still tell you so.**