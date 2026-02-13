import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import '../styles.css';

interface NoteProps {
  header: string;
  body: string;
  footer?: string;
}

export function Note({ header, body, footer }: NoteProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <motion.div 
      ref={ref}
      className="note-container"
      style={{ scale }}
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="note-pattern"></div>
      <h2 className="note-header">{header}</h2>
      <p className="note-body">{body}</p>
      {footer && <p className="note-footer">{footer}</p>}
    </motion.div>
  );
}
