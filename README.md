# 🛢️ RIPPLE

![RIPPLE](./image.png)

> **Every event has a face.**

```
                    ╭─────╮
                    │ 🛢️ │     ← someone, somewhere, raises petrol ₹20
                    ╰──┬──╯
                       │
        ┌──────────────┼──────────────┐
        │              │              │
      ╭───╮          ╭───╮          ╭───╮
      │🚗 │          │🥛 │          │🧑‍🌾│   ← Wave 1 (amber)
      ╰─┬─╯          ╰─┬─╯          ╰───╯
        │              │
   ┌────┴────┐    ┌────┴────┐
   │         │    │         │
 ╭───╮     ╭───╮ ╭───╮
 │🎓 │     │☕ │ │🏪 │              ← Wave 2 (orange)
 ╰───╯     ╰───╯ ╰───╯
   │
   │   "Auto ka kiraya badh gaya, ab paidal college jaati hoon.
   │    Thak jaati hoon, padhai pe asar pad raha hai."
   ▼
 scholarship at risk                   ← Wave 3 (red)
```

RIPPLE is what you get when you ask Claude to imagine the way a single shock
travels through a society of people who *actually exist* — at the
kitchen-table level, in the language they actually think in, with the exact
rupees they actually have.

You build a tiny cast. You drop an event. You watch the lights come on, one
person at a time, until somebody breaks.

It is not a dashboard. It is a **narrative simulation engine**. Palantir
meets a Nolan film, told in Hinglish.

---

## 📡 Two-minute tour

```bash
git clone https://github.com/Mohitlikestocode/Ripple_Hackwave
cd Ripple_Hackwave
npm install
npm run dev          # → http://localhost:5173
```

Click **Launch Simulation** → pick **🛢️ Petrol Price +₹20** → don't blink.

> Want the *live* Claude version instead of the baked demo?
> ```bash
> cp .env.example .env.local
> # paste ANTHROPIC_API_KEY=sk-ant-...
> ```
> The Vite dev server proxies `/api/anthropic/*` to Anthropic with the key
> attached server-side. The browser never sees it.

---

## 🎬 What you'll actually see

Four screens. About twelve seconds of choreography from event-drop to society-pulse.

### 1 · Landing
Dormant particle network drifting behind the wordmark. A `What if …` ticker
cycles through the events you could pick. A miniature cascade rolls across six
character avatars in a row, sonar ring traveling left-to-right. A real diary
quote — in Hinglish — fades in and out below. Top-right has the GitHub link
because of course it does.

### 2 · Society Builder
Eight pre-built characters laid out organically — auto-driver, student, kirana
owner, farmer, teacher, constable, dairy distributor, chai stall. Dashed
cyan lines mark economic dependencies. Solid lines mark social ties. Click
anyone to edit their `income · fixed · emi · savings` (real INR), tune
dependency criticality on a 1–10 slider, watch the vulnerability ring update
live. Everything persists to `localStorage` — refresh and your edits stick.

### 3 · Event Drop
Modal floats above a blurred snapshot of your network. Eight pre-built shocks
(🛢️ 🌊 🌧️ 🏦 📵 💰 🏏 ⚡) plus a free-text *"What if…"* input. Pick one,
hit **Trigger Event**.

### 4 · Simulation — *the centerpiece*
Full-bleed force-directed graph (d3-force, rendered as SVG). Event banner
drops in pulsing amber. The first **sonar ring** expands from the cascade's
centroid. Hit characters flash + emit a one-line bubble (`Fuel +₹900/mo`).
Edges carrying impact light up wave-colored. Wave 2 rings expand from the
Wave-1 victims; Wave 3 finishes red. The most-vulnerable character ends
with a **cracked** vulnerability ring.

Click any node → right-side panel slides in with their **diary** (first-person
Hinglish, every wave they were in) and a **Chat** tab where Claude stays in
character so you can ask Ramesh about CNG subsidies and he'll answer like
Ramesh.

A `· CLAUDE` / `· BAKED` tag in the chrome bar tells you whether the cascade
you're watching was synthesized live or fell back to the deterministic offline
example. Replay re-runs the choreography.

---

## ⭐ Feature Friday — the showcase page

There's a second route in the app — `Feature Friday` from the landing — that is
basically RIPPLE's own pitch deck rendered as a single scrollable editorial
page. It's the screen we want recruiters and demo-day judges to see.

