For nor nor# 💖 Valentine's For Nornor — Developer Guide

## 📋 สรุปโครงสร้างโปรเจกต์

เว็บแอป Valentine's Day สร้างด้วย **React + Vite + TypeScript + Framer Motion**
ธีมหลัก: สีชมพู, สไตล์โรแมนติก, ฟอนต์ไทย (Mali, Great Vibes)

---

## 🗂️ โครงสร้างไฟล์

```
src/
├── main.tsx                    # Entry point — import styles.css
├── App.tsx                     # 🏠 Main app — state management, routing, sidebar
├── styles.css                  # 🎨 CSS รวมทั้งหมด (ไฟล์เดียว!)
│
├── components/
│   ├── Login.tsx               # 🏠 หน้า Login — ตอบคำถาม quiz
│   ├── Loader.tsx              # ⏳ หน้าโหลดหลัง login
│   ├── Letter.tsx              # 💌 ซองจดหมาย — กดเปิด → อ่าน
│   ├── Message.tsx             # 💬 เนื้อหาจดหมาย — Polaroid + ข้อความ
│   ├── Sidebar.tsx             # 📋 เมนูด้านข้าง — hamburger toggle
│   ├── FilmCarousel.tsx        # 🖼️ แถบฟิล์มรูป — infinite scroll
│   ├── Note.tsx                # 📝 การ์ดโน้ตกระดาษ
│   │
│   ├── shared/                 # 🔧 Shared Components (ใช้ร่วมกัน)
│   │   ├── PageLoader.tsx      # ⏳ Loader น่ารัก — ใช้ระหว่างเปลี่ยนหน้า
│   │   └── GameCard.tsx        # 🎮 การ์ดเลือกเกม — ใช้ใน GameHub
│   │
│   └── games/                  # 🎮 เกมทั้งหมด
│       ├── GameHub.tsx         # 🎮 เมนูเลือกเกม (4 เกม)
│       ├── QuizGame.tsx        # 💝 เกมทายใจ — 10 คำถาม 4 ตัวเลือก
│       ├── WhackAMole.tsx      # 🔨 เกมตีตุ่น — 60 วินาที
│       ├── MusicQuiz.tsx       # 🎵 เกมคนเบียว — ฟังเพลง/ดูวิดีโอ ตอบคำถาม
│       └── GachaGame.tsx       # 🎰 เกมกาชาปอง — สุ่มได้รูป+ข้อความ
│
├── images/
│   └── flower.png              # รูปดอกไม้หน้า Login
│
public/
├── audio/                      # 🎵 ไฟล์เพลง (ใส่ .mp3 ที่นี่)
│   ├── song1.mp3
│   └── song2.mp3
├── video/                      # 📹 ไฟล์วิดีโอ (ใส่ .mp4 ที่นี่)
│   ├── clip1.mp4
│   └── clip2.mp4
└── images/
    ├── quiz/                   # 📸 รูปประกอบคำถาม Quiz
    │   ├── q1.jpg
    │   └── q10.jpg
    ├── mole/                   # 🐹 รูปตุ่น + ผลลัพธ์
    │   ├── mole1.png
    │   ├── mole2.png
    │   └── result_best.png
    └── gacha/                  # 🎰 รูปของรางวัลกาชา
        ├── prize1.jpg
        └── prize2.jpg
```

---

## 🛠️ Tech Stack

| เทคโนโลยี | เวอร์ชัน | ใช้ทำอะไร |
|---|---|---|
| **React** | 19.x | UI framework |
| **Vite** | 6.x | Build tool + dev server |
| **TypeScript** | 5.x | Type safety |
| **Framer Motion** | 12.x | Animation ทุกหน้า |
| **Tailwind CSS** | 4.x | CSS utility (ใช้บางส่วน) |
| **HTML5 Audio/Video** | native | เล่นเพลง/วิดีโอ (ไม่ต้องติดตั้ง lib) |

