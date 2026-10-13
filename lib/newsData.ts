export type NewsCategory = "NEWS" | "ANALYSIS" | "GUIDE" | "THEORY" | "LEAK";

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  category: NewsCategory;
  date: string;
  /** ISO date (YYYY-MM-DD). Used for sorting, structured data and the sitemap. */
  publishedAt: string;
  /** ISO date (YYYY-MM-DD). Update this whenever you meaningfully edit the article. */
  updatedAt: string;
  author: string;
  readingTime: string;
  image: string;
  heroImage?: string;
  tags?: string[];
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

// Replace with your own original artwork per article (see notes). Until then every
// new article falls back to the site hero image so nothing is broken.
const FALLBACK_IMAGE = "/doomsday-hero (1).avif";

const THEORY_DISCLAIMER =
  "This article is fan speculation built from the comics and publicly available information. Marvel Studios has not confirmed the story details discussed here, so treat everything below as a theory.";

const TEAM = "Doomsday Editorial Team";

export const sampleArticles: NewsArticle[] = [
  {
    id: "emergency-scenarios-and-abort-options",
    title: "Anthony Russo Teases How Avengers Endgame: Encore Leads Into Avengers: Doomsday",
    description:
      "The Russo brothers’ latest Marvel project gets a behind-the-scenes look from director Anthony Russo.",
    category: "NEWS",
    date: "October 2026",
    publishedAt: "2026-10-12",
    updatedAt: "2026-10-12",
    author: "S Min",
    readingTime: "2–3 Minutes Read",
    image: "/ChrisEvans.avif",
    heroImage: "/ChrisEvans.avif",
    tags: ["Anthony Russo", "Avengers: Endgame", "Avengers: Doomsday"],
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

  {
    id: "avengers-doomsday-release-date-guide",
    title: "Avengers: Doomsday Release Date: Everything We Know About December 18, 2026",
    description:
      "A clear guide to the Avengers: Doomsday release date, why the December 2026 slot matters for Marvel, and how to follow the countdown.",
    category: "NEWS",
    date: "October 14, 2026",
    publishedAt: "2026-10-14",
    updatedAt: "2026-10-14",
    author: TEAM,
    readingTime: "4 Minutes Read",
    image: FALLBACK_IMAGE,
    tags: ["Release date", "Countdown", "Marvel Studios"],
    content: {
      intro:
        "Avengers: Doomsday is scheduled to reach theaters on December 18, 2026, placing Marvel Studios' next Avengers team-up in the holiday window that has delivered some of cinema's biggest openings.",
      sections: [
        {
          heading: "The confirmed release date",
          paragraphs: [
            "Marvel Studios has set December 18, 2026 as the theatrical release date, and that is the date our countdown uses. The film was originally planned for an earlier 2026 slot before Marvel moved it, a reshuffle that also pushed the follow-up, Avengers: Secret Wars, to December 2027.",
            "Release dates for tentpole films can still change, so we will update this article if Marvel announces a shift. Opening days can also differ slightly by country because local distributors choose their own schedules, so check your cinema listings closer to launch.",
          ],
        },
        {
          heading: "Why a December release matters",
          paragraphs: [
            "Holiday releases have a long history of giving big films extra weeks of strong attendance, because schools are out and families look for event movies. Avengers: Endgame opened in April 2019 and still became one of the highest-grossing films ever, so Marvel does not depend on one season, but December gives Doomsday a long runway.",
            "The date also places the film at the end of the year, where it will shape the cinema conversation going into 2027 and sit only twelve months before the planned Secret Wars release.",
          ],
        },
        {
          heading: "How to follow the countdown",
          paragraphs: [
            "The Doomsday clock on our home page counts down to December 18, 2026 in your own browser time zone and refreshes every second, so it always matches your local clock.",
            "For official announcements, bookmark our News and Trailers pages. We label confirmed information, reports and fan theories separately so you can always tell which is which.",
          ],
        },
      ],
    },
  },

  {
    id: "robert-downey-jr-doctor-doom-casting-explained",
    title: "Robert Downey Jr. as Doctor Doom: Why Marvel's Boldest Casting Could Work",
    description:
      "Robert Downey Jr. closed the Tony Stark chapter in Endgame. Here is why returning as Victor von Doom is a risky and potentially brilliant choice.",
    category: "ANALYSIS",
    date: "October 14, 2026",
    publishedAt: "2026-10-14",
    updatedAt: "2026-10-14",
    author: TEAM,
    readingTime: "4 Minutes Read",
    image: FALLBACK_IMAGE,
    tags: ["Robert Downey Jr.", "Doctor Doom", "Casting"],
    content: {
      intro:
        "When Marvel Studios announced at San Diego Comic-Con in July 2024 that Robert Downey Jr. would play Doctor Doom, the reaction was immediate. The actor who anchored the MCU's first era would now take on one of Marvel's most iconic villains.",
      sections: [
        {
          heading: "A dark mirror of Tony Stark",
          paragraphs: [
            "Doom and Tony Stark share more than fans might expect. Both are inventors who trust their own intellect over everyone else's, and both believe they can fix the world if people simply let them. The difference is where each story lands: Tony's arc ended in sacrifice, while Doom's pride never lets him accept limits.",
            "That contrast gives the casting real thematic weight. Instead of a hero returning, audiences get the same kind of genius shown at the opposite end of the moral scale.",
          ],
        },
        {
          heading: "Why it is a risk",
          paragraphs: [
            "Downey is inseparable from Iron Man in the minds of millions of viewers. Marvel has to convince the audience that Doom is a new character and not Tony in different armor, which depends on performance, voice and design rather than on star power alone.",
            "In the comics, Doom speaks formally, often refers to himself in the third person, and treats everyone as a subject. A performance that leans into that imperial coldness would separate him quickly from the quick-witted Stark.",
          ],
        },
        {
          heading: "What to watch for",
          paragraphs: [
            "Pay attention to how the marketing presents Doom: whether the mask stays on, how Latveria is introduced, and how much of his scientific side appears alongside the sorcery he is known for in the comics.",
            "Those choices will show whether Marvel wants Doom to feel like a political ruler, a tragic figure, or a conqueror, and they will shape how the film is received.",
          ],
        },
      ],
    },
  },

  {
    id: "avengers-doomsday-cast-who-is-in-the-film",
    title: "Avengers: Doomsday Cast Guide: Who Is in the Film?",
    description:
      "A guide to the announced Avengers: Doomsday cast, from returning Avengers and the Fantastic Four to the X-Men veterans joining the MCU.",
    category: "NEWS",
    date: "October 14, 2026",
    publishedAt: "2026-10-14",
    updatedAt: "2026-10-14",
    author: TEAM,
    readingTime: "4 Minutes Read",
    image: FALLBACK_IMAGE,
    tags: ["Cast", "Fantastic Four", "X-Men"],
    content: {
      intro:
        "Marvel Studios revealed the first Avengers: Doomsday cast list in March 2025 through a long livestream, and it was one of the largest ensembles ever assembled for a superhero film. Our Cast page pulls the current list directly from TMDB, so use it for the latest names.",
      sections: [
        {
          heading: "Avengers and MCU regulars",
          paragraphs: [
            "The announced lineup brings back Chris Hemsworth as Thor, Anthony Mackie as Captain America, Sebastian Stan as Bucky Barnes, Paul Rudd as Ant-Man, Letitia Wright as Shuri and Simu Liu as Shang-Chi.",
            "It also includes much of the Thunderbolts group, among them Florence Pugh, David Harbour, Hannah John-Kamen, Wyatt Russell and Lewis Pullman, which hints at how much of the story will revolve around the newer team.",
          ],
        },
        {
          heading: "The Fantastic Four",
          paragraphs: [
            "Pedro Pascal, Vanessa Kirby, Joseph Quinn and Ebon Moss-Bachrach lead the Fantastic Four cast after starring in Fantastic Four: First Steps in 2025. Their presence matters because Doctor Doom is the team's best-known enemy in the comics.",
          ],
        },
        {
          heading: "The X-Men veterans",
          paragraphs: [
            "Patrick Stewart, Ian McKellen, Kelsey Grammer, Alan Cumming, James Marsden and Rebecca Romijn are listed, all known for earlier X-Men films. Marvel has not explained their characters' place in the MCU yet, so their exact roles remain open.",
            "Opposite them is Robert Downey Jr. as Doctor Doom, the antagonist at the center of the marketing.",
          ],
        },
      ],
    },
  },

  {
    id: "who-is-doctor-doom-marvel-comics-origin",
    title: "Who Is Doctor Doom? The Comics Origin of the Villain Behind Doomsday",
    description:
      "From Fantastic Four #5 to Latveria's throne, here is the comics history of Victor von Doom and why he is Marvel's ultimate villain.",
    category: "ANALYSIS",
    date: "October 14, 2026",
    publishedAt: "2026-10-14",
    updatedAt: "2026-10-14",
    author: TEAM,
    readingTime: "5 Minutes Read",
    image: FALLBACK_IMAGE,
    tags: ["Doctor Doom", "Marvel Comics", "Latveria"],
    content: {
      intro:
        "Doctor Doom was created by Stan Lee and Jack Kirby and first appeared in Fantastic Four #5 in 1962. More than sixty years later he is still considered one of the great villains in comics, which is why Marvel Studios built a film around him.",
      sections: [
        {
          heading: "Victor von Doom's origin",
          paragraphs: [
            "Victor von Doom grows up in the fictional Eastern European country of Latveria and becomes a gifted scientist. At university he clashes with Reed Richards, the future leader of the Fantastic Four, and an experiment of his own goes wrong and leaves him scarred.",
            "He responds by forging a suit of armor and a mask, then returns to Latveria and takes power. The mask is central to the character, because it presents him as a ruler who refuses to be seen as weak.",
          ],
        },
        {
          heading: "Science and sorcery",
          paragraphs: [
            "Doom is unusual because he is both a technological genius and a capable sorcerer. His armor, robots and inventions rival anything Reed Richards builds, while his study of magic gives him powers that most scientists in Marvel stories cannot match.",
          ],
        },
        {
          heading: "Why he works as a villain",
          paragraphs: [
            "The best Doom stories treat him as someone who believes he is right. He wants to improve the world under his own rule, and he is convinced that anyone else would fail. That makes him a more complicated opponent than a villain who simply wants destruction.",
            "In the 2015 comic event Secret Wars he even rules a rebuilt world as God Emperor Doom, which fans often point to when discussing where the MCU may be headed.",
          ],
        },
      ],
    },
  },

  {
    id: "doomsday-incursions-multiverse-theory",
    title: "Theory: Is Doctor Doom Marvel's Answer to the Incursion Crisis?",
    description:
      "In the comics, colliding universes called incursions drive the story toward Secret Wars. Here is how Doom could fit into that idea on screen.",
    category: "THEORY",
    date: "October 14, 2026",
    publishedAt: "2026-10-14",
    updatedAt: "2026-10-14",
    author: TEAM,
    readingTime: "4 Minutes Read",
    image: FALLBACK_IMAGE,
    tags: ["Theory", "Multiverse", "Incursions"],
    disclaimer: THEORY_DISCLAIMER,
    content: {
      intro:
        "Many fans believe Avengers: Doomsday will lean on the idea of incursions, a plot device from Jonathan Hickman's Avengers and New Avengers comics of the early 2010s. Here is the theory, the reasoning behind it, and the counter-arguments.",
      sections: [
        {
          heading: "What incursions are",
          paragraphs: [
            "In the comics, an incursion happens when two parallel Earths collide. If neither is destroyed, both universes are lost, so heroes face the horrifying choice of destroying a world to save their own.",
            "That premise gave Marvel a high-stakes engine that pushed the heroes toward Secret Wars, and it is the main reason theorists connect the idea to a film that ends the Multiverse Saga.",
          ],
        },
        {
          heading: "Where Doom could fit",
          paragraphs: [
            "The theory suggests Doom may see himself as the only person with the intellect and will to stop the collapse. A villain who believes he is saving everything is far more compelling than one who only wants conquest, and it matches how the comics write him.",
            "Some fans also expect the story to put the heroes in the same moral bind as the comics, forcing them to ask how far they would go to protect their own reality.",
          ],
        },
        {
          heading: "The counter-arguments",
          paragraphs: [
            "Marvel Studios often reshapes comic plots for the screen, so a direct adaptation is far from guaranteed. The studio could also reserve the biggest multiverse concepts for Secret Wars in 2027 and keep Doomsday more focused on introducing its villain.",
            "Until the film arrives, treat incursions as an informed guess rather than a promise.",
          ],
        },
      ],
    },
  },

  {
    id: "russo-brothers-return-avengers-doomsday",
    title: "Why the Russo Brothers' Return Matters for Avengers: Doomsday",
    description:
      "Anthony and Joe Russo directed Winter Soldier, Civil War, Infinity War and Endgame. Here is what their track record says about Doomsday.",
    category: "ANALYSIS",
    date: "October 14, 2026",
    publishedAt: "2026-10-14",
    updatedAt: "2026-10-14",
    author: TEAM,
    readingTime: "4 Minutes Read",
    image: FALLBACK_IMAGE,
    tags: ["Russo Brothers", "Directors", "Avengers: Endgame"],
    content: {
      intro:
        "Marvel Studios brought Anthony and Joe Russo back to direct Avengers: Doomsday, and for many fans that single decision explains most of the excitement around the film.",
      sections: [
        {
          heading: "A proven track record",
          paragraphs: [
            "The Russos directed Captain America: The Winter Soldier in 2014 and Captain America: Civil War in 2016, then Avengers: Infinity War and Avengers: Endgame in 2018 and 2019. Endgame earned close to 2.8 billion dollars worldwide, a record at the time.",
            "Just as important, they showed they could juggle dozens of characters while keeping the emotional focus on a few, which is the main challenge of any crossover film.",
          ],
        },
        {
          heading: "The balancing act",
          paragraphs: [
            "Doomsday's cast is arguably larger than Endgame's, with Avengers, Fantastic Four members and X-Men veterans all in the announced list. The directors will need to give each group a purpose without turning the film into a roll call.",
            "Their earlier films handled this by giving each character a small, clear goal inside a larger plot, and the same discipline will matter here.",
          ],
        },
        {
          heading: "What is different this time",
          paragraphs: [
            "Infinity War had one central villain with a clear goal and a decade of buildup. Doomsday has a new antagonist, a multiverse setting and a different set of heroes, so the directors have to establish the stakes quickly.",
            "That is why this film may feel less like a repeat of Endgame and more like the opening chapter of a new two-part story.",
          ],
        },
      ],
    },
  },

  {
    id: "fantastic-four-first-steps-to-avengers-doomsday",
    title: "From Fantastic Four: First Steps to Doomsday: How the Setup Works",
    description:
      "Fantastic Four: First Steps teased Doctor Doom and introduced the team Marvel is bringing to Avengers: Doomsday. Here is how the pieces connect.",
    category: "ANALYSIS",
    date: "October 14, 2026",
    publishedAt: "2026-10-14",
    updatedAt: "2026-10-14",
    author: TEAM,
    readingTime: "4 Minutes Read",
    image: FALLBACK_IMAGE,
    tags: ["Fantastic Four", "Doctor Doom", "Setup"],
    content: {
      intro:
        "Fantastic Four: First Steps arrived in July 2025 and introduced Marvel's First Family to the MCU. Its place in the lead-up to Avengers: Doomsday is easy to see once you look at the cast list and the villain.",
      sections: [
        {
          heading: "A different world first",
          paragraphs: [
            "The film was set in a retro-futuristic version of the 1960s, giving the team a look that is deliberately distinct from the main MCU timeline. That choice leaves open how and when the two worlds meet.",
            "Because the same cast is listed for Doomsday, the multiverse is the most natural explanation for how the team enters the larger story.",
          ],
        },
        {
          heading: "The Doom connection",
          paragraphs: [
            "In the comics, Victor von Doom and Reed Richards are rivals from their student days, and the Fantastic Four are Doom's most famous enemies. First Steps ended with a post-credits scene that teased his arrival, setting up the confrontation fans expect.",
          ],
        },
        {
          heading: "What it means for the team",
          paragraphs: [
            "Doomsday gives the four a chance to show their strengths against a villain tied to their own history. Fans will be watching whether they stand with the Avengers or are drawn in separately.",
            "Either way, the team is unlikely to be a background presence, given how much of the film's marketing has centered on the mix of heroes.",
          ],
        },
      ],
    },
  },

  {
    id: "x-men-mcu-doomsday-legacy-cast",
    title: "X-Men Veterans in Avengers: Doomsday: What Their Return Could Mean",
    description:
      "Patrick Stewart, Ian McKellen and other X-Men veterans appear in the announced Doomsday cast. Here is what that could mean for the MCU.",
    category: "ANALYSIS",
    date: "October 14, 2026",
    publishedAt: "2026-10-14",
    updatedAt: "2026-10-14",
    author: TEAM,
    readingTime: "4 Minutes Read",
    image: FALLBACK_IMAGE,
    tags: ["X-Men", "Multiverse", "Cast"],
    content: {
      intro:
        "Few announcements in the Avengers: Doomsday cast list sparked more discussion than the X-Men veterans. Their return raises questions about how Marvel plans to bring mutants into the MCU.",
      sections: [
        {
          heading: "Why their return matters",
          paragraphs: [
            "Actors such as Patrick Stewart, Ian McKellen, Kelsey Grammer, Alan Cumming, James Marsden and Rebecca Romijn are tied to earlier X-Men films, so seeing them in a Marvel Studios production feels like a bridge between two eras of superhero cinema.",
            "Deadpool & Wolverine in 2024 had already shown that Marvel was willing to bring back characters from earlier franchises through the multiverse.",
          ],
        },
        {
          heading: "Variants or new versions?",
          paragraphs: [
            "Marvel has not said whether these characters are variants from other universes or versions meant to live inside the main MCU. The multiverse makes either possible, and the announced casting alone does not settle it.",
          ],
        },
        {
          heading: "What comes next for mutants",
          paragraphs: [
            "However the film explains them, it will likely influence how mutants appear in later projects. If the audience reacts strongly, expect Marvel to lean harder on the X-Men in the films that follow Secret Wars.",
            "For now the best approach is patience, because the film itself will answer these questions.",
          ],
        },
      ],
    },
  },

  {
    id: "secret-wars-battleworld-doomsday-theory",
    title: "Theory: Is Avengers: Doomsday Building Toward Battleworld?",
    description:
      "Secret Wars is scheduled for December 2027. Fans think Doomsday sets up Battleworld, and the comics offer clues about how.",
    category: "THEORY",
    date: "October 14, 2026",
    publishedAt: "2026-10-14",
    updatedAt: "2026-10-14",
    author: TEAM,
    readingTime: "4 Minutes Read",
    image: FALLBACK_IMAGE,
    tags: ["Theory", "Secret Wars", "Battleworld"],
    disclaimer: THEORY_DISCLAIMER,
    content: {
      intro:
        "Avengers: Secret Wars is currently scheduled for December 2027, one year after Doomsday. Many fans believe the first film exists largely to set up the second, with Battleworld as the destination.",
      sections: [
        {
          heading: "What Battleworld is",
          paragraphs: [
            "In Jonathan Hickman's 2015 Secret Wars comic, surviving pieces of destroyed universes are stitched into a single patchwork planet called Battleworld, ruled by Doom, who becomes God Emperor.",
            "It is one of the best-known Marvel stories of the last decade, which is why fans assume the film series will adapt at least part of it.",
          ],
        },
        {
          heading: "Clues fans are tracking",
          paragraphs: [
            "The theory rests on three observations: Doom is the main villain of the film that comes first, the cast mixes heroes from different eras and universes, and Marvel has described the two films as a pair.",
            "Together those details fit a story where Doomsday ends with the multiverse in crisis, leaving Secret Wars to deal with the aftermath.",
          ],
        },
        {
          heading: "Why it might not happen",
          paragraphs: [
            "Marvel often changes comic stories significantly, and the studio has not confirmed that Battleworld will appear. The film could also tell a smaller story about Doom's rise and leave larger multiverse events for 2027.",
            "Treat this as a reasonable guess, not a spoiler.",
          ],
        },
      ],
    },
  },

  {
    id: "new-avengers-thunderbolts-lineup-explained",
    title: "The New Avengers: How the Thunderbolts Team Could Lead Doomsday",
    description:
      "Thunderbolts* ended with the team being called the New Avengers. Here is how that group fits into Avengers: Doomsday.",
    category: "ANALYSIS",
    date: "October 14, 2026",
    publishedAt: "2026-10-14",
    updatedAt: "2026-10-14",
    author: TEAM,
    readingTime: "4 Minutes Read",
    image: FALLBACK_IMAGE,
    tags: ["Thunderbolts*", "New Avengers", "Team"],
    content: {
      intro:
        "Thunderbolts*, released in May 2025, ended with the team being introduced as the New Avengers. That set-up now looks like a direct lead-in to Avengers: Doomsday.",
      sections: [
        {
          heading: "Who is on the team",
          paragraphs: [
            "The group features Yelena Belova, Bucky Barnes, Red Guardian, Ghost, John Walker and Bob, who becomes the powerful Sentry. Most of those actors are also named in the Doomsday cast announcement.",
            "It is an unusual team: a collection of flawed people trying to prove themselves, which contrasts with the polished heroes of the original Avengers.",
          ],
        },
        {
          heading: "The leadership question",
          paragraphs: [
            "Anthony Mackie's Captain America, Sam Wilson, is also in the film, and fans are curious whether he leads the combined group or whether the story keeps the teams separate for a while.",
            "That balance will define how the film feels: a classic Avengers assembly or a more uneasy alliance.",
          ],
        },
        {
          heading: "Why this matters",
          paragraphs: [
            "A team with different instincts gives the directors room for more conflict than a unified group would. It also lets Marvel introduce a new generation of leaders while the older heroes step into supporting roles.",
          ],
        },
      ],
    },
  },

  {
    id: "loki-temporal-loom-multiverse-theory",
    title: "Theory: Could Loki and the Temporal Loom Matter in Doomsday?",
    description:
      "Loki ended his series holding the multiverse together. Fans think that idea may become important when Doctor Doom arrives.",
    category: "THEORY",
    date: "October 14, 2026",
    publishedAt: "2026-10-14",
    updatedAt: "2026-10-14",
    author: TEAM,
    readingTime: "4 Minutes Read",
    image: FALLBACK_IMAGE,
    tags: ["Theory", "Loki", "Multiverse"],
    disclaimer: THEORY_DISCLAIMER,
    content: {
      intro:
        "The second season of Loki ended with the title character taking his place at the Temporal Loom, where he keeps the branches of the multiverse in place. Fans are asking whether that ending will matter again once Doctor Doom arrives.",
      sections: [
        {
          heading: "Where Loki left off",
          paragraphs: [
            "In the finale, Loki chooses to stay at the center of time and hold the multiverse together, a decision the show framed as his glorious purpose. It is one of the biggest status-quo changes in the Multiverse Saga so far.",
            "Because the series ended there, any return of the character would have to explain how he left that role.",
          ],
        },
        {
          heading: "How the theory works",
          paragraphs: [
            "If the multiverse is under threat in Doomsday, the Loom becomes an obvious target or resource. A villain who wants to reshape reality, as Doom does in the comics, would have good reason to seek it out.",
          ],
        },
        {
          heading: "A word of caution",
          paragraphs: [
            "Marvel has not detailed Loki's role in the film, and the theory is built entirely on setup from the series. Fans should treat it as an interesting possibility rather than a promise, and look to official announcements for confirmation.",
          ],
        },
      ],
    },
  },

  {
    id: "namor-wakanda-talokan-doomsday-theory",
    title: "Theory: Where Do Wakanda and Talokan Fit in Avengers: Doomsday?",
    description:
      "Black Panther: Wakanda Forever left Shuri on the throne and Namor still ruling Talokan. Fans are asking how both nations connect to Doomsday.",
    category: "THEORY",
    date: "October 14, 2026",
    publishedAt: "2026-10-14",
    updatedAt: "2026-10-14",
    author: TEAM,
    readingTime: "4 Minutes Read",
    image: FALLBACK_IMAGE,
    tags: ["Theory", "Wakanda", "Namor"],
    disclaimer: THEORY_DISCLAIMER,
    content: {
      intro:
        "Black Panther: Wakanda Forever ended in 2022 with Shuri as the new Black Panther and Namor still leading the underwater nation of Talokan. With both characters tied to the announced cast, fans are wondering what comes next for their worlds.",
      sections: [
        {
          heading: "Two nations, one fragile peace",
          paragraphs: [
            "The film closed with Wakanda and Talokan no longer at war, but the peace was uneasy. Namor and Shuri are leaders who have both lost people and understand each other better than most heroes do.",
            "That makes them a natural pair if a larger threat forces nations to choose between cooperation and isolation.",
          ],
        },
        {
          heading: "Why Doom may care",
          paragraphs: [
            "In the comics, Doom is fascinated by power and resources, and Wakanda's vibranium technology would be an obvious target. Talokan, hidden beneath the sea, offers a different kind of strategic value.",
            "That gives the film plenty of reasons to place both nations in the story, whether as allies or as obstacles.",
          ],
        },
        {
          heading: "What we do not know",
          paragraphs: [
            "Marvel has not described how either nation will appear in Doomsday. Treat these ideas as discussion starters and look to the official cast and trailer pages for confirmed information.",
          ],
        },
      ],
    },
  },

  {
    id: "mcu-watchlist-before-avengers-doomsday",
    title: "MCU Watchlist: What to Watch Before Avengers: Doomsday",
    description:
      "A practical guide to the movies and shows worth watching before Avengers: Doomsday, from Endgame and Loki to Thunderbolts* and Fantastic Four.",
    category: "GUIDE",
    date: "October 14, 2026",
    publishedAt: "2026-10-14",
    updatedAt: "2026-10-14",
    author: TEAM,
    readingTime: "5 Minutes Read",
    image: FALLBACK_IMAGE,
    tags: ["Guide", "Watchlist", "MCU"],
    content: {
      intro:
        "With more than thirty films and many series in the MCU, catching up before December can feel overwhelming. This guide focuses on what is most useful for Avengers: Doomsday.",
      sections: [
        {
          heading: "The essentials",
          paragraphs: [
            "Start with Avengers: Endgame, which ends the Infinity Saga and sets the emotional stage for the Russo brothers' return. Then watch Fantastic Four: First Steps and Thunderbolts*, since both introduce teams listed in the Doomsday cast.",
            "Captain America: Brave New World is worth seeing for Anthony Mackie's first outing as Cap.",
          ],
        },
        {
          heading: "The multiverse thread",
          paragraphs: [
            "Loki on Disney+ is the clearest introduction to how the multiverse works in the MCU, and its second-season finale matters for how the saga ends. Doctor Strange in the Multiverse of Madness and Ant-Man and the Wasp: Quantumania add more background.",
            "Deadpool & Wolverine shows how Marvel is bringing characters from earlier franchises into the story.",
          ],
        },
        {
          heading: "Optional extras",
          paragraphs: [
            "Black Panther: Wakanda Forever helps with Shuri and Namor, and the earlier X-Men films give context for the veterans who return. None of these is required, but they will make the cast list feel less like a puzzle.",
            "If you only have time for three, choose Endgame, Loki and Fantastic Four: First Steps.",
          ],
        },
      ],
    },
  },

  {
    id: "how-to-spot-fake-avengers-doomsday-leaks",
    title: "How to Spot Fake Avengers: Doomsday Leaks and Rumors",
    description:
      "Fake posters, AI images and invented spoilers spread quickly around big films. Here is a simple checklist to separate real news from rumors.",
    category: "GUIDE",
    date: "October 14, 2026",
    publishedAt: "2026-10-14",
    updatedAt: "2026-10-14",
    author: TEAM,
    readingTime: "4 Minutes Read",
    image: FALLBACK_IMAGE,
    tags: ["Guide", "Rumors", "Fact check"],
    content: {
      intro:
        "Every major film attracts fake posters, invented plot details and AI-generated images, and Avengers: Doomsday is no exception. A few habits can help you avoid sharing something that turns out to be false.",
      sections: [
        {
          heading: "Check the source first",
          paragraphs: [
            "Official news comes from Marvel Studios, Disney, the filmmakers or the actors themselves, and reputable trade publications report it with named sources. A screenshot without a link or a post from an anonymous account is not confirmation, however confident it sounds.",
            "If the claim is dramatic and only appears in one place, wait for a second reliable source.",
          ],
        },
        {
          heading: "Look at the image and the details",
          paragraphs: [
            "AI-generated posters often have strange hands, garbled text and mismatched lighting. Real marketing material appears across official social accounts at the same time, with consistent credits and release information.",
            "Also check whether the details contradict known facts, such as the release date or the announced cast.",
          ],
        },
        {
          heading: "How we label information",
          paragraphs: [
            "On this site, confirmed information is stated as fact, reports are described as reports, and theories carry a clear notice. If you notice an error, use our contact page and we will correct it.",
          ],
        },
      ],
    },
  },

  {
    id: "from-endgame-to-doomsday-mcu-timeline",
    title: "From Endgame to Doomsday: How the MCU Changed Since 2019",
    description:
      "A short timeline of how Marvel moved from the Infinity Saga to the Multiverse Saga and what that means for Avengers: Doomsday.",
    category: "ANALYSIS",
    date: "October 14, 2026",
    publishedAt: "2026-10-14",
    updatedAt: "2026-10-14",
    author: TEAM,
    readingTime: "5 Minutes Read",
    image: FALLBACK_IMAGE,
    tags: ["MCU", "Multiverse Saga", "Timeline"],
    content: {
      intro:
        "Avengers: Endgame closed the Infinity Saga in 2019. Avengers: Doomsday will help close the story that followed, and a lot has changed in between.",
      sections: [
        {
          heading: "A new saga begins",
          paragraphs: [
            "After Endgame, Marvel started the Multiverse Saga with WandaVision in 2021 and a run of films and series that introduced alternate realities. Loki set up Kang the Conqueror, and Ant-Man and the Wasp: Quantumania introduced him on the big screen in 2023.",
            "The approach was more spread out than the Infinity Saga, which gave audiences fewer shared moments to anchor around.",
          ],
        },
        {
          heading: "The change of villain",
          paragraphs: [
            "In December 2023 Marvel Studios parted ways with Jonathan Majors, the actor playing Kang, and the studio's plan shifted. Doctor Doom, with Robert Downey Jr. in the role, became the central antagonist of the saga's finale.",
            "That change helps explain why the film feels like a reset as well as a continuation.",
          ],
        },
        {
          heading: "What Doomsday has to do",
          paragraphs: [
            "The film needs to introduce its villain, bring together heroes from several corners of the MCU, and set up Secret Wars. That is a lot for one film, which is why the Russo brothers' experience with large crossovers is so important.",
            "If it succeeds, it could give the franchise the shared event it has been missing since Endgame.",
          ],
        },
      ],
    },
  },
];

const byNewest = (a: NewsArticle, b: NewsArticle) =>
  b.publishedAt.localeCompare(a.publishedAt);

export function getAllArticles(): NewsArticle[] {
  return [...sampleArticles].sort(byNewest);
}

export function getArticlesByCategory(category: string): NewsArticle[] {
  if (category === "ALL") return getAllArticles();
  return getAllArticles().filter((article) => article.category === category);
}

export function getArticleById(id: string): NewsArticle | undefined {
  return sampleArticles.find((article) => article.id === id);
}

/** Related articles: same category and shared tags first, then newest. */
export function getRelatedArticles(id: string, limit = 3): NewsArticle[] {
  const current = getArticleById(id);
  if (!current) return [];

  return getAllArticles()
    .filter((a) => a.id !== id)
    .map((a) => ({
      article: a,
      score:
        (a.category === current.category ? 2 : 0) +
        (a.tags?.filter((t) => current.tags?.includes(t)).length ?? 0),
    }))
    .sort((x, y) => y.score - x.score)
    .slice(0, limit)
    .map((x) => x.article);
}