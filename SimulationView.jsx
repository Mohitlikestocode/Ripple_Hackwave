import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RotateCcw, MessageCircle, Zap, TrendingDown, Users, Clock } from "lucide-react";
import { Button } from "../components/ui/Button.jsx";
import { Card } from "../components/ui/Card.jsx";
import { simulateCascade } from "../lib/cascade.js";

/* ── tone → Tailwind colour tokens ───────────────────────────── */
const TONE = {
  amber:   { ring: "ring-amber-500/40",   badge: "bg-amber-500/15 text-amber-400",   dot: "bg-amber-400",   bar: "border-amber-500/30" },
  orange:  { ring: "ring-orange-500/40",  badge: "bg-orange-500/15 text-orange-400", dot: "bg-orange-400",  bar: "border-orange-500/30" },
  red:     { ring: "ring-red-500/40",     badge: "bg-red-500/15 text-red-400",       dot: "bg-red-400",     bar: "border-red-500/30" },
  green:   { ring: "ring-emerald-500/40", badge: "bg-emerald-500/15 text-emerald-400", dot: "bg-emerald-400", bar: "border-emerald-500/30" },
  neutral: { ring: "ring-white/10",       badge: "bg-white/8 text-secondary",        dot: "bg-white/30",    bar: "border-white/10" },
};

const ROW_TONE = {
  amber: "text-amber-400", orange: "text-orange-400",
  red: "text-red-400", green: "text-emerald-400", neutral: "text-secondary",
};

/* ── helpers ─────────────────────────────────────────────────── */
function characterById(society, id) {
  return society?.characters?.find((c) => c.id === id) ?? null;
}

/* ── sub-components ─────────────────────────────────────────── */

