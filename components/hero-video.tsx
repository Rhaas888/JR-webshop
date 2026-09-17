"use client";

import { useEffect, useRef } from "react";

const HERO_VIDEO_SRC =
  "https://cdn.shopify.com/videos/c/o/v/0764d751ddba4a418c6ed417b8f819f1.mp4";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      video.pause();
    }
  }, []);

  return (
    <div className="mt-12 w-full">
      <video
        ref={videoRef}
        className="aspect-video w-full rounded-[20px] bg-neutral-900 object-cover shadow-[0_28px_48px_rgba(0,0,0,0.16)]"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Webshop en app in beeld"
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>
    </div>
  );
}
