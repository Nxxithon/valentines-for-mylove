/**
 * QuizGame — เกมทายใจคนรัก
 * มี 10 คำถาม แต่ละข้อมี 4 ตัวเลือก
 * รองรับรูปภาพประกอบ (optional)
 * 
 * Mock data: แก้ QUIZ_DATA เพื่อเปลี่ยนคำถาม/คำตอบ/รูป
 * รูปวางใน: public/images/quiz/
 */
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizQuestion {
  id: number;
  question: string;
  image?: string; // optional path e.g. "/images/quiz/q1.jpg"
  choices: string[];
  correctIndex: number;
  iscorrect_output: string;
  iswrong_output: string;
}

// === MOCK DATA — แก้ตรงนี้ได้เลย! ===
const QUIZ_DATA: QuizQuestion[] = [
  {
    id: 1,
    question: 'โอ๊คชอบของหวานเมนูไหน?',
    image: '/images/quiz/q1.jpg', // ใส่รูปได้ หรือลบบรรทัดนี้ก็ได้
    choices: ['ช็อกโกแลต', 'หม้อแกง', 'บัวลอย', 'ขนมปัง'],
    correctIndex: 0,
    iscorrect_output: 'อ้ะถั่วต้วมม โอ๊คชอบช็อกโกแลต',
    iswrong_output: 'โถ่วว ชื่อไอจีก็มีรูปช็อกโกแลตขนาดนั้น ไหนจะชื่อติ๊กตอกอีก -.-'
  },
  {
    id: 2,
    question: 'โอ๊คชอบอนิเมะเรื่องอะไรช่วงนี้?',
    choices: ['Jujutsu Kaisen', 'One Piece', 'Frieren', 'My Hero Academia'],
    correctIndex: 0,
    iscorrect_output: 'อีมาเดโม! อาวาซึนเด-รือออ ยูอามายสเปเชียลลล ตื่อดื๊อดื้อดือดือดึด',
    iswrong_output: 'โห่ว จริงๆก็ชอบหมดแหละแต่ช่วงนี้เบียวเจเจเค'
  },
  {
    id: 3,
    question: 'ถ้ามีคนจมน้ำ นอนอ จะช่วยใคร?',
    choices: ['แม่', 'โอ๊ค', 'แมว', 'น้าเป้'],
    correctIndex: 1,
    iscorrect_output: 'ถูก เพราะโอ๊คจะไปเอาเครื่องเคลื่อนย้าย3มิติมาช่วยคนที่เหลือเอง เบียววะ5555555',
    iswrong_output: 'โห่วดูเลือก เค้าก็สู่ขิตไปเลยสิงี้ !'
  },
  {
    id: 4,
    question: 'สิ่งที่เราทั้งคู่ชอบเหมือนกันคืออะไร?',
    choices: ['นอน', 'ดูหนัง', 'ชอบแฟน', 'ถูกทุกข้อ'],
    correctIndex: 3,
    iscorrect_output: 'ช่ายนอนอืดด้วยกัน ต่างคนต่างจีบกัน ชอบอะ <3',
    iswrong_output: 'ถูกเหมือนกัน แต่อันนู้นถูกกว่าไว้แก้มือนะแฟน'
  },
  {
    id: 5,
    question: 'วันครบรอบของเราคือวันที่เท่าไหร่?',
    choices: ['14 กุมภาพันธ์', '29 มกราคม', '29 ธันวาคม', '14 มีนาคม'],
    correctIndex: 1,
    iscorrect_output: 'ถูกต้อง แต่เดือนนี้เราไม่มีวันครบรอบ อือนอยวะปี2026ทำไรเรา',
    iswrong_output: 'อ๋าาาา เค ไปจำของใครมา เคดิ่ เคดิ่นอนอ'
  },
  {
    id: 6,
    question: 'สีที่เราชอบคือสีอะไร?',
    choices: ['ดำ', 'ฟ้า', 'แดง', 'ม่วง'],
    correctIndex: 0,
    iscorrect_output: 'ถูก เราทั้งคู่เน้นสีดำ ทั้งชุด555555',
    iswrong_output: 'อืม ไม่ตอบสีชมพูเลยละ อ่อไม่มี'
  },
  {
    id: 7,
    question: 'สัตว์เลี้ยงที่เราเลี้ยงด้วยกันคือ?',
    choices: ['แมว', 'หมา', 'หนอนโทจิ', 'ไดโนเสาร์'],
    correctIndex: 0,
    iscorrect_output: 'แมวว แต่จะสะสมโมเดลนะ ไว้ค่อยคิดแต่แมวน่าร๊ากก',
    iswrong_output: 'แต่ละมื้อแต่ละเดย์ เห้ออ'
  },
  {
    id: 8,
    question: 'ที่อยากไปเที่ยวด้วยกันตอนมีตังคือที่ไหน?',
    choices: ['ญี่ปุ่น', 'เกาหลี', 'ยุโรป', 'ที่สงบๆมีวิวสวยๆ'],
    correctIndex: 0,
    iscorrect_output: 'ช่ายย ไว้ทำงานเก็บตังไปเที่ยวด้วยกันนะ',
    iswrong_output: 'อันนั้นก็อยากไป แต่หลังจากญี่ปุ่นเนาะะ'
  },
  {
    id: 9,
    question: 'โอ๊คชอบแฟนมากแค่ไหน?',
    choices: ['ชอบมาก', 'ชอบที่สุดในโลก', 'ชอบที่สุดในสิบโลก', 'ชอบที่สุดในสิบล้านโลก'],
    correctIndex: 3,
    iscorrect_output: 'ชอบแฟนที่สุดในสิบล้านล้านโลกเลยย',
    iswrong_output: 'ชอบเหมือนกัน แต่ชอบเยอะกว่านั้น'
  },
  {
    id: 10,
    question: 'คำพูดที่อยากบอกอีกคนคือ?',
    image: '/images/quiz/q10.jpg',
    choices: ['รักนะ', 'คิดถึง', 'ขอบคุณ', 'ทุกข้อเลย!'],
    correctIndex: 3,
    iscorrect_output: 'โอ๊คชอบคำพูดที่อยากบอกอีกคนคือรักนะ',
    iswrong_output: 'โอ๊คไม่ชอบคำพูดที่อยากบอกอีกคนคือรักนะ'
  },
];