---

## 🎯 Flow ของแอป

```
LOGIN → LOADING → LETTER → MESSAGE
                              ↓ (Sidebar เปิด)
                     ├── GALLERY (ความทรงจำ)
                     ├── GAME_HUB → GAME_QUIZ
                     │             → GAME_WHACK
                     │             → GAME_MUSIC
                     │             → GAME_GACHA
                     └── MESSAGE (จดหมาย)
```

---

## 🎮 รายละเอียดเกมแต่ละตัว

### 1. 💝 เกมทายใจ (QuizGame.tsx)
- **10 คำถาม**, 4 ตัวเลือก
- รองรับ **รูปภาพ** ประกอบ (optional)
- มี **progress bar** + animation เปลี่ยนข้อ
- ผลลัพธ์ตามเกณฑ์: 100%, ≥70%, ≥40%, <40%
- **แก้ข้อมูล**: แก้ `QUIZ_DATA` ใน `QuizGame.tsx`
- **รูป**: วางใน `public/images/quiz/`

### 2. 🔨 เกมตีตุ่น (WhackAMole.tsx)
- **60 วินาที**, grid 3×3 (9 หลุม)
- ตุ่น = **รูปภาพ** (fallback เป็น emoji ถ้ายังไม่มีรูป)
- มีคะแนน + **ผลลัพธ์ 4 ระดับ** (≥30, ≥20, ≥10, <10)
- **แก้ข้อมูล**: แก้ `MOLE_IMAGES`, `RESULT_TIERS` ใน `WhackAMole.tsx`
- **รูป**: วางใน `public/images/mole/`

### 3. 🎵 เกมคนเบียว (MusicQuiz.tsx)
- รองรับ **ทั้ง audio และ video**
- มี **แผ่นเสียงหมุน** (vinyl record animation)
- 4 ตัวเลือกต่อข้อ + progress bar
- **แก้ข้อมูล**: แก้ `MUSIC_QUIZ_DATA` ใน `MusicQuiz.tsx`
- **เพลง**: วางใน `public/audio/` (ใช้ .mp3)
- **วิดีโอ**: วางใน `public/video/` (ใช้ .mp4)
- **รูปปก**: วางใน `public/images/`

### 4. 🎰 เกมกาชาปอง (GachaGame.tsx)
- ตู้กาชาพร้อม **ลูกบอลหลายสี**
- สุ่มได้ **รูป หรือ วิดีโอ** + ข้อความ
- มี **3 ระดับ rarity**: Common (น้ำเงิน), Rare (ม่วง), Legendary (ชมพู)
- มีตัวนับ **สะสมของ**
- **แก้ข้อมูล**: แก้ `GACHA_ITEMS` ใน `GachaGame.tsx`
- **รูป**: วางใน `public/images/gacha/`

---

## 🎨 CSS Guide

CSS ทั้งหมดอยู่ใน **`src/styles.css`** ไฟล์เดียว!

แบ่ง Section ชัดเจน:
| Section | ใช้ทำอะไร |
|---|---|
| 1. GLOBAL | ตัวแปรสี, ฟอนต์, utility |
| 2. LOGIN | หน้าแรก |
| 3. LOADER | หน้ารอโหลด |
| 4. LETTER | ซองจดหมาย |
| 5. SIDEBAR | เมนูด้านข้าง |
| 6. MESSAGE | ข้อความจดหมาย |
| 7. GALLERY | ฟิล์ม + Modal |
| 8. NOTE | การ์ดโน้ต |
| 9. BUTTONS | ปุ่มร่วม |
| 10. GAME HUB | เมนูเกม |
| 11. QUIZ | เกมทายใจ |
| 12. WHACK | เกมตีตุ่น |
| 13. MUSIC | เกมคนเบียว |
| 14. GACHA | กาชาปอง |
| 15. RESPONSIVE | ปรับมือถือ |

