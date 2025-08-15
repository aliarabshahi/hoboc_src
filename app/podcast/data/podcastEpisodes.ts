import { type Episode } from "../lib/episodes"

export const podcastEpisodes: Episode[] = [
  {
    id: 1,
    title: "1: Bill Lumbergh",
    published: new Date("2022-02-24"),
    description:
      "He’s going to need you to go ahead and come in on Saturday, mmmkay?",
    content: `
      <p>In this episode, we talk about managing office politics with the infamous Bill Lumbergh. 
      Expect TPS reports, passive-aggressive memos, and some monotonous 'mmmkays'.</p>
    `,
    audio: {
      src: "/episodes/episode-001.mp3", // Place the mp3 in /public/episodes/
      type: "audio/mpeg",
    },
  },
  {
    id: 2,
    title: "2: Shooter McGavin",
    published: new Date("2022-02-17"),
    description:
      "When golf-obsessed terrorists kidnapped his family, Shooter had only one solution: more golf.",
    content: `
      <p>Shooter opens up about his golf philosophy, his rivalry with Happy Gilmore, 
      and why putting is for people who can’t drive.</p>
    `,
    audio: {
      src: "/episodes/episode-002.mp3",
      type: "audio/mpeg",
    },
  },
  {
    id: 3,
    title: "3: Darth Helmet",
    published: new Date("2022-02-10"),
    description:
      "The galaxy’s most petty villain tells us why size doesn’t matter… when it comes to spaceballs.",
    content: `
      <p>Lord Helmet discusses intergalactic intimidation, oversized headgear, and his fight against the Schwartz.</p>
    `,
    audio: {
      src: "/episodes/episode-003.mp3",
      type: "audio/mpeg",
    },
  },
]
