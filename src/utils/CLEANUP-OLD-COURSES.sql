-- ═══════════════════════════════════════════════════════════════════════════════
-- BLACK VIRAL AC - CLEANUP OLD COURSES
-- ═══════════════════════════════════════════════════════════════════════════════
-- Run this in Supabase SQL Editor to remove all old seed courses
-- Keeps only: Karate, Kickboxing, Taekwondo, Lifeguard Certification, Boxing Fundamentals
-- ═══════════════════════════════════════════════════════════════════════════════

-- Delete all courses EXCEPT the 5 we want to keep
DELETE FROM courses 
WHERE title NOT IN (
  'Karate Traditional Training',
  'Kickboxing Elite',
  'Taekwondo Championship Prep',
  'Lifeguard Certification',
  'Boxing Fundamentals'
)
AND title NOT LIKE 'BV %'; -- Keep all courses that start with "BV" (real courses)

-- Optional: Reset the instructor assignment for the 5 legacy courses
UPDATE courses 
SET instructor_id = NULL
WHERE title IN (
  'Karate Traditional Training',
  'Kickboxing Elite',
  'Taekwondo Championship Prep',
  'Lifeguard Certification',
  'Boxing Fundamentals'
);

-- Verify what's left
SELECT title, category, level, instructor_id 
FROM courses 
ORDER BY category, title;
