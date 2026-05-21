
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Left Side */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-bold tracking-tight">FitThread</h3>
            <p className="text-zinc-500 text-sm mt-1">Premium Activewear</p>
          </div>

          {/* Center Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-zinc-400">
            <a href="#" className="hover:text-white transition">Shop</a>
            <a href="#" className="hover:text-white transition">About Us</a>
            <a href="#" className="hover:text-white transition">Contact</a>
            <a href="#" className="hover:text-white transition">Size Guide</a>
            <a href="#" className="hover:text-white transition">Shipping</a>
          </div>

          {/* Right Side */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <p className="text-xs text-zinc-500 flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500" /> for the grind
            </p>
            <p className="text-xs text-zinc-600">
              © {new Date().getFullYear()} FitThread. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}