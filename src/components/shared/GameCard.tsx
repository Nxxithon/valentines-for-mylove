/**
 * GameCard — Shared game selection card
 * ใช้ในหน้า GameHub เพื่อเลือกเกม
 * 
 * Usage: <GameCard icon="🎯" title="เกมทายใจ" desc="..." onClick={fn} />
 */
import { motion } from 'framer-motion';

interface GameCardProps {
  icon: string;
  title: string;
  description: string;
  color: string; // gradient start color
  onClick: () => void;
}

export function GameCard({ icon, title, description, color, onClick }: GameCardProps) {
  return (
    <motion.div
      className="game-card"
      style={{ 
        background: `linear-gradient(135deg, ${color} 0%, ${color}88 100%)`,
      }}
      whileHover={{ scale: 1.05, y: -8 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="game-card-icon">{icon}</div>
      <h3 className="game-card-title">{title}</h3>
      <p className="game-card-desc">{description}</p>
      <div className="game-card-play">เล่นเลย</div>
    </motion.div>
  );
}
