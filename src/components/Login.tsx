import { motion } from 'framer-motion';
import { useState } from 'react';
import '../styles.css';
import flowerImg from '../images/flower.png';

interface LoginProps {
  onSuccess: () => void;
}

const CORRECT_ANSWERS = ['วาเลนไทน์', 'valentine', '14 feb', '14 กุมภาพันธ์', 'valentine\'s day','14','love','วันแห่งความรัก','โอ๊ค'];

function Login({ onSuccess }: LoginProps) {
  const [inputValue, setInputValue] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = inputValue.trim().toLowerCase();
    
    if (CORRECT_ANSWERS.some(ans => cleanInput.includes(ans))) {
      onSuccess();
    } else {
      setIsError(true);
      setTimeout(() => setIsError(false), 500); 
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="login-container"
    >
      {/* Background Hearts */}
      <div className="hearts-bg">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="heart"></div>
        ))}
      </div>

      <div className="music-pill">
        <div className="music-icon">🎵</div>
        <span>I think they call this love..</span>
      </div>

      <div className="login-content">
        <motion.h1 
          className="title"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Happy Valentine's<br/>Day
        </motion.h1>

        <motion.div 
          className="image-container"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: 'spring' }}
        >
          <img src={flowerImg} alt="Bouquet" className="bouquet-img" />
        </motion.div>

        <form onSubmit={handleSubmit} className="login-form">
          <motion.input
            type="text"
            placeholder="รู้ป่าวน้า... ว่าวันนี้วันอะไร?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={`login-input ${isError ? 'shake' : ''}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              x: isError ? [-10, 10, -10, 10, 0] : 0
            }}
            transition={{ 
              type: 'spring', 
              stiffness: 300, 
              damping: 10,
              x: { duration: 0.5 }
            }}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="start-button"
            type="submit"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            ยืนยันคำตอบ
          </motion.button>
        </form>

        {isError && <p className="error-text">ยังไม่ใช่น้า ลองใหม่อีกที! 🥺</p>}
      </div>
    </motion.div>
  );
}

export default Login;
