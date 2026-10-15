"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Search, User, X, LogOut } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";

const NAV = [
  { label: "SHOP", href: "/shop" },
  { label: "NEW DROP", href: "/#latest" },
  { label: "CUSTOM BUILD", href: "/shop" },
  { label: "ABOUT", href: "/#story" },
];

function Wordmark() {
  return (
    <span className="font-display text-2xl tracking-tight text-bone leading-none">
      FIT<span className="text-lime">THREAD</span>
    </span>
  );
}

export default function Header({ onSearch }: { onSearch: (v: string) => void }) {
  const { count, setOpen } = useCart();
  const { user, signOut, openAuth } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-ink/95 backdrop-blur border-b border-white/5">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8 h-16 flex items-center justify-between gap-6">
          {/* Burger — replaces logo on mobile */}
          <button
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            className="lg:hidden w-9 h-9 flex items-center justify-start text-bone hover:text-lime transition shrink-0"
          >
            <Menu className="w-6 h-6" strokeWidth={2.5} />
          </button>
          {/* Logo — desktop only */}
          <Link href="/" className="hidden lg:flex items-center gap-2 shrink-0" aria-label="FitThread home">
            <Wordmark />
          </Link>

          {/* Nav */}
          <nav className="hidden lg:flex items-center gap-9">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="font-signal text-[12px] tracking-[0.14em] text-bone/80 hover:text-bone transition"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2.5">
            <label className="hidden sm:flex items-center gap-2 bg-bone text-black px-3 h-9 w-44">
              <Search className="w-3.5 h-3.5" strokeWidth={2.5} />
              <input
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search"
                className="bg-transparent outline-none text-[13px] w-full placeholder:text-black/60 font-signal"
              />
            </label>
            {user ? (
              <div className="relative">
                <button
                  aria-label="Account menu"
                  onClick={() => setUserMenu((o) => !o)}
                  className="w-9 h-9 bg-lime text-black flex items-center justify-center font-signal font-bold text-sm hover:bg-bone transition"
                >
                  {user.name[0]?.toUpperCase()}
                </button>
                {userMenu && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setUserMenu(false)} />
                    <div className="absolute right-0 top-11 z-20 w-56 bg-coal border border-white/15 p-4">
                      <p className="text-bone text-sm font-medium truncate">{user.name}</p>
                      <p className="text-smoke text-xs font-signal truncate mt-0.5">{user.email}</p>
                      <button
                        onClick={() => {
                          signOut();
                          setUserMenu(false);
                        }}
                        className="mt-4 w-full flex items-center justify-center gap-2 border border-white/15 text-ember font-signal text-[12px] py-2.5 hover:border-ember transition"
                      >
                        <LogOut className="w-3.5 h-3.5" /> LOGOUT
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                aria-label="Sign in"
                onClick={openAuth}
                className="w-9 h-9 bg-bone text-black flex items-center justify-center hover:bg-lime transition"
              >
                <User className="w-4 h-4" strokeWidth={2.5} />
              </button>
            )}
            <button
              onClick={() => setOpen(true)}
              className="font-signal text-[12px] tracking-[0.14em] text-bone/90 hover:text-lime transition px-1"
            >
            BAG&nbsp;&nbsp;( {count} )
          </button>
        </div>
        </div>
        {/* Mobile search */}
        <div className="sm:hidden px-5 pb-3">
          <label className="flex items-center gap-2 bg-bone text-black px-3 h-9">
            <Search className="w-3.5 h-3.5" strokeWidth={2.5} />
            <input
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search"
              className="bg-transparent outline-none text-[13px] w-full placeholder:text-black/60 font-signal"
            />
          </label>
        </div>
      </header>

      {/* Slide-in drawer from the left */}
      <div
        aria-hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-[80] bg-black/70 transition-opacity duration-300 ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-[85] w-[85vw] max-w-sm bg-coal border-r border-white/10 flex flex-col transition-transform duration-300 ease-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!menuOpen}
      >
        {/* Logo in the same spot as the header */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-white/10 shrink-0">
          <Link href="/" onClick={() => setMenuOpen(false)} aria-label="FitThread home">
            <Wordmark />
          </Link>
          <button
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="w-9 h-9 flex items-center justify-center text-smoke hover:text-bone transition"
          >
            <X className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>

        <nav className="flex flex-col px-5 py-6 gap-1 overflow-auto">
          {NAV.map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              tabIndex={menuOpen ? 0 : -1}
              className="group flex items-baseline gap-4 py-3 border-b border-white/5"
            >
              <span className="font-signal text-[11px] text-smoke">0{i + 1}</span>
              <span className="font-display text-4xl text-bone group-hover:text-lime transition">
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto px-5 py-6 border-t border-white/10">
          <p className="font-signal text-[11px] tracking-[0.18em] text-smoke">
            WEAR YOUR VERSION. NO DEFAULT.
          </p>
          <p className="font-signal text-[11px] tracking-[0.18em] text-smoke mt-2">
            EST. 2024 — UKRAINE / WORLDWIDE
          </p>
        </div>
      </aside>
    </>
  );
}
