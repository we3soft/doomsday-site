import type { Metadata } from "next";
import { LiveChat, LivePlayer } from "./live-embeds";

export const metadata: Metadata = {
  title: "Live",
  description:
    "Watch the Avengers: Doomsday live broadcast and follow the live conversation.",
};

const VIDEO_ID = "f17J3AXVK5w";

export default function LivePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[-200px] h-[560px] w-[1000px] max-w-full -translate-x-1/2 rounded-full bg-emerald-500/[0.08] blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] [background-size:28px_28px] [mask-image:linear-gradient(to_bottom,black,transparent)]"
        />

        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6 sm:pb-12 sm:pt-14 lg:px-8 lg:pb-14 lg:pt-16">
          <h1 className="text-4xl font-bold tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl">
            Doomsday{" "}
            <span className="bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
               Live
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
            Watch the official live broadcast and follow the conversation
            with viewers in real time.
          </p>
        </div>
      </section>


      {/* Main live area */}
      <section className="relative overflow-hidden bg-background">
        {/* Emerald background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-emerald-500/[0.035] blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_380px]">
            {/* VIDEO */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-black/30">
              <LivePlayer videoId={VIDEO_ID} />
            </div>

            {/* LIVE CHAT */}
            <div className="flex h-[560px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#090a0d] shadow-2xl shadow-black/30 lg:h-auto">

              <div className="min-h-0 flex-1 bg-[#090a0d]">
                <LiveChat videoId={VIDEO_ID} />
              </div>
            </div>
          </div>

          {/* VIDEO INFORMATION */}
          <article className="mt-8 max-w-4xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-accent" />

              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                Broadcast
              </span>
            </div>

            <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Avengers: Doomsday
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/55 sm:text-base">
              Follow the latest Avengers: Doomsday broadcast, announcements,
              and live updates. The video above is embedded directly from
              YouTube, while the live chat lets viewers follow the
              conversation in real time.
            </p>
          </article>

          {/* Disclaimer */}
          <div className="mt-8 border-t border-white/5 pt-6">
            <p className="max-w-3xl text-xs leading-5 text-white/30">
              Video and chat content are provided through YouTube&apos;s embedded
              player and chat services. Availability depends on the original
              YouTube broadcast.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}