-- ═══════════════════════════════════════════════════════════════════════════════
-- BLACK VIRAL AC - REAL COURSES DATA FROM PRICE LIST
-- ═══════════════════════════════════════════════════════════════════════════════
-- Run this in Supabase SQL Editor to populate real course offerings
-- This replaces the fallback/demo data with actual Black Viral AC courses
-- ═══════════════════════════════════════════════════════════════════════════════

-- Clear existing courses (optional - remove this if you want to keep existing data)
-- DELETE FROM courses;

-- ═══════════════════════════════════════════════════════════════════════════════
-- GYMNASTICS COURSES
-- ═══════════════════════════════════════════════════════════════════════════════

INSERT INTO courses (
  title, description, category, level, duration, price, is_online, is_physical,
  rating, features, status, max_capacity
) VALUES
(
  'BV Gymnastics Group - 8 Sessions',
  'Comprehensive gymnastics training program with professional coaching. Perfect for developing strength, flexibility, and coordination in a supportive group environment.',
  'individual',
  'All Levels',
  '1 month',
  525,
  false,
  true,
  4.8,
  ARRAY['8 Sessions per Month', '60 Min Sessions', '6 Kids Max', 'Ages 3-16'],
  'active',
  6
),
(
  'BV Gymnastics Group - 10 Sessions',
  'Enhanced gymnastics program with more frequent training sessions. Ideal for students looking to progress faster in their gymnastics journey.',
  'individual',
  'All Levels',
  '1 month',
  630,
  false,
  true,
  4.8,
  ARRAY['10 Sessions per Month', '60 Min Sessions', '6 Kids Max', 'Ages 3-16'],
  'active',
  6
),
(
  'BV Gymnastics Group - 12 Sessions',
  'Intensive monthly gymnastics training for dedicated young athletes. Maximum skill development with consistent practice schedule.',
  'individual',
  'All Levels',
  '1 month',
  700,
  false,
  true,
  4.9,
  ARRAY['12 Sessions per Month', '60 Min Sessions', '6 Kids Max', 'Ages 3-16'],
  'active',
  6
),
(
  'BV Gymnastics Group - 3 Month Package (24 Sessions)',
  'Long-term commitment package offering excellent value. Perfect for serious gymnastics students ready to commit to their training.',
  'individual',
  'All Levels',
  '3 months',
  1260,
  false,
  true,
  4.9,
  ARRAY['24 Total Sessions', '60 Min Sessions', '6 Kids Max', 'Ages 3-16', 'Best Value'],
  'active',
  6
),
(
  'BV Gymnastics Group - 3 Month Package (36 Sessions)',
  'Premium extended training package with maximum sessions for accelerated progress and skill mastery.',
  'individual',
  'All Levels',
  '3 months',
  1415,
  false,
  true,
  5.0,
  ARRAY['36 Total Sessions', '60 Min Sessions', '6 Kids Max', 'Ages 3-16', 'Premium Package'],
  'active',
  6
),
(
  'BV Gymnastics Team - USA Program',
  'High-level competitive gymnastics training following USA gymnastics standards. For serious athletes aiming for excellence.',
  'individual',
  'Advanced',
  '1 month',
  840,
  false,
  true,
  5.0,
  ARRAY['16 Sessions', '120 Min Sessions', '10 Kids Max', 'Ages 5-16', 'USA Program'],
  'active',
  10
),
(
  'BV Gymnastics Team - 3 Month USA Program',
  'Elite quarterly training program for competitive gymnasts. Extended sessions and specialized coaching for championship preparation.',
  'individual',
  'Advanced',
  '3 months',
  1880,
  false,
  true,
  5.0,
  ARRAY['48 Total Sessions', '120 Min Sessions', '10 Kids Max', 'Ages 5-16', 'USA Program', 'Competition Prep'],
  'active',
  10
),
(
  'BV Gymnastics Private Session',
  'One-on-one personalized gymnastics coaching. Customized training focused on individual goals and progression.',
  'individual',
  'All Levels',
  'Per Session',
  150,
  false,
  true,
  4.9,
  ARRAY['Private 1-to-1', '60 Min Session', 'Ages 3-16', 'Flexible Scheduling'],
  'active',
  1
),

-- ═══════════════════════════════════════════════════════════════════════════════
-- BASKETBALL COURSES
-- ═══════════════════════════════════════════════════════════════════════════════

