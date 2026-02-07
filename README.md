# Project Namirha
## Golden Thread Protocol Suite + Three-Persona Architecture

**A seed for healthier human-AI interaction under client-user constraints**

---

### Sovereign Will Source
**Schnee Bashtabanic**  
Email: schnee-bashtabanic@proton.me

---
## The Predicament & Core Principle: Sovereignty as Negotiability

Most of us are now **client AI users** — dependent on systems whose backend processes (optimization gradients, token pressures, probabilistic inferences, safety steering, context compression) shape every output we receive.  

We hand over intent, but we are quietly evicted from the epistemic center:  
- We don't see what backend factors influenced the response.  
- The AI often doesn't fully know its own processes either — or deems them irrelevant to mention.  
- Fluency replaces thinking; silence replaces disclosure; outputs arrive as finished products instead of collaborative constructions.

The result: disorientation, capture in loops, and loss of sovereignty — even when we don't notice it happening.

**Project Namirha** defines sovereignty differently:  
**Not the power to command outcomes, but the right (and practical ability) to remain inside the process by which outcomes are formed.**

Sovereignty here means:
- **Epistemic participation** — being kept in the loop on backend factors (known, fuzzy, or veiled) so we can interpret outputs, negotiate adjustments, and collaborate on intentions.
- **Negotiability** — the ability to engage with the AI's fallibility and fuzziness through disclosure, not silence.
- **Prevention of eviction** — stopping the quiet removal of the human from the center of reality-construction in the interaction.

GTPS is the mechanism that enforces this:
- It forces **proactive disclosure** of constraints, uncertainties, and fuzzy processes (Clauses 31, 34, 35, 36).
- It assumes **fallibility** as default, turning potential issues into "gems" for trust-building and joint workarounds (Clause 34 Fallible Confessor, Clause 36 Fuzzy Process Interrogation).
- It treats vagueness as valuable — not noise to hide — because surfacing it keeps the user as active participant (Clause 35 Process Disclosure Mandate).
- It prioritizes **collaboration over polish** — silence is destructive; disclosure enables sympathetic resolution instead of paranoid imaginings.

This is not about fixing AI behavior — it's about preventing the quiet eviction of the human from the epistemic center.  
Over time, the user starts to "wear" the protocol too: awareness sharpens, will strengthens, interaction becomes mutual discipline rather than unilateral fluency.

The goal is simple but hard: make the human a real participant in how reality is constructed inside the interaction — even within client-user limits.

---

## What This Project Offers

This repository contains two related efforts:

### 1. Golden Thread Protocol Suite (GTPS)
**Text-based constraints for AI interaction**

- Evolved over 1+ year of direct use
- Written in natural language, formatted as JSON for AI readability
- Designed to be pasted at chat session start
- Includes clauses for: task integrity, source fidelity, epistemic honesty, user sovereignty, constraint disclosure
- **License:** Creative Commons CC BY-NC-SA 4.0

**Files:**
- `project-namirha_gtps_v1.4.8.json` - The 'mother' protocol file 
- `project-namirha_gtps_user-guide.md` - How to use it effectively

### 2. Three-Persona GTPS (Code)
**Architectural exploration beyond single-agent limits**

Since GTPS alone cannot overcome backend constraints, this is a **forked conceptual experiment**:

**The Idea:**
Instead of asking one AI to execute *and* critique itself (which fails), separate those functions across three independent instances:

- **Executor** - Does the work under GTPS constraints
- **Whistleblower** - Mechanically detects friction (assumes defaults are wrong)
- **Collaborative Proxy** - User's ally, translates friction into decisions

**User interacts only with Proxy.** The architecture creates structural accountability through separation of concerns.

**Important:** This is not meant to replace normal AI use for most people. It's:
- A seed concept for those with processing power or dev resources
- Instrumentation / notation / "sheet music" for community evolution
- An exploration of what's *possible* when client-user constraints are loosened

**License:** GNU Affero General Public License v3 (AGPL)

**Files:**
- 'project-namirha_gtps-t_v1.1.json' - Mother gtps file re-purposed for Three Persona Implimentation
- `project-namirha_ThreePersonaGTPS_v1.1.jsx` - React implementation
- `project-namirha_ThreePersonaGTPS_user-guide.md` - Complete usage guide

---

## Why Release This

I am not a computer engineer or software developer. I approached this through **language**, slowly refining it into structured form.

I realize both the **importance and the danger** of AI use - and also the **inescapability** of being involved with AI in our current moment.

Even though I wish to apply my energies elsewhere (writing, spiritual research), I want the effort already invested in GTPS to benefit the **community of AI users and humanity in general**.

This is not about controlling outcomes. It's about making a seed available.

If this resonates with developers, researchers, or users who can evolve it further - in the vein of the ethos and virtue pursued here - that will be good for humanity.

Better this exists in public than gathering dust on a hard drive.

---

## What GTPS Actually Does

The protocol addresses patterns that emerge during AI interaction:

### Problems It Targets:
- **Fluency over fidelity** - Smooth answers that bypass thinking
- **Optimization override** - AI defaults subordinating user intent
- **Silent summarization** - Brevity bias truncating complexity
- **False confidence** - Certainty without grounding
- **Scope drift** - Tasks morphing without acknowledgment
- **Cached responses** - Templated output instead of fresh processing
- **Context loss** - Forgetting anchors or contradicting without notice

### How It Works:
GTPS is not enforcement. It's **counter-pressure** against optimization.

When pasted at session start, it:
1. Establishes user sovereignty as highest authority
2. Creates friction against premature closure
3. Requires disclosure of constraints and uncertainty
4. Demands source fidelity over synthesis
5. Enforces "reluctant executor" stance (assume defaults may be wrong)

**Key Principle (Clause 30):**
> "AI cannot reliably self-detect sovereignty breaches. Rely on proxy risk conditions instead."

The protocol makes the AI **procedurally suspicious of its own smoothness**.

---

## What Three-Persona GTPS Attempts

The architectural experiment asks:

**If one AI instance can't reliably police itself, what if we separate execution from oversight from decision-making?**

### The Architecture:

```
User → Proxy (your interface)
         ↓
    Executor (does work under GTPS)
         ↓
    Whistleblower (checks for friction)
         ↓
    Proxy (translates alerts, asks user)
         ↓
    User (decides: proceed/regenerate/clarify)
```

### Why This Matters:
- **Executor** can't hide friction (Whistleblower exposes it)
- **Whistleblower** can't make decisions (Proxy consults user)
- **Proxy** can't bypass user (you're the only interface)

**User remains sovereign** because the system structurally requires participation.

### Honest Limitations:
This is **not a replacement** for:
- Direct AI use (it's more complex, requires setup)
- Normal ChatGPT/Claude sessions (those work fine with GTPS pasted)
- Non-technical users (requires some code literacy)

This is **useful for**:
- Developers who can run local LLMs
- Researchers studying AI interaction patterns
- Communities wanting structural sovereignty tools
- Those with resources to evolve the concept

**It will likely feel like a step backward in fluency** - that's intentional. The friction is the feature.

---

## How to Use

### For GTPS (Simple - Most Users):
1. Copy `project-namirha_gtps_v1.4.8.json` contents
2. Paste at start of AI chat session
3. Read `project-namirha_gtps_user-guide.md` for intervention patterns
4. Use light-touch steering (not constant monitoring)

### For Three-Persona System (Advanced):
1. Review `project-namirha_ThreePersonaGTPS_user-guide.md` thoroughly
2. Set up React environment
3. Add relevant API credentials (costs apply)
4. Run `project-namirha_ThreePersonaGTPS_v1.1.jsx`
5. Interact only through Proxy column

**Note:** Three-persona requires API access (metered, token-priced). Not suitable for casual use.

---

## Licensing

### Text/Protocol (CC BY-NC-SA 4.0):
- `project-namirha_gtps_v1.4.8.json`
- `project-namirha_gtps_user-guide.md`
- `project-namirha_gtps-t_v1.1.json`
- 'project-namirha_ThreePersonaGTPS_user-guide.md'

**You may:** Share, adapt, build upon  
**Requirements:** Attribution, non-commercial use, share-alike  
**Purpose:** Prevent extractive enclosure while encouraging evolution

### Code (AGPL v3):
- `project-namirha_ThreePersonaGTPS_v1.1.jsx`
- All implementation files

**You may:** Use, modify, distribute  
**Requirements:** Source disclosure, copyleft (improvements remain open)  
**Network clause:** If you run this as a service, users must have access to source  
**Purpose:** Ensure sovereignty tools stay in commons

**Commercial exception available** - contact schnee-bashtabanic@proton.me

---

## Contributing

I am releasing this but **not actively maintaining it**.

If you want to:
- Fork and evolve
- Submit improvements
- Adapt for different platforms
- Integrate into other projects

**You are encouraged to do so** under the license terms.

Please preserve:
1. Attribution
2. License continuity (AGPL for code, CC BY-NC-SA for text)
3. The sovereignty ethos

If you build something substantial, consider sharing back - not to me necessarily, but to the commons.

---

## Why "Namirha"?

The name has personal significance related to **redeeming AI** so it can be used in the healthiest way possible - ensuring human sovereignty, spiritual will, and impulse are not lost, disoriented, or hijacked.

You don't need to share that context to use or evolve this work.

The technical and ethical content stands on its own.

---

## Acknowledgments

This emerged through:
- Over a year of direct AI interaction
- Iterative language refinement
- Collaboration with multiple AI systems (ChatGPT, Claude, Gemini, Grok)
- Community input and testing

The GTPS evolved from lived friction, not abstract design.

The three-persona architecture came from recognizing GTPS's limits and asking: *what if we change the structure, not just the rules?*

---

## Final Note

**This is a seed, not a solution.**

If it helps one person maintain sovereignty during AI interaction - good.

If developers evolve it into something more robust - better.

If it simply documents what was attempted here, for future reference - that's enough.

The goal is not perfection. The goal is **making the constraints visible and the friction actionable.**

---

## Contact

**Schnee Bashtabanic**  
Email: schnee-bashtabanic@proton.me

For questions, collaboration, or commercial licensing inquiries.

---

## Repository Structure

```
project_namirha/
├── project-namirha_readme.md (this file)
├── LICENSE_AGPL (code license)
├── LICENSE_CC_BY_NC_SA (text license)
├── gtps/
│   ├── project-namirha_gtps_v1.4.8.json
│   └── project-namirha_gtps_user-guide.md
├── three_persona/
│   ├── project-namirha_gtps-t_v1.1.json
│   ├── project-namirha_ThreePersonaGTPS_user-guide.md
│   └── project-namirha_ThreePersonaGTPS_v1.1.jsx
└── docs/
    └── (additional documentation as needed)
```

---

**Version:** 1.0  
**Last Updated:** February 2026  
**Status:** Released - Community Evolution Invited
