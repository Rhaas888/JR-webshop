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
    <video
      ref={videoRef}
      className="absolute inset-0 size-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    >
      <source src={HERO_VIDEO_SRC} type="video/mp4" />
    </video>
  );
}
