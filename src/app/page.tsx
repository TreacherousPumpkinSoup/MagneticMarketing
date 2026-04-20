"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const heroText = "hey girl";

const packageCards = [
  {
    title: "THE MAGNETIC MARKETING STRATEGY",
    price: "One-time investment: $1,500",
    offer: "Founding client rate: $500 (limited)",
    body: "Mandatory for all clients. A complete strategic foundation for your brand's online presence.",
    sections: [
      {
        heading: "Brand DNA Development",
        points: ["Brand personality & tone of voice", "Core messaging & positioning", "What you stand for (and what you don't)"]
      },
      {
        heading: "Target Audience Breakdown",
        points: ["Ideal customer profile", "Pain points, desires, behaviours", "Content angles that resonate and convert"]
      },
      {
        heading: "Visual Brand Direction",
        points: ["Colours, styling, framing, tone", "Filming & editing guidelines", "Overall aesthetic direction for consistency"]
      },
      {
        heading: "Cult Branding Strategy",
        points: ["Community-driven content approach", "Identity-based messaging", "Repeatable themes that build loyalty"]
      },
      {
        heading: "Freebie: High-Converting Content Hooks",
        points: ["60 short-form video hooks", "30 carousel hooks", "Stop the scroll", "Speak directly to your audience", "Lead into conversion-focused content"]
      }
    ]
  },
  {
    title: "GROWTH MANAGEMENT (15 DAYS)",
    price: "$1,000/month",
    body: "Consistent, strategic content designed to build momentum.",
    sections: [
      {
        heading: "What's included",
        points: [
          "15 short-form videos per month",
          "Filmed once per month",
          "Edited in your brand style",
          "Content guided by your Magnetic Marketing Strategy"
        ]
      },
      {
        heading: "Purpose",
        points: ["To build consistency and begin converting", "viewers -> followers", "followers -> customers"]
      }
    ]
  },
  {
    title: "EXPANSION MANAGEMENT (30 DAYS)",
    price: "$1,800/month",
    body: "For brands ready to scale visibility, engagement, and conversions.",
    sections: [
      {
        heading: "What's included",
        points: [
          "30 short-form videos per month",
          "Filmed fortnightly (2x per month)",
          "Edited in your brand style",
          "Content guided by your Magnetic Marketing Strategy"
        ]
      },
      {
        heading: "Purpose",
        points: [
          "Accelerate growth and build",
          "daily visibility",
          "stronger audience connection",
          "a recognisable brand presence",
          "a loyal community around your business"
        ]
      }
    ]
  }
];

