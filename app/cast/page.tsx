import Image from "next/image";
import Link from "next/link";
import { IMG, MOVIE_ID, tmdb } from "@/lib/tmdb";

type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
};

export const metadata = {
  title: "Cast | Avengers: Doomsday",
  description: "Meet the cast and characters of Avengers: Doomsday.",
};

export default async function CastPage() {
  const credits = await tmdb<{ cast: CastMember[] }>(
    `/movie/${MOVIE_ID}/credits`
  );

  const cast = (credits?.cast ?? [])
    .filter((p) => p.name && p.character)
    .sort((a, b) => a.order - b.order)
    .slice(0, 30);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* ───────── Hero ───────── */}
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
            Avengers:{" "}
            <span className="bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
              Doomsday
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
            Meet the actors and characters of the film. Select any cast member
            to explore their biography, filmography and more.
          </p>
        </div>
      </section>

      {/* ───────── Cast grid ───────── */}
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pt-12 lg:px-8 lg:pb-24">
        {cast.length === 0 ? (
          <div className="flex min-h-[300px] items-center justify-center rounded-3xl border border-white/10 bg-white/[0.03]">
            <p className="text-center text-sm text-white/60">
              No cast has been listed yet. Check back soon.
            </p>
          </div>
        ) : (
          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 xl:grid-cols-5">
            {cast.map((person, i) => (
              <li key={person.id}>
                <Link
                  href={`/cast/${person.id}`}
                  aria-label={`${person.name} as ${person.character}`}
                  className="group block rounded-2xl focus-visible:outline-none"
                >
                  {/* Portrait */}
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#101318] ring-1 ring-white/10 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-black/40 group-hover:ring-accent/60 group-focus-visible:ring-2 group-focus-visible:ring-accent">
                    {person.profile_path ? (
                      <Image
                        src={`${IMG}/h632${person.profile_path}`}
                        alt=""
                        fill
                        priority={i < 4}
                        sizes="(min-width:1280px) 230px, (min-width:1024px) 23vw, (min-width:640px) 30vw, 46vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-white/[0.08] to-white/[0.02]">
                        <span className="text-5xl font-semibold text-white/25">
                          {person.name[0]}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Text */}
                  <div className="mt-3 px-1">
                    <h2 className="truncate text-[15px] font-semibold text-white transition-colors group-hover:text-accent group-focus-visible:text-accent sm:text-base">
                      {person.name}
                    </h2>
                    <p className="mt-0.5 line-clamp-2 text-sm leading-5 text-white/60">
                      {person.character}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {/* ───────── Attribution ───────── */}
        <div className="mt-16 border-t border-white/10 pt-6">
          <p className="text-xs leading-5 text-white/45">
            Cast data and images are provided by TMDB. This product uses the
            TMDB API but is not endorsed or certified by TMDB.
          </p>
        </div>
      </div>
    </main>
  );
}