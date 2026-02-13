import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Login from './components/Login';
import Loader from './components/Loader';
import Letter from './components/Letter';
import Message from './components/Message';
import { Sidebar } from './components/Sidebar';
import { FilmCarousel, type Memory } from './components/FilmCarousel';
import { Note } from './components/Note';
import GameHub from './components/games/GameHub';
import QuizGame from './components/games/QuizGame';
import WhackAMole from './components/games/WhackAMole';
import MusicQuiz from './components/games/MusicQuiz';
import GachaGame from './components/games/GachaGame';
import { PageLoader } from './components/shared/PageLoader';
import { BackgroundMusic } from './components/shared/BackgroundMusic';
import './styles.css';

import flower2Img from './images/flower2.jpg';
import flower3Img from './images/flower3.jpg';
import loveuImg from './images/loveu.jpg';
import loveu2Img from './images/loveu2.jpg';
import markImg from './images/mark.png';
import meandyouImg from './images/meandyou.jpg';
import oak2Img from './images/oak2.jpg';
import omgImg from './images/omg.jpg';
import paktomImg from './images/paktom.png';
import screen1Img from './images/Screenshot 2026-01-31 165620.png';
import screen2Img from './images/Screenshot 2026-02-12 003543.png';

// All possible app states
type AppState = 
  | 'LOGIN' | 'LOADING' | 'LETTER' | 'GALLERY' | 'MESSAGE' 
  | 'GAME_HUB' | 'GAME_QUIZ' | 'GAME_WHACK' | 'GAME_MUSIC' | 'GAME_GACHA';

