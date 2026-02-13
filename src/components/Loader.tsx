import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import '../styles.css';
import flowerImg from '../images/flower.png';

const LOADING_TEXTS = [
  'กำลังรวบรวมความรัก...',
  'เนติกำลังเตรียมของให้แฟน... ',
  'โอ๊คกำลังหาของให้นอนอ',
  'ใกล้โหลดเสร็จแล้ววววว...'
];

function Loader() {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % LOADING_TEXTS.length);
    }, 1500); // Change text every 1.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="loader-container"
    >
      <div className="loader-icon">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          <img src={flowerImg} alt="loading-flower" style={{ width: '100px' }} />
        </motion.div>
      </div>
      <h2 className="loading-text">{LOADING_TEXTS[textIndex]}</h2>
    </motion.div>
  );
}

export default Loader;
