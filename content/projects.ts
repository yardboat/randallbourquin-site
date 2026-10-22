// Single source of truth for the portfolio. Order = Randall's priority order (locked).
// Copy is Randall's, verbatim, with typo fixes only (see .studio/DECISIONS.md).

export type Video = { provider: "vimeo" | "youtube"; id: string; label?: string; /** Optional poster override. */ poster?: string };

export type Project = {
  slug: string;
  title: string;
  client: string;
  /** Short proof line shown in the index (award, scale, role). */
  tag: string;
  body: string[];
  videos: Video[];
  images: string[];
  /** Project color for hover / case-page theming. */
  color: string;
};

const Z = "https://assets.zyrosite.com/P6QZWgfwdfGCK3vy/";

export const projects: Project[] = [
  {
    slug: "ford-bronco",
    title: "Ford Bronco Re-Launch",
    client: "Ford × Disney · Stept Studios",
    tag: "Nat Geo · ESPN · ABC",
    body: [
      "Production lead on two-of-three simultaneously-aired 3:00 films across Nat Geo, ESPN, and ABC that revealed the new Bronco to the world. Stept Studios in partnership with Disney, Ford, and seven other entities.",
    ],
    videos: [{ provider: "vimeo", id: "643039551", label: "Behind the scenes" }],
    images: [],
    color: "#4A4636",
  },
  {
    slug: "chobani-world-cup-2026",
    title: "Chobani World Cup 2026",
    client: "Chobani",
    tag: "67+ pieces of content",
    body: [
      "Chobani wanted to harness the World Cup moment to inspire everyone to Feed their Dream. We brought the collective spirit to life across three sub-campaigns, 67+ pieces of content, multiple partnerships, and a comms strategy that turned up in volume as the World Cup did.",
      "…then we launched the brand new Froyo.",
    ],
    videos: [],
    images: [Z + "screenshot-2026-10-14-at-5.52.20-pm-qE1nMTqO7Ys6fg5W.png"],
    color: "#1C2B4A",
  },
  {
    slug: "gold-peak-golden-hour-lens",
    title: "Gold Peak Golden Hour Lens",
    client: "Gold Peak · Coca-Cola",
    tag: "ADWEEK Media Plan of the Year",
    body: [
      'ADWEEK Media Plan of the Year winner, 2024. Campaign of the Year finalist, Coca Cola Global Marketing Awards. 20+ influencer partnerships. 90M impressions. One commenter said: "Ngl pretty decent ad." 🏆',
    ],
    videos: [],
    images: [
      Z + "goldpeak-lens_01-JH9dPR3SWebfOxFS.webp",
      Z + "goldpeak-lens_02-PqULWP72gsAqhEYn.gif",
      Z + "goldpeak-lens_03-8NURHtcVqyM1crTs.webp",
      Z + "goldpeak-lens_results-g2-g9v2vy4xukBRjboi.webp",
      Z + "20231027_goldpeak_billboard.png-ujnO8qs4rzys4l55.webp",
    ],
    color: "#173323",
  },
  {
    slug: "crown-royal-triple-nickel",
    title: "Crown Royal “Sundays at the Triple Nickel”",
    client: "Crown Royal",
    tag: "Silver Clio · Vimeo Staff Pick",
    body: [
      "A Film that powered a campaign. Stills, gifs, :15s, :30s, and a 12:00 full-length from one shoot. Screened at 20 film festivals, won a silver Clio, and scooped the award that goes hardest of all: Vimeo Staff Pick. Marjorie = Angel.",
    ],
    videos: [
      { provider: "youtube", id: "vxHYpTNrL6c", label: "The film · 12:00" },
    ],
    images: [],
    color: "#24142F",
  },
  {
    slug: "oakley-surf",
    title: "Oakley Surf Positioning",
    client: "Oakley",
    tag: "Whole ecosystem",
    body: [
      "One Idea to get Oakley Surfing in (and on) surfers' heads. Featured across the whole ecosystem: POS, brand page, social pages, print, and very likely in the mouths of real humans.",
    ],
    videos: [],
    images: [
      Z + "screenshot-2026-01-04-at-6.47.20a-pm-uv4AtrS0giwjZ9Xb.png",
      Z + "screenshot-2026-01-05-at-2.27.00a-pm-6LGr9pyI81d5TaTl.png",
      Z + "screenshot-2026-01-05-at-2.26.48a-pm-DoAu4UirlNHGecjd.png",
    ],
    color: "#0F3D4C",
  },
  {
    slug: "us-soccer-deaf-double-header",
    title: "U.S. Soccer Deaf Double-Header",
    client: "U.S. Soccer · Volkswagen",
    tag: "Live TV",
    body: [
      "We got the Greatest Team You've Never Heard Of—the U.S. Deaf Women's National Team—the platform they deserve, ft. live TV broadcast, custom-designed VW pre-match tops, 1:1 time with the U.S. Women's National Team, and this episode of \"Inside the Camp\". Year 2 was even better.",
    ],
    videos: [{ provider: "youtube", id: "ZkByUyKIW8w", label: "Inside the Camp" }],
    images: [],
    color: "#13284B",
  },
  {
    slug: "wsl-dream-job",
    title: "World Surf League “Dream Job”",
    client: "World Surf League",
    tag: "2,400 applications",
    body: [
      "WSL employees' inboxes were never not full of \"Re: DUDE can you get me a JOB?!\". We turned the insight into a real job, driving 2,400 applications, 1 million visits to a microsite, and four months of storytelling.",
    ],
    videos: [{ provider: "vimeo", id: "247518680" }],
    images: [],
    color: "#0B5C7A",
  },
  {
    slug: "oakley-mahomes",
    title: "Oakley × Patrick Mahomes “Be Who You Are”",
    client: "Oakley",
    tag: "Copywriter",
    body: [
      "Copywriter. Year three of a multi-phase partnership between Oakley and Patrick Mahomes, featuring the newest addition to the Mahomes dynasty: Skye.",
    ],
    videos: [{ provider: "vimeo", id: "755582016" }],
    images: [],
    color: "#2A2A2A",
  },
  {
    slug: "real-madrid-is-coming",
    title: "Real Madrid is Coming",
    client: "Real Madrid",
    tag: "~300MM reach",
    body: [
      "The biggest media channel I've ever landed work on was Real Madrid's social ecosystem, clocking in at ~300MM. We engineered a small shoot to make the team's U.S. tour news feel BIG.",
    ],
    videos: [{ provider: "vimeo", id: "347364983" }],
    images: [],
    color: "#1B2B6B",
  },
  {
    slug: "got-milk-gonna-need-milk",
    title: "Got Milk? “Gonna Need Milk”",
    client: "Got Milk?",
    tag: "CD: Jimmy Chin",
    body: [
      'The phone rang and the other end asked "so we\'re thinking climber-on-top-of-building—feasible?" We said "yea absolutely." And well, across the course of human history, highly effective people and teams know *that* it\'s possible before they know *how* it\'ll be possible. It helps to have Jimmy Chin as your Creative Director.',
    ],
    videos: [{ provider: "youtube", id: "6SVFHFkX0sc", label: "The Wall" }],
    images: [Z + "screenshot-2026-02-23-at-12.08.57a-pm-FvpofhQ903oXn27i.png"],
    color: "#2F5D78",
  },
  {
    slug: "whoop-4-keynote",
    title: "WHOOP 4.0 Live Keynote",
    client: "WHOOP",
    tag: "55 minutes, live",
    body: [
      "You need a lot of amazing visual ingredients to make a :60. You need even more to make a 55-minute. So we assembled an incredible suite of pre-taped appearances from Michael Phelps, Tom Daley, and more, created a suite of CGI supporting visuals, and gave a charismatic CEO the elite environment he needed to present the new WHOOP 4.0 to the world.",
    ],
    videos: [{ provider: "youtube", id: "t-Zr9a8zKG4" }],
    images: [Z + "screenshot-2026-02-23-at-12.36.15a-pm-tJNiXC6amhtITmcB.png"],
    color: "#111111",
  },
  {
    slug: "the-north-face-the-story",
    title: "The North Face “The Story”",
    client: "The North Face",
    tag: "Object → artifact",
    body: [
      "What's the difference between an object and an artifact? The latter has been imbued with meaning. Artifacts are the objects that hold memories, that reflect our lives back to us. So we reminded them that The North Face's products aren't objects, but artifacts, thanks to them.",
    ],
    videos: [{ provider: "youtube", id: "W9hJNGpSJIU", label: "It's More Than a Jacket" }],
    images: [],
    color: "#22170F",
  },
  {
    slug: "marriott-travel-by-design",
    title: "Marriott “Travel by Design” Film Series",
    client: "Marriott",
    tag: "Three seasons",
    body: [
      // TODO(randall): original sentence on the live site is broken ("But the It was…"). Confirm the intended line.
      "Marriott is the biggest hotel portfolio in the world. And that can feel a little corporate. It was almost impossible to pick just four properties—so the series rolled into a second and third season, taking viewers from Mexico to Tokyo and beyond.",
    ],
    videos: [{ provider: "vimeo", id: "799023657" }],
    images: [],
    color: "#5A3E2B",
  },
  {
    slug: "smartwater-keep-it-smart",
    title: "smartwater “Keep it Smart”",
    client: "smartwater",
    tag: "ft. Zendaya",
    body: [
      'For the second year of "Keep it Smart", we partnered up with global brand ambassador Zendaya to tie smartwater to key occasions while collaborating with four on-the-verge fashion designers to bring a fresh, smart perspective to the spot and across social in real time.',
    ],
    videos: [{ provider: "vimeo", id: "1167446233" }],
    images: [],
    color: "#24485A",
  },
];

export const clients =
  "Coke, Coke Zero, smartwater, Vitaminwater, Topo Chico, Dasani, Chobani, AT&T, Deloitte, Marriott, The North Face, Nike, Chipotle, Smirnoff, Under Armour, Samsung, Reddit, to name-drop a few.";

export const manifesto = [
  "'Travels' is the most important word in brand marketing right now.",
  "Reach is easy and attention is hard.",
  "Narrative Objects work harder than narrative ads.",
  "Experiences > exposures.",
  "'Clever' is key.",
  "Teams deserve excellent maps.",
  "Clarity before poetry (and then, poetry).",
  "We work with, not for, the MMM curve.",
  "How Brands Grow was boring and helpful.",
  "Premeditation is our superpower.",
  "The Idea still wins the day.",
];

export const quote = {
  text: "Advertisers are the interpreters of our dreams. Like the movies, they infect the routine futility of our days with purposeful adventure.",
  by: "E.B. White, 1936",
};
