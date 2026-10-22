// Scavenger-hunt additions per case (2026-10-22). Every quote below was checked word-for-word
// against its live source page. Randall's own copy stays in projects.ts, untouched.
import type { Video } from "./projects";

export type Quote = { text: string; by: string; role?: string; url: string };
export type Press = { outlet: string; title: string; url: string };
export type Extras = {
  videos?: Video[];
  images?: string[];
  quote?: Quote;
  award?: string;
  press?: Press[];
};

const DR = "https://media.designrush.com/";
const DN = "https://directorsnotes.com/wp-content/uploads/2020/03/";

export const extras: Record<string, Extras> = {
  "ford-bronco": {
    videos: [
      { provider: "vimeo", id: "443086717", label: "Built For The Wild (Stept cut)" },
      { provider: "youtube", id: "uM0iHfuOLvQ", label: "Nat Geo film: Bronco 2-Door, with Jimmy Chin" },
      { provider: "youtube", id: "dmjsX5hY7aA", label: "ESPN film: Bronco Sport, with Brooke Raboutou" },
    ],
    quote: {
      text: "These digital assets are among the best I have ever seen.",
      by: "Jim Farley",
      role: "then COO, Ford, via Frame.io",
      url: "https://blog.frame.io/2020/09/28/new-ford-bronco-commercial/",
    },
    press: [
      { outlet: "Frame.io", title: "Made in Frame: The New Ford Bronco", url: "https://blog.frame.io/2020/09/28/new-ford-bronco-commercial/" },
      { outlet: "MediaPost", title: "Disney Media Networks Strikes ‘Product Reveal’ Branded Content Deal With Ford Motor", url: "https://www.mediapost.com/publications/article/353250/disney-media-networks-strikes-product-reveal-bra.html" },
    ],
  },

  "chobani-world-cup-2026": {
    videos: [
      { provider: "youtube", id: "y6sW9yJ7i6o", label: "Behind the Dream, dir. Hector Dockrill" },
      { provider: "youtube", id: "mpAiFIdnvLs", label: "Hometown spots" },
      { provider: "vimeo", id: "1195627185", label: "Feed the Dream" },
    ],
    images: [
      DR + "articles/1042071/conversions/chobani-fed-by-many-artwork-details-webp.webp",
      DR + "tinymce_images/1042667/conversions/chobani-feed-the-dream-christian-pulisic-content-large-webp.webp",
      DR + "tinymce_images/1042668/conversions/chobani-feed-the-dream-antonee-robinson-content-large-webp.webp",
      DR + "tinymce_images/1042082/conversions/chobani-heron-preston-feed-the-dream-content-large-webp.webp",
    ],
    quote: {
      text: "We think Chobani’s campaign works because it gives the roster reveal more emotional weight.",
      by: "DesignRush",
      url: "https://news.designrush.com/chobani-feed-the-dream-world-cup-art",
    },
    press: [
      { outlet: "Campaign US", title: "Chobani launches Feed the Dream for USMNT World Cup roster reveal", url: "https://campaignlive.com/article/chobani-launches-feed-dream-usmnt-world-cup-roster-reveal/1959498" },
      { outlet: "DesignRush", title: "Chobani Backs USMNT With Art, Film, and a $5M Soccer Fund", url: "https://news.designrush.com/chobani-feed-the-dream-world-cup-art" },
    ],
  },

  "gold-peak-golden-hour-lens": {
    videos: [{ provider: "vimeo", id: "1019740977", label: "Case film" }],
    quote: {
      text: "This is a fun product that people might not have known they wanted.",
      by: "Print+Promo",
      url: "https://printandpromomarketing.com/article/gold-peak-tea-created-a-smartphone-camera-lens-full-of-iced-tea-for-peak-golden-hour-images/",
    },
    press: [
      { outlet: "MMA Global", title: "Gold Peak Tea Appeals to “Golden Hour” Photography on Social Media", url: "https://legacy-casestudies.mmaglobal.com/case_studies/view/92072" },
      { outlet: "Print+Promo", title: "Gold Peak Tea created a smartphone camera lens full of iced tea", url: "https://printandpromomarketing.com/article/gold-peak-tea-created-a-smartphone-camera-lens-full-of-iced-tea-for-peak-golden-hour-images/" },
    ],
  },

  "crown-royal-triple-nickel": {
    // Replaces the private :30 (no public poster) with Stept's public upload of the film.
    videos: [{ provider: "vimeo", id: "389612937", label: "On Vimeo (Staff Pick)" }],
    images: [DN + "sundays_triple_nickle_1.jpg", DN + "sundays_triple_nickle_2.jpg", DN + "sundays_triple_nickle_3.jpg", DN + "sundays_triple_nickle_4.jpg"],
    quote: {
      text: "The film is a visual poem, a cinematic celebration of community and connection.",
      by: "SHOOT",
      role: "Top Spot of the Week",
      url: "https://www.shootonline.com/video/top-spot-week-stept-studios-director-jess-colquhoun-crown-royal-take-us-sundays-triple-nickel",
    },
    award: "Silver Clio · Branded Entertainment, Film – Unscripted, 2020",
    press: [
      { outlet: "Clio Awards", title: "Sundays at the Triple Nickel — Silver", url: "https://clios.com/awards/winner/branded-entertainment-content/diageo-crown-royal/sundays-at-the-triple-nickel-80488" },
      { outlet: "SHOOT", title: "Top Spot of the Week: Crown Royal Take Us To “Sundays At The Triple Nickel”", url: "https://www.shootonline.com/video/top-spot-week-stept-studios-director-jess-colquhoun-crown-royal-take-us-sundays-triple-nickel" },
      { outlet: "Directors Notes", title: "Jess Colquhoun: Sundays at the Triple Nickel", url: "https://directorsnotes.com/2020/03/16/jess-colquhoun-sundays-at-the-triple-nickel/" },
      { outlet: "Brooklyn Film Festival", title: "Official selection", url: "https://www.brooklynfilmfestival.org/film-detail?fid=2247" },
    ],
  },

  "oakley-surf": {
    videos: [{ provider: "vimeo", id: "848404831", label: "Be Who You Are: Griffin Colapinto (Surf) :30" }],
  },

  "us-soccer-deaf-double-header": {
    images: [
      "https://content.ussoccer.com/media/images/oyf3dba6/production/1beddab245b333104620a567c7e00f20e8808a52-1800x1200.jpg",
      "https://www.hashtagsports.com/hs-fs/hubfs/Assets-AF-2025/zQZOrNDk-1qYM70Nb8Q-file.jpg?width=1920&height=1080&name=zQZOrNDk-1qYM70Nb8Q-file.jpg",
    ],
    award: "Hashie Winner · Diversity, Equity, Inclusion & Belonging, 7th Hashtag Sports Awards",
    press: [
      { outlet: "Hashtag Sports Awards", title: "Inside the Camp: Historic Day for the U.S. Women’s Deaf National Team", url: "https://www.hashtagsports.com/awards/shortlist-2025/inside-the-camp-historic-day-for-the-us-womens-deaf-national-team" },
      { outlet: "U.S. Soccer", title: "U.S. Women’s Deaf National Team to face Australia in doubleheader with USWNT", url: "https://www.ussoccer.com/stories/2024/05/us-womens-deaf-national-team-australia-doubleheader-us-womens-national-team-on-june-1-in-colorado" },
    ],
  },

  "wsl-dream-job": {
    press: [{ outlet: "World Surf League", title: "Meet Zachary Brown, the new Ambassador of Stoke and Leisure", url: "https://worldsurfleague.com/posts/281646/meet-zachary-brown-the-new-ambassador-of-stoke-and-leisure" }],
  },

  "oakley-mahomes": {
    videos: [{ provider: "youtube", id: "1EEvxsHXtJk", label: "Signature Series 3 spot" }],
    images: [
      "https://ewscripps.brightspotcdn.com/dims4/default/99ca51d/2147483647/strip/true/crop/1693x952+0+759/resize/1280x720!/quality/90/?url=http%3A%2F%2Fewscripps-brightspot.s3.amazonaws.com%2F82%2F0a%2Ff616a157422286ad1603f2456a01%2Foakley-patrick-mahomes-ii-signature-series-3-campaign-image-4.jpg",
      "https://ewscripps.brightspotcdn.com/dims4/default/6e5ec4b/2147483647/strip/true/crop/1440x810+0+391/resize/1280x720!/quality/90/?url=http%3A%2F%2Fewscripps-brightspot.s3.amazonaws.com%2Fde%2Fb0%2F830aa8b04a4d9a34f2eae5816bd9%2Foakley-patrick-mahomes-ii-signature-series-3-campaign-image-2.jpg",
    ],
    press: [{ outlet: "KSHB 41", title: "Chiefs QB Patrick Mahomes’ daughter Sterling featured in latest Oakley ad", url: "https://www.kshb.com/sports/chiefs-qb-patrick-mahomes-daughter-sterling-featured-in-latest-oakley-ad" }],
  },

  "got-milk-gonna-need-milk": {
    images: ["https://s3.amazonaws.com/media.mediapost.com/dam/cropped/2021/05/20/milkad-600_KN6WhvG.jpg"],
    quote: {
      text: "‘The Wall’ embodies the drive to accomplish the extraordinary.",
      by: "Jimmy Chin",
      role: "Creative Director",
      url: "https://perishablenews.com/dairy/mountaineer-oscar-winning-filmmaker-jimmy-chin-affirms-milks-sports-drink-status-in-new-film-for-got-milk/",
    },
    press: [
      { outlet: "LBB", title: "Jimmy Chin Creatively Directs a Death-Defying Climb for Latest Got Milk? Campaign", url: "https://lbbonline.com/news/jimmy-chin-creatively-directs-a-death-defying-climb-for-latest-got-milk-campaign" },
      { outlet: "MediaPost", title: "Don’t Try This At Home: MilkPEP’s New ‘You’re Gonna Need Milk For That’ Campaign", url: "https://www.mediapost.com/publications/article/363463/" },
      { outlet: "Dairy Foods", title: "MilkPEP debuts ‘You’re Gonna Need Milk for That’ campaign", url: "https://dairyfoods.com/articles/95035-milkpep-debuts-youre-gonna-need-milk-for-that-campaign" },
    ],
  },

  "whoop-4-keynote": {
    videos: [
      { provider: "vimeo", id: "594735977", label: "WHOOP 4.0 (Stept cut)" },
      { provider: "vimeo", id: "589937547", label: "WHOOP Body :30" },
      { provider: "youtube", id: "rskBeO7uE70", label: "Michael Phelps segment" },
    ],
    images: [
      "https://images.ctfassets.net/rbzqg6pelgqa/1yS8neDmrtOsQxEjqAOviB/21c449e2c5be33b82de9d0f2c4d1ab13/unlocked-2021-recap-announcing-4-0-en.png?fm=webp&q=70&w=1920",
    ],
    press: [{ outlet: "WHOOP", title: "Unlocked 2021 recap: Announcing WHOOP 4.0", url: "https://www.whoop.com/thelocker/unlocked-2021-recap-announcing-4-0" }],
  },

  "the-north-face-the-story": {
    press: [
      { outlet: "PR Daily", title: "Ragan Awards: North Face wins big with #MoreThanAJacket", url: "https://www.prdaily.com/ragan-awards-north-face-wins-big-with-morethanajacket/" },
    ],
  },

  "marriott-travel-by-design": {
    // TODO(randall): confirm these Stept "Inside The Collection" episodes are the later seasons of this series.
    videos: [
      { provider: "vimeo", id: "857278441", label: "Inside The Luxury Collection: trailer" },
      { provider: "vimeo", id: "868440448", label: "Ep. 3: The Muse & The Masterpiece, Palace Hotel Tokyo" },
    ],
    press: [{ outlet: "TravelDailyNews", title: "Marriott Bonvoy launches Travel by Design", url: "https://www.traveldailynews.com/hotels-lodging/marriott-bonvoy-launches-travel-by-design/" }],
  },

  "smartwater-keep-it-smart": {
    images: [
      "https://www.fashiongonerogue.com/wp-content/uploads/2023/08/Zendaya-Smartwater-2023-Campaign.jpg",
      "https://www.fashiongonerogue.com/wp-content/uploads/2023/08/Zendaya-Smartwater-2023-Hooded-Gown.jpg",
      "https://www.fashiongonerogue.com/wp-content/uploads/2023/08/Zendaya-Blue-Minidress-Smartwater-2023-Campaign.jpg",
      "https://www.fashiongonerogue.com/wp-content/uploads/2023/08/Zendaya-Smartwater-White-Cutout-Dress-2023-Campaign.jpg",
    ],
    quote: {
      text: "It’s a celebration of creativity, where water becomes the spring of inspiration, and fashion flows in perfect harmony.",
      by: "Fashion Gone Rogue",
      url: "https://www.fashiongonerogue.com/zendaya-smartwater-2023-campaign/",
    },
    press: [
      { outlet: "The Coca-Cola Company", title: "Zendaya keeps it smart with smartwater", url: "https://www.coca-colacompany.com/media-center/zendaya-keeps-it-smart-smartwater" },
      { outlet: "Fashion Gone Rogue", title: "Zendaya smartwater 2023 campaign", url: "https://www.fashiongonerogue.com/zendaya-smartwater-2023-campaign/" },
    ],
  },
};
