-- ═══════════════════════════════════════════════════════════════════════════════
-- BLACK VIRAL AC - REMOVE DUPLICATE COURSES
-- ═══════════════════════════════════════════════════════════════════════════════
-- This script helps identify and remove duplicate courses that may have been
-- inserted multiple times by running seed scripts more than once
-- ═══════════════════════════════════════════════════════════════════════════════

-- STEP 1: View all duplicate courses (run this first to see what will be deleted)
SELECT 
    title,
    COUNT(*) as duplicate_count,
    STRING_AGG(id::TEXT, ', ') as course_ids,
    MIN(created_at) as first_created,
    MAX(created_at) as last_created
FROM courses
GROUP BY title
HAVING COUNT(*) > 1
ORDER BY title;

-- STEP 2: Remove duplicates, keeping only the FIRST created course for each title
-- (Comment out the SELECT above and run this DELETE statement)
/*
DELETE FROM courses
WHERE id IN (
    SELECT id
    FROM (
        SELECT 
            id,
            title,
            ROW_NUMBER() OVER (PARTITION BY title ORDER BY created_at ASC) as row_num
        FROM courses
    ) sub
    WHERE row_num > 1
);
*/

-- STEP 3: Verify all duplicates are removed
-- (Uncomment and run this after the DELETE to confirm)
/*
SELECT 
    title,
    COUNT(*) as count,
    category,
    level,
    price,
    created_at
FROM courses
GROUP BY title, category, level, price, created_at
ORDER BY title;
*/