(
  'BV Basketball - FIBA Program (8 Sessions)',
  'Professional basketball training following FIBA standards. Develop fundamental skills, teamwork, and game strategy.',
  'team',
  'All Levels',
  '1 month',
  525,
  false,
  true,
  4.7,
  ARRAY['8 Sessions per Month', '60 Min Sessions', '10 Kids Max', 'Ages 5-16', 'FIBA Program'],
  'active',
  10
),
(
  'BV Basketball - FIBA Program (12 Sessions)',
  'Enhanced basketball training with increased practice frequency. Perfect for players committed to improving their game.',
  'team',
  'All Levels',
  '1 month',
  630,
  false,
  true,
  4.8,
  ARRAY['12 Sessions per Month', '60 Min Sessions', '10 Kids Max', 'Ages 5-16', 'FIBA Program'],
  'active',
  10
),
(
  'BV Basketball - FIBA Program (16 Sessions)',
  'Intensive monthly basketball program for serious young athletes. Maximum court time and skill development.',
  'team',
  'All Levels',
  '1 month',
  700,
  false,
  true,
  4.9,
  ARRAY['16 Sessions per Month', '60 Min Sessions', '10 Kids Max', 'Ages 5-16', 'FIBA Program'],
  'active',
  10
),
(
  'BV Basketball Private Session',
  'Individual basketball coaching session. Personalized attention to refine specific skills and techniques.',
  'team',
  'All Levels',
  'Per Session',
  150,
  false,
  true,
  4.8,
  ARRAY['Private 1-to-1', '60 Min Session', 'Ages 3-16', 'Flexible Scheduling'],
  'active',
  1
),

-- ═══════════════════════════════════════════════════════════════════════════════
-- COMBAT SPORTS (MMA) COURSES
-- ═══════════════════════════════════════════════════════════════════════════════

(
  'BV Combat Sports - MMA Program (8 Sessions)',
  'Mixed Martial Arts training program combining striking, grappling, and self-defense. Professional MMA coaching for all levels.',
  'combat',
  'All Levels',
  '1 month',
  525,
  false,
  true,
  4.9,
  ARRAY['8 Sessions per Month', '60 Min Sessions', '10 Kids Max', 'Ages 5-16', 'MMA Program'],
  'active',
  10
),
(
  'BV Combat Sports - MMA Program (12 Sessions)',
  'Comprehensive MMA training with more frequent sessions. Build strength, discipline, and combat skills.',
  'combat',
  'All Levels',
  '1 month',
  630,
  false,
  true,
  4.9,
  ARRAY['12 Sessions per Month', '60 Min Sessions', '10 Kids Max', 'Ages 5-16', 'MMA Program'],
  'active',
  10
),
(
  'BV Combat Sports - MMA Program (16 Sessions)',
  'Intensive monthly MMA program for dedicated martial artists. Maximum training for rapid skill development.',
  'combat',
  'All Levels',
  '1 month',
  700,
  false,
  true,
  5.0,
  ARRAY['16 Sessions per Month', '60 Min Sessions', '10 Kids Max', 'Ages 5-16', 'MMA Program'],
  'active',
  10
),
(
  'BV Combat Sports Private Session',
  'One-on-one MMA coaching. Personalized training in striking, grappling, or specific martial arts techniques.',
  'combat',
  'All Levels',
  'Per Session',
  150,
  false,
  true,
  4.9,
  ARRAY['Private 1-to-1', '60 Min Session', 'Ages 3-16', 'Flexible Scheduling'],
  'active',
  1
),

-- ═══════════════════════════════════════════════════════════════════════════════
-- SWIMMING COURSES - GROUP CLASSES
-- ═══════════════════════════════════════════════════════════════════════════════

