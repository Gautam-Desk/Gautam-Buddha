import { useEffect, useState } from "react";

/**
 * Simple cinematic loader with a fading lotus mark.
 * Stays visible until `ready` becomes true.
 */
export default function Loader({ ready }) {
  const [hide, setHide] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    if (!ready) return;
    const t1 = setTimeout(() => setHide(true), 400);
    const t2 = setTimeout(() => setRemoved(true), 1100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [ready]);

  if (removed) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-temple-950 transition-opacity duration-700 ${
        hide ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden={hide}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="text-5xl text-gold-400 animate-pulse">ॐ</div>
        <div className="font-heading text-sm uppercase tracking-[0.4em] text-temple-200">
          Entering the path
        </div>
      </div>
    </div>
  );
}
