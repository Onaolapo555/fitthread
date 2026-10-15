"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth";

type Tab = "signin" | "register";

export default function AuthModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { signIn } = useAuth();
  const [tab, setTab] = useState<Tab>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }
    if (password.length < 4) {
      setError("Password needs at least 4 characters.");
      return;
    }
    if (tab === "register" && !name.trim()) {
      setError("Tell us your name.");
      return;
    }
    signIn(name, email);
    setName("");
    setEmail("");
    setPassword("");
    onClose();
  }

  const input =
    "w-full bg-ink border border-white/15 focus:border-lime outline-none px-4 py-3 text-sm text-bone placeholder:text-smoke font-signal transition";

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      <div className="relative bg-coal border border-white/10 w-full max-w-md p-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-display text-3xl text-bone">WEAR YOUR VERSION</h2>
          <button onClick={onClose} className="text-2xl text-smoke hover:text-bone" aria-label="Close">
            ✕
          </button>
        </div>
        <p className="font-signal text-[11px] tracking-[0.18em] text-smoke mb-6">
          DEMO MODE — ANY CREDENTIALS WORK
        </p>

        <div className="grid grid-cols-2 border border-white/15 mb-6">
          {(["signin", "register"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => {
                setTab(t);
                setError("");
              }}
              className={`font-signal text-[12px] tracking-[0.14em] py-3 transition ${
                tab === t ? "bg-bone text-black font-bold" : "text-smoke hover:text-bone"
              }`}
            >
              {t === "signin" ? "SIGN IN" : "REGISTER"}
            </button>
          ))}
        </div>

        <form onSubmit={submit} className="space-y-3">
          {tab === "register" && (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className={input}
              autoComplete="name"
            />
          )}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            type="email"
            className={input}
            autoComplete="email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className={input}
            autoComplete={tab === "signin" ? "current-password" : "new-password"}
          />
          {error && <p className="text-ember text-xs font-signal">{error}</p>}
          <button
            type="submit"
            className="w-full bg-lime text-black font-signal font-bold text-sm py-4 hover:bg-bone transition"
          >
            {tab === "signin" ? "SIGN IN" : "CREATE ACCOUNT"}
          </button>
        </form>
      </div>
    </div>
  );
}
