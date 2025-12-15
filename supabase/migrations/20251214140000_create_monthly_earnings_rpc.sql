-- =============================================
-- RPC: GET USER MONTHLY EARNINGS
-- =============================================
-- This function calculates the monthly earnings for a given user
-- over a specified number of past months.
-- =============================================

CREATE OR REPLACE FUNCTION public.get_user_monthly_earnings(
  p_user_id UUID,
  p_months_ago INTEGER DEFAULT 6
)
RETURNS TABLE(
  month TEXT,
  earnings NUMERIC
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  WITH monthly_data AS (
    SELECT
      TO_CHAR(DATE_TRUNC('month', b.created_at), 'Mon') AS month_name,
      EXTRACT(YEAR FROM b.created_at) AS year,
      EXTRACT(MONTH FROM b.created_at) AS month_num,
      SUM(b.total_price) AS monthly_earnings
    FROM public.bookings b
    JOIN public.trips t ON b.trip_id = t.id
    WHERE
      t.user_id = p_user_id AND
      b.status = 'delivered' AND
      b.created_at >= DATE_TRUNC('month', NOW() - INTERVAL '1 month' * (p_months_ago - 1))
    GROUP BY
      DATE_TRUNC('month', b.created_at)
    ORDER BY
      year ASC, month_num ASC
  )
  SELECT
    md.month_name,
    COALESCE(md.monthly_earnings, 0) AS earnings
  FROM (
    SELECT
      TO_CHAR(DATE_TRUNC('month', NOW() - INTERVAL '1 month' * s.i), 'Mon') AS month_name,
      EXTRACT(YEAR FROM (NOW() - INTERVAL '1 month' * s.i)) AS year,
      EXTRACT(MONTH FROM (NOW() - INTERVAL '1 month' * s.i)) AS month_num
    FROM GENERATE_SERIES(0, p_months_ago - 1) AS s(i)
  ) AS last_n_months
  LEFT JOIN monthly_data md
    ON last_n_months.month_name = md.month_name
    AND last_n_months.year = md.year
    AND last_n_months.month_num = md.month_num
  ORDER BY
    last_n_months.year, last_n_months.month_num;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.get_user_monthly_earnings(UUID, INTEGER) TO authenticated;
