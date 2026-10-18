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
    id: "cavill-beyonder-figure",
    title: "Henry Cavill really just posted a Beyonder LEGO figure and expected Marvel fans to act normal.",
    description:
      "Henry Cavill’s recent Instagram post featuring a Beyonder LEGO figure has made some rumors that he could be joining the MCU in Avengers: Doomsday.",
    category: "THEORY",
    date: "October 2026",
    author: "S Min",
    readingTime: "2–3 Minutes Read",
    image: "/cavill.png",
    heroImage: "/cavill.png",
    content: {
      intro:
        "While previous rumors showcased Henry Cavill for a Wolverine variant, the Marvel rumor has taken that toward The Beyonder. Fans are already flooding the timeline with art imagining him as the cosmic architect of Secret Wars. There’s zero official confirmation yet, but watching the hype shift from a grounded mutant to a reality warping god proves just how desperate the fandom is to see Cavill land a heavyweight MCU role.",
      sections: [
        {
          paragraphs: [
            "In 1984, Marvel introduced the ultimate cosmic heavyweight as The Beyonder. This wasn't just another villain, he was an omnipotent being fascinated by humanity, dragging Marvel’s greatest heroes and villains to a planet called Battleworld just to test their morality. Wielding unimaginable, reality-shaping power. He could grant any wish. Doctor Doom had to pull off the ultimate heist and steal his energy and proving the Beyonder's raw magic was too massive for anyone to truly control."
          ],
          image: {
            url: "/beyonder.avif",
            
          },
        },
        {
          paragraphs: [
            "In 2015 Secret Wars dialed the stakes up to a cataclysmic level. The Beyonder was reimagined not as a single curious god, but as an entire race of indifferent, apocalyptic architects. These Beyonders didn't care about morality. They just wanted to wipe the slate clean and triggering the devastating Incursions that forced parallel universes to violently collide. It took the total collapse of the multiverse and Doctor Doom stealing their god-tier power once again to forge a brand new Battleworld from the ashes."
          ],
        }
      ],
    },
  },
  {
    id: "thor-odinfore",
    title: "With the multiverse collapsing in Avengers: Doomsday, the Odinforce might be the only thing keeping Thor in the heavyweight bracket.",
    description:
      "Between the new promo art and that intense prayer, the fan theories are locked in, Thor is inheriting the Odinforce in Doomsday, and the MCU is not ready for his final form.",
    category: "THEORY",
    date: "October 2026",
    author: "S Min",
    readingTime: "2–3 Minutes Read",
    image: "/Thor-Gold-Armor-1.avif",
    heroImage: "/Thor-Gold-Armor-1.avif",
    content: {
      intro:
        "Everyone is rewinding this specific scene in the Doomsday teaser. Thor is completely broken.  Kneeling in a forest with Stormbreaker, praying to Odin for the strength to fight one last time. But look closely at the official promo art the lightning around his axe isn’t blue anymore. It’s yellow. And this one detail just proved the wildest Thor theory in MCU history.",
      sections: [
        {
          paragraphs: [
            "Marvel hasn't explicitly confirmed the Odinforce, but they know exactly what they’re doing by pairing a prayer to the All-Fathers with a deliberate swap from Thor's classic blue lightning to orange in the official Doomsday concept art. Because the MCU doesn't do random redesigns, fans and media outlets have taken these two tiny details and theorise them into a viral theory predicting a massive power upgrade. The whole hype is literally built on just a color change and a prayer but honestly it's pretty damn convincing isnt it."
          ],
          image: {
            url: "/Thor-2.avif",
            
          },
        },
        {
          paragraphs: [
            "The Odinforce isn’t just lightning it’s godhood. In Marvel comics, this near-limitless energy is what allowed Odin to bend reality in ways normal asgardians couldn't comprehend. When Thor finally ascends to the throne as the rightful ruler of Asgard, he claims that power for himself, Thorforce King Thor isn't just an Avenger anymore. He is widely considered the absolute peak of the Odinson's power. And believe it or not, the power scaling goes even higher.",
            "To reach his absolute peak in the comics, Thor had to sacrifice both of his eyes at the Well of Mimir. Gaining omniscience and becoming Rune King Thor who finally broke the cycle of Ragnarok and surpassed Odin precisely because of the years he spent living as a mortal man. However, wielding the limitless energy of the All-Power comes with a massive vulnerability. The Odinsleep, a deep, defenseless slumber required to recharge the user's magic. Dropping that specific lore into Avengers: Doomsday introduces a massive tactical dilemma, positioning the Thorforce as a desperate, all-or-nothing nuclear option that could give Thor the raw power to defeat Doctor Doom but force him into a vulnerable coma at the worst possible time."
          ],
        }
      ],
    },
  },
  {
    id: "encore-anthony-doomsday",
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