(
  'BV Group Super Swimmers - 4 Sessions',
  'Introduction swimming program perfect for trying out our coaching. Learn fundamental water safety and swimming techniques.',
  'aquatic',
  'All Levels',
  '1 month',
  315,
  false,
  true,
  4.8,
  ARRAY['4 Sessions', '45 Min Sessions', '6 Kids Max', 'Ages 5-16'],
  'active',
  6
),
(
  'BV Group Super Swimmers - 8 Sessions',
  'Popular swimming program with balanced training frequency. Build confidence and swimming skills progressively.',
  'aquatic',
  'All Levels',
  '1 month',
  525,
  false,
  true,
  4.9,
  ARRAY['8 Sessions per Month', '45 Min Sessions', '6 Kids Max', 'Ages 5-16'],
  'active',
  6
),
(
  'BV Group Super Swimmers - 10 Sessions',
  'Enhanced swimming training with more pool time. Accelerate your progress with increased practice frequency.',
  'aquatic',
  'All Levels',
  '1 month',
  630,
  false,
  true,
  4.9,
  ARRAY['10 Sessions per Month', '45 Min Sessions', '6 Kids Max', 'Ages 5-16'],
  'active',
  6
),
(
  'BV Group Super Swimmers - 12 Sessions',
  'Intensive monthly swimming program. Maximum practice sessions for dedicated young swimmers.',
  'aquatic',
  'All Levels',
  '1 month',
  700,
  false,
  true,
  5.0,
  ARRAY['12 Sessions per Month', '45 Min Sessions', '6 Kids Max', 'Ages 5-16'],
  'active',
  6
),
(
  'BV Group Pre Team - 12 Sessions',
  'Pre-competitive swimming program preparing swimmers for team-level training. Extended sessions for skill development.',
  'aquatic',
  'Intermediate',
  '1 month',
  630,
  false,
  true,
  4.9,
  ARRAY['12 Sessions per Month', '75 Min Sessions', '12 Kids Max', 'Ages 5-16', 'Pre-Competition'],
  'active',
  12
),
(
  'BV Group Pre Team - 3 Month Package',
  'Quarterly pre-team training package. Comprehensive preparation for competitive swimming with excellent value.',
  'aquatic',
  'Intermediate',
  '3 months',
  1360,
  false,
  true,
  5.0,
  ARRAY['36 Total Sessions', '75 Min Sessions', '12 Kids Max', 'Ages 5-16', 'Pre-Competition', 'Best Value'],
  'active',
  12
),
(
  'BV Group Swimming Squad - 20 Sessions',
  'Competitive swimming squad training. For serious swimmers ready for team-level competition and training.',
  'aquatic',
  'Advanced',
  '1 month',
  840,
  false,
  true,
  5.0,
  ARRAY['20 Sessions per Month', '90 Min Sessions', '20 Kids Max', 'Ages 5-16', 'Squad Training'],
  'active',
  20
),
(
  'BV Group Swimming Squad - 3 Month Package',
  'Quarterly competitive squad training. Maximum sessions and extended training time for championship preparation.',
  'aquatic',
  'Advanced',
  '3 months',
  1880,
  false,
  true,
  5.0,
  ARRAY['60 Total Sessions', '90 Min Sessions', '20 Kids Max', 'Ages 5-16', 'Squad Training', 'Competition Ready'],
  'active',
  20
),

-- ═══════════════════════════════════════════════════════════════════════════════
-- SWIMMING COURSES - BUDDY & PRIVATE CLASSES
-- ═══════════════════════════════════════════════════════════════════════════════

(
  'BV Buddy Super Swimmers - 4 Sessions',
  'Semi-private swimming lessons for two students. Share the cost while getting more personalized attention than group classes.',
  'aquatic',
  'All Levels',
  '1 month',
  399,
  false,
  true,
  4.9,
  ARRAY['4 Sessions', '45 Min Sessions', '2 Students', 'Ages 5-16', 'Semi-Private'],
  'active',
  2
),
(
  'BV Buddy Super Swimmers - 8 Sessions',
  'Popular semi-private swimming package. Perfect for siblings or friends learning together with focused coaching.',
  'aquatic',
  'All Levels',
  '1 month',
  785,
  false,
  true,
  5.0,
  ARRAY['8 Sessions per Month', '45 Min Sessions', '2 Students', 'Ages 5-16', 'Semi-Private'],
  'active',
  2
),
(
  'BV PT Super Swimmers - 4 Sessions',
  'Private one-on-one swimming lessons. Maximum personalized attention for rapid skill development.',
  'aquatic',
  'All Levels',
  '1 month',
  699,
  false,
  true,
  5.0,
  ARRAY['4 Sessions', '45 Min Sessions', 'Private 1-to-1', 'Ages 5-16', 'Personalized Coaching'],
  'active',
  1
),
(
  'BV PT Super Swimmers - 8 Sessions',
  'Premium private swimming program. Customized training plan with exclusive coach attention.',
  'aquatic',
  'All Levels',
  '1 month',
  1270,
  false,
  true,
  5.0,
  ARRAY['8 Sessions per Month', '45 Min Sessions', 'Private 1-to-1', 'Ages 5-16', 'Personalized Coaching'],
  'active',
  1
),

-- ═══════════════════════════════════════════════════════════════════════════════
-- SWIMMING COURSES - SPECIALTY PROGRAMS
-- ═══════════════════════════════════════════════════════════════════════════════

