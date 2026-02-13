/**
 * FilmCarousel — แถบฟิล์มรูปภาพ
 * กดรูปแล้วป๊อปอัพเด้งขึ้นมาแบบนุ่มนวล
 * พื้นหลังมืดๆ + blur
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Memory {
  id: number;
  src: string;
  captionHeader: string;
  captionBody: string;
}

interface FilmCarouselProps {
  memories: Memory[];
}

export function FilmCarousel({ memories }: FilmCarouselProps) {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  
  // Duplicate for seamless scroll
  const displayMemories = [...memories, ...memories];

  return (
    <>
      <div className="film-carousel">
        <div className="scroller">
          <ul className={`scroller__inner film-track ${selectedMemory ? 'paused' : ''}`}>
            {displayMemories.map((memory, index) => (
              <motion.li 
                key={`${memory.id}-${index}`} 
                className="film-frame"
                whileHover={{ scale: 1.06, rotate: 1, zIndex: 10 }}
                onClick={() => setSelectedMemory(memory)}
                style={{ cursor: 'pointer' }}
              >
                <img src={memory.src} alt={`Memory ${memory.id}`} className="film-img" />
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* Pop-up Modal — รูปเด้งขึ้นมาจากตรงกลาง */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div 
            className="image-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMemory(null)}
          >
            <motion.div 
              className="note-modal-card"
              initial={{ scale: 0.6, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.6, opacity: 0, y: 40 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              onClick={(e) => e.stopPropagation()} 
            >
              <button 
                className="close-modal-btn"
                onClick={() => setSelectedMemory(null)}
              >
                ✕
              </button>

              <div className="modal-polaroid-section">
                <motion.div 
                  className="modal-polaroid"
                  initial={{ rotate: -5 }}
                  animate={{ rotate: -2 }}
                  transition={{ delay: 0.2 }}
                >
                  <img src={selectedMemory.src} alt="Memory" className="modal-img" />
                </motion.div>
              </div>

              <motion.div 
                className="modal-text-section"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="modal-caption-header">{selectedMemory.captionHeader}</h2>
                <p className="modal-caption-body">{selectedMemory.captionBody}</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
