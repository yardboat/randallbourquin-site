import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "assets.zyrosite.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "i.vimeocdn.com" },
      { protocol: "https", hostname: "vumbnail.com" },
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
      // Scavenger-hunt sources (press pages and brand newsrooms)
      { protocol: "https", hostname: "media.designrush.com" },
      { protocol: "https", hostname: "directorsnotes.com" },
      { protocol: "https", hostname: "content.ussoccer.com" },
      { protocol: "https", hostname: "www.hashtagsports.com" },
      { protocol: "https", hostname: "ewscripps.brightspotcdn.com" },
      { protocol: "https", hostname: "s3.amazonaws.com", pathname: "/media.mediapost.com/**" },
      { protocol: "https", hostname: "images.ctfassets.net" },
      { protocol: "https", hostname: "www.fashiongonerogue.com" },
    ],
  },
};

export default nextConfig;
