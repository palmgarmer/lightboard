"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Edit3, Maximize, Minimize, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type FullscreenDocument = Document & {
  webkitExitFullscreen?: () => Promise<void> | void;
  webkitFullscreenElement?: Element | null;
};

type FullscreenElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
};

function getFullscreenElement(doc: FullscreenDocument) {
  return doc.fullscreenElement ?? doc.webkitFullscreenElement ?? null;
}

export default function DisplayPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isExpandedFallback, setIsExpandedFallback] = useState(false);
  const [supportsNativeFullscreen, setSupportsNativeFullscreen] = useState(false);
  const [isDarkBackground, setIsDarkBackground] = useState(true);

  // ดึงค่าจาก URL (ถ้าไม่มีให้ใช้ Default)
  const text = searchParams.get("text") || "HELLO, WORLD";
  const color = searchParams.get("color") || "#ff0000";
  const animation = searchParams.get("animation") || "scroll";

  useEffect(() => {
    const doc = document as FullscreenDocument;
    const rootElement = document.documentElement as FullscreenElement;

    setSupportsNativeFullscreen(
      typeof rootElement.requestFullscreen === "function" ||
        typeof rootElement.webkitRequestFullscreen === "function"
    );

    const syncFullscreenState = () => {
      setIsFullscreen(Boolean(getFullscreenElement(doc)));
    };

    syncFullscreenState();

    document.addEventListener("fullscreenchange", syncFullscreenState);
    document.addEventListener("webkitfullscreenchange", syncFullscreenState);

    return () => {
      document.removeEventListener("fullscreenchange", syncFullscreenState);
      document.removeEventListener("webkitfullscreenchange", syncFullscreenState);
    };
  }, []);

  const toggleFullscreen = async () => {
    const doc = document as FullscreenDocument;
    const rootElement = document.documentElement as FullscreenElement;
    const nativeFullscreenElement = getFullscreenElement(doc);

    if (nativeFullscreenElement) {
      const exitFullscreen = doc.exitFullscreen?.bind(doc) ?? doc.webkitExitFullscreen?.bind(doc);

      if (exitFullscreen) {
        try {
          await exitFullscreen();
          return;
        } catch {
          setIsExpandedFallback(false);
          setIsFullscreen(false);
          return;
        }
      }
    }

    if (isExpandedFallback) {
      setIsExpandedFallback(false);
      return;
    }

    const requestFullscreen =
      rootElement.requestFullscreen?.bind(rootElement) ??
      rootElement.webkitRequestFullscreen?.bind(rootElement);

    if (requestFullscreen) {
      try {
        await requestFullscreen();
        setIsExpandedFallback(false);
        return;
      } catch {
        setIsExpandedFallback(true);
        setIsFullscreen(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
    }

    setIsExpandedFallback(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isExpanded = isFullscreen || isExpandedFallback;
  const fullscreenButtonLabel = isExpanded
    ? "Exit fullscreen"
    : supportsNativeFullscreen
      ? "Enter fullscreen"
      : "Expand display";

  return (
    <main
      className={`relative flex h-dvh w-screen flex-col items-center justify-center overflow-hidden ${
        isExpandedFallback ? "fixed inset-0 z-50" : ""
      } ${
        isDarkBackground ? "bg-black" : "bg-white"
      }`}
    >
      {/* LED Grid Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, ${isDarkBackground ? "#ffffff" : "#000000"} 1px, transparent 1px)`,
          backgroundSize: "6px 6px",
        }}
      />

      {/* Floating Action Buttons */}
      <div className="absolute left-4 top-4 z-30 flex gap-2 opacity-100 sm:left-6 sm:top-6">
        <Button
          variant="outline"
          size="default"
          onClick={() => setIsDarkBackground((current) => !current)}
          className={`h-10 w-10 rounded-full p-0 backdrop-blur ${
            isDarkBackground
              ? "border-white/30 bg-black/70 text-white"
              : "border-black/20 bg-white/80 text-black hover:bg-gray-200/80"
          }`}
        >
          {isDarkBackground ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>

      <div className="absolute right-4 top-4 z-30 flex gap-2 opacity-100 sm:right-6 sm:top-6">
        <Button
          variant="outline"
          size="default"
          onClick={toggleFullscreen}
          aria-label={fullscreenButtonLabel}
          title={fullscreenButtonLabel}
          className={`h-10 w-10 rounded-full p-0 backdrop-blur ${
            isDarkBackground
              ? "border-white/30 bg-black/70 text-white"
              : "border-black/20 bg-white/80 text-black hover:bg-gray-200/80"
          }`}
        >
          {isExpanded ? (
            <Minimize className="h-4 w-4" />
          ) : (
            <Maximize className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="absolute right-4 bottom-4 z-30 flex gap-2 opacity-100 sm:right-6 sm:bottom-6">
      
        <Button
          variant="outline"
          size="default"
          onClick={() =>
            router.push(
              `/edit?text=${text}&color=${encodeURIComponent(color)}&animation=${animation}`
            )
          }
          className={`h-10 w-10 rounded-full p-0 backdrop-blur ${
            isDarkBackground
              ? "border-white/30 bg-black/70 text-white"
              : "border-black/20 bg-white/80 text-black hover:bg-gray-200/80"
          }`}
        >
          <Edit3 className="h-4 w-4" />
        </Button>
      </div>

      {/* Display Text */}
      <div className="relative flex w-full items-center justify-center">
        <h1
          style={{
            color,
            textShadow: `0 0 15px ${color}, 0 0 30px ${color}, 0 0 50px ${color}`,
            ...(animation === "scroll"
              ? { position: "absolute", left: "100%", animation: "marquee 8s linear infinite" }
              : { animation: "blink 1.1s steps(2, start) infinite" }),
          }}
          className="whitespace-nowrap text-[80vh] font-bold uppercase tracking-[0.2em] md:text-[80vh]"
        >
          {text}
        </h1>
      </div>
    </main>
  );
}