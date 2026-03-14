-- ═══════════════════════════════════════════════════════════════════════════════
-- BLACK VIRAL AC - RESTORE SERVICE/CERTIFICATION COURSES
-- ═══════════════════════════════════════════════════════════════════════════════
-- Run this to restore the certification/service courses that were deleted
-- These are separate from the regular BV training courses
-- ═══════════════════════════════════════════════════════════════════════════════

INSERT INTO courses (
  title, description, category, level, duration, price, is_online, is_physical,
  rating, features, status, max_capacity, instructor_id
) VALUES

-- ══ CERTIFICATION & INSTRUCTOR TRAINING COURSES ══
(
  'Swimming Instructor Training',
  'Three-level integrated program (Level 1, 2, 3 Master Assistant) for aspiring swimming instructors. Gain international certification and business license to teach professionally.',
  'aquatic',
  'Certification',
  '3 levels',
  3200,
  false,
  true,
  5.0,
  ARRAY['All Ages Training', 'IWSF Certified', 'Business License', '3 Levels'],
  'active',
  15,
  NULL
),
(
  'Babies Swimming Instructor',
  'Specialised program for infant swimming instruction with focus on safety and infant psychology. International aquatics federation certification.',
  'aquatic',
  'Certification',
  '2 weeks',
  2800,
  false,
  true,
  5.0,
  ARRAY['Infant Safety', 'Psychology Training', 'Intl. Aquatics Fed.', 'Specialized'],
  'active',
  12,
  NULL
),
(
  'Aqua Aerobics Instructor Course',
  'Training in aquatic fitness, hydrotherapy & fat-burning exercises with international certification. Perfect for fitness professionals.',
  'aquatic',
  'Certification',
  '3 weeks',
  2400,
  false,
  true,
  4.9,
  ARRAY['Hydrotherapy', 'Group Workouts', 'Intl. Certificate', 'Fitness Focus'],
  'active',
  15,
  NULL
),
(
  'First Aid & CPR Certification',
  'Comprehensive first aid and CPR training with international certificate. Emergency response, medical basics, and practical scenarios. CMAS certified.',
  'rescue',
  'Certification',
  '4 weeks',
  1200,
  true,
  true,
  5.0,
  ARRAY['Emergency Response', 'Medical Basics', 'CMAS Certified', 'Practical Training'],
  'active',
  25,
  NULL
),

-- ══ POOL MANAGEMENT SERVICE ══
(
  'Pool Management Services',
  'Complete pool management solutions including maintenance, lifeguard staffing, safety audits, and operational excellence for fitness centers and sports facilities.',
  'service',
  'Service',
  'Ongoing',
  NULL,
  false,
  true,
  5.0,
  ARRAY['Full Maintenance', 'Lifeguard Staff', 'Safety Audits', 'Operations'],
  'active',
  NULL,
  NULL
)

ON CONFLICT DO NOTHING;

-- Verify the services were added
SELECT title, category, level, price 
FROM courses 
WHERE level IN ('Certification', 'Service')
ORDER BY category, title;
