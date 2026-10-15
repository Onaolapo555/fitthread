"use client";

import { useState } from "react";
import { hasSupabase, supabase } from "@/lib/supabase";

export default function AuthModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function googleLogin() {
    setLoading(true);
    setMessage("");
    try {
      if (!hasSupabase()) {
        setMessage("Supabase env vars missing — Google login disabled in preview.");
        setLoading(false);
        return;
      }
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) throw error;
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Login failed");
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      <div className="relative bg-coal border border-white/10 w-full max-w-md p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-display text-2xl text-bone">WEAR YOUR VERSION</h2>
          <button onClick={onClose} className="text-2xl text-smoke hover:text-bone">✕</button>
        </div>
        <p className="text-smoke text-sm mb-6 font-signal">Sign in with Google. Takes a second.</p>
        <button
          onClick={googleLogin}
          disabled={loading}
          className="w-full bg-bone text-black font-signal font-bold text-sm py-4 hover:bg-lime transition disabled:opacity-60 flex items-center justify-center gap-3"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
          {loading ? "CONNECTING..." : "CONTINUE WITH GOOGLE"}
        </button>
        {message && <p className="text-ember text-xs font-signal text-center mt-5">{message}</p>}
      </div>
    </div>
  );
}
