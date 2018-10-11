INSERT INTO users (username, user_photo, user_email, authid)
VALUES ($1, $2, $3, $4)
RETURNING *;