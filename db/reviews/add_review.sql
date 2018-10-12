INSERT INTO reviews (review, star_rating, user_id, beer_id, username)
VALUES ($1, $2, $3, $4, $5);

SELECT * FROM reviews;