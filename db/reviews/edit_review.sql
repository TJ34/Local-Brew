UPDATE reviews
SET review=$2, star_rating=$3
WHERE id=$1;

SELECT * FROM reviews;