const MEMORIES: Memory[] = [
  { id: 1, src: meandyouImg, captionHeader: 'หลงรักเธอมากขึ้นทุกวัน', captionBody: 'เค้ามีความสุขมากเลยได้นอนเน่า ดูหนังกับแฟน ได้ดูยูทูปตลกๆด้วยกัน เป็นช่วงเวลาสองวันกับอีกนิดนึงที่เค้ามีความสุขมากกกกกกกกกกกกก เค้ายิ้มไม่หยุดเลยคิดถึงเธอจังอยากจะอยู่ด้วยกันทุกวันเลยอยากไปไหนมาไหนด้วยกัน แต่เราอยู่ห่างเค้ากลับไม่รู้สึกว่าเค้ารักเธอน้อยลงเลย กลับกันการได้เจอกันแต่ละครั้งมันทำให้มีความหมายมากเลย พอจะเจอแต่ละทีจะอิ่มเอมมากแน่ๆ ขนาดอยู่ไกลยังคิดถึงขนาดนี้ หลงรักแฟนขนาดนี้ รักแฟนนะครับ' },
  { id: 2, src: loveuImg, captionHeader: 'วันที่ไปงานรับปริญญาจบของเธอ', captionBody: 'เขินมากวันนั้น ไปเจอเพื่อนๆน้องๆเธอเต็มเลย ทำตัวไม่ถูกคือนั่งรอแฟนอย่างเดียวไม่กล้าทำไรเลย เขินทำตัวไม่ถูก ไม่เคยมางานไรงี้5555555 ดีใจมากได้มาเจอแฟน แฟนสวยมากแล้ววันนั้นเค้าทำขนตาแฟนหลุดด้วย เพราะความห่วงใยที่กลัวแฟนร้อนเปิดพัดลมจิ๋วแรงขนตาหลุดเลย5555555' },
  { id: 3, src: loveu2Img, captionHeader: 'พรีเวดดิ้งสุดๆ ', captionBody: 'เจอเธอเขินมาก แฟนตีท้องเค้าด้วยดีนะเกร็งอัตโนมัติเจอกล้ามเค้าสะท้อนคืนไป ตอนนั้นแอบกลัวแฟนไม่ชอบของขวัญที่ให้ ก็คือถือโกโจเดินอ้อมมอ รู้เลยแฟนไม่กล้าถือเดี๋ยวเขาว่าเบียวเราต้องเบียวแบบเปิดเผยสิเธอ555555555' },
  { id: 4, src: flower3Img, captionHeader: 'you are my flowers', captionBody: 'ชอบรูปนี้มากตอนแรกจะรอลงเที่ยงคืน แต่บอกอยากลง จริงๆเค้าอะจะลงก่อนอยู่แน้ว แผนการโดนเปิดเผย แต่ลงวันไหนเค้าก็รักแฟนอยู่ดีชอบแฟน หลงแฟน หลงมากมาก แฟนน่ารัก คิดถึงบะบี๋นะครับ' },
  { id: 5, src: oak2Img, captionHeader: 'แฟนไม่ยอมกลับ', captionBody: ' เธอไม่ยอมกลับ บอกให้เค้าเรียกแกร๊บมาก่อน แฟนช่วยจ่ายค่าแกร๊บด้วยฮือขอบคุณน้าช่วยต่อชีวิตน้องโอ๊ค แฟนใส่ใจเค้ามากเลยอะขนาดแฟนเหนื่อยมาทั้งวัน ยังเป็นห่วงเค้า รักแฟนนะครับ' },
  { id: 6, src: omgImg, captionHeader: 'ชอบรูปนี้มาก', captionBody: 'ชอบรูปนี้มากอะ แฟนสวยแบบตะโกน สวยตาแตกของจริง คือจึ้งมากกกก แฟนเค้าสวยยย ชอบจัง ชอบแฟน ชอบมากมาก ชอบคนเดียวด้วยไม่ให้ใครมาชอบด้วย' },
  { id: 7, src: flower2Img, captionHeader: 'ดอกไม้เค้าตั้งใจเลือกให้เลยน้า', captionBody: 'ดีใจที่แฟนชอบดอกไม้ที่เค้าให้ แฟนมีการเอาหนังสือทับไว้ด้วย น่ารักมากจัง คนสวยๆเหมาะกับดอกไม้สวยๆ' },
  { id: 8, src: paktomImg, captionHeader: 'ผักต้ม', captionBody: 'แฟนกินยาแล้วอ๊องมาก เอ็นดู ปากบอกเค้าว่าไม่ง่วงเผลออีกทีนอนกอดผักต้มหลับปุ๋ยแล้ว น่ารักจัง' },
  { id: 9, src: markImg, captionHeader: 'มาร์กหน้ายังสวย', captionBody: 'เค้าแอบแคปมา แฟนไม่รู้ตัวหรอกอิอิ ทำไมแฟนสวยจัง จะทำอะไรก็สวยไปหมด น่ารักมากก มาร์กหน้ายังงสวยย เค้าหลงรักแฟนวันละสิบร้านรอบแล้วรู้ม้ายยย~' },
  { id: 10, src: screen1Img, captionHeader: 'แฟนทำของขวัญให้เพื่อน', captionBody: 'เค้าชอบอะมุมนี้แฟนสวยอีกแล้วแฟนสวยทุกมุม ชุดนี้แฟนใส่สวยมากเลย วันนั้นแฟนนั่งทำของขวัญให้เพื่อนใส่ใจมากชอบดูเวลาแฟนทำงานศิลป์ ละนุ่นก็มาแอบดู555555' },
  { id: 11, src: screen2Img, captionHeader: 'พลังคลื่นเต่า', captionBody: 'เอ็นดูแฟนมาก พากันเบียวละทำพลังคลื่นเต่าอะ555555' },
];

