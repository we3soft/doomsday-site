export type NewsCategory = "NEWS" | "LEAK" | "THEORY";

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  category: NewsCategory;
  date: string;
  author: string;
  readingTime: string;
  image: string;
  heroImage?: string;
  content: {
    intro: string;
    sections: {
      heading?: string;
      paragraphs: string[];
      image?: {
        url: string;
        caption?: string;
      };
      quote?: string;
    }[];
  };
  disclaimer?: string;
}

export const sampleArticles: NewsArticle[] = [
  {
    id: "emergency-scenarios-and-abort-options",
    title: "Anthony Russo Teases How Avengers Endgame: Encore Leads Into Avengers: Doomsday",
    description:
      "The Russo brothers’ latest Marvel project gets a behind-the-scenes look from director Anthony Russo.",
    category: "NEWS",
    date: "October 2026",
    author: "S Min",
    readingTime: "2–3 Minutes Read",
    image: "/ChrisEvans.avif",
    heroImage: "/ChrisEvans.avif",
    content: {
      intro:
        "Seven years, after Marvel Studios’ Avengers: Endgame released into theaters and brought the Infinity Saga to a dramatic close, the blockbuster is heading back to its big screen. This special re-release will give marvel fans another chance to experience the epic finale along with an exclusive preview of the upcoming Avengers: Doomsday, which is set to hit theaters on December 18.",
      sections: [
        {
          paragraphs: [
            "Anthony Russo's decision to come back to the project goes beyond getting a chance to work with one of the biggest Marvel movies ever again. This project allows him to recall some of the reactions of the audience which made his first time working on the movie one of the most memorable of his career.",
            "When speaking about the project in marvel conference, Russo said that watching audience react to such scenes as Steve Rogers using Mjolnir or Captain Marvel joining the fight convinced him about the film's uniqueness.",
          ],
          image: {
            url: "/tony.jpg",
            
          },
        },
        {
          paragraphs: [
            "Downey's casting adds another layer of significance to the next Avengers film. After years of playing Tony Stark, one of the MCU's defining heroes, he will now portray one of Marvel's most formidable villains.",
            "For Anthony Russo, the connection to Downey goes back to the emotional conclusion of Endgame. The director recalled filming Tony Stark's final scene, in which the character sacrifices himself to save the universe.",
          ],
        },
        {
          paragraphs: [
            "That history is part of what the filmmakers hope to carry into Doomsday. Russo says audiences already have a deep emotional connection to the MCU's characters, and the creative team wants to respect that investment while taking the story in a new direction.",
          ],
        },
      ],
    },
  },
  
];

export function getAllArticles(): NewsArticle[] {
  return sampleArticles;
}

export function getArticlesByCategory(category: string): NewsArticle[] {
  if (category === "ALL") return sampleArticles;
  return sampleArticles.filter((article) => article.category === category);
}

export function getArticleById(id: string): NewsArticle | undefined {
  return sampleArticles.find((article) => article.id === id);
}
