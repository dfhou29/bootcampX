SELECT SUM(completed_at - started_at) / COUNT(*) AS average_assistance_request_time
FROM assistance_requests;