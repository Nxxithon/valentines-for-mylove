import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import '../styles.css';
import oakAndNorNorImg from '../images/oakandnornor.jpg';

function Message() {
  const [particles, setParticles] = useState<{ id: number; x: number; delay: number }[]>([]);
  const PLACEHOLDER_IMG = oakAndNorNorImg;

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="message-container glass">
      <motion.div
        className="particles-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="particle"
            style={{ left: `${p.x}%` }}
            initial={{ y: '100vh', opacity: 0 }}
            animate={{ y: '-10vh', opacity: [0, 1, 0] }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: p.delay,
              ease: 'linear',
            }}
          >
            ❤️
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="message-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="header-text">Happy Valentine's Day!  </h1>
        
        <div className="polaroid-frame">
          <div className="polaroid-inner">
            <img src={PLACEHOLDER_IMG} alt="Our Memory" className="polaroid-img" />
          </div>
          <p className="polaroid-caption">Kittiyathida & Netithon </p>
        </div>

        <div className="letter-body">
          <p>ถึง น้ำหนึ่ง,</p>
          <br />
          <p>
            Happy valentine's day น้า ขอบคุณแฟนที่เข้ามาทำให้โลกเค้ากลายเป็นสีชมพู มีแต่รอยยิ้ม เค้าโชคดีมากเลยที่มีเธอเป็นแฟน แฟนทั้งสวยน่ารักใส่ใจเค้ามากๆเลย เค้าได้คุยกับเธอเค้าก็แฮปปี้มากๆแล้วในแต่ละวัน เวลาไม่สบายใจเรื่องไหนเราก็คุยกันนะ ไม่อยากให้แฟนหงอยไม่สบายใจ เค้าชอบรอยยิ้มของเธอ ยิ้มเยอะๆนะครับ เธอยิ้มแล้วโลกสดใส เป็นแฟนแล้วแต่เค้าก็จีบทุกวัน ชอบแฟนนน~ คิดถึงแฟนมากมากเลยยยย วันนี้ตรงกับวันเสาร์พอดี แฟนพักผ่อนกินอะไรอร่อยๆด้วยน้า เค้ารักแฟนนะครับ รักมากขึ้นทุกวัน 🌻
          </p>
          <p>
           
          </p>
          <br />
          <p style={{ fontSize: '1.5rem', textAlign: 'right' }}>รักนะ, จาก โอ๊ค</p>
        </div>
      </motion.div>
    </div>
  );
}

export default Message;
