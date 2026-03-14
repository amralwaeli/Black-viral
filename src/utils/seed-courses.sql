-- =============================================================
-- SEED: Black Viral AC — Essential Courses
-- Run this in your Supabase SQL Editor AFTER the main setup SQL.
-- These are legacy courses kept for backward compatibility.
-- For the full course catalog, please run REAL-COURSES-DATA.sql
-- Instructors are left NULL — the Super Admin can assign coaches later.
-- =============================================================

-- First, add extra UI columns to the courses table if they don't already exist
ALTER TABLE courses ADD COLUMN IF NOT EXISTS is_online   BOOLEAN DEFAULT false;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS is_physical BOOLEAN DEFAULT true;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS rating      NUMERIC(3,2) DEFAULT 4.9;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS image_url   TEXT;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS features    TEXT[] DEFAULT '{}';

-- =============================================================
-- INSERT ESSENTIAL COURSES (5 COURSES ONLY)
-- instructor_id is NULL for every course so the Super Admin
-- can assign coaches via the dashboard later.
-- =============================================================

INSERT INTO courses
  (title, description, category, level, duration, price,
   instructor_id, branch, max_capacity, status,
   is_online, is_physical, rating, image_url, features)
VALUES

-- ══ RESCUE & FIRST AID ───────────────────────────────────────
(
  'Lifeguard Certification',
  'International lifeguard certification with rigorous practical training. Covers water rescue, CPR & first aid. ILS accredited.',
  'rescue', 'Certification', '6 weeks', NULL,
  NULL, NULL, 20, 'active',
  true, true, 5.0,
  'https://images.unsplash.com/photo-1770215252183-da5f44f2851c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  ARRAY['Water Rescue', 'CPR & First Aid', 'ILS Certified']
),

-- ══ COMBAT SPORTS ────────────────────────────────────────────
(
  'Karate Traditional Training',
  'Traditional karate training with full belt progression. Covers kata mastery, kumite training, and formal grading examinations.',
  'combat', 'All Levels', '12 weeks', NULL,
  NULL, NULL, 25, 'active',
  false, true, 4.9,
  'https://images.unsplash.com/photo-1633715398353-1faf3874a597?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  ARRAY['Kata Mastery', 'Kumite Training', 'Belt Advancement']
),
(
  'Kickboxing Elite',
  'High-intensity kickboxing training for fitness and competition. Muay Thai style techniques with cardio conditioning and self-defence.',
  'combat', 'Intermediate', '12 weeks', NULL,
  NULL, NULL, 20, 'active',
  true, true, 4.8,
  'https://images.unsplash.com/photo-1633715398353-1faf3874a597?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  ARRAY['Muay Thai Style', 'Cardio Conditioning', 'Self Defense']
),
(
  'Taekwondo Championship Prep',
  'Competition-focused Taekwondo training program with advanced sparring, poomsae, and detailed competition strategy coaching.',
  'combat', 'Intermediate', '10 weeks', NULL,
  NULL, NULL, 20, 'active',
  false, true, 4.8,
  'https://images.unsplash.com/photo-1633715398353-1faf3874a597?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  ARRAY['Sparring', 'Poomsae', 'Competition Strategy']
),
(
  'Boxing Fundamentals',
  'Learn boxing basics from professional coaches. Covers footwork, punching techniques, defence strategies, and fitness conditioning.',
  'combat', 'Beginner', '10 weeks', NULL,
  NULL, NULL, 20, 'active',
  true, true, 4.9,
  'https://images.unsplash.com/photo-1633715398353-1faf3874a597?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  ARRAY['Footwork', 'Punching Techniques', 'Defense Strategies']
)

ON CONFLICT DO NOTHING;
-- The ON CONFLICT DO NOTHING prevents duplicate inserts if you run this script twice.