SELECT br.brewery_name, br.brew_logo, br.brewery_address, br.brewery_city, br.brewery_state, br.brewery_zip, br.lat, br.long, b.id, b.beer_name, b.beer_label FROM breweries AS br
JOIN beers AS b
ON br.brewery_name = b.brewery
WHERE br.id = $1;