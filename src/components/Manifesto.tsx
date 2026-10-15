import Image from "next/image";
import { MANIFESTO_IMAGES } from "@/lib/data";

function Scribble({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 80" className={className} fill="none" aria-hidden>
      <ellipse cx="100" cy="40" rx="94" ry="30" stroke="#E85A38" strokeWidth="3" />
    </svg>
  );
}

export default function Manifesto() {
  return (
    <section className="bg-ink">
      {/* Statement over collage */}
      <div className="relative overflow-hidden">
        <div className="grid grid-cols-3 opacity-60">
          {MANIFESTO_IMAGES.map((src, i) => (
            <div key={src} className={`relative h-[300px] md:h-[440px] ${i === 1 ? "-rotate-2 scale-105 z-10" : ""}`}>
              <Image src={src} alt="" fill className="object-cover img-duotone" sizes="33vw" />
              <div className="absolute inset-0 bg-ink/55" />
            </div>
          ))}
        </div>
        <h2 className="absolute inset-0 flex flex-col items-center justify-center text-center font-display leading-[0.95] text-bone text-[clamp(2.2rem,7vw,5.5rem)] px-6">
          <span>
            BUILT TO{" "}
            <span className="circle-scribble">
              CHANGE
              <Scribble className="absolute" />
            </span>
          </span>
          <span>MOODS, AND WORLDS</span>
          <span>WITHOUT LOSING ITS SHAPE.</span>
        </h2>
      </div>

      {/* Marquee */}
      <div className="bg-ember overflow-hidden py-3.5 border-y border-black/20">
        <div className="flex whitespace-nowrap animate-marquee w-max">
          {[0, 1].map((half) => (
            <div key={half} className="flex items-center" aria-hidden={half === 1}>
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={i} className="font-display text-2xl md:text-4xl text-bone mx-5 flex items-center gap-10">
                  WEAR YOUR VERSION <span>→</span> NO DEFAULT <span>→</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
