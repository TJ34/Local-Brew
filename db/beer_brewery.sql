SELECT * FROM breweries
JOIN beers
ON breweries.brewery_name = beers.brewery
WHERE breweries.id = $1;