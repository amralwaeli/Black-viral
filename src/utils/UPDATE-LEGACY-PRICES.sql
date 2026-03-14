-- ═══════════════════════════════════════════════════════════════════════════════
-- BLACK VIRAL AC - UPDATE LEGACY COURSE PRICES TO "CONTACT US"
-- ═══════════════════════════════════════════════════════════════════════════════
-- Run this to set the 5 legacy courses to show "Contact us" instead of prices
-- This makes them appear more professional for custom/consultation pricing
-- ═══════════════════════════════════════════════════════════════════════════════

-- Update the 5 legacy courses to NULL price (shows "Contact us" on frontend)
UPDATE courses 
SET price = NULL
WHERE title IN (
  'Karate Traditional Training',
  'Kickboxing Elite',
  'Taekwondo Championship Prep',
  'Lifeguard Certification',
  'Boxing Fundamentals'
);

-- Verify the changes
SELECT title, category, level, price, 
       CASE WHEN price IS NULL THEN 'Contact us' ELSE CONCAT('AED ', price::TEXT) END as display_price
FROM courses 
WHERE title IN (
  'Karate Traditional Training',
  'Kickboxing Elite',
  'Taekwondo Championship Prep',
  'Lifeguard Certification',
  'Boxing Fundamentals'
)
ORDER BY title;
