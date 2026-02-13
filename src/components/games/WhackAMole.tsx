/**
 * WhackAMole — เกมตีตุ่น
 * 60 วินาที ตีให้ได้มากที่สุด
 * ตัวตุ่น = รูปภาพ (ใส่รูปจริงที่ public/images/mole/)
 * มีคะแนนเกณฑ์ต่างๆ + ผลลัพธ์ตาม tier
 * 
 * Mock: แก้ MOLE_IMAGES, RESULT_TIERS ได้เลย
 * รูปวางใน: public/images/mole/
 */
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import oakImg from '../../images/game/oak.png';

// === MOCK DATA ===
const MOLE_IMAGES = [oakImg];

const RESULT_TIERS = [
  { minScore: 30, emoji: '🏆', title: 'คุณได้รับฉายา นักตีหูกมืออาชีพ!', text: 'แค้นไรกันอะ มีไรค่อยๆคุยกันก็ได้เธอ', image: '/images/mole/result_best.png' },
  { minScore: 20, emoji: '', title: 'เก่งแล้ว แต่ยังไม่ถึงขั้นอะ!', text: 'เกือบจะชนะหูกละ ยังถือว่าอ่อนอยู่นะน้อง', image: '/images/mole/result_good.png' },
  { minScore: 10, emoji: '', title: 'เอี่ยยย!', text: 'ลองใหม่ป่าวน้อง หูกมันเก่งเกินหรือยังไง หรือจะไปนอนพักก่อนก็ได้นะนอ?', image: '/images/mole/result_ok.png' },
  { minScore: 0, emoji: '', title: 'อ่อน!', text: 'ไหวมั้ยอ่าา นอนก่อนมั้ย', image: '/images/mole/result_try.png' },
];

const GAME_DURATION = 30; // seconds
const TOTAL_HOLES = 9; // 3x3 grid
const MOLE_SHOW_INTERVAL = 700; // ms between mole appearances (slightly faster)
const MOLE_VISIBLE_DURATION = 1000; // ms a mole stays visible (slightly faster)
const STAR_THRESHOLDS = [10, 20, 30]; // score for 1, 2, 3 stars
const WHACK_TEXTS = ["ห้วยละ", "อะนั่นแน่", "เดี๋ยวๆ", "ใจเย็น", "เออะะ!!"];

interface WhackAMoleProps {
  onBack: () => void;
}

