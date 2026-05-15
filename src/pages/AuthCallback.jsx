import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/', { replace: true });
  }, [navigate]);

  return <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">Completing login...</div>;
}
