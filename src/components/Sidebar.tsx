export {}; // Just an export for types if needed
// Sidebar.tsx
import { useState } from 'react';
import '../styles.css';

interface SidebarProps {
  onSelect: (item: string) => void;
}

const MENU_ITEMS = [
  { id: 'HOME', label: 'หน้าแรก'},
  { id: 'LETTER', label: 'จดหมาย'},
  { id: 'MEMORIES', label: 'ไม่บอกมาดูเอง'},
  { id: 'GAME', label: 'เกม'},
];

export function Sidebar({ onSelect }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const handleSelect = (id: string) => {
    onSelect(id);
    // Always close on mobile after select
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Hamburger toggle button */}
      <button className="menu-toggle" onClick={toggleSidebar} aria-label="Toggle menu">
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Dark overlay when sidebar is open on mobile */}
      {isOpen && (
        <div 
          className={`sidebar-overlay ${isOpen ? 'visible' : ''}`} 
          onClick={closeSidebar} 
        />
      )}

      {/* Sidebar panel */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          Oak and Nor 
        </div>
        <ul className="menu-list">
          {MENU_ITEMS.map((item) => (
            <li 
              key={item.id} 
              className="menu-item"
              onClick={() => handleSelect(item.id)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
