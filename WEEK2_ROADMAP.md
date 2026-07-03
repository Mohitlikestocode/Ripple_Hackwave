# RIPPLE - Week 2 Roadmap 🎯

## Executive Summary
RIPPLE's core strength is **making invisible consequences visible through narrative**. Week 2 should deepen this narrative-first approach while adding technical polish and measurable impact metrics.

---

## 🎯 PRIORITY 1: HIGH-IMPACT FEATURES (Do First - 6-8 hours)

### 1.1 **Impact Dashboard** ⭐⭐⭐ (Highest ROI)
**Why**: Judges want to see measurable societal impact, not just stories.

```
What to build:
- Post-simulation summary card showing:
  * Total characters affected
  * Economic impact (total income lost)
  * Vulnerability increase
  * Cascade depth (# of waves)
  * "Breaking point" characters (those who can't absorb shock)
  * Recovery time estimate
  
- Add a "Society Health Score" (0-100)
  Formula: (avg savings buffer / avg income) * 100
  Shows trend: was 45, now 32 (↓ 28%)
```

**Where**: Add as a modal/card that shows after cascade completes
**Impact on Judging**: Shows you understand impact measurement + data-driven storytelling

---

### 1.2 **Pre-built Scenario Library** ⭐⭐⭐
**Why**: Judges love seeing breadth. Currently you have "petrol +₹20" and "Hormuz closes" - need 5-8 realistic scenarios showing different cascades.

```
Scenarios to add:
1. "Monsoon fails" (agriculture shock)
2. "Tech layoffs in Bangalore" (urban employment)
3. "RBI rate hike +50bps" (interest rate shock)
4. "WhatsApp goes dark 48h" (digital dependency)
5. "Electricity prices +40%" (utilities shock)
6. "Local lockdown declared" (mobility/commerce shock)
7. "Rupee crashes 15%" (forex shock)

Each with:
- Icon/emoji
- One-line description
- Difficulty level (easy/medium/hard cascade)
- Est. affected characters (8, 7, 5 etc)
```

**Where**: Event selector screen - show as cards with difficulty badges
**Impact on Judging**: Shows systemic thinking + India-specific economic knowledge

---

### 1.3 **Character Interconnection Map** ⭐⭐⭐
**Why**: Your narrative is about chains of consequence - visualize the chain!

```
Add a new screen: "Dependency Web"
- Show D3-force graph BEFORE simulation
- Highlight which characters connect to the shocked character
- Show connection type: "Auto serves Priya" / "Bhagwat depends on Suresh"
- During cascade, animate the propagation (red glow spreading)
```

**Where**: Add as a tab in SimulationView or standalone screen
**Impact on Judging**: Makes the "invisible chain" visible - core value prop

---

## 🎯 PRIORITY 2: NARRATIVE DEPTH (6-8 hours)

### 2.1 **Character Backstories** ⭐⭐
**Why**: Deepen emotional connection before the shock.

```
Add character detail screens:
- Personal biography (50-100 words in Hinglish)
- Family situation (spouse, kids, dependents)
- Dreams/aspirations
- Previous shocks they survived
- "At risk of" (critical dependencies)

Example (Ramesh):
"3 saal pehle village se aaya, ab Pune mein auto chalata hoon. 
Biwi aur do bachche hain. CNG mein convert karna chahta hoon 
but ₹2.5L loan nahi mil raha. Har mahine petrol ke rate dekh 
kar sona ud jata hai."
```

**Where**: Character selection screen - click profile icon
**Impact on Judging**: Judges remember stories > stats. This makes them care about the cascade.

---

### 2.2 **Diary/Personal Journal Mode** ⭐⭐
**Why**: You already have individual impact stories - make them a continuous narrative.

```
Add:
- Each character has a "diary" showing day-by-day entries
- Pre-shock "normal week" entries
- Shock wave entries  
- Recovery/adaptation entries
- User can flip through them like a photo album

Format: Card stack UI with swipe navigation
```

**Where**: Accessible from StoryPanel or new "Journals" route
**Impact on Judging**: Differentiates you from dashboards - you have *narrative*.

---

## 🎯 PRIORITY 3: TECHNICAL POLISH (4-6 hours)

### 3.1 **Export & Share** ⭐⭐
**Why**: Users can show results to friends/teachers/media.

```
Add buttons:
- "Download PDF Report" 
  → PDF with: scenario, impact stats, character summaries, diary entries
- "Share Results"
  → Social media card with: event name, affected count, cascade depth
- "Copy Simulation URL"
  → Save scenario as shareable link (seed in URL params)
```

**Technical**: Use `html2pdf` for PDF, share via `navigator.share()` API

---

### 3.2 **Mobile Responsiveness** ⭐⭐
**Why**: Many judges test on mobile. Your complex UI might break.

```
Audit:
- Force-graph on small screens (should show as scrollable list)
- Chat screen on mobile (should stack vertically)
- Builder on mobile (should be step-by-step wizard, not grid)
```

---

### 3.3 **Loading States & Animations** ⭐
**Why**: Cascade simulation waits for Claude - need better UX feedback.

```
Add:
- "Simulating wave 1 of 3..." progress indicator
- Skeleton loading for each character's impact
- Confetti animation when cascade completes
- Sound effects (optional, toggle in settings)
```

---

## 🎯 PRIORITY 4: COMPETITIVE DIFFERENTIATORS (4-6 hours)

### 4.1 **Comparison Mode** ⭐⭐
**Why**: Shows systemic thinking - "what if we changed parameters?"

```
Feature:
- Run 2 simulations side-by-side
- Same event, different society configs
- Show which scenario was "less damaging"
- Helps users understand leverage points
```

**Example**: 
- Scenario A: 8 characters, high interconnection
- Scenario B: Same 8 characters, but society builder reduced Ramesh's debt
- Result: Cascade is shallower in B
- Insight: "Reducing auto driver debt reduces cascade by 2 waves"

---

### 4.2 **"What If" Parameter Tweaks** ⭐⭐
**Why**: Interactive systems > linear narratives.

```
After cascade, let users ask:
- "What if Priya's college reduced fees by ₹500?"
- "What if Ramesh had ₹5000 savings buffer?"
- Instantly recalculate cascade with new parameters
- Show delta: "1 fewer character breaking point"
```

---

### 4.3 **AI Character Interviews** ⭐
**Why**: You have Claude agents - let users interview them deeper.

```
In ChatScreen (which you built!):
- Add "Expert Mode" 
- Ask characters complex questions:
  * "What would a government policy do?"
  * "What's your financial strategy?"
  * "How did you survive the COVID lockdown?"
- Character responds as AI agent reasoning about policy

This shows: sophisticated AI reasoning, not just canned responses
```

---

## 📊 SCORING MATRIX

| Feature | Hackathon Weight | Dev Time | Difficulty | Impact |
|---------|------------------|----------|------------|--------|
| Impact Dashboard | ⭐⭐⭐ | 2h | Easy | VERY HIGH |
| Scenario Library | ⭐⭐⭐ | 3h | Easy | VERY HIGH |
| Interconnection Map | ⭐⭐⭐ | 4h | Medium | VERY HIGH |
| Character Backstories | ⭐⭐ | 2h | Easy | HIGH |
| Diary Mode | ⭐⭐ | 2h | Easy | HIGH |
| Export/Share | ⭐⭐ | 2h | Easy | MEDIUM |
| Mobile Polish | ⭐⭐ | 3h | Easy | MEDIUM |
| Comparison Mode | ⭐⭐ | 3h | Medium | HIGH |
| Parameter Tweaks | ⭐ | 2h | Medium | MEDIUM |
| Advanced Interviews | ⭐⭐ | 2h | Medium | MEDIUM |

---

## 🚀 RECOMMENDED WEEK 2 SPRINT

### Must-Do (MVP) - 12 hours
1. ✅ Impact Dashboard (2h)
2. ✅ Scenario Library (3h) 
3. ✅ Interconnection Map (4h)
4. ✅ Mobile Polish (3h)

### Nice-to-Have (if time) - 8 hours
5. Character Backstories (2h)
6. Diary Mode (2h)
7. Export PDF (2h)
8. Comparison Mode (3h)

---

## 🎬 Demo Script for Judges (30 seconds)

> "RIPPLE simulates how a single economic shock cascades through a society of interconnected people. Watch Petrol prices rise ₹20. Ramesh, an auto driver, needs ₹900 more per month. He cuts his daughter Priya's auto fare. She can't attend college. Less students, Lakshmi's chai stall loses customers. It's a chain reaction told in their own voices. 
>
> We show that **invisible economic consequences aren't abstract - they have faces, families, dreams.** That's the power of narrative simulation."

---

## 💡 Differentiator Talking Points

1. **"Not a dashboard, a narrative engine"** - emphasize this
2. **"Real Indian economic data"** - mention INR amounts, Hinglish, specific professions
3. **"Claude-powered agents reason, not just respond"** - agents have agency
4. **"First-person storytelling"** - judges remember stories, not stats
5. **"Systemic thinking"** - shows interconnections, not isolated impacts

---

## 🎯 Success Metrics for Week 2

By end of week, you should be able to say:

- ✅ Users see 5+ economic scenarios
- ✅ Impact metrics dashboard post-cascade
- ✅ Visualized interconnection web
- ✅ Character backstories add emotional depth
- ✅ App works smoothly on mobile
- ✅ Results can be shared/exported
- ✅ Live AI character interviews working

---

## 📝 README Update (for showcase)

Update your README with:

```markdown
## ✨ What Makes RIPPLE Different

- **Narrative-First**: No dashboards. Raw diary entries in Hinglish.
- **Agent-Based**: Each character is a Claude-powered agent with economic reasoning.
- **Systemic Impact**: Watch consequences cascade through 8 interconnected lives.
- **Real Indian Data**: ₹ amounts, actual professions, realistic challenges.
- **Interactive**: Ask characters questions. Run what-if scenarios. Export results.
```

---

## Next Steps

1. Pick TOP 3 from Priority 1 (Impact Dashboard, Scenarios, Interconnection Map)
2. Build in that order
3. Show judges the progression: Story → Numbers → Visualization → Agency
4. Prepare demo video showing before/after Week 1 to Week 2

---

**Goal**: By end of Week 2, you should have a **complete, polished narrative simulation** that makes judges think differently about economic systems. 🎯
