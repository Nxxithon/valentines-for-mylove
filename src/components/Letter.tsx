/**
 * Letter — ซองจดหมายสีขาว
 * กดซองเพื่อเปิด → animation ค่อยๆเล่น → กดอีกทีเพื่อไปหน้าถัดไป
 */
import { motion } from 'framer-motion';
import { useState } from 'react';
import '../styles.css';

interface LetterProps {
  onOpen: () => void;
}

export default function Letter({ onOpen }: LetterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (!isOpen) {
      // First click: open the envelope with slow animation
      setIsOpen(true);
    } else {
      // Second click (after opened): go to next page
      onOpen();
    }
  };

  return (
    <motion.div
      className="letter-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="letter-container">
        <div 
          className={`envelope-wrapper ${isOpen ? 'open' : ''}`} 
          onClick={handleClick}
        >
          <div className="envelope">
            <div className="envelope-back" />
            <div className="flap-front" />
            <div className="envelope-sides" />
            {/* Card inside */}
            <div className="card">
              <div className="card-inner">
                <span className="card-title">Happy Valentine's</span>
                <span className="card-text">
                  {isOpen ? 'กดอีกทีเพื่ออ่านจดหมาย 💕' : 'มีข้อความรอเธออยู่...'}
                </span>
              </div>
            </div>
            {/* Heart Seal */}
            <div className="heart-seal">❤️</div>
          </div>
        </div>

        <motion.p 
          className="instruction"
          animate={{ opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          {isOpen ? '' : '💌 กดที่ซองจดหมายเพื่อเปิดนะ'}
        </motion.p>
      </div>
    </motion.div>
  );
}
