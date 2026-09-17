"use client";

import { useEffect, useRef } from "react";

const HERO_VIDEO_SRC =
  "https://cdn.shopify.com/videos/c/o/v/0764d751ddba4a418c6ed417b8f819f1.mp4";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      video.pause();
      return;
    }

    const play = () => {
      const attempt = video.play();
      if (attempt) {
        attempt.catch(() => {});
      }
    };

    play();
    video.addEventListener("canplay", play);
    window.addEventListener("pageshow", play);
    document.addEventListener("touchstart", play, { once: true, passive: true });

    return () => {
      video.removeEventListener("canplay", play);
      window.removeEventListener("pageshow", play);
      document.removeEventListener("touchstart", play);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 size-full object-cover max-sm:inset-auto max-sm:top-0 max-sm:bottom-0 max-sm:left-1/2 max-sm:h-full max-sm:w-[200%] max-sm:-translate-x-1/2 max-sm:object-[50%_46%]"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
    >
      <source src={HERO_VIDEO_SRC} type="video/mp4" />
    </video>
  );
}
