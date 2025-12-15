-- =============================================
-- FIX RPC: GET USER MONTHLY EARNINGS
-- =============================================
-- This function is updated to be more robust and clean.
-- It calculates the monthly earnings for a given user.
-- =============================================

-- Drop the old function
DROP FUNCTION IF EXISTS public.get_user_monthly_earnings(UUID, INTEGER);

-- Re-create the function with a simpler and more robust SQL query
CREATE OR REPLACE FUNCTION public.get_user_monthly_earnings(
  p_user_id UUID,
  p_months_ago INTEGER DEFAULT 6
)
RETURNS TABLE(
  month TEXT,
  earnings NUMERIC
)
LANGUAGE sql STABLE
AS $$
  WITH months AS (
    -- Generate a series of the last N months
    SELECT DATE_TRUNC('month', GENERATE_SERIES(
      NOW() - (p_months_ago - 1) * INTERVAL '1 month',
      NOW(),
      '1 month'
    ))::date AS month_start
  ),
  earnings_by_month AS (
    -- Calculate earnings for the user
    SELECT
      DATE_TRUNC('month', b.created_at)::date AS month_start,
      SUM(b.total_price) AS total
    FROM public.bookings b
    JOIN public.trips t ON b.trip_id = t.id
    WHERE
      t.user_id = p_user_id AND
      b.status = 'delivered'
    GROUP BY 1
  )
  -- Left join all months with the earnings data
  SELECT
    TO_CHAR(m.month_start, 'Mon') AS month,
    COALESCE(ebm.total, 0) AS earnings
  FROM months m
  LEFT JOIN earnings_by_month ebm ON m.month_start = ebm.month_start
  ORDER BY m.month_start ASC;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION public.get_user_monthly_earnings(UUID, INTEGER) TO authenticated;
