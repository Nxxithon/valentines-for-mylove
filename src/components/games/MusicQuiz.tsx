import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Imports from assets
import aAudio from '../musicquiz/a_audio.mp3';
import cAudio from '../musicquiz/c_audio.mp3';
import collect1 from '../musicquiz/collect_1.png';
import wrong1 from '../musicquiz/wrong_1.png';
import makiBinding from '../musicquiz/maki - binding.png';
import makiFull from '../musicquiz/maki.png';

type QuestionType = 'audio' | 'image-choice' | 'image-reveal';

interface MusicQuestion {
  id: number;
  type: QuestionType;
  mediaUrl?: string;
  question: string;
  choices?: string[];
  images?: string[]; // For image-choice
  correctIndex: number;
  revealImage?: string; // For image-reveal or after feedback
  feedbackMsg?: {
    correct: string;
    wrong: string;
  };
}

const MUSIC_QUIZ_DATA: MusicQuestion[] = [
  {
    id: 1,
    type: 'audio',
    mediaUrl: aAudio,
    question: 'เพลงนี้มาจากเรื่องอะไร?',
    choices: ['Spy x Family', 'ChainsawMan', 'Attack on Titan', 'Overlord'],
    correctIndex: 2,
    feedbackMsg: {
      correct: 'คนเบียวๆก็ต้องตอบถูกกกก',
      wrong: 'เอาดี เธอตอบไม่ถูกได้งาย'
    }
  },
  {
    id: 2,
    type: 'audio',
    mediaUrl: cAudio,
    question: 'แล้วเพลงนี้ล่ะ เพลงเรื่องไรน้า?',
    choices: ['Spy x Family', 'ChainsawMan', 'Jujutsu Kaisen', 'Overlord'],
    correctIndex: 1,
    feedbackMsg: {
      correct: 'ถั่วต้วมมม เบียวยังง',
      wrong: 'เอาดีเธอ ไหนบอกเรื่องโปรด'
    }
  },
  {
    id: 3,
    type: 'image-choice',
    question: 'ภาพไหนคือภาพที่ถูก ฮันจิตาบอดข้างไหนน้าาา?',
    images: [wrong1, collect1], // [wrong, correct]
    correctIndex: 1,
    feedbackMsg: {
      correct: 'สมกับเป็นแฟนตัวยงพี่ฮันจิ!',
      wrong: 'โห ไหนบอกแฟนตัวยงอะ'
    }
  },
  {
    id: 4,
    type: 'image-reveal',
    question: 'ทาย ชื่อตัวละครในภาพนี้คือออ!!',
    revealImage: makiBinding,
    choices: ['Nobara', 'Maki', 'Mai', 'Neti'],
    correctIndex: 1,
    feedbackMsg: {
      correct: 'อะอะ ถูกต้องง มากิแฟนเธอไงง',
      wrong: 'ไรอ่าแฟน ทำดีดี คิดอีกรอบ'
    }
  }
];

interface MusicQuizProps {
  onBack: () => void;
}