export default function Home() {
  const [typed, setTyped] = useState("");
  const [showPaperExit, setShowPaperExit] = useState(false);
  const [showCue, setShowCue] = useState(false);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    let charIndex = 0;
    const typingTimer = setInterval(() => {
      charIndex += 1;
      setTyped(heroText.slice(0, charIndex));
      if (charIndex >= heroText.length) {
        clearInterval(typingTimer);
        setTimeout(() => setShowPaperExit(true), 800);
        setTimeout(() => setShowCue(true), 1900);
      }
    }, 150);

    return () => clearInterval(typingTimer);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 320);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const frameState = useMemo(() => Math.min(3, Math.floor((typed.length / heroText.length) * 4) + 1), [typed.length]);

  return (
    <main className="relative overflow-x-hidden px-4 pb-24 pt-6 md:px-8">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="sticker absolute left-4 top-32 rotate-[-10deg]"
          animate={{ y: [0, -6, 0], rotate: [-10, -12, -10] }}
          transition={{ repeat: Infinity, duration: 2.2 }}
        >
          sparkle.exe
        </motion.div>
        <motion.div
          className="sticker absolute right-3 top-[42rem] rotate-[8deg]"
          animate={{ y: [0, 6, 0], rotate: [8, 11, 8] }}
          transition={{ repeat: Infinity, duration: 2.8 }}
        >
          cult brand
        </motion.div>
      </div>

      <section id="hero" className="mx-auto max-w-6xl space-y-5 y2k-panel p-6 stitched md:p-10">
        <span className="sticker">editorial x nostalgic internet</span>
        <h1 className="max-w-3xl text-3xl leading-tight md:text-6xl">MAGNETIC MARKETING FOR CULT BRANDS</h1>
        <p className="max-w-3xl text-base md:text-xl">
          Turn viewers into followers, followers into customers, and customers into a loyal community.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href="#inquiry" className="sticker bg-oxblood text-cream">
            Work With Me
          </a>
          <a href="#packages" className="sticker bg-beige">
            View Packages
          </a>
        </div>

        <div className="mt-5 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="typewriter-wrap">
            <h2 className="mb-3 text-2xl">Typewriter Transmission</h2>
            <div className="typewriter-machine">
              <div className={`paper ${showPaperExit ? "slide-out" : ""}`}>{typed || "..."}</div>
              <div className="absolute bottom-3 left-3 rounded-md border border-cream/30 px-2 py-1 text-xs">front state: {frameState}/4</div>
            </div>
            {showCue ? <p className="scroll-cue mt-3 text-sm font-semibold">scroll for the package archive v</p> : null}
          </div>

          <div className="y2k-panel bg-[#ead8c5] p-3">
            <h3 className="mb-2 text-2xl">3D Accent</h3>
            <p className="mb-3 text-sm">Replace this with your published Spline scene URL when ready.</p>
            <iframe
              title="Spline scene placeholder"
              src="https://my.spline.design/"
              className="h-64 w-full rounded-lg border-2 border-borderDeep bg-cream"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section id="how" className="mx-auto mt-10 max-w-6xl y2k-panel p-6 md:p-10">
        <h2 className="text-3xl md:text-5xl">HOW THIS WORKS</h2>
        <p className="mt-4 max-w-4xl text-base md:text-lg">
          Every client begins with a <strong>Magnetic Marketing Strategy</strong>.
        </p>
        <p className="mt-3 max-w-4xl text-base md:text-lg">
          This ensures your content is not only consistent, it&apos;s designed to convert viewers into followers, followers into
          customers, and customers into a loyal community.
        </p>
      </section>

      <section id="packages" className="mx-auto mt-10 max-w-6xl">
        <h2 className="mb-5 text-center text-3xl md:text-5xl">Packages</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {packageCards.map((card, idx) => (
            <motion.article
              key={card.title}
              className="y2k-panel relative h-full bg-[#f2e5d0] p-5"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: idx * 0.12, duration: 0.4 }}
              whileHover={{ rotate: idx % 2 === 0 ? 1.4 : -1.4, y: -4 }}
            >
              <span className="sticker mb-4 inline-flex">collectible service panel</span>
              <h3 className="text-2xl leading-tight">{card.title}</h3>
              <p className="mt-2 font-bold">{card.price}</p>
              {"offer" in card && card.offer ? <p className="mt-1 font-bold text-[#8f2626]">{card.offer}</p> : null}
              <p className="mt-3 text-sm leading-relaxed">{card.body}</p>

              <div className="mt-5 space-y-4">
                {card.sections.map((section) => (
                  <div key={section.heading}>
                    <h4 className="text-lg font-semibold">{section.heading}</h4>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                      {section.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="inquiry" className="mx-auto mt-12 max-w-6xl y2k-panel bg-[#ead5bf] p-7 text-center md:p-10">
        <h2 className="text-3xl md:text-5xl">READY TO BUILD A MAGNETIC BRAND?</h2>
        <p className="mx-auto mt-3 max-w-3xl">
          Let&apos;s turn your brand into a cult favourite with strategic content, magnetic messaging, and daily visibility.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <a href="https://instagram.com" className="sticker bg-oxblood text-cream">
            Enquire Now
          </a>
          <a href="mailto:hello@example.com" className="sticker">
            Book Your Strategy
          </a>
          <a href="https://calendly.com" className="sticker bg-beige">
            Lets Build Your Cult Brand
          </a>
        </div>
      </section>

      {showSticky ? (
        <div className="fixed bottom-4 left-0 z-40 w-full px-4 md:hidden">
          <a href="#inquiry" className="sticker mx-auto flex w-fit bg-oxblood px-4 py-3 text-cream">
            Book Your Strategy
          </a>
        </div>
      ) : null}
    </main>
  );
}
