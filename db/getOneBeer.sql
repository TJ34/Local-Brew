SELECT * FROM beers
JOIN breweries
ON breweries.brewery_name = beers.brewery
WHERE beers.id = $1;