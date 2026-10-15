import { ArrowRight } from "lucide-react";

const COLS: { title: string; links: string[] }[] = [
  { title: "SHOP", links: ["New drop", "All products", "Custom build (Soon)"] },
  { title: "HELP", links: ["Shipping", "Returns", "Size guide", "FAQ"] },
  { title: "SOCIAL", links: ["Instagram", "TikTok", "YouTube", "Discord"] },
];

export default function Footer() {
  return (
    <footer className="bg-ink border-t border-white/5">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 py-14 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-display text-3xl text-bone tracking-tight">FITTHREAD</p>
          <p className="font-signal text-[11px] tracking-[0.18em] text-smoke mt-2">
            WEAR YOUR VERSION. NO DEFAULT.
          </p>
          <p className="font-signal text-[12px] tracking-[0.14em] text-bone mt-8 mb-3">
            JOIN OUR SIGNALS
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex max-w-[340px] border border-white/20"
          >
            <input
              placeholder="Your email"
              className="flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-smoke font-signal"
            />
            <button
              aria-label="Subscribe"
              className="w-12 bg-bone text-black flex items-center justify-center hover:bg-lime transition"
            >
              <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
            </button>
          </form>
        </div>

        {COLS.map((col) => (
          <div key={col.title} className="md:col-span-2">
            <p className="font-signal text-[12px] tracking-[0.18em] text-bone mb-5">{col.title}</p>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-[13.5px] text-smoke hover:text-bone transition">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="md:col-span-1" />
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8 py-5 flex flex-col sm:flex-row justify-between gap-2 font-signal text-[11px] tracking-[0.14em] text-smoke">
          <span>© 2026 FITTHREAD. ALL RIGHTS RESERVED.</span>
          <span>EST. 2024 — UKRAINE / WORLDWIDE</span>
        </div>
      </div>
    </footer>
  );
}