function App() {
  const [currentState, setCurrentState] = useState<AppState>('LOGIN');
  const [showSidebar, setShowSidebar] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const isGameActive = ['GAME_QUIZ', 'GAME_WHACK', 'GAME_MUSIC', 'GAME_GACHA'].includes(currentState);

  const handleLoginSuccess = () => {
    setCurrentState('LOADING');
    setTimeout(() => {
      setCurrentState('LETTER');
    }, 3500);
  };

  const handleOpenLetter = () => {
    setCurrentState('MESSAGE');
    setShowSidebar(true);
  };

  const navigateTo = (state: AppState, withLoader = false) => {
    if (withLoader) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentState(state);
        setIsTransitioning(false);
      }, 1500);
    } else {
      setCurrentState(state);
    }
  };

  const handleMenuSelect = (item: string) => {
    if (item === 'HOME') navigateTo('LOGIN');
    if (item === 'MEMORIES') navigateTo('GALLERY');
    if (item === 'LETTER') navigateTo('MESSAGE');
    if (item === 'GAME') navigateTo('GAME_HUB');
  };

  const handleSelectGame = (game: string) => {
    if (game === 'QUIZ') navigateTo('GAME_QUIZ', true);
    if (game === 'WHACK') navigateTo('GAME_WHACK', true);
    if (game === 'MUSIC') navigateTo('GAME_MUSIC', true);
    if (game === 'GACHA') navigateTo('GAME_GACHA', true);
  };

  return (
    <div className="App">
      <BackgroundMusic isPlaying={!isGameActive && currentState !== 'LOADING'} />
      {showSidebar && <Sidebar onSelect={handleMenuSelect} />}

      {/* Transition Loader */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key="transition-loader"
            style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <PageLoader />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {currentState === 'LOGIN' && (
          <Login key="login" onSuccess={handleLoginSuccess} />
        )}
        
        {currentState === 'LOADING' && (
          <Loader key="loader" />
        )}
        
        {currentState === 'LETTER' && (
          <Letter key="letter" onOpen={handleOpenLetter} />
        )}

        {currentState === 'GALLERY' && (
          <motion.div 
            key="gallery"
            className="gallery-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="content-wrapper">
              <h1 className="page-title">memories</h1>
              
              <div className="carousel-section">
                <FilmCarousel memories={MEMORIES} />
              </div>

              <div className="notes-section">
                <Note 
                  header="love story" 
                  body="ขอบคุณที่เธอทักเค้ามานะวันนั้น ไม่รู้อะไรดลใจที่เธอทักมา แล้วก็ไม่รู้อะไรดลใจให้ไอจีแนะนำเธอมาให้เค้า คือแบบสวยมากอะเห็นเธอจบแล้วก็เลยกดใจคอนแกรท เพราะไม่กล้าทักไปหรอก ละเธอก็ทักมาเค้าแบบเห้ยย เชี่ยตกใจมาก ใจเต้นตุบๆเลย แล้วก็ตัดสินใจพูดตรงๆไปเลยว่าอยากคุยนะ เราคุยกันดูมั้ย แล้วคลิ๊กกันแบบสุดๆ เราไลฟ์สไตล์คล้ายๆกันหลายๆอย่างก็เลยคุยกันนสนุกมีความสุขมาก"
                  footer="14 Feb 2026"
                />
              </div>

              <button className="next-btn" onClick={() => navigateTo('LETTER')}>
              กลับไปอ่านจดหมาย
              </button>
            </div>
          </motion.div>
        )}

        {currentState === 'MESSAGE' && (
          <div className="message-wrapper" key="message-wrap">
            <Message key="message" />
            <button 
              className="back-btn"
              onClick={() => navigateTo('GALLERY')}
              style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 100 }}
            >
              ถัดไป
            </button>
          </div>
        )}

        {/* GAME HUB */}
        {currentState === 'GAME_HUB' && (
          <motion.div key="game-hub" className="game-page-wrapper"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <GameHub onSelectGame={handleSelectGame} />
          </motion.div>
        )}

        {/* INDIVIDUAL GAMES */}
        {currentState === 'GAME_QUIZ' && (
          <motion.div key="game-quiz" className="game-page-wrapper"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <QuizGame onBack={() => navigateTo('GAME_HUB')} />
          </motion.div>
        )}

        {currentState === 'GAME_WHACK' && (
          <motion.div key="game-whack" className="game-page-wrapper"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <WhackAMole onBack={() => navigateTo('GAME_HUB')} />
          </motion.div>
        )}

        {currentState === 'GAME_MUSIC' && (
          <motion.div key="game-music" className="game-page-wrapper"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <MusicQuiz onBack={() => navigateTo('GAME_HUB')} />
          </motion.div>
        )}

        {currentState === 'GAME_GACHA' && (
          <motion.div key="game-gacha" className="game-page-wrapper"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <GachaGame onBack={() => navigateTo('GAME_HUB')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
