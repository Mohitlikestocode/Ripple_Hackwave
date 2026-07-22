import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, X, Loader2, AlertCircle, Search } from "lucide-react";
import { Button } from "../components/ui/Button.jsx";
import { AvatarToken } from "../components/ripple/AvatarToken.jsx";
import { characterReply } from "../lib/cascade.js";
import { vulnerability, DEMO_CHARACTERS } from "../data/society.js";
import { validateUserInput, sanitizeCharacterResponse, getModerationGuidelines } from "../lib/contentModeration.js";

export function CharacterChatScreen({ go }) {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [msgs, setMsgs] = useState([]);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // Filter characters based on search
  const filteredCharacters = DEMO_CHARACTERS.filter((char) =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    char.archetype.toLowerCase().includes(searchTerm.toLowerCase()) ||
    char.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Initialize greeting when character is selected
  useEffect(() => {
    if (selectedCharacter) {
      setMsgs([
        {
          role: "char",
          text: `Namaste. ${selectedCharacter.name} bol raha hoon. Poochho, kya jaanna hai?`,
        },
      ]);
      setDraft("");
      setError(null);
      setSearchTerm("");
      // Auto-focus input after character selection
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [selectedCharacter?.id]);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [msgs.length, thinking]);

  const send = async () => {
    const q = draft.trim();
    
    // Validate input
    const validation = validateUserInput(q);
    if (!validation.valid) {
      setError(validation.error);
      setTimeout(() => setError(null), 5000);
      return;
    }

    if (thinking || !selectedCharacter) return;
    
    setError(null);
    const userMsg = { role: "user", text: q };
    const history = [...msgs, userMsg];
    setMsgs(history);
    setDraft("");
    setThinking(true);
    try {
      const reply = await characterReply({
        character: selectedCharacter,
        question: q,
        history: msgs,
      });
      
      // Sanitize the response
      const sanitized = sanitizeCharacterResponse(reply);
      setMsgs((m) => [...m, { role: "char", text: sanitized.text }]);
      // Refocus input after response arrives
      setTimeout(() => inputRef.current?.focus(), 100);
    } catch (err) {
      setError("Failed to get response. Please try again.");
      setTimeout(() => setError(null), 5000);
    } finally {
      setThinking(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-void relative overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(9,9,11,0) 0%, rgba(9,9,11,0.55) 60%, rgba(9,9,11,0.85) 100%)",
        }}
      />

      {/* Header */}
      <div className="relative z-10 px-4 sm:px-6 py-4 border-b border-subtle flex items-center gap-3 bg-surface/80 backdrop-blur">
        <button
          onClick={() => go("landing")}
          className="h-8 w-8 flex-none inline-flex items-center justify-center rounded-md border border-subtle text-secondary hover:text-primary hover:border-active"
          aria-label="Back to landing"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="flex-1">
          <h1 className="font-display font-semibold text-lg text-primary">
            Ask the Characters
          </h1>
          <p className="text-xs text-secondary">Select a character and chat with them</p>
        </div>
      </div>

      {/* Moderation Guidelines Banner */}
      {!selectedCharacter && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="relative z-10 px-4 sm:px-6 py-3 bg-elevated/50 border-b border-subtle"
        >
          <div className="flex gap-2 items-start">
            <AlertCircle className="h-4 w-4 text-accent-blue flex-none mt-0.5" />
            <div className="text-xs text-secondary leading-relaxed">
              <span className="font-semibold text-primary">Community Guidelines:</span> Conversations should remain respectful and focused on economic topics. 
              We do not allow violence, hate speech, illegal content, or harassment.
            </div>
          </div>
        </motion.div>
      )}

      {/* Main content - Split view */}
      <div className="relative z-10 flex-1 flex overflow-hidden">
        {/* Character selector menu */}
        <AnimatePresence mode="wait">
          {!selectedCharacter ? (
            <motion.div
              key="selector"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="w-full sm:w-80 border-r border-subtle overflow-hidden bg-surface/40 flex flex-col"
            >
              {/* Search box */}
              <div className="p-4 border-b border-subtle flex-none">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary pointer-events-none" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search characters..."
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-elevated border border-subtle text-primary placeholder:text-muted focus:outline-none focus:border-active text-sm"
                  />
                </div>
              </div>

              {/* Characters list */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 grid gap-2">
                {filteredCharacters.length > 0 ? (
                  filteredCharacters.map((character) => (
                    <motion.button
                      key={character.id}
                      onClick={() => setSelectedCharacter(character)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-3 p-3 rounded-lg border border-subtle hover:border-active hover:bg-elevated/50 transition-all text-left"
                    >
                      <div className="h-10 w-10 rounded-full border border-active bg-elevated flex items-center justify-center flex-none text-lg">
                        {character.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-primary text-sm truncate">
                          {character.name}
                        </div>
                        <div className="text-xs text-secondary truncate">
                          {character.archetype}
                        </div>
                      </div>
                      <div
                        className="flex-none h-2 w-2 rounded-full"
                        style={{
                          background: vulnerability(character) > 60 ? "#ef4444" : 
                                     vulnerability(character) > 40 ? "#f97316" : "#22c55e",
                        }}
                        title={`Vulnerability: ${Math.round(vulnerability(character))}%`}
                      />
                    </motion.button>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full text-center">
                    <div>
                      <div className="text-2xl mb-2">🔍</div>
                      <p className="text-xs text-secondary">No characters found</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Chat panel */}
        <AnimatePresence mode="wait">
          {selectedCharacter && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex flex-col overflow-hidden bg-surface/60"
            >
              {/* Character header in chat */}
              <div className="px-4 sm:px-6 py-4 border-b border-subtle flex items-center justify-between bg-elevated/30">
                <div className="flex items-center gap-3">
                  <AvatarToken
                    emoji={selectedCharacter.emoji}
                    vulnerability={vulnerability(selectedCharacter)}
                    size={40}
                  />
                  <div className="min-w-0">
                    <div className="font-display font-semibold text-primary">
                      {selectedCharacter.name}
                    </div>
                    <div className="text-xs text-secondary">
                      {selectedCharacter.archetype} · {selectedCharacter.location}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCharacter(null)}
                  className="h-7 w-7 inline-flex items-center justify-center rounded-md border border-subtle text-secondary hover:text-primary hover:border-active"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Messages */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 flex flex-col gap-3"
              >
                {msgs.length === 1 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-xs text-muted py-4"
                  >
                    <div className="mb-2 text-base">💭</div>
                    <p>Ask anything about daily life, work, or challenges...</p>
                  </motion.div>
                ) : null}

                {msgs.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`max-w-[82%] font-body text-[13px] leading-normal px-3.5 py-2.5 rounded-2xl border ${
                      m.role === "user"
                        ? "self-end bg-accent-blue text-white border-transparent rounded-br-md"
                        : "self-start bg-elevated text-primary border-subtle rounded-bl-md"
                    }`}
                  >
                    {m.text}
                  </motion.div>
                ))}
                {thinking && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="self-start flex items-center gap-2 text-secondary text-xs px-3.5 py-2.5"
                  >
                    <Loader2 className="h-3 w-3 animate-spin" />
                    <span>{selectedCharacter.name} is thinking…</span>
                  </motion.div>
                )}
              </div>

              {/* Input */}
              <div className="px-4 sm:px-6 py-4 border-t border-subtle bg-surface/60">
                {/* Error display inline */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -4, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -4, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-start gap-2 p-2 rounded-md bg-red-500/10 border border-red-500/30 mb-2"
                    >
                      <AlertCircle className="h-3.5 w-3.5 text-red-400 flex-none mt-0.5" />
                      <p className="text-xs text-red-400 leading-snug">{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex gap-2 items-center">
                  <input
                    ref={inputRef}
                    type="text"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey && !thinking) {
                        e.preventDefault();
                        send();
                      }
                    }}
                    placeholder="Type your question..."
                    disabled={thinking}
                    className="flex-1 px-3 py-2 rounded-lg bg-elevated border border-subtle text-primary placeholder:text-muted focus:outline-none focus:border-active disabled:opacity-50 text-sm"
                  />
                  <button
                    onClick={send}
                    disabled={!draft.trim() || thinking}
                    className="h-9 w-9 flex-none inline-flex items-center justify-center rounded-lg bg-accent-blue text-white hover:bg-accent-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Send message"
                    title="Send (Ctrl/Cmd+Enter)"
                  >
                    {thinking ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state when no character selected on desktop */}
        {!selectedCharacter && (
          <div className="hidden sm:flex flex-1 items-center justify-center bg-surface/40">
            <div className="text-center">
              <div className="text-4xl mb-3">👥</div>
              <div className="font-semibold text-primary text-lg">Select a character</div>
              <p className="text-sm text-secondary mt-1">Choose from the list to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