export default function MusicQuiz({ onBack }: MusicQuizProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const question = MUSIC_QUIZ_DATA[currentQ];

  useEffect(() => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    
    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [currentQ]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else {
        audioRef.current.volume = 0.1;
        audioRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const correctSound = useRef(new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3'));
  const wrongSound = useRef(new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'));

  const handleChoice = (idx: number) => {
    if (answered) return;
    setSelectedIdx(idx);
    setAnswered(true);
    if (idx === question.correctIndex) {
      setScore((s) => s + 1);
      correctSound.current.volume = 0.25;
      correctSound.current.currentTime = 0;
      correctSound.current.play().catch(() => {});
    } else {
      wrongSound.current.volume = 0.25;
      wrongSound.current.currentTime = 0;
      wrongSound.current.play().catch(() => {});
    }
    setShowPopup(true);
  };

  const nextStep = () => {
    setShowPopup(false);
    setTimeout(() => {
      if (currentQ < MUSIC_QUIZ_DATA.length - 1) {
        setCurrentQ(currentQ + 1);
        setAnswered(false);
        setSelectedIdx(null);
      } else {
        setShowResult(true);
      }
    }, 300);
  };

  if (showResult) {
    return (
      <div className="quiz-container">
        <motion.div className="quiz-result" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="quiz-result-emoji">⭐</div>
          <h2 className="quiz-result-title">ให้เลยแหละ!</h2>
          <p className="quiz-result-text" style={{ marginBottom: '1.5rem' }}>ได้ไป {score} / {MUSIC_QUIZ_DATA.length} คะแนน</p>
          <div className="quiz-result-actions">
            <button className="next-btn" style={{ margin: '0.5rem 0' }} onClick={() => {
              setCurrentQ(0); setScore(0); setAnswered(false); setShowResult(false);
            }}>เล่นไหม่อีกรอบ</button>
            <button className="back-btn" style={{ margin: '0.5rem 0' }} onClick={onBack}>กลับเมนูเกม</button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      {/* Progress */}
      <div className="quiz-progress">
        <div className="quiz-progress-bar" style={{ width: `${((currentQ + 1) / MUSIC_QUIZ_DATA.length) * 100}%` }} />
      </div>
      <div className="quiz-progress-text">ข้อ {currentQ + 1} / {MUSIC_QUIZ_DATA.length}</div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          className="quiz-question-card"
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -80, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="quiz-question-text">{question.question}</h2>

          {/* Render by type */}
          {question.type === 'audio' && (
            <div className="music-player-section">
              <audio ref={audioRef} src={question.mediaUrl} onEnded={() => setIsPlaying(false)} />
              <div className="vinyl-wrapper" style={{ margin: '0 auto 1.5rem' }}>
                <motion.div 
                  className="vinyl-record"
                  animate={isPlaying ? { rotate: 360 } : {}}
                  transition={isPlaying ? { duration: 4, repeat: Infinity, ease: "linear" } : { duration: 0.5 }}
                >
                  <div className="vinyl-grooves" />
                  <div className="vinyl-label"><span>🎵</span></div>
                </motion.div>
              </div>
              <button className="next-btn" style={{ margin: '0 auto 2rem' }} onClick={togglePlay}>
                {isPlaying ? 'หยุด' : 'เล่น'}
              </button>
            </div>
          )}

          {question.type === 'image-choice' && (
            <div className="image-choice-grid">
              {question.images?.map((img, i) => (
                <motion.div
                  key={i}
                  className={`image-choice-item ${answered && i === selectedIdx ? (i === question.correctIndex ? 'correct' : 'wrong') : ''}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleChoice(i)}
                >
                  <img src={img} alt="choice" className="quiz-image" />
                </motion.div>
              ))}
            </div>
          )}

          {question.type === 'image-reveal' && (
            <div className="quiz-image-wrapper">
              <img src={question.revealImage} alt="guess" className="quiz-image blur-reveal" />
            </div>
          )}

          {/* Choices for audio and text types */}
          {(question.type === 'audio' || question.type === 'image-reveal') && (
            <div className="quiz-choices">
              {question.choices?.map((c, i) => {
                let choiceClass = 'quiz-choice';
                if (answered) {
                  if (i === question.correctIndex) choiceClass += ' correct';
                  else if (i === selectedIdx) choiceClass += ' wrong';
                }
                return (
                  <button 
                    key={i} 
                    className={choiceClass}
                    onClick={() => handleChoice(i)}
                  >
                    <span className="quiz-choice-letter">{String.fromCharCode(65 + i)}</span>
                    {c}
                  </button>
                );
              })}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="quiz-navigation-footer">
        <button className="back-btn" onClick={onBack}>
          ออก
        </button>
      </div>

      {/* Popup Feedback */}
      <AnimatePresence>
        {showPopup && (
          <motion.div 
            className="music-popup-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="quiz-result"
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              style={{ maxWidth: '400px', padding: '2.5rem' }}
            >
              <div className="popup-status-icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                {selectedIdx === question.correctIndex ? '' : ''}
              </div>
              <h3 className="quiz-result-title">{selectedIdx === question.correctIndex ? 'ถูกต้องนะคร้าบบ!' : 'ว๊ายย ผิดแล้วว!'}</h3>
              <p className="quiz-result-text" style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
                {selectedIdx === question.correctIndex ? question.feedbackMsg?.correct : question.feedbackMsg?.wrong}
              </p>
              
              {/* Special Reveal for Maki */}
              {question.id === 4 && (
                <div className="quiz-image-wrapper" style={{ margin: '1.5rem 0' }}>
                  <p style={{ fontFamily: 'Mali', marginBottom: '0.8rem', fontWeight: 700, color: '#666' }}>เฉลยยย:</p>
                  <img src={makiFull} alt="maki full" className="quiz-image" />
                </div>
              )}

              <button className="next-btn" style={{ margin: '0 auto' }} onClick={nextStep}>
                {currentQ < MUSIC_QUIZ_DATA.length - 1 ? 'ข้อต่อไป' : 'ดูคะแนนรวม'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