### ฟอนต์ที่ใช้
- **หัวข้อ**: `'Great Vibes', cursive` (สวยงาม, โรแมนติก)
- **เนื้อหา/Body**: `'Mali', sans-serif` (ไทย, อ่านง่าย)
- **รอง**: `'Nunito', sans-serif` (เล็กๆน้อยๆ)

### สีหลัก
| ชื่อ | ค่า | ใช้ |
|---|---|---|
| Pink 500 | `#ec4899` | สีหลัก |
| Pink 400 | `#f472b6` | ปุ่ม, accent |
| Pink 100-200 | `#fce7f3 - #fbcfe8` | พื้นหลัง |

---

## 🔧 Shared Components

### PageLoader (`shared/PageLoader.tsx`)
```tsx
<PageLoader 
  texts={['กำลังโหลด...', 'รอแปป...']} 
  icon="🧸" 
  duration={0} // 0 = forever, or set ms
/>
```

### GameCard (`shared/GameCard.tsx`)
```tsx
<GameCard 
  icon="🎯" 
  title="ชื่อเกม" 
  description="คำอธิบาย"
  color="#f472b6"  // gradient start
  onClick={() => {}}
/>
```

---

## 📱 Responsive Design

- **Desktop**: Sidebar toggle ด้านซ้าย, content ปกติ
- **Mobile (≤768px)**: Hamburger menu, overlay, full-width layout
- **Small (≤400px)**: ลดขนาดฟอนต์ + รูปเพิ่ม

---

## 🚀 วิธีรัน

```bash
# Development
npm run dev

# Build production
npm run build
```

---

## 📝 วิธีเพิ่มข้อมูล

### เพิ่มคำถาม Quiz
แก้ไฟล์ `src/components/games/QuizGame.tsx`:
```tsx
const QUIZ_DATA: QuizQuestion[] = [
  {
    id: 11,                           // ← เลข ID ใหม่
    question: 'คำถามใหม่?',
    image: '/images/quiz/q11.jpg',    // ← optional
    choices: ['ก', 'ข', 'ค', 'ง'],
    correctIndex: 0,                  // ← index ของคำตอบที่ถูก (0-3)
  },
  // ...
];
```

### เพิ่มรูปความทรงจำ (Gallery)
แก้ไฟล์ `src/App.tsx`:
```tsx
const MEMORIES: Memory[] = [
  {
    id: 11,
    src: '/images/memory11.jpg',       // ← วางรูปใน public/images/
    captionHeader: 'หัวข้อ',
    captionBody: 'รายละเอียด',
  },
];
```

### เพิ่มเพลง/วิดีโอ (Music Quiz)
1. วางไฟล์ใน `public/audio/` หรือ `public/video/`
2. แก้ `MUSIC_QUIZ_DATA` ใน `MusicQuiz.tsx`

### เพิ่มของกาชา
แก้ `GACHA_ITEMS` ใน `GachaGame.tsx`

---

## 🎵 เรื่องเพลงและวิดีโอ

ไฟล์เพลง/วิดีโอวางใน folder `public/` โดย Vite จะ serve ให้อัตโนมัติ:
- `public/audio/song1.mp3` → เข้าถึงได้ที่ `/audio/song1.mp3`
- `public/video/clip1.mp4` → เข้าถึงได้ที่ `/video/clip1.mp4`

**ไม่ต้องติดตั้ง lib เพิ่ม** — ใช้ HTML5 `<audio>` และ `<video>` native

---

## 🏗️ Dependencies

```json
{
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "framer-motion": "^12.4.7",
  "tailwindcss": "^4.1.18",
  "@tailwindcss/postcss": "^4.1.18",
  "vite": "^6.2.4",
  "@vitejs/plugin-react": "^5.1.1"
}
```

ไม่มี dependency เพิ่มเติม! ทุกอย่างทำงานด้วย lib ที่มีอยู่แล้ว
