DELETE FROM favorites
WHERE beer_id=$1;

SELECT * FROM favorites;