### Why a dedicated showcase?
Demo-day attention spans live in 30-second windows. The app itself is a 12s
animation; the showcase is the page that frames *what you just watched*: the
problem, the data model behind it, the four screens, the stack. One scroll,
no clicks required to understand the thing.

### Structure (top → bottom)

| # | Section | What it does | Why it's here |
|---|---|---|---|
| 0 | Sticky top bar | Back-to-home `←` · RIPPLE wordmark · `Feature Friday · Week 1` badge · **GitHub** link · "Open the app →" | The only navigation you ever need on this page |
| 1 | **Hero** | Concentric ripple rings backdrop, RIPPLE wordmark, subtitle, "Built by Team Ripple" | Sets the visual register — cinematic, not corporate |
| 2 | **The Invisible Chain** | Problem statement on the left, an auto-looping mini-network on the right with a sonar ring pulsing through five nodes | Tells the reader *what RIPPLE is actually for* — making the invisible chain of consequence visible |
| 3 | **How it works** | Three cards: **Build** / **Drop** / **Watch**, each with a custom SVG glyph and one paragraph | Compresses the whole product into three verbs |
| 4 | **Data Architecture** | Full custom-SVG ER diagram of all 8 entities with PK/FK markers, mono field types, cyan relationship lines with `1:N` cardinality + verb labels | This is the section you asked us to bolt on — engineering credibility for the hackathon judges |
| 5 | **The Experience** | Four "browser frame" mocks — Society Builder · Event Drop · Cascade · Story Card — each rendered as live SVG, not screenshots | Preview every screen on one page so people don't have to context-switch into the app to *get it* |
| 6 | **Built with** | Pill badges for every dependency with a tiny colored dot | Honest receipts: React+Vite, Tailwind v3, Framer Motion, d3-force, Claude Sonnet 4.5, Lucide |
| 7 | **Footer** | RIPPLE wordmark · tagline · "Built with ♥ and Claude" · source link | The signature |

### UI/UX choices on the showcase

- **Editorial column.** The page lives in a `max-w-[1120px]` centered column. Sections are separated by a 1px `--border-subtle` hairline, never a heavy divider. White space does the heavy lifting.
- **Sticky chrome that doesn't shout.** The top bar is `backdrop-blur-md bg-void/85`, 56px tall. It's there when you need it, invisible when you don't.
- **Scroll-revealed motion.** Each section's primary content uses Framer Motion `whileInView` with a 100ms stagger so the page feels alive as you scroll, never animated-up-front-and-then-dead.
- **Reduced motion respect.** Same `prefers-reduced-motion` hook the simulation uses — rings stop pulsing, transitions collapse to opacity-only.
- **No fake screenshots.** The four "Experience" frames are real SVG with real character avatars, the actual sonar-ring keyframe animation, the same `--wave-amber/orange/red` palette. What you see in the mock is exactly what you see in the app.
- **Mono numbers, sentence-case labels, ALL-CAPS reserved for wave markers.** Same typography contract as the rest of the system.

### The ER diagram, in detail

The diagram is hand-laid-out in an SVG `viewBox="0 0 1120 900"` — no Mermaid,
no auto-layout. Eight entities, seven relationships, all 1:N. Each entity is
a rounded rect with a header strip; fields are listed in `JetBrains Mono` at
11px with a leading dot marker:

| Marker | Meaning |
|:--:|---|
| 🔵 blue dot | Primary key |
| 🟠 amber dot | Foreign key |
| *(no dot)* | Plain attribute |

Relationship lines are orthogonal (Manhattan routing — `L` segments only,
no curves), `1.25px` cyan, with `1` and `N` cardinality labels at the
endpoints and a verb in the middle (`supplies`, `runs`, `pursues`, `links`,
`logged`, `produces`, `has`).

#### The schema

