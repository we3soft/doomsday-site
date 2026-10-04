import "server-only";

export const MOVIE_ID = 1003596; // Avengers: Doomsday
export const IMG = "https://image.tmdb.org/t/p";

export async function tmdb<T>(path: string): Promise<T | null> {
  const res = await fetch(`https://api.themoviedb.org/3${path}`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      accept: "application/json",
    },
    next: { revalidate: 3600 },
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`TMDB responded ${res.status} for ${path}`);
  return res.json() as Promise<T>;
}