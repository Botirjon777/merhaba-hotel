"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FiPlay, FiPause, FiVolume2, FiVolumeX } from "react-icons/fi";

const VIDEO_SRC = "/images/hotel/general/general.mp4";
const POSTER_SRC = "/images/hotel/general/general-1.jpg";

export function VideoShowcase() {
  const t = useTranslations("VideoShowcase");
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Lazy loading: the <source> is only attached once the section scrolls near
  // the viewport, so the ~15MB file is never fetched on initial page load.
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      setIsBuffering(true);
      video.play().catch(() => setIsBuffering(false));
    } else {
      video.pause();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <section aria-label={t("title")} className="bg-cream">
      <div
        ref={sectionRef}
        className="max-w-[1200px] mx-auto py-5 px-5 md:px-5 md:py-10"
      >
        <SectionHeader
          label={t("label")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="relative w-full aspect-video overflow-hidden bg-[#1a1108] group shadow-lg">
          <video
            ref={videoRef}
            poster={POSTER_SRC}
            preload="none"
            playsInline
            loop
            controlsList="nodownload noremoteplayback"
            disablePictureInPicture
            className="w-full h-full object-cover"
            onContextMenu={(e) => e.preventDefault()}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onPlaying={() => setIsBuffering(false)}
            onWaiting={() => setIsBuffering(true)}
            onClick={togglePlay}
          >
            {shouldLoad && <source src={VIDEO_SRC} type="video/mp4" />}
          </video>

          {/* Buffering spinner */}
          {isBuffering && (
            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
              <div className="w-12 h-12 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
            </div>
          )}

          {/* Center play button — shown while paused */}
          {!isPlaying && !isBuffering && (
            <button
              onClick={togglePlay}
              aria-label={t("play")}
              className="absolute inset-0 z-20 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-colors duration-300"
            >
              <span className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full bg-gold/90 text-white shadow-xl transition-transform duration-300 group-hover:scale-110 active:scale-95">
                <FiPlay className="w-7 h-7 md:w-8 md:h-8 translate-x-0.5" />
              </span>
            </button>
          )}

          {/* Bottom control bar — visible while playing (and on hover) */}
          <div
            className={`absolute bottom-0 left-0 right-0 z-20 flex items-center gap-4 px-4 md:px-6 py-3 md:py-4 bg-linear-to-t from-black/70 to-transparent transition-opacity duration-300 ${
              isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-0"
            }`}
          >
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? t("pause") : t("play")}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/40 text-white hover:bg-white hover:text-text-dark transition-all duration-300 active:scale-95"
            >
              {isPlaying ? (
                <FiPause className="w-4 h-4" />
              ) : (
                <FiPlay className="w-4 h-4 translate-x-0.5" />
              )}
            </button>
            <button
              onClick={toggleMute}
              aria-label={isMuted ? t("unmute") : t("mute")}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/40 text-white hover:bg-white hover:text-text-dark transition-all duration-300 active:scale-95"
            >
              {isMuted ? (
                <FiVolumeX className="w-4 h-4" />
              ) : (
                <FiVolume2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