| Entity | Fields | Holds |
|---|---|---|
| `CHARACTER` | `id` · `name` · `archetype` · `monthlyIncome` · `fixedExpenses` · `emi` · `savings` · `vulnerabilityScore` · `createdAt` | A person in the simulated society |
| `RESOURCE` | `id` · `name` · `type` | Petrol, diesel, electricity, sugar, milk, LPG, … |
| `DEPENDENCY` | `id` · `characterId` → · `resourceId` → · `monthlyCost` · `criticality` · `createdAt` | Ramesh needs ₹4,500 of petrol a month at criticality 10 |
| `CONNECTION` | `id` · `characterAId` → · `characterBId` → · `relationshipType` · `strength` · `createdAt` | Ramesh `serves` Priya at strength 7 |
| `GOAL` | `id` · `characterId` → · `description` · `priority` · `status` · `createdAt` | "Save for daughter's wedding" · priority 5 |
| `EVENT` | `id` · `name` · `description` · `parameters` · `createdAt` | 🛢️ Petrol Price +₹20 |
| `SIMULATIONRUN` | `id` · `eventId` → · `status` · `startedAt` · `endedAt` | One pass of one event over one society |
| `IMPACTLOG` | `id` · `simulationRunId` → · `characterId` → · `waveNumber` · `content` · `decisionType` · `createdAt` | One person's experience in one wave: diary line, decision, downstream impact |

#### The seven 1:N relationships

```
RESOURCE     1 ── supplies  ── N  DEPENDENCY
CHARACTER    1 ── has       ── N  DEPENDENCY
CHARACTER    1 ── links     ── N  CONNECTION   (twice — A and B)
CHARACTER    1 ── pursues   ── N  GOAL
CHARACTER    1 ── logged    ── N  IMPACTLOG
EVENT        1 ── runs      ── N  SIMULATIONRUN
SIMULATIONRUN 1 ── produces ── N  IMPACTLOG
```

In words: **CHARACTER** is the hub (5 outgoing relationships). **IMPACTLOG**
is the receipt — every wave-by-wave moment that ever happened to anyone is a
row here. That's what lets the *Butterfly Path* tracing feature work — the
schema can answer "show me the chain that ended in Priya's scholarship being
at risk" with a single recursive query.

> The current app keeps everything in `localStorage` because we're a hackathon
> demo and a 12-second cascade doesn't earn a Postgres instance. The schema
> exists so that when you *do* want to persist runs across sessions, devices,
> or users — it's already designed.

---

## 🧠 How the cascade actually works

```
       user picks event
              │
              ▼
       simulateCascade()   ← src/lib/cascade.js
              │
   ┌──────────┴──────────┐
   │                     │
   ▼                     ▼
 has Anthropic           no key configured
 key configured          │
   │                     ▼
   ▼                  return BAKED_CASCADE  ── src/lib/bakedCascade.js
 POST /api/anthropic       │
 /v1/messages              │
 (Vite proxy attaches      │
  x-api-key server-side)   │
   │                       │
   ▼                       │
 parse JSON                │
 validate shape            │
   │                       │
   ├── fail → fallback ────┤
   │                       │
   └── ok → cascade ───────┘
              │
              ▼
       SimulationView animates it wave by wave
       with timed reveals — drama is in the reveal,
       not the compute
```

The chrome bar shows `· CLAUDE` or `· BAKED` so you always know which one
you're watching. There is no third state — if the network burps, you get the
baked cascade and a console warning, not a broken screen.

---

## 🗂 File layout

```
Ripple_Hackwave/
├── src/
│   ├── App.jsx                    view router (landing | builder | event | sim | feature)
│   ├── main.jsx                   no StrictMode — see comment for why
│   ├── index.css                  Tailwind + design tokens as CSS vars
│   │
│   ├── lib/
│   │   ├── claude.js              POST /api/anthropic wrapper
│   │   ├── cascade.js             prompt building + JSON parsing + character chat
│   │   ├── bakedCascade.js        deterministic 3-wave fallback
│   │   └── cn.js                  classnames helper
│   │
│   ├── data/
│   │   ├── society.js             archetypes, Demo Society seed, default connections
│   │   └── events.js              the 8 pre-built shock events
│   │
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   └── useReducedMotion.js
│   │
│   ├── components/
│   │   ├── ui/                    Button · Card · Badge · Input · Slider · GithubButton
│   │   └── ripple/                AvatarToken · VulnerabilityBar · WaveMarker · StatReadout
│   │
│   └── screens/
│       ├── LandingScreen.jsx      particle field + What-if ticker + composed preview card
│       ├── SocietyBuilder.jsx     organic layout + character editor + persistence
│       ├── EventSelector.jsx      blurred-network modal + event grid
│       ├── SimulationView.jsx     d3-force graph + sonar rings + cascade timeline
│       ├── StoryPanel.jsx         diary tab + in-character chat tab
│       └── FeatureFriday.jsx      the editorial showcase described above
│
├── public/
│   └── ripple.svg                 favicon
├── image.png                      the hero shot above
├── vite.config.js                 dev-only /api/anthropic proxy
├── tailwind.config.js             color · type · radius · shadow · keyframe tokens
└── .env.example                   ANTHROPIC_API_KEY=
```

