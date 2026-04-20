"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import TypewriterHero from "@/components/TypewriterHero";
import PersonalityHook from "@/components/PersonalityHook";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const withBasePath = (path: string) => `${basePath}${path}`;

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
  const [heroComplete, setHeroComplete] = useState(false);

  return (
    <main className="relative overflow-x-hidden px-4 pb-24 md:px-8">
      <TypewriterHero onComplete={() => setHeroComplete(true)} />
      <PersonalityHook canStart={heroComplete} />

      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute right-3 top-[145vh] opacity-90 md:right-10"
          animate={{ y: [0, 7, 0], rotate: [6, 9, 6] }}
          transition={{ repeat: Infinity, duration: 2.9 }}
        >
          <Image src={withBasePath("/scrapbook/dice-clean.webp")} alt="Heart dice sticker" width={108} height={108} />
        </motion.div>
        <motion.div
          className="absolute left-4 top-[250vh] opacity-95 md:left-12"
          animate={{ y: [0, -8, 0], rotate: [-5, -8, -5] }}
          transition={{ repeat: Infinity, duration: 3.4 }}
        >
          <Image src={withBasePath("/scrapbook/jam-heart-clean.webp")} alt="Jam heart cookie sticker" width={110} height={110} />
        </motion.div>
      </div>

      <section id="hero" className="mx-auto mt-8 max-w-6xl space-y-5 y2k-panel p-6 stitched md:p-10">
        <span className="sticker">palais lebrun presents...</span>
        <h1 className="max-w-3xl text-3xl leading-tight md:text-6xl">MAGNETIC MARKETING FOR CULT BRANDS</h1>
        <p className="max-w-3xl text-base md:text-xl">
          Turn viewers into followers, followers into customers, and customers into a loyal community.
        </p>
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

      <section id="packages" className="relative mx-auto mt-10 max-w-6xl rounded-2xl border-2 border-borderDeep bg-oxblood px-4 py-8 text-cream md:px-6 md:py-10">
        <motion.div
          className="pointer-events-none absolute -top-10 right-4 z-20 opacity-95 md:right-10"
          animate={{ y: [0, 5, 0], rotate: [4, 7, 4] }}
          transition={{ repeat: Infinity, duration: 2.7 }}
        >
          <Image src={withBasePath("/scrapbook/kiss-clean.webp")} alt="Lip kiss sticker" width={126} height={126} />
        </motion.div>
        <h2 className="mb-5 text-center text-3xl md:text-5xl">WE GOT YOU.</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {packageCards.map((card, idx) => (
            <motion.article
              key={card.title}
              className="y2k-panel relative h-full bg-cream p-5 text-oxblood"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: idx * 0.12, duration: 0.4 }}
              whileHover={{ rotate: idx % 2 === 0 ? 1.4 : -1.4, y: -4 }}
            >
              <span className="sticker mb-4 inline-flex">
                {idx === 0 ? "you need this" : idx === 1 ? "for growers" : "for showers"}
              </span>
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
          <a href="mailto:palaisleb@protonmail.com" className="sticker bg-beige">
            Let&apos;s Build Your Cult Brand
          </a>
        </div>
      </section>
    </main>
  );
}
