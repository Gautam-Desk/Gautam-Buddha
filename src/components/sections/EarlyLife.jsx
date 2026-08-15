import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "../Reveal";

export default function EarlyLife() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} id="early-life" className="relative bg-temple-950 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:items-center">
        <Reveal>
          <div>
            <p className="font-heading text-xs uppercase tracking-[0.4em] text-gold-400">
              Chapter I
            </p>
            <h2 className="mt-4 font-heading text-4xl text-temple-50 md:text-5xl">
              The Early Life
            </h2>
            <p className="mt-6 leading-relaxed text-temple-100/80">
              Born as Siddhartha Gautama in the lush foothills of the Himalayas, a prince of the Shakya clan was shielded from the world's suffering. Four fateful encounters — old age, sickness, death, and a wandering ascetic — would shatter his palace walls and set him on the path to truth.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-gold-500/20 bg-temple-900 shadow-2xl shadow-black/40">
            <motion.img
              style={{ y }}
              src="/zaimful-buddha-1478259.jpg"
              alt="A serene Buddha image"
              className="absolute inset-0 h-[120%] w-full object-cover opacity-90"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-temple-950/40 to-transparent" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