---

## 🧪 The stack — and why

| Layer | Pick | Why this one |
|---|---|---|
| **Build** | Vite 5 + React 18 | HMR is instant, config is nothing. |
| **Style** | Tailwind v3 + CSS variables | Tokens live in both worlds — utility classes (`bg-void`, `border-wave-amber`) and inline `style` with `var(--wave-amber)` — so they stay in sync no matter where you reach for them. |
| **Motion** | Framer Motion 11 | The 12-second cascade choreography lives or dies on staged `animate` sequences. `AnimatePresence` handles the screen swaps. `prefers-reduced-motion` is one hook away. |
| **Graph** | `d3-force` + custom SVG render | Force-directed physics for the layout, SVG for the render — full control over sonar overlays, speech bubbles, wave-colored edges. Skipped `react-force-graph-2d` (canvas) because we'd lose that. |
| **Icons** | `lucide-react` (chrome) + emoji (brand) | Lucide gives us the thin-stroke arrow/close/refresh glyphs that match the typography. Emoji are the *brand* — they are the archetype identity, not decoration. |
| **LLM** | Claude Sonnet 4.5 | One request returns the whole cascade JSON. Same client handles in-character chat. |
| **Persistence** | `localStorage` | A hackathon-grade simulation does not earn a database. The ER diagram is what's there for the day we want one. |

---

## 🌐 Production deployment

The Vite proxy at `/api/anthropic/*` is **dev-only**. In production you need
a tiny serverless function that does the same thing — injects the API key
server-side so it never enters the browser bundle. Fifteen lines on
Cloudflare Workers:

```js
export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (!url.pathname.startsWith("/api/anthropic/")) {
      return new Response("nope", { status: 404 });
    }
    const upstream =
      "https://api.anthropic.com" + url.pathname.replace("/api/anthropic", "");
    return fetch(upstream, {
      method: req.method,
      headers: {
        "content-type": "application/json",
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: req.body,
    });
  },
};
```

Point your built `dist/` at the same host. Done.

---

## ✍️ A note on the writing

Character voice is **Hinglish**. Not "translated from English." Not "with a
dash of Hindi for flavor." Hinglish — Hindi grammar, English nouns when they
fit, the texture of how people actually talk in Pune, Bangalore, Hyderabad.

Real example, Ramesh after the petrol hike:

> *"Petrol phir mehnga ho gaya. ₹4500 ka budget tha fuel ka, ab ₹5400 lagega.
> Mahine ke end mein ₹900 ka shortfall. Ghar pe bolunga toh tension hogi."*

That paragraph is the whole product. If we get the Hinglish right, the
₹900 lands. If we don't, it's just another dashboard.

**Numbers are always JetBrains Mono.** Always. If it's data, it's mono.

**RIPPLE** is the only thing in all-caps. Wave markers (`WAVE 1`) get caps +
wide tracking because they're system labels, not content. Everything else is
sentence case.

---

## 🐛 Known sharp edges

- **StrictMode is off.** React 18's dev double-invocation deadlocks Framer Motion's `AnimatePresence mode="wait"`. The comment in `src/main.jsx` says so. Don't turn it back on without a fix.
- **Claude can return malformed JSON.** Wrapped in try/catch — we fall back to the baked cascade and log to console.
- **No router.** App view is a single `useState`. There's no `/sim` URL to share. For a hackathon demo this is fine; for production add `react-router`.
- **Mobile is best-effort.** The simulation is designed for ≥1024px. It does not crash on mobile but the force graph is cramped.

---

## 🤝 Credits

| Role | Who |
|---|---|
| Concept · design · build | **Team Ripple** |
| Brain | Claude Sonnet 4.5 |
| Inspiration | Every chai stall owner who lost a regular this month |

Made for **Feature Friday · Week 1**.

[**→ Source on GitHub**](https://github.com/Mohitlikestocode/Ripple_Hackwave)

---

## 📜 License

MIT.

The *design language* — wave spectrum, archetype voice, the Ripple Pulse
metaphor — is the RIPPLE brand and stays with the team.