export default function WhackAMole({ onBack }: WhackAMoleProps) {
  const [gameState, setGameState] = useState<'READY' | 'PLAYING' | 'RESULT'>('READY');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [activeMoles, setActiveMoles] = useState<Set<number>>(new Set());
  const [hitHoles, setHitHoles] = useState<Set<number>>(new Set());
  const [hitTextByHole, setHitTextByHole] = useState<Record<number, string>>({});
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const moleTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopGame = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (moleTimerRef.current) clearInterval(moleTimerRef.current);
    setActiveMoles(new Set());
    setGameState('RESULT');
  }, []);

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setActiveMoles(new Set());
    setHitHoles(new Set());
    setHitTextByHole({});
    setGameState('PLAYING');
  };

  // Countdown timer
  useEffect(() => {
    if (gameState !== 'PLAYING') return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          stopGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [gameState, stopGame]);

  // Mole spawning
  useEffect(() => {
    if (gameState !== 'PLAYING') return;
    moleTimerRef.current = setInterval(() => {
      const hole = Math.floor(Math.random() * TOTAL_HOLES);
      setActiveMoles((prev) => new Set(prev).add(hole));
      // Auto-hide after visible duration
      setTimeout(() => {
        setActiveMoles((prev) => {
          const next = new Set(prev);
          next.delete(hole);
          return next;
        });
      }, MOLE_VISIBLE_DURATION);
    }, MOLE_SHOW_INTERVAL);
    return () => { if (moleTimerRef.current) clearInterval(moleTimerRef.current); };
  }, [gameState]);

  const [hammerHole, setHammerHole] = useState<number | null>(null);
  const whackSound = useRef(new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'));

  const whackMole = (holeIndex: number) => {
    // Play sound on click (even if it's a miss, or only on hit?)
    // User asked for "เสียงเฟคเฟคตี" so maybe always play hit sound or only on success.
    // Let's play a shorter hit sound on success.
    if (activeMoles.has(holeIndex)) {
      whackSound.current.currentTime = 0;
      whackSound.current.volume = 0.3;
      whackSound.current.play().catch(() => {});

      // Pick a random text
      const randomText = WHACK_TEXTS[Math.floor(Math.random() * WHACK_TEXTS.length)];
      setHitTextByHole(prev => ({ ...prev, [holeIndex]: randomText }));

      setScore((s) => s + 1);
      setActiveMoles((prev) => {
        const next = new Set(prev);
        next.delete(holeIndex);
        return next;
      });
      // Set hit for this hole
      setHitHoles((prev) => new Set(prev).add(holeIndex));
      
      // Clear hit effect after duration
      setTimeout(() => {
        setHitHoles((prev) => {
          const next = new Set(prev);
          next.delete(holeIndex);
          return next;
        });
      }, 600);
    }

    // Always show hammer on click
    setHammerHole(holeIndex);
    setTimeout(() => setHammerHole(null), 150);
  };

  const getResult = () => {
    return RESULT_TIERS.find((t) => score >= t.minScore) || RESULT_TIERS[RESULT_TIERS.length - 1];
  };

  // READY screen
  if (gameState === 'READY') {
    return (
      <motion.div className="whack-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="whack-ready">
          <motion.div
            className="whack-ready-preview"
            animate={{ 
              rotate: [0, -10, 10, 0],
              scale: [1, 1.1, 1],
              y: [0, -10, 0]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <img src={oakImg} alt="oak-mole" className="ready-mole-img" />
            <div className="ready-hammer">🔨</div>
          </motion.div>
          <h1 className="whack-ready-title">เกมตีหูก!</h1>
          <p className="whack-ready-desc">จับเวลา {GAME_DURATION} วินาที<br />แค้นเท่าไหนตีเท่านั้น!</p>
          <motion.button
            className="whack-start-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
          >
            เริ่มเลย!
          </motion.button>
          <button className="back-btn" onClick={onBack}>กลับ</button>
        </div>
      </motion.div>
    );
  }

  // RESULT screen
  if (gameState === 'RESULT') {
    const result = getResult();
    return (
      <motion.div className="whack-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <motion.div
          className="whack-result"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <div className="whack-result-emoji">{result.emoji}</div>
          <h2 className="whack-result-title">{result.title}</h2>
          <p className="whack-result-score">คะแนน: {score}</p>
          <p className="whack-result-text">{result.text}</p>
          {result.image && (
            <img
              src={result.image}
              alt="result"
              className="whack-result-img"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          )}
          <div className="quiz-result-actions">
            <button className="next-btn" onClick={startGame}>เล่นอีกครั้ง</button>
            <button className="back-btn" onClick={onBack}>กลับเมนูเกม</button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // PLAYING screen
  const maxScore = STAR_THRESHOLDS[STAR_THRESHOLDS.length - 1];
  const progressPercent = Math.min((score / maxScore) * 100, 100);

  return (
    <motion.div className="whack-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* HUD */}
      <div className="whack-hud-top">
        <div className={`whack-hud-time ${timeLeft <= 10 ? 'urgent' : ''}`}>
          <span className="icon">⏱️</span> {timeLeft}s
        </div>
        <div className="whack-hud-score">
          <span className="icon">🎯</span> {score}
        </div>
      </div>

      {/* Star Progress Bar */}
      <div className="whack-star-wrapper">
        <div className="whack-star-bar-bg">
          <motion.div 
            className="whack-star-bar-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ type: 'spring', stiffness: 50, damping: 15 }}
          />
          {STAR_THRESHOLDS.map((threshold, idx) => (
            <div 
              key={idx} 
              className={`whack-star-node ${score >= threshold ? 'active' : ''}`}
              style={{ left: `${(threshold / maxScore) * 100}%` }}
            >
              <motion.div 
                className="star-icon"
                animate={score >= threshold ? { scale: [1, 1.5, 1], rotate: [0, 15, -15, 0] } : {}}
              >
                ⭐
              </motion.div>
              <div className="star-threshold">{threshold}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Game Grid */}
      <div className="whack-grid">
        {Array.from({ length: TOTAL_HOLES }).map((_, i) => (
          <div
            key={i}
            className={`whack-hole ${hitHoles.has(i) ? 'hit' : ''}`}
            onClick={() => whackMole(i)}
          >
            <div className="whack-hole-visual">
               <div className="whack-hole-dirt" />
            </div>
            
            <AnimatePresence>
              {activeMoles.has(i) && (
                <motion.div
                  className="whack-mole"
                  initial={{ y: 120, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: 120, opacity: 0, scale: 0.8 }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 450, 
                    damping: 20 
                  }}
                >
                  <img
                    src={MOLE_IMAGES[0]}
                    alt="mole"
                    className="whack-mole-img"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hit Effects Layer */}
            <AnimatePresence>
              {hitHoles.has(i) && (
                <motion.div 
                  className="whack-hit-text"
                  initial={{ opacity: 0, y: 0, scale: 0.5 }}
                  animate={{ opacity: 1, y: -40, scale: 1.2 }}
                  exit={{ opacity: 0, scale: 1.5 }}
                >
                  {hitTextByHole[i]}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hammer Animation */}
            <AnimatePresence>
              {hammerHole === i && (
                <motion.div 
                  className="whack-hammer"
                  initial={{ rotate: -45, x: 20, y: -60, opacity: 0 }}
                  animate={{ rotate: 15, x: 0, y: -20, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  🔨
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
