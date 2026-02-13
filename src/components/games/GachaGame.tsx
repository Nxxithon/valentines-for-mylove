import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles.css';

type GachaItemType = 'image' | 'video';

interface GachaItem {
  id: number;
  type: GachaItemType;
  mediaUrl: string;
  message: string;
  rarity: 'common' | 'rare' | 'legendary';
}

const BALL_COLORS: Record<string, string> = {
  common: '#60a5fa',     // Blue
  rare: '#a78bfa',       // Purple
  legendary: '#fb7185',  // Pink-red
};

// Larger set of colors for a full container
const DISPLAY_BALL_COLORS = [
  '#f87171', '#fb923c', '#fbbf24', '#34d399', '#60a5fa',
  '#a78bfa', '#f472b6', '#38bdf8', '#4ade80', '#fb7185',
  '#fca5a5', '#fdba74', '#fcd34d', '#6ee7b7', '#93c5fd',
  '#c4b5fd', '#f9a8d4', '#7dd3fc', '#86efac', '#fda4af',
  '#f87171', '#fb923c', '#fbbf24', '#34d399', '#60a5fa'
];

const GACHA_ITEMS: GachaItem[] = [
  { id: 1, type: 'image', mediaUrl: '/images/gacha/drink.jpg', message: 'แฟนสวยอะ กินน้ำยังสวย', rarity: 'rare' },
  { id: 2, type: 'image', mediaUrl: '/images/gacha/dunk.jpg', message: 'ดังปึ่งงง', rarity: 'rare' },
  { id: 3, type: 'image', mediaUrl: '/images/gacha/ew.jpg', message: 'อาหารที่ไม่ใช่อาหาร eww อร่อยนะอยากให้ลอง', rarity: 'common' },
  { id: 4, type: 'image', mediaUrl: '/images/gacha/haha.jpg', message: 'หนังไก่หายากแถบกรุงเทพ', rarity: 'legendary' },
  { id: 5, type: 'image', mediaUrl: '/images/gacha/love.jpg', message: 'ดูหนังกับแฟน อยากดู jjk ด้วยอีกจัง', rarity: 'legendary' },
  { id: 6, type: 'image', mediaUrl: '/images/gacha/mini.jpg', message: 'มินิ เนติ', rarity: 'rare' },
  { id: 7, type: 'image', mediaUrl: '/images/gacha/oak.png', message: 'หูกหายากแถบโรงเรียนไสยเวท', rarity: 'rare' },
  { id: 8, type: 'image', mediaUrl: '/images/gacha/oak&nor.jpg', message: 'รูปนี้ชอบมากเลย น่ารักเนาะ เค้าชอบอะอิจฉาคนในรูปจังมีแฟนสวย', rarity: 'legendary' },
  { id: 9, type: 'video', mediaUrl: '/images/gacha/video.mp4', message: 'วิดีโอตัวนี้ก็น่ารักกกก 💕', rarity: 'legendary' },
];

interface GachaGameProps {
  onBack: () => void;
}

