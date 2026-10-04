"use client";

import { useEffect, useState } from "react";

export function LivePlayer({ videoId }: { videoId: string }) {
  const [muted, setMuted] = useState(true);

  const params = new URLSearchParams({
    autoplay: "1",
    mute: muted ? "1" : "0",
    controls: "1",
    disablekb: "1",
    fs: "0",
    rel: "0",
    playsinline: "1",
    modestbranding: "1",
    iv_load_policy: "3",
  });

  return (
    <div className="relative aspect-video w-full">
      <iframe
        key={muted ? "muted" : "sound"} // reload so the new mute setting applies
        className="h-full w-full"
        src={`https://www.youtube.com/embed/${videoId}?${params.toString()}`}
        title="Avengers: Doomsday Live"
        allow="autoplay; encrypted-media; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
export function LiveChat({ videoId }: { videoId: string }) {
  const [domain, setDomain] = useState<string | null>(null);

  useEffect(() => {
    setDomain(window.location.hostname);
  }, []);

  const popoutUrl = `https://www.youtube.com/live_chat?is_popout=1&v=${videoId}`;

  return (
    <div className="flex h-full w-full flex-col">
      <div className="min-h-0 flex-1">
        {domain ? (
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/live_chat?v=${videoId}&embed_domain=${domain}&dark_theme=1`}
            title="YouTube Live Chat"
          />
        ) : (
          <div className="h-full w-full animate-pulse bg-white/[0.02]" />
        )}
      </div>

      <div className="border-t border-white/10 px-4 py-3">
        <a
          href={popoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-white/50 transition hover:text-accent"
        >
          Chat not showing? Open it in a pop-up window
        </a>
      </div>
    </div>
  );
}