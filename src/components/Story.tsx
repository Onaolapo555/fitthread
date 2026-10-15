import Image from "next/image";
import { WORKSHOP_IMAGES } from "@/lib/data";

export default function Story() {
  return (
    <section id="story" className="relative bg-ink overflow-hidden scroll-mt-16">
      {/* watermark */}
      <div
        aria-hidden
        className="absolute -right-24 top-10 w-[560px] h-[560px] rounded-full opacity-[0.07] pointer-events-none"
        style={{ border: "90px solid #EDEAE3" }}
      />
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 pt-16 md:pt-24 pb-10">
        <h2 className="font-display leading-[0.92] text-bone text-[clamp(2.6rem,8vw,6.5rem)] max-w-[900px]">
          WE WERE{" "}
          <span className="circle-scribble">
            NEVER
            <svg viewBox="0 0 200 80" className="absolute" fill="none" aria-hidden>
              <ellipse cx="100" cy="40" rx="94" ry="28" stroke="#E85A38" strokeWidth="2.5" />
            </svg>
          </span>{" "}
          PART
          <br />
          OF THE DEFAULT
          <br />
          STORY.
        </h2>

        <div className="grid md:grid-cols-12 gap-8 mt-8">
          <p className="md:col-span-4 text-[13.5px] leading-relaxed text-bone/70">
            FitThread started with a simple frustration: character-driven clothing felt like
            merchandise, while fashion often left no room for the person wearing it. We wanted
            something in between — oversized streetwear designed as a tool for self-expression.
          </p>
          <p className="md:col-span-3 md:col-start-6 text-[13.5px] leading-relaxed text-bone/40">
            Experiments with original artwork, cultural references, personal phrases and
            unconventional placements became the foundation of our first pieces.
          </p>
        </div>

        {/* workshop strip */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-[3px] mt-10">
          {WORKSHOP_IMAGES.map((src, i) => (
            <div
              key={src}
              className={`relative overflow-hidden bg-coal ${i === 2 ? "col-span-2 md:col-span-1 aspect-[4/5] md:aspect-[3/4]" : "aspect-[3/4]"} ${i === 3 ? "md:-mt-10" : ""}`}
            >
              <Image
                src={src}
                alt="FitThread workshop"
                fill
                className="object-cover img-duotone"
                sizes="(max-width: 768px) 50vw, 20vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
