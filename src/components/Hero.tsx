import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { HERO_IMAGE } from "@/lib/data";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink grain">
      <div className="hero-glow absolute inset-0" />
      {/* Giant blurred backdrop */}
      <div aria-hidden className="absolute inset-x-0 top-6 text-center">
        <span className="hero-giant">FITTHREAD</span>
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 pt-10 md:pt-14">
        <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-4 min-h-[380px] md:min-h-[520px]">
          {/* Left copy */}
          <p className="hidden md:block max-w-[210px] text-[13px] leading-relaxed text-smoke pb-40">
            Oversized streetwear for versions of you that don&apos;t belong to the default storyline.
          </p>
          <div className="md:hidden" />

          {/* Jacket */}
          <div className="relative w-[300px] sm:w-[420px] md:w-[560px] mx-auto">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={HERO_IMAGE}
                alt="FitThread Alt Shell Jacket"
                fill
                priority
                className="object-cover img-duotone"
                sizes="(max-width: 768px) 80vw, 560px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
            </div>
            {/* CTA overlapping */}
            <a
              href="#latest"
              className="absolute left-1/2 -translate-x-1/2 -bottom-2 md:bottom-6 flex items-center gap-3 bg-lime text-black font-signal text-[13px] md:text-sm font-bold tracking-wide px-6 md:px-8 py-3.5 md:py-4 hover:bg-bone transition whitespace-nowrap"
            >
              SHOP ALT SKIN <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
            </a>
          </div>

          {/* Right copy */}
          <div className="hidden md:flex flex-col items-end gap-6 pb-36 text-right">
            <p className="font-signal text-[12px] leading-relaxed text-smoke">
              EST. 2024
              <br />
              Ukraine / Worldwide
              <br />
              Clothing for alternate selves
            </p>
            <div className="w-20 h-24 opacity-80" aria-hidden>
              {/* mascot placeholder: small hooded figure */}
              <svg viewBox="0 0 80 96" className="w-full h-full fill-none stroke-bone/50">
                <circle cx="40" cy="34" r="20" strokeWidth="2" />
                <circle cx="33" cy="32" r="4" className="fill-bone" />
                <rect x="43" y="28" width="8" height="8" className="fill-ember stroke-none" />
                <path d="M22 60 Q40 52 58 60 L54 92 L26 92 Z" strokeWidth="2" />
              </svg>
            </div>
          </div>
          <div className="md:hidden" />
        </div>

        <p className="md:hidden text-center text-[13px] text-smoke max-w-[280px] mx-auto mt-8 pb-2">
          Oversized streetwear for versions of you that don&apos;t belong to the default storyline.
        </p>
      </div>
    </section>
  );
}
