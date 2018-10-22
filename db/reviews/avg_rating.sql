SELECT ROUND(AVG(star_rating))
FROM reviews
WHERE beer_id=$1;