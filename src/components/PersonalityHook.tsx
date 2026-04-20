"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const longCopy =
  "since you're reading this, let me take a moment to congratulate you. you are already doing better than 99% of business owners who are falling behind because they don't take their marketing seriously. you are killing it already!";

const timeline = {
  omg: 1700,
  you: 1700,
  typed: 9800,
  typedPause: 900,
  typedFadeOut: 700,
  besties: 2400
} as const;

const totalDuration =
  timeline.omg + timeline.you + timeline.typed + timeline.typedPause + timeline.typedFadeOut + timeline.besties;

function phaseOpacity(phaseMs: number, totalMs: number, fadeIn = 380, fadeOut = 420): number {
  if (phaseMs < 0 || phaseMs > totalMs) return 0;
  if (phaseMs < fadeIn) return phaseMs / fadeIn;
  if (phaseMs > totalMs - fadeOut) return Math.max(0, (totalMs - phaseMs) / fadeOut);
  return 1;
}

type PersonalityHookProps = {
  canStart: boolean;
};

export default function PersonalityHook({ canStart }: PersonalityHookProps) {
  const introRef = useRef<HTMLElement | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const speedRef = useRef(1);
  const targetSpeedRef = useRef(1);

  useEffect(() => {
    if (!canStart || hasStarted) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) {
          return;
        }
        setHasStarted(true);
        observer.disconnect();
      },
      { threshold: 0.35 }
    );

    if (introRef.current) {
      observer.observe(introRef.current);
    }

    return () => observer.disconnect();
  }, [canStart, hasStarted]);

  useEffect(() => {
    if (!hasStarted) {
      return;
    }

    let raf = 0;
    let lastTime = performance.now();
    let mounted = true;

    const animate = (time: number) => {
      if (!mounted) return;
      const delta = time - lastTime;
      lastTime = time;

      speedRef.current = speedRef.current + (targetSpeedRef.current - speedRef.current) * 0.11;
      setElapsed((prev) => Math.min(totalDuration, prev + delta * speedRef.current));

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    const onWheel = (event: WheelEvent) => {
      const intensity = Math.min(1.6, Math.max(0, Math.abs(event.deltaY) / 540));
      targetSpeedRef.current = 1 + intensity;
      window.setTimeout(() => {
        if (!mounted) return;
        targetSpeedRef.current = 1;
      }, 420);
    };

    window.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      mounted = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("wheel", onWheel);
    };
  }, [hasStarted]);

  const marks = useMemo(() => {
    const omgStart = 0;
    const youStart = omgStart + timeline.omg;
    const typedStart = youStart + timeline.you;
    const typedPauseStart = typedStart + timeline.typed;
    const typedFadeOutStart = typedPauseStart + timeline.typedPause;
    const bestiesStart = typedFadeOutStart + timeline.typedFadeOut;
    return { omgStart, youStart, typedStart, typedPauseStart, typedFadeOutStart, bestiesStart };
  }, []);

  const omgOpacity = phaseOpacity(elapsed - marks.omgStart, timeline.omg);
  const youOpacity = phaseOpacity(elapsed - marks.youStart, timeline.you);
  const bestiesOpacity = phaseOpacity(elapsed - marks.bestiesStart, timeline.besties, 420, 220);

  const typedElapsed = Math.max(0, Math.min(timeline.typed, elapsed - marks.typedStart));
  const typedCount = Math.min(longCopy.length, Math.floor((typedElapsed / timeline.typed) * longCopy.length));
  const typedVisible = longCopy.slice(0, typedCount);
  const typedBlockOpacity =
    elapsed < marks.typedStart ? 0 : elapsed < marks.typedFadeOutStart ? 1 : Math.max(0, 1 - (elapsed - marks.typedFadeOutStart) / timeline.typedFadeOut);

  const finalLineOpacity = Math.min(1, Math.max(0, (elapsed - (totalDuration - 550)) / 550));

  return (
    <>
      <section ref={introRef} className="relative mx-auto mt-0 flex min-h-[54vh] max-w-5xl flex-col items-center justify-start px-3 pt-6 text-center md:pt-8">
        <motion.div
          className="pointer-events-none absolute left-2 top-0 z-10 -translate-y-1/2 opacity-95"
          animate={{ y: [0, -6, 0], rotate: [-8, -11, -8] }}
          transition={{ repeat: Infinity, duration: 3.2 }}
        >
          <Image src="/scrapbook/iloveu-clean.webp" alt="Scrapbook note sticker" width={180} height={70} />
        </motion.div>
        <div className="relative min-h-[22rem] w-full max-w-4xl">
          <p className="absolute inset-0 flex items-center justify-center text-6xl md:text-8xl" style={{ opacity: omgOpacity }}>
            OMG!
          </p>
          <p className="absolute inset-0 flex items-center justify-center text-5xl md:text-7xl" style={{ opacity: youOpacity }}>
            it&apos;s YOU!
          </p>
          <p className="absolute inset-0 flex items-center justify-center px-4 text-lg leading-relaxed md:text-2xl" style={{ opacity: typedBlockOpacity }}>
            {typedVisible}
            <span className="ml-1 inline-block w-3 animate-pulse">|</span>
          </p>
          <p className="absolute inset-0 flex items-center justify-center text-3xl md:text-5xl" style={{ opacity: bestiesOpacity }}>
            did we just become best friends...?
          </p>
          <p className="absolute inset-0 flex items-center justify-center text-3xl md:text-5xl" style={{ opacity: finalLineOpacity }}>
            <span className="flex flex-col items-center">
              <span>let&apos;s get creating!</span>
              <span className="scroll-cue mt-2 text-2xl md:text-3xl">V</span>
            </span>
          </p>
        </div>
      </section>

      <section className="mx-auto mt-0 max-w-6xl px-2 pb-2">
        <div className="flex items-center gap-4 md:gap-6">
          <div className="relative h-24 w-24 rotate-[-4deg] overflow-hidden rounded-full border-4 border-borderDeep bg-cream shadow-y2k md:h-32 md:w-32">
            <Image src="/personality/me.png" alt="Pali portrait" fill className="object-cover" sizes="128px" />
          </div>
          <h2 className="text-4xl md:text-6xl">Who, me?</h2>
        </div>

        <div className="relative mt-4 rounded-[2.3rem] border-4 border-[#4e1f1f] bg-[#771010] p-6 text-cream shadow-y2k md:p-10">
          <div className="absolute -top-2 left-16 -z-10 h-8 w-8 rotate-45 border-r-4 border-t-4 border-[#4e1f1f] bg-[#771010] md:left-20" />

          <div className="max-w-3xl space-y-4 pr-0 md:pr-36">
            <p className="text-lg leading-relaxed md:text-xl">
              I&apos;m Palais LeBrun - call me Pali for short. And this is my assistant, Bashi. We specialise in the art of getting a
              &quot;yes&quot;.
            </p>
            <p className="whitespace-pre-line text-base md:text-lg">
              {`Yes, I want to buy.
Yes, I love that brand.
Yes, sign me up.
Yes, you can pat my dog.`}
            </p>
            <p className="text-base leading-relaxed md:text-lg">
              I&apos;ve been working in brand design for over 5 years, with clients ranging from international sports consultants to local
              fashion houses to Norwegian black metal bands. No, I&apos;m not joking.
            </p>
            <p className="text-base leading-relaxed md:text-lg">
              Long story short... I&apos;m pretty okay at this whole &quot;marketing&quot; thing. Let&apos;s make your audience say yes.
            </p>
            <a href="#inquiry" className="sticker mt-6 bg-cream text-oxblood">
              Work With Me
            </a>
          </div>

          <div className="pointer-events-none absolute -bottom-6 right-4 h-28 w-28 rotate-[6deg] overflow-hidden rounded-full border-4 border-cream bg-cream shadow-y2k md:-right-3 md:top-8 md:h-36 md:w-36">
            <Image src="/personality/bashi.png" alt="Bashi portrait" fill className="object-cover" sizes="144px" />
          </div>
        </div>
      </section>
    </>
  );
}
