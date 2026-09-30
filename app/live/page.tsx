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
      {/* Page heading */}
      <section className="border-b border-white/5 bg-[#050608]">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
              </span>

              <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                Live Now
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Avengers: Doomsday Live
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
              Watch the official live broadcast and follow the conversation
              with viewers in real time.
            </p>
          </div>
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
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
                <div>
                  <h2 className="text-sm font-semibold text-white">
                    Live Chat
                  </h2>

                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white/35">
                    Real-time conversation
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>

                  <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
                    Live
                  </span>
                </div>
              </div>

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