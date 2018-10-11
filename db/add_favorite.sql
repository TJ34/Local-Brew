INSERT INTO favorites (beer_name, beer_label, beer_desc, abv, style, brewery, user_id, beer_id)
VALUES ($1,$2,$3,$4,$5,$6,$7,$8);

SELECT * FROM favorites;