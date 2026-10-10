import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IMG, MOVIE_ID, tmdb } from "@/lib/tmdb";

type Person = {
  id: number;
  name: string;
  biography: string;
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
  known_for_department: string;
  profile_path: string | null;
  homepage: string | null;
  imdb_id: string | null;
  also_known_as: string[];
  external_ids: {
    instagram_id: string | null;
    twitter_id: string | null;
  };
  movie_credits: {
    cast: {
      id: number;
      title: string;
      character: string;
      poster_path: string | null;
      popularity: number;
      release_date: string;
    }[];
  };
};

type Credits = {
  cast: { id: number; character: string }[];
};

type Props = { params: Promise<{ id: string }> };

function getPerson(id: string) {
  return tmdb<Person>(
    `/person/${id}?append_to_response=movie_credits,external_ids`
  );
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const person = await getPerson(id);
  return { title: person ? `${person.name} | Cast` : "Cast" };
}

const formatDate = (d: string) =>
  new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(new Date(d));

function getAge(birthday: string, deathday: string | null) {
  const end = deathday ? new Date(deathday) : new Date();
  const b = new Date(birthday);
  let age = end.getFullYear() - b.getFullYear();
  const m = end.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && end.getDate() < b.getDate())) age--;
  return age;
}

export default async function CastMemberPage({ params }: Props) {
  const { id } = await params;
  if (!/^\d+$/.test(id)) notFound();

  const [person, credits] = await Promise.all([
    getPerson(id),
    tmdb<Credits>(`/movie/${MOVIE_ID}/credits`),
  ]);

  if (!person) notFound();

  const role = credits?.cast.find((c) => c.id === person.id)?.character;
  const allMovies = person.movie_credits?.cast ?? [];

  const knownFor = allMovies
    .filter((m) => m.poster_path)
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 6);

  const filmography = allMovies
    .filter((m) => m.release_date)
    .sort((a, b) => b.release_date.localeCompare(a.release_date))
    .slice(0, 8);

  const bornText = person.birthday
    ? person.deathday
      ? formatDate(person.birthday)
      : `${formatDate(person.birthday)} (${getAge(person.birthday, null)} years old)`
    : null;

  const facts = [
    { label: "Known for", value: person.known_for_department },
    { label: "Born", value: bornText },
    {
      label: "Died",
      value: person.deathday
        ? `${formatDate(person.deathday)}${
            person.birthday
              ? ` (aged ${getAge(person.birthday, person.deathday)})`
              : ""
          }`
        : null,
    },
    { label: "Birthplace", value: person.place_of_birth },
  ].filter((f) => f.value);

  const links = [
    person.imdb_id && {
      label: "IMDb",
      href: `https://www.imdb.com/name/${person.imdb_id}`,
    },
    person.external_ids?.instagram_id && {
      label: "Instagram",
      href: `https://instagram.com/${person.external_ids.instagram_id}`,
    },
    person.external_ids?.twitter_id && {
      label: "X",
      href: `https://x.com/${person.external_ids.twitter_id}`,
    },
    person.homepage && { label: "Website", href: person.homepage },
  ].filter(Boolean) as { label: string; href: string }[];

  const paragraphs = (person.biography ?? "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  const [firstPara, ...restParas] = paragraphs;

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* ───────── Hero ───────── */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[-200px] h-[560px] w-[1000px] max-w-full -translate-x-1/2 rounded-full bg-emerald-500/[0.08] blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] [background-size:28px_28px] [mask-image:linear-gradient(to_bottom,black,transparent)]"
        />

        <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-6 sm:px-6 sm:pb-14 sm:pt-8 lg:px-8">
          <Link
            href="/cast"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/70 transition hover:border-accent/40 hover:text-accent"
          >
            <span aria-hidden="true">←</span> All cast
          </Link>

          <div className="mt-8 flex flex-col items-center gap-8 text-center md:flex-row md:items-start md:gap-12 md:text-left">
            {/* Portrait */}
            <div className="relative aspect-[3/4] w-52 shrink-0 overflow-hidden rounded-2xl bg-[#101318] shadow-2xl shadow-black/40 ring-1 ring-white/15 sm:w-60 md:w-64">
              {person.profile_path ? (
                <Image
                  src={`${IMG}/h632${person.profile_path}`}
                  alt={person.name}
                  fill
                  priority
                  sizes="(min-width:768px) 256px, 240px"
                  className="object-cover object-top"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-white/[0.08] to-white/[0.02] text-6xl font-semibold text-white/25">
                  {person.name[0]}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              {role && (
                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 md:justify-start">
                  <span className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                    {role}
                  </span>
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-white/30" />
                  <span className="text-sm text-white/55">
                    Avengers: Doomsday
                  </span>
                </div>
              )}

              <h1 className="mt-3 text-4xl font-bold tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
                {person.name}
              </h1>

              {facts.length > 0 && (
                <dl className="mt-7 grid gap-x-8 gap-y-4 text-left sm:grid-cols-2">
                  {facts.map((f) => (
                    <div key={f.label} className="border-l-2 border-accent/50 pl-4">
                      <dt className="text-xs uppercase tracking-wider text-white/50">
                        {f.label}
                      </dt>
                      <dd className="mt-1 text-[15px] font-medium text-white">
                        {f.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              {links.length > 0 && (
                <div className="mt-7 flex flex-wrap justify-center gap-2 md:justify-start">
                  {links.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 text-sm font-medium text-white/80 transition hover:border-accent/50 hover:bg-accent/10 hover:text-accent"
                    >
                      {l.label} <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Content ───────── */}
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-14">
          {/* Main column */}
          <div className="min-w-0 space-y-12">
            {/* Biography */}
            <section>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Biography
              </h2>

              {firstPara ? (
                <div className="mt-4 max-w-3xl space-y-4 text-[15px] leading-7 text-white/75 sm:text-base sm:leading-8">
                  <p>{firstPara}</p>

                  {restParas.length > 0 && (
                    <details className="group">
                      <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded-full border border-accent/40 px-4 py-1.5 text-sm font-medium text-accent transition hover:bg-accent/10">
                        <span className="group-open:hidden">Read full biography</span>
                        <span className="hidden group-open:inline">Show less</span>
                      </summary>
                      <div className="mt-4 space-y-4">
                        {restParas.map((p, i) => (
                          <p key={i}>{p}</p>
                        ))}
                      </div>
                    </details>
                  )}
                </div>
              ) : (
                <p className="mt-4 text-sm text-white/60">
                  TMDB doesn&apos;t have a biography for this person yet.
                </p>
              )}

              {person.also_known_as?.length > 0 && (
                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <span className="text-xs uppercase tracking-wider text-white/50">
                    Also known as
                  </span>
                  {person.also_known_as.slice(0, 5).map((n) => (
                    <span
                      key={n}
                      className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/75"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              )}
            </section>

            {/* Known for */}
            {knownFor.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold tracking-tight text-white">
                  Known for
                </h2>

                <ul className="-mx-4 mt-5 flex snap-x gap-3 overflow-x-auto px-4 pb-3 sm:mx-0 sm:px-0 [scrollbar-width:thin]">
                  {knownFor.map((movie) => (
                    <li
                      key={movie.id}
                      className="w-36 shrink-0 snap-start sm:w-40"
                    >
                      <a
                        href={`https://www.themoviedb.org/movie/${movie.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-accent/50"
                      >
                        <div className="relative aspect-[2/3] w-full overflow-hidden">
                          <Image
                            src={`${IMG}/w342${movie.poster_path}`}
                            alt={movie.title}
                            fill
                            sizes="160px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="px-3 py-2.5">
                          <p className="truncate text-sm font-semibold text-white">
                            {movie.title}
                          </p>
                          <p className="mt-0.5 truncate text-xs text-white/55">
                            {movie.release_date?.slice(0, 4) || movie.character}
                          </p>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Sidebar: latest films */}
          {filmography.length > 0 && (
            <aside className="lg:sticky lg:top-8 lg:self-start">
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Latest films
              </h2>

              <ul className="mt-4 space-y-1">
                {filmography.map((m) => (
                  <li key={m.id}>
                    <a
                      href={`https://www.themoviedb.org/movie/${m.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-xl p-2 transition hover:bg-white/[0.06]"
                    >
                      <div className="relative h-16 w-11 shrink-0 overflow-hidden rounded-md bg-white/[0.06] ring-1 ring-white/10">
                        {m.poster_path && (
                          <Image
                            src={`${IMG}/w185${m.poster_path}`}
                            alt=""
                            fill
                            sizes="44px"
                            className="object-cover"
                          />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-white transition-colors group-hover:text-accent">
                          {m.title}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-white/60">
                          {m.release_date.slice(0, 4)}
                          {m.character ? ` · ${m.character}` : ""}
                        </p>
                      </div>

                      <span
                        aria-hidden="true"
                        className="text-white/30 transition group-hover:translate-x-0.5 group-hover:text-accent"
                      >
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>

        <p className="mt-14 text-xs leading-5 text-white/40">
          Cast data and images are provided by TMDB. This product uses the TMDB
          API but is not endorsed or certified by TMDB.
        </p>
      </div>
    </main>
  );
}