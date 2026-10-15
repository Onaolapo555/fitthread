import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ink text-bone flex flex-col items-center justify-center gap-4 p-6 text-center">
      <p className="font-display text-6xl">NO DEFAULT HERE</p>
      <p className="font-signal text-sm text-smoke">This route doesn&apos;t exist — 404.</p>
      <Link
        href="/"
        className="mt-4 bg-lime text-black font-signal font-bold text-sm px-8 py-3.5 hover:bg-bone transition"
      >
        BACK TO STORE
      </Link>
    </div>
  );
}
