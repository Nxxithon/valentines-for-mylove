/**
 * PageLoader — Shared loading animation
 * ใช้ร่วมกันทุกหน้า: ตุ๊กตาหมุน + ข้อความเปลี่ยน
 * 
 * Usage: <PageLoader texts={['กำลังโหลด...', 'รอแปป...']} icon="🧸" />
 */
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

import flowerImg from '../../images/flower.png';

interface PageLoaderProps {
  texts?: string[];
  icon?: React.ReactNode;
}

const DEFAULT_TEXTS = [
  'กำลังรวบรวมความรัก...',
  'เนติกำลังเตรียมของให้แฟน... ',
  'โอ๊คกำลังหาของให้นอนอ',
  'ใกล้โหลดเสร็จแล้ววววว...'
];

export function PageLoader({ texts = DEFAULT_TEXTS, icon }: PageLoaderProps) {
  const currentIcon = icon || <img src={flowerImg} alt="loading-flower" style={{ width: '80px' }} />;
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % texts.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <motion.div
      className="page-loader"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="page-loader-icon"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0],
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {currentIcon}
      </motion.div>
      <AnimatePresence mode="wait">
        <motion.p
          key={textIndex}
          className="page-loader-text"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {texts[textIndex]}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
}
