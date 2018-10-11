module.exports = {
    getBreweries(req,res){
        let db=req.app.get('db');
        db.get_breweries().then(breweries => {
            return res.status(200).json(breweries);
        })
    },
    getBrewery(req, res){
        let db=req.app.get('db');
        const {id} = req.params;
        db.get_brewery(id).then((brewery) => {
            return res.status(200).json(brewery)
        })
    },
    getBeers(req,res){
        let db=req.app.get('db');
        db.get_beers().then(beers => {
            return res.status(200).json(beers);
        })
    },
    getOneBeer(req,res){
        let db=req.app.get('db');
        const {id} = req.params;
        db.getOneBeer(id).then(beer => {
            return res.status(200).json(beer);
        })
    },
    beerAndBrewery(req,res){
        let db=req.app.get('db');
        const {id} = req.params;
        db.beer_brewery(id).then(info => {
            return res.status(200).json(info);
        })
    }
}