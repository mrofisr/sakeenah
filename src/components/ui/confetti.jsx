import { motion, AnimatePresence } from "motion/react";

export default function Confetti({ show }) {
  const colors = ["#FDA4AF", "#FDE68A", "#A7F3D0", "#93C5FD", "#C4B5FD"];
  const pieces = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: colors[i % colors.length],
    delay: Math.random() * 0.5,
    rotate: Math.random() * 360,
  }));

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {pieces.map((p) => (
            <motion.div
              key={p.id}
              className="absolute w-2 h-2 rounded-sm"
              style={{
                left: `${p.x}%`,
                top: "-10px",
                backgroundColor: p.color,
              }}
              initial={{ y: -20, rotate: 0, opacity: 1 }}
              animate={{
                y: "110vh",
                rotate: p.rotate * 3,
                opacity: [1, 1, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 2 + Math.random() * 1.5,
                delay: p.delay,
                ease: "easeIn",
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
