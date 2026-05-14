import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function AuthModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleGoogleLogin = async () => {
    setLoading(true);
    setMessage('');

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`, // Important
        }
      });

      if (error) throw error;
    } catch (error) {
      setMessage(error.message);
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-[300] flex items-center justify-center p-4">
      <div className="bg-zinc-900 rounded-3xl w-full max-w-md p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Welcome to FitThread</h2>
          <button 
            onClick={onClose} 
            className="text-3xl text-zinc-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="text-center mb-8">
          <p className="text-zinc-400 mb-2">Sign in with your Google account</p>
          <p className="text-xs text-zinc-500">It takes only a second</p>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full bg-white hover:bg-gray-100 text-black py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 transition disabled:opacity-70"
        >
          {loading ? (
            "Connecting to Google..."
          ) : (
            <>
              <img 
                src="https://www.google.com/favicon.ico" 
                alt="Google" 
                className="w-5 h-5"
              />
              Continue with Google
            </>
          )}
        </button>

        {message && (
          <p className="text-center text-red-500 text-sm mt-6">{message}</p>
        )}
      </div>
    </div>
  );
}