function SourcePill({ source }) {
  if (!source) return null;
  const live = source === "claude";
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-mono font-medium
      ${live ? "bg-emerald-500/12 text-emerald-400 ring-1 ring-emerald-500/25"
              : "bg-white/8 text-muted ring-1 ring-white/12"}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${live ? "bg-emerald-400 animate-pulse" : "bg-white/30"}`} />
      {live ? "· CLAUDE" : "· BAKED"}
    </span>
  );
}

function WaveBadge({ n, tone }) {
  const t = TONE[tone] ?? TONE.amber;
  const labels = { 1: "Direct Impact", 2: "Behavioural Response", 3: "Second-Order Cascade", 4: "Tertiary Cascade" };
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className={`flex items-center justify-center w-7 h-7 rounded-full ring-2 ${t.ring} ${t.badge} font-mono font-bold text-sm`}>
        {n}
      </div>
      <div>
        <span className={`text-xs font-mono uppercase tracking-widest ${ROW_TONE[tone] ?? "text-amber-400"}`}>
          Wave {n}
        </span>
        <p className="text-primary font-display font-semibold text-[15px] leading-tight">{labels[n] ?? `Wave ${n}`}</p>
      </div>
      <div className={`flex-1 h-px ${TONE[tone]?.bar ?? TONE.amber.bar} border-t`} />
    </div>
  );
}

function ImpactCard({ impact, society, tone, index }) {
  const [expanded, setExpanded] = useState(false);
  const char = characterById(society, impact.id);
  const t = TONE[tone] ?? TONE.amber;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card
        padding="p-4"
        className={`ring-1 ${t.ring} cursor-pointer transition-all duration-200 hover:ring-2`}
        onClick={() => setExpanded((v) => !v)}
      >
        {/* Header row */}
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0
            ring-2 ${t.ring} bg-void-2`}>
            {char?.emoji ?? "👤"}
          </div>

          {/* Name + bubble */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-display font-semibold text-[15px] text-primary">{char?.name ?? `Character ${impact.id}`}</span>
              <span className="font-mono text-[10px] text-muted">{char?.archetype}</span>
            </div>
            {impact.bubble && (
              <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[11px] font-mono font-medium ${t.badge}`}>
                {impact.bubble}
              </span>
            )}
          </div>

          {/* Expand indicator */}
          <span className="text-muted text-xs font-mono mt-0.5">{expanded ? "▲" : "▼"}</span>
        </div>

        {/* Diary — always visible, one-liner preview when collapsed */}
        <div className={`mt-3 font-body text-sm text-secondary leading-relaxed
          ${!expanded ? "line-clamp-2" : ""}`}>
          {impact.diary}
        </div>

        {/* Rows table — only when expanded */}
        <AnimatePresence>
          {expanded && impact.rows?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className={`mt-3 pt-3 border-t ${TONE[tone]?.bar ?? TONE.amber.bar} space-y-1.5`}>
                {impact.rows.map(([icon, label, value, rowTone], i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <span className="w-4 text-center">{icon}</span>
                    <span className="text-muted flex-1">{label}</span>
                    <span className={`font-mono font-medium ${ROW_TONE[rowTone] ?? "text-secondary"}`}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}

function SummaryPanel({ summary, event }) {
  if (!summary) return null;
  const stats = [
    { icon: <Zap className="w-3.5 h-3.5" />,          label: "Waves",            value: summary.totalWaves },
    { icon: <Users className="w-3.5 h-3.5" />,        label: "Lives affected",   value: summary.affected },
    { icon: <TrendingDown className="w-3.5 h-3.5" />, label: "Income lost / mo", value: summary.incomeLost ? `₹${summary.incomeLost.toLocaleString("en-IN")}` : "—" },
    { icon: <Clock className="w-3.5 h-3.5" />,        label: "Recovery",         value: summary.recoveryDays ? `~${summary.recoveryDays}d` : "—" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card elevated padding="p-5" className="ring-1 ring-red-500/20 mt-2">
        <p className="font-mono text-[10px] uppercase tracking-widest text-red-400 mb-3">Cascade Summary</p>

        {/* Stat grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-void-2 rounded-lg p-3">
              <div className="flex items-center gap-1.5 text-muted mb-1">{s.icon}<span className="text-[10px] font-mono">{s.label}</span></div>
              <div className="font-mono font-bold text-lg text-primary">{s.value ?? "—"}</div>
            </div>
          ))}
        </div>

        {/* Most vulnerable */}
        {summary.mostVulnerable && (
          <div className="flex items-center gap-2 mb-3 px-3 py-2 rounded-lg bg-red-500/8 ring-1 ring-red-500/20">
            <span className="text-red-400 text-xs font-mono">⚠ Most vulnerable</span>
            <span className="text-primary font-display font-semibold text-sm">{summary.mostVulnerable}</span>
          </div>
        )}

        {/* Feedback loops */}
        {summary.loops?.length > 0 && (
          <div>
            <p className="text-[10px] font-mono text-muted uppercase tracking-widest mb-2">Feedback loops detected</p>
            <div className="space-y-1.5">
              {summary.loops.map((loop, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-secondary">
                  <span className="text-amber-400 mt-0.5 flex-shrink-0">↺</span>
                  <span>{loop}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
}

function LoadingState({ event }) {
  const pulses = ["Mapping society graph…", "Propagating wave 1…", "Characters reacting…", "Tracing second-order effects…"];
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % pulses.length), 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 p-8">
      {/* Sonar rings */}
      <div className="relative w-24 h-24 flex items-center justify-center">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-amber-500/40"
            style={{ width: `${(i + 1) * 30}%`, height: `${(i + 1) * 30}%` }}
            animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
            transition={{ duration: 2, delay: i * 0.5, repeat: Infinity, ease: "easeOut" }}
          />
        ))}
        <span className="text-3xl z-10">{event?.emoji ?? "🌊"}</span>
      </div>

      <div className="text-center">
        <p className="font-display font-semibold text-primary text-lg">{event?.name}</p>
        <AnimatePresence mode="wait">
          <motion.p
            key={step}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="font-mono text-xs text-muted mt-2"
          >
            {pulses[step]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── main screen ─────────────────────────────────────────────── */

export function SimulationView({ go, event, society }) {
  const [state, setState] = useState("loading"); // loading | running | done | error
  const [cascade, setCascade] = useState(null);
  const [source, setSource] = useState(null);
  const [visibleWaves, setVisibleWaves] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const abortRef = useRef(null);
  const bottomRef = useRef(null);

  /* kick off simulation on mount */
  useEffect(() => {
    if (!event || !society) return;
    abortRef.current = new AbortController();

    simulateCascade({
      event,
      characters: society.characters ?? [],
      connections: society.connections ?? [],
      signal: abortRef.current.signal,
    })
      .then(({ source: src, cascade: data }) => {
        setCascade(data);
        setSource(src);
        setState("running");
      })
      .catch((err) => {
        if (err?.name === "AbortError") return;
        setErrorMsg(err.message ?? "Something went wrong");
        setState("error");
      });

    return () => abortRef.current?.abort();
  }, [event, society]);

  /* reveal waves one by one with a delay */
  useEffect(() => {
    if (state !== "running" || !cascade?.waves) return;
    setVisibleWaves(0);

    let i = 0;
    const next = () => {
      i += 1;
      setVisibleWaves(i);
      if (i < cascade.waves.length) {
        setTimeout(next, 900);
      } else {
        setTimeout(() => setState("done"), 600);
      }
    };

    const t = setTimeout(next, 400);
    return () => clearTimeout(t);
  }, [state, cascade]);

  /* auto-scroll to bottom as new waves appear */
  useEffect(() => {
    if (visibleWaves > 0) {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }, [visibleWaves]);

  /* ── render ── */
  return (
    <div className="relative h-full flex flex-col bg-void overflow-hidden">
      {/* Top bar */}
      <div className="flex-shrink-0 flex items-center justify-between px-4 sm:px-6 py-3
        border-b border-white/8 bg-void/80 backdrop-blur-sm z-10">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => { abortRef.current?.abort(); go("event"); }}
            iconLeft={<ArrowLeft className="h-4 w-4" />}
          >
            Events
          </Button>
          {event && (
            <span className="hidden sm:flex items-center gap-1.5 font-display font-medium text-sm text-primary">
              <span>{event.emoji}</span>
              <span>{event.name}</span>
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <SourcePill source={source} />
          {state === "done" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => go("builder")}
              iconLeft={<RotateCcw className="h-3.5 w-3.5" />}
            >
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto">
        {state === "loading" && <LoadingState event={event} />}

        {state === "error" && (
          <div className="flex flex-col items-center justify-center h-full gap-4 p-8 text-center">
            <span className="text-4xl">⚠️</span>
            <p className="font-display font-semibold text-primary">Cascade failed</p>
            <p className="font-mono text-xs text-muted max-w-xs">{errorMsg}</p>
            <Button variant="ghost" onClick={() => go("event")} iconLeft={<ArrowLeft className="h-4 w-4" />}>
              Back to Events
            </Button>
          </div>
        )}

        {(state === "running" || state === "done") && cascade && (
          <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 space-y-8">
            {/* Event header */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center pb-2"
            >
              <span className="text-4xl">{cascade.event?.emoji ?? event?.emoji}</span>
              <h1 className="font-display font-bold text-xl text-primary mt-2">
                {cascade.event?.name ?? event?.name}
              </h1>
              <p className="font-body text-xs text-muted mt-1">
                Shockwave propagating through your society
              </p>
            </motion.div>

            {/* Waves */}
            {cascade.waves.slice(0, visibleWaves).map((wave) => (
              <motion.div
                key={wave.n}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <WaveBadge n={wave.n} tone={wave.tone} />
                <div className="space-y-3">
                  {wave.impacts.map((impact, i) => (
                    <ImpactCard
                      key={impact.id}
                      impact={impact}
                      society={society}
                      tone={wave.tone}
                      index={i}
                    />
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Ripple pulse between waves */}
            {state === "running" && (
              <div className="flex justify-center py-2">
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-amber-400"
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Summary + CTA */}
            <AnimatePresence>
              {state === "done" && (
                <>
                  <SummaryPanel summary={cascade.summary} event={event} />
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.2 }}
                    className="flex flex-col sm:flex-row gap-3 pt-2 pb-8"
                  >
                    <Button
                      variant="primary"
                      size="lg"
                      glow
                      onClick={() => go("story")}
                      iconLeft={<MessageCircle className="h-4 w-4" />}
                      className="flex-1"
                    >
                      Ask the Characters
                    </Button>
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={() => go("event")}
                      iconLeft={<RotateCcw className="h-4 w-4" />}
                      className="flex-1"
                    >
                      Try Another Event
                    </Button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            <div ref={bottomRef} />
          </div>
        )}
      </div>
    </div>
  );
}
