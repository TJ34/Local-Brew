require ('dotenv').config();
const express = require("express");
const app=express();
const port = process.env.PORT || 3001;
const massive = require("massive");
const {json} = require("body-parser");
const breweryCntrl = require('./breweryCntrl');

app.use(json());
massive(process.env.CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance);
}).catch(err => console.log(err));

app.get('/api/breweries', breweryCntrl.getBreweries);
app.get('/api/brewery/:id', breweryCntrl.getBrewery);
app.get('/api/beers', breweryCntrl.getBeers);
app.get('/api/beer/:id', breweryCntrl.getOneBeer);
app.get('/api/bandb/:id', breweryCntrl.beerAndBrewery);

app.listen(port, () => console.log(`Local Brew up and running on ${port}`))