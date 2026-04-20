"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const frames = ["H", "E", "Y", "Y", "G", "I", "R", "L"] as const;

const typedByStep = ["H", "HE", "HEY", "HEY ", "HEY G", "HEY GI", "HEY GIR", "HEY GIRL"] as const;

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const withBasePath = (path: string) => `${basePath}${path}`;

const typewriterBack = withBasePath("/typewriter/back.webp");
const typewriterFrontDefault = withBasePath("/typewriter/front-default.webp");
const frameSources = [
  withBasePath("/typewriter/front-h.webp"),
  withBasePath("/typewriter/front-e.webp"),
  withBasePath("/typewriter/front-y.webp"),
  withBasePath("/typewriter/front-y.webp"),
  withBasePath("/typewriter/front-g.webp"),
  withBasePath("/typewriter/front-i.webp"),
  withBasePath("/typewriter/front-r.webp"),
  withBasePath("/typewriter/front-l.webp")
] as const;
const preloadSources = [typewriterBack, typewriterFrontDefault, ...frameSources] as const;
const STEP_WHEEL_THRESHOLD = 120;

type TypewriterHeroProps = {
  onComplete?: () => void;
};

export default function TypewriterHero({ onComplete }: TypewriterHeroProps) {
  const [step, setStep] = useState(0);
  const [pressTick, setPressTick] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [framesLoaded, setFramesLoaded] = useState(false);
  const didNotifyCompleteRef = useRef(false);

  useEffect(() => {
    let loadedCount = 0;
    let cancelled = false;

    preloadSources.forEach((source) => {
      const img = new window.Image();
      img.src = source;
      img.onload = () => {
        loadedCount += 1;
        if (!cancelled && loadedCount === preloadSources.length) {
          setFramesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount += 1;
        if (!cancelled && loadedCount === preloadSources.length) {
          setFramesLoaded(true);
        }
      };
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!framesLoaded || animationComplete) {
      return;
    }

    let wheelAccumulated = 0;

    // Keep hero gated until the type sequence reaches its final frame.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const progressTyping = () => {
      setStep((prev) => {
        if (prev >= frames.length - 1) {
          setAnimationComplete(true);
          return prev;
        }
        setPressTick((tick) => !tick);
        const next = prev + 1;
        if (next >= frames.length - 1) {
          setAnimationComplete(true);
        }
        return next;
      });
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (event.deltaY <= 0) {
        return;
      }
      wheelAccumulated += event.deltaY;
      if (wheelAccumulated >= STEP_WHEEL_THRESHOLD) {
        wheelAccumulated = 0;
        progressTyping();
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const scrollKeys = ["ArrowDown", "PageDown", " ", "Enter"];
      if (!scrollKeys.includes(event.key)) {
        return;
      }
      event.preventDefault();
      progressTyping();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [animationComplete, framesLoaded]);

  useEffect(() => {
    if (!animationComplete || didNotifyCompleteRef.current) {
      return;
    }
    didNotifyCompleteRef.current = true;
    onComplete?.();
  }, [animationComplete, onComplete]);

  const typedText = useMemo(() => typedByStep[step] ?? "", [step]);
  const activeFrameSrc = frameSources[step] ?? frameSources[0];

  return (
    <section id="typewriter-hero" className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 bg-cream" />

      <div className="relative z-10 flex h-screen items-center justify-center px-4 py-8 md:px-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-6">
          <h1 className="text-center text-4xl md:text-6xl">
            {typedText}
            <span className={`ml-1 inline-block w-4 ${animationComplete ? "opacity-0" : "animate-pulse"}`}>|</span>
          </h1>

          <motion.div
            className="relative w-full max-w-5xl"
            animate={pressTick ? { x: [0, -2, 2, 0], y: [0, 1, -1, 0] } : { x: [0, 2, -2, 0], y: [0, -1, 1, 0] }}
            transition={{ duration: 0.12, ease: "easeOut" }}
          >
            <div className="relative aspect-[16/11] w-full">
              <Image
                src={typewriterBack}
                alt="Typewriter back"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
              <Image
                src={typewriterFrontDefault}
                alt="Typewriter front default"
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
              <Image
                src={activeFrameSrc}
                alt={`Typewriter front frame ${frames[step]} step ${step + 1}`}
                fill
                className={`object-contain transition-opacity duration-75 ${framesLoaded ? "opacity-100" : "opacity-0"}`}
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
          </motion.div>

          <div className="mt-1 flex flex-wrap items-center justify-center gap-3">
            <a href="#inquiry" className="sticker bg-oxblood text-cream">
              Work With Me
            </a>
            <a href="#packages" className="sticker bg-beige">
              View Packages
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