export default function GachaGame({ onBack }: GachaGameProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [prize, setPrize] = useState<GachaItem | null>(null);
  const [showPrize, setShowPrize] = useState(false);
  const [showCollection, setShowCollection] = useState(false);
  const [collected, setCollected] = useState<number[]>([]);
  const [ballDropping, setBallDropping] = useState(false);
  const [droppedBallColor, setDroppedBallColor] = useState('#f472b6');

  const spinGacha = () => {
    if (isSpinning || ballDropping) return;
    setIsSpinning(true);
    setShowPrize(false);

    const randomItem = GACHA_ITEMS[Math.floor(Math.random() * GACHA_ITEMS.length)];
    setDroppedBallColor(BALL_COLORS[randomItem.rarity]);

    setTimeout(() => {
      setIsSpinning(false);
      setTimeout(() => {
        setBallDropping(true);
        setTimeout(() => {
          setBallDropping(false);
          setPrize(randomItem);
          setShowPrize(true);
          if (!collected.includes(randomItem.id)) {
            setCollected((prev) => [...prev, randomItem.id]);
          }
        }, 1000); 
      }, 500);
    }, 1500);
  };

  const collectedItems = GACHA_ITEMS.filter(item => collected.includes(item.id));

  return (
    <motion.div className="gacha-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Title & Collection */}
      <h1 className="gacha-title">Love Gacha</h1>
      <div className="gacha-progress-text" style={{ marginBottom: '1.5rem' }}>สะสมไปแล้ว {collected.length} จาก {GACHA_ITEMS.length}</div>

      {/* MACHINE */}
      <motion.div 
        className="gacha-machine-wrapper"
        animate={isSpinning ? {
          x: [0, -1, 1, -1, 1, 0],
          y: [0, 0.5, -0.5, 0.5, 0],
          rotate: [0, -0.3, 0.3, 0],
        } : {}}
        transition={{ duration: 0.3, repeat: Infinity }}
      >
        <div className="gacha-handle" />
        <div className="gacha-head">Neti & NorNor</div>
        
        <div className="gacha-glass">
          {DISPLAY_BALL_COLORS.map((color, i) => {
            const ballsPerRow = 5;
            const rowIndex = Math.floor(i / ballsPerRow);
            const colIndex = i % ballsPerRow;
            const baseLeft = 6;
            const horizontalSpacing = 17.5;

            return (
              <motion.div
                key={i}
                className="gacha-ball-item"
                style={{
                  backgroundColor: color,
                  left: `${baseLeft + (colIndex * horizontalSpacing) + (rowIndex % 2 === 0 ? 4 : -4)}%`,
                  bottom: `${5 + (rowIndex * 13)}%`,
                  zIndex: 20 - i, 
                }}
                animate={isSpinning ? {
                  x: [0, -2, 2, -1, 1, 0],
                  y: [0, -1, 1, 0],
                  rotate: [0, -5, 5, 0],
                } : { x: 0, y: 0, rotate: 0 }}
                transition={{ duration: 0.3, repeat: isSpinning ? Infinity : 0 }}
              />
            );
          })}
        </div>

        <div className="gacha-base">
          <motion.div 
            className="gacha-knob-container" 
            onClick={spinGacha}
            animate={isSpinning ? { rotate: [0, 90, 180, 270, 360] } : {}}
            transition={{ duration: 2, ease: "linear" }}
          >
            <div className="gacha-knob-handle" style={{ background: '#fbcfe8', opacity: 0.8 }} />
          </motion.div>

          <div className="gacha-exit">
            <AnimatePresence>
              {ballDropping && (
                <motion.div
                  className="gacha-prizeball"
                  style={{ backgroundColor: droppedBallColor }}
                  initial={{ y: -45, x: -10, opacity: 0, scale: 0.4 }}
                  animate={{ y: 0, x: 0, opacity: 1, scale: 1 }}
                  exit={{ y: 25, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 250, damping: 12 }}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Prize Reveal Popup */}
      <AnimatePresence>
        {showPrize && prize && (
          <motion.div className="music-popup-overlay" onClick={() => setShowPrize(false)}>
            <motion.div 
              className="quiz-result" 
              initial={{ scale: 0.5, y: 50 }} 
              animate={{ scale: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{ padding: '2rem', maxWidth: '500px', width: '90%' }}
            >
              <div className="gacha-prize-rarity" style={{ 
                background: BALL_COLORS[prize.rarity], 
                color: 'white',
                fontFamily: 'Mali',
                fontSize: '0.85rem',
                padding: '0.4rem 1.2rem',
                borderRadius: '50px',
                display: 'inline-block',
                fontWeight: 700,
                letterSpacing: '1px',
                marginBottom: '1.5rem',
                textTransform: 'uppercase'
              }}>
                {prize.rarity}
              </div>
              <div className="gacha-prize-media">
                {prize.type === 'image' ? (
                  <img src={prize.mediaUrl} alt="prize" className="gacha-prize-img" />
                ) : (
                  <video src={prize.mediaUrl} className="gacha-prize-video" controls autoPlay />
                )}
              </div>
              <h3 className="quiz-result-title" style={{ fontSize: '1.4rem' }}>ได้รับของขวัญ!</h3>
              <p className="quiz-result-text" style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>{prize.message}</p>
              <button className="next-btn" style={{ margin: '0 auto' }} onClick={() => setShowPrize(false)}>
                เก็บใส่กระเป๋า
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collection Sidebar / Overlay */}
      <AnimatePresence>
        {showCollection && (
          <motion.div className="gacha-collection-overlay" onClick={() => setShowCollection(false)}>
            <motion.div 
              className="gacha-collection-panel"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="quiz-result-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>สมุดสะสม</h2>
              <div className="gacha-collection-grid">
                {collectedItems.length > 0 ? collectedItems.map((item) => (
                  <motion.div 
                    key={item.id} 
                    className="gacha-item-card"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setPrize(item);
                      setShowPrize(true);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="collection-item-preview">
                      {item.type === 'image' ? (
                        <img src={item.mediaUrl} alt="item" />
                      ) : (
                        <video src={item.mediaUrl} muted playsInline />
                      )}
                    </div>
                    <span style={{ display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.message}
                    </span>
                  </motion.div>
                )) : (
                  <p style={{ gridColumn: 'span 2', padding: '2rem', color: '#888', fontFamily: 'Mali' }}>
                    ยังไม่มีของสะสมเลย หมุนกาชาดูสิ!
                  </p>
                )}
              </div>
              <button className="back-btn" style={{ marginTop: '1.5rem', width: '100%' }} onClick={() => setShowCollection(false)}>
                ปิดหน้าต่าง
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="quiz-navigation-footer">
        <button className="next-btn" onClick={() => setShowCollection(true)}>
          สมุดสะสม
        </button>
        <button className="back-btn" onClick={onBack}>
          ออก
        </button>
      </div>
    </motion.div>
  );
}