interface QuizGameProps {
  onBack: () => void;
}

export default function QuizGame({ onBack }: QuizGameProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(QUIZ_DATA.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [showTapHint, setShowTapHint] = useState(false);

  const correctSound = useRef(new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3'));
  const wrongSound = useRef(new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'));

  const question = QUIZ_DATA[currentQ];
  const selectedChoice = answers[currentQ];
  const answered = selectedChoice !== null;

  const handleChoice = (choiceIndex: number) => {
    if (answered) return;
    
    const newAnswers = [...answers];
    newAnswers[currentQ] = choiceIndex;
    setAnswers(newAnswers);

    if (choiceIndex === question.correctIndex) {
      setScore((s) => s + 1);
      correctSound.current.volume = 0.2;
      correctSound.current.currentTime = 0;
      correctSound.current.play().catch(() => {});
    } else {
      wrongSound.current.volume = 0.2;
      wrongSound.current.currentTime = 0;
      wrongSound.current.play().catch(() => {});
    }
  };

  // Effect to show tap hint after delay
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (answered) {
      setShowTapHint(false);
      timer = setTimeout(() => {
        setShowTapHint(true);
      }, 2000);
    } else {
      setShowTapHint(false);
    }
    return () => clearTimeout(timer);
  }, [answered, currentQ]);

  const nextQuestion = () => {
    if (currentQ < QUIZ_DATA.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
    }
  };

  const prevQuestion = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
    }
  };

  const getResultMessage = () => {
    const percent = (score / QUIZ_DATA.length) * 100;
    if (percent === 100) return { emoji: '💯', text: 'เก่งมากก!! รู้จักกันดีสุดๆเลย!', sub: 'คู่นี้ ใครก็อิจฉา 💕' };
    if (percent >= 70) return { emoji: '🥰', text: 'รู้จักกันดีมากเลยนะ!', sub: 'น่ารักจัง ไปกินข้าวด้วยกันเถอะ 🍽️' };
    if (percent >= 40) return { emoji: '😊', text: 'พอใช้ได้! ต้องใช้เวลาเรียนรู้กันอีกนิด', sub: 'ไม่เป็นไร ค่อยๆทำความรู้จักกันนะ 🌸' };
    return { emoji: '😅', text: 'อืมม ต้องเรียนรู้กันมากกว่านี้!', sub: 'งั้นต้องไปเดทกันบ่อยๆแล้วล่ะ 💝' };
  };

  if (showResult) {
    const result = getResultMessage();
    return (
      <motion.div
        className="quiz-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="quiz-result"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <div className="quiz-result-emoji">{result.emoji}</div>
          <h2 className="quiz-result-title">ได้ {score} / {QUIZ_DATA.length} คะแนน!</h2>
          <p className="quiz-result-text">{result.text}</p>
          <p className="quiz-result-sub">{result.sub}</p>
          <div className="quiz-result-actions">
            <button className="next-btn" onClick={() => {
              setCurrentQ(0);
              setScore(0);
              setAnswers(new Array(QUIZ_DATA.length).fill(null));
              setShowResult(false);
            }}>
              เล่นอีกครั้ง
            </button>
            <button className="back-btn" onClick={onBack}>
              กลับเมนูเกม
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="quiz-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Small Top Hint */}
      <AnimatePresence>
        {showTapHint && (
          <motion.div 
            className="quiz-top-hint"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            แตะที่หน้าจอหรือปุ่มเพื่อไปต่อ
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tap Overlay (invisible) */}
      {answered && (
        <div 
          className="quiz-tap-overlay-hidden"
          onClick={nextQuestion}
        />
      )}

      {/* Progress Bar */}
      <div className="quiz-progress">
        <div className="quiz-progress-bar" style={{ width: `${((currentQ + 1) / QUIZ_DATA.length) * 100}%` }} />
      </div>
      <div className="quiz-progress-text">ข้อ {currentQ + 1} / {QUIZ_DATA.length}</div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          className="quiz-question-card"
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -80, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Optional Image */}
          {question.image && (
            <div className="quiz-image-wrapper">
              <img
                src={question.image}
                alt="Question"
                className="quiz-image"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          )}

          <h2 className="quiz-question-text">{question.question}</h2>

          <div className="quiz-choices">
            {question.choices.map((choice, i) => {
              let choiceClass = 'quiz-choice';
              if (answered) {
                if (i === question.correctIndex) choiceClass += ' correct';
                else if (i === selectedChoice) choiceClass += ' wrong';
              }
              return (
                <motion.button
                  key={i}
                  className={choiceClass}
                  onClick={() => handleChoice(i)}
                  whileHover={!answered ? { scale: 1.03 } : {}}
                  whileTap={!answered ? { scale: 0.97 } : {}}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <span className="quiz-choice-letter">{String.fromCharCode(65 + i)}</span>
                  {choice}
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence>
            {answered && (
              <motion.div 
                className={`quiz-feedback ${selectedChoice === question.correctIndex ? 'correct' : 'wrong'}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                {selectedChoice === question.correctIndex ? question.iscorrect_output : question.iswrong_output}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      <div className="quiz-navigation-footer">
        {currentQ > 0 && (
          <button className="back-btn" onClick={prevQuestion}>
            ย้อนกลับ
          </button>
        )}
        <button className="back-btn" onClick={onBack}>
          ออก
        </button>
      </div>
    </motion.div>
  );
}