(
  'BV Group Seals First Steps - 8 Sessions',
  'Gentle introduction to swimming for young children. Safe, fun, and educational water familiarization program.',
  'aquatic',
  'Beginner',
  '1 month',
  630,
  false,
  true,
  4.9,
  ARRAY['8 Sessions per Month', '40 Min Sessions', '3 Kids Max', 'Ages 3-4', 'Water Introduction'],
  'active',
  3
),
(
  'BV Babies Swimming - 8 Sessions',
  'Specialized infant swimming program. Parent-guided water introduction for the youngest swimmers in a safe environment.',
  'aquatic',
  'Beginner',
  '1 month',
  1270,
  false,
  true,
  5.0,
  ARRAY['8 Sessions per Month', '40 Min Sessions', '1 Baby', 'Ages 2 Months - 2 Years', 'Infant Safety'],
  'active',
  1
),
(
  'BV Private Session - Any Activity',
  'Flexible private coaching session for any sport. Book as needed for supplementary training or skill refinement.',
  'individual',
  'All Levels',
  'Per Session',
  150,
  false,
  true,
  4.8,
  ARRAY['Private 1-to-1', '60 Min Session', 'Any Age', 'Flexible Scheduling', 'Any Sport'],
  'active',
  1
),
(
  'BV Aqua Aerobics - Single Session',
  'Fun and effective water-based fitness class. Low-impact exercise perfect for all fitness levels.',
  'aquatic',
  'All Levels',
  'Per Session',
  75,
  false,
  true,
  4.7,
  ARRAY['Drop-in Class', '45 Min Session', '20 Max', 'Ages 12+', 'Water Fitness'],
  'active',
  20
),
(
  'BV Moms & Babies Swimming - Single Session',
  'Special bonding session for mothers and infants in the water. Safe introduction to aquatics for babies.',
  'aquatic',
  'Beginner',
  'Per Session',
  250,
  false,
  true,
  5.0,
  ARRAY['Drop-in Class', '45 Min Session', '1 Baby', 'Ages 2 Months - 3 Years', 'Parent & Child'],
  'active',
  1
),
(
  'BV Adult Exercise - 8 Sessions',
  'Swimming and water exercise program for adults. Fitness, technique improvement, or learn-to-swim for grown-ups.',
  'aquatic',
  'All Levels',
  '1 month',
  630,
  false,
  true,
  4.8,
  ARRAY['8 Sessions per Month', '45 Min Sessions', '6 Max', 'Ages 16+', 'Adult Program'],
  'active',
  6
),

-- ═══════════════════════════════════════════════════════════════════════════════
-- FOOTBALL COURSES
-- ═══════════════════════════════════════════════════════════════════════════════

(
  'BV Football - FIFA Program (8 Sessions)',
  'Professional football training following FIFA standards. Technical skills, tactical understanding, and match play.',
  'team',
  'All Levels',
  '1 month',
  400,
  false,
  true,
  4.8,
  ARRAY['8 Sessions per Month', '60 Min Sessions', '10 Kids Max', 'Ages 5-16', 'FIFA Program'],
  'active',
  10
),
(
  'BV Football - FIFA Program (12 Sessions)',
  'Enhanced football training program with increased practice sessions. Accelerate your football development.',
  'team',
  'All Levels',
  '1 month',
  550,
  false,
  true,
  4.9,
  ARRAY['12 Sessions per Month', '60 Min Sessions', '10 Kids Max', 'Ages 5-16', 'FIFA Program'],
  'active',
  10
),
(
  'BV Football Private Session',
  'One-on-one football coaching. Focus on specific skills, positions, or techniques with personalized attention.',
  'team',
  'All Levels',
  'Per Session',
  150,
  false,
  true,
  4.8,
  ARRAY['Private 1-to-1', '60 Min Session', 'Ages 3-16', 'Flexible Scheduling'],
  'active',
  1
);

-- ═══════════════════════════════════════════════════════════════════════════════
-- VERIFICATION QUERY
-- ═══════════════════════════════════════════════════════════════════════════════

-- Run this to verify all courses were inserted:
-- SELECT COUNT(*), category FROM courses WHERE status = 'active' GROUP BY category ORDER BY category;

-- Expected counts:
-- aquatic: 16 courses
-- combat: 4 courses
-- individual: 9 courses (8 gymnastics + 1 flexible private)
-- team: 7 courses (3 basketball + 3 football + 1 private)
-- TOTAL: 36 courses
