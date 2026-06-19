import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LandingScreen } from "./screens/LandingScreen.jsx";
import { SocietyBuilder } from "./screens/SocietyBuilder.jsx";
import { EventSelector } from "./screens/EventSelector.jsx";
import { SimulationView } from "./screens/SimulationView.jsx";
import { FeatureFriday } from "./screens/FeatureFriday.jsx";

export default function App() {
  const [view, setView] = useState("landing");
  const [society, setSociety] = useState(null);
  const [event, setEvent] = useState(null);

  return (
    <div className="h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-full"
        >
          {view === "landing" && <LandingScreen go={setView} />}
          {view === "builder" && (
            <SocietyBuilder go={setView} onReady={setSociety} />
          )}
          {view === "event" && (
            <EventSelector
              go={setView}
              society={society}
              onTrigger={(ev) => {
                setEvent(ev);
                setView("sim");
              }}
            />
          )}
          {view === "sim" && (
            <SimulationView go={setView} event={event} society={society} />
          )}
          {view === "feature" && <FeatureFriday go={setView} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
