/**
 * GameHub — หน้ารวมเกมทั้งหมด
 * ให้เลือกเกมจาก 4 เกม:
 * 1. เกมเลือกคำตอบ (Quiz)
 * 2. เกมตีตุ่น (WhackAMole)
 * 3. เกมคนเบียว (MusicQuiz)
 * 4. เกมกาชาปอง (Gacha)
 */
import { motion } from 'framer-motion';
import { GameCard } from '../shared/GameCard';

interface GameHubProps {
  onSelectGame: (game: string) => void;
}

const GAMES = [
  {
    id: 'QUIZ',
    icon: '🤍',
    title: 'เกมตอบคำถามเกี่ยวกับโอ๊ค',
    description: 'ตอบคำถามเกี่ยวกับเรา 10 ข้อ!',
    color: '#f472b6',
  },
  {
    id: 'WHACK',
    icon: '🔨',
    title: 'เกมตีหูก',
    description: 'จับเวลา 30 วินาที แค้นเท่าไหนตีเท่านั้น!',
    color: '#fb923c',
  },
  {
    id: 'MUSIC',
    icon : '🎮',
    title: 'เกมคนเบียว',
    description: 'ฟังเพลงหรือดูวิดีโอ แล้วทายว่าเกี่ยวข้องกับอะไร!',
    color: '#a78bfa',
  },
  {
    id: 'GACHA',
    icon: 'เกลือ',
    title: 'สุ่มกาชา',
    description: 'หมุนตู้กาชา อยากรู้มั้ยมีอะไร ไม่บอกกกกก!',
    color: '#34d399',
  },
];

export default function GameHub({ onSelectGame }: GameHubProps) {
  return (
    <motion.div
      className="game-hub"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h1
        className="game-hub-title"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
         เลือกเกมเลย!
      </motion.h1>
      <motion.p className="game-hub-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        เกมง่ายๆ
      </motion.p>

      <div className="game-hub-grid">
        {GAMES.map((game, i) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.15 }}
          >
            <GameCard
              icon={game.icon}
              title={game.title}
              description={game.description}
              color={game.color}
              onClick={() => onSelectGame(game.id)}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
