INSERT INTO reviews (review, star_rating, user_id, beer_id)
VALUES ($1, $2, $3, $4);

SELECT * FROM reviews;