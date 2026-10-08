import Link from "next/link";
import { MOVIE_ID, tmdb } from "@/lib/tmdb";

type Video = {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
  published_at: string;
};

type Movie = {
  title: string;
  release_date: string;
  genres: { id: number; name: string }[];
};

type Props = {
  searchParams: Promise<{ v?: string; all?: string; play?: string }>;
};

export const metadata = {
  title: "Trailers | Avengers: Doomsday",
  description:
    "Watch every official trailer, teaser and clip from Avengers: Doomsday.",
};

const TYPE_ORDER: Record<string, number> = { Trailer: 0, Teaser: 1, Clip: 2 };
const SIDEBAR_COUNT = 4;

const formatDate = (d: string) =>
  new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(d));

function href(opts: {
  v?: string;
  all?: boolean;
  play?: boolean;
  hash: string;
}) {
  const p = new URLSearchParams();
  if (opts.v) p.set("v", opts.v);
  if (opts.all) p.set("all", "1");
  if (opts.play) p.set("play", "1");
  const qs = p.toString();
  return `/trailers${qs ? `?${qs}` : ""}#${opts.hash}`;
}

export default async function TrailersPage({ searchParams }: Props) {
  const { v, all, play } = await searchParams;
  const showAll = all === "1";
  // Autoplay only when the visitor picked a video, never on first load
  const autoplay = play === "1";

  const [res, movie] = await Promise.all([
    tmdb<{ results: Video[] }>(`/movie/${MOVIE_ID}/videos`),
    tmdb<Movie>(`/movie/${MOVIE_ID}`),
  ]);

  const movieTitle = movie?.title || "Avengers: Doomsday";
  const year = movie?.release_date?.slice(0, 4);
  const genres = movie?.genres
    ?.slice(0, 3)
    .map((g) => g.name)
    .join(", ");

  const videos = (res?.results ?? [])
    .filter((x) => x.site === "YouTube")
    .sort((a, b) => {
      const o = (TYPE_ORDER[a.type] ?? 3) - (TYPE_ORDER[b.type] ?? 3);
      if (o !== 0) return o;
      if (a.official !== b.official) return a.official ? -1 : 1;
      return b.published_at.localeCompare(a.published_at);
    });

  const featured = videos.find((x) => x.key === v) ?? videos[0];
  const others = videos.filter((x) => x.key !== featured?.key);
  const upNext = others.slice(0, SIDEBAR_COUNT);
  const hasMore = others.length > SIDEBAR_COUNT;

  const meta = featured
    ? [
        featured.type,
        featured.official ? "Official" : null,
        featured.published_at ? formatDate(featured.published_at) : null,
      ]
        .filter(Boolean)
        .join("  ·  ")
    : "";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 sm:pt-12 lg:px-8 lg:pb-28">
        {/* ───────── Topic ───────── */}
        <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="min-w-0">
              <h1 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                {movieTitle}
                {year && (
                  <span className="ml-2 font-normal text-white/55">
                    ({year})
                  </span>
                )}
              </h1>
              <p className="mt-2 text-sm text-white/60 sm:text-lg">
                Trailers &amp; Videos
                {genres ? `  ·  ${genres}` : ""}
              </p>
            </div>
          </div>
        </header>

        {!featured ? (
          <div className="mt-10 flex min-h-[320px] items-center justify-center rounded-3xl bg-white/[0.03]">
            <p className="text-center text-base text-white/60">
              No videos here yet. Check back soon.
            </p>
          </div>
        ) : (
          <>
            <div className="mt-8 grid gap-10 sm:mt-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-12">
              {/* ───────── Main player ───────── */}
              <section id="player" className="min-w-0 scroll-mt-6">
                <div className="aspect-video overflow-hidden rounded-3xl bg-black shadow-[0_40px_120px_-40px_rgba(52,211,153,0.35)] ring-1 ring-white/15">
                  <iframe
                    key={featured.key}
                    src={`https://www.youtube-nocookie.com/embed/${featured.key}?rel=0&modestbranding=1${
                      autoplay ? "&autoplay=1" : ""
                    }`}
                    title={featured.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>

                <div className="mt-7">
                  <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                    {featured.name}
                  </h2>
                  <p className="mt-3 text-base text-white/55">{meta}</p>
                </div>
              </section>

              {upNext.length > 0 && (
                <aside id="up-next" className="">
                  <ul className=" space-y-2">
                    {upNext.map((video) => (
                      <li key={video.id}>
                        <Link
                          href={href({
                            v: video.key,
                            all: showAll,
                            play: true,
                            hash: "player",
                          })}
                          className="group flex gap-4 rounded-2xl p-2 transition hover:bg-white/[0.06] focus-visible:bg-white/[0.06] focus-visible:outline-none"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`https://i.ytimg.com/vi/${video.key}/mqdefault.jpg`}
                            alt=""
                            loading="lazy"
                            className="aspect-video w-36 shrink-0 rounded-xl bg-[#0b0d11] object-cover ring-1 ring-white/10 transition duration-300 group-hover:ring-white/35 sm:w-44 lg:w-36"
                          />

                          <div className="min-w-0 flex-1 py-0.5">
                            <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug text-white transition-colors group-hover:text-emerald-400">
                              {video.name}
                            </h3>
                            <p className="mt-1.5 text-xs text-white/55">
                              {video.type}
                              {video.published_at
                                ? `  ·  ${formatDate(video.published_at)}`
                                : ""}
                            </p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>

                  {hasMore && (
                    <Link
                      href={
                        showAll
                          ? href({ v: featured.key, hash: "up-next" })
                          : href({ v: featured.key, all: true, hash: "more" })
                      }
                      scroll
                      className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-white/[0.08] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/[0.15]"
                    >
                      {showAll ? "Show less" : "More videos"}
                      <span aria-hidden="true">{showAll ? "↑" : "↓"}</span>
                    </Link>
                  )}
                </aside>
              )}
            </div>

            {/* ───────── All videos (opens with the More button) ───────── */}
            {showAll && hasMore && (
              <section id="more" className="mt-20 scroll-mt-6 sm:mt-24">
                <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  All videos
                </h2>

                <ul className="mt-8 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                  {videos.map((video) => {
                    const isPlaying = video.key === featured.key;
                    return (
                      <li key={video.id}>
                        <Link
                          href={href({
                            v: video.key,
                            all: true,
                            play: true,
                            hash: "player",
                          })}
                          aria-current={isPlaying ? "true" : undefined}
                          className="group block focus-visible:outline-none"
                        >
                          <div
                            className={`aspect-video overflow-hidden rounded-3xl bg-[#0b0d11] ring-1 transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-2xl group-hover:shadow-black group-focus-visible:ring-2 group-focus-visible:ring-white ${
                              isPlaying
                                ? "ring-2 ring-emerald-400"
                                : "ring-white/10 group-hover:ring-white/35"
                            }`}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={`https://i.ytimg.com/vi/${video.key}/hqdefault.jpg`}
                              alt=""
                              loading="lazy"
                              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                          </div>

                          <div className="mt-4 px-1">
                            <p
                              className={`text-xs font-medium uppercase tracking-[0.18em] ${
                                isPlaying ? "text-emerald-400" : "text-white/50"
                              }`}
                            >
                              {isPlaying ? "Now playing" : video.type}
                              {video.published_at
                                ? `  ·  ${formatDate(video.published_at)}`
                                : ""}
                            </p>
                            <h3 className="mt-2 line-clamp-2 text-lg font-semibold leading-snug text-white transition-colors group-hover:text-emerald-400 sm:text-xl">
                              {video.name}
                            </h3>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}
          </>
        )}
      </div>
    </main>
  );
}