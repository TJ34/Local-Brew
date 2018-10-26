module.exports = {
    getFavorites(req,res){
        let db=req.app.get('db');
        db.favorites.get_favorites(req.params.id).then(favorites => {
            return res.status(200).json(favorites);
        })
    },
    addFavorite(req,res){
        const {beer_name, beer_label, beer_desc, abv, style, brewery, user_id, beer_id} = req.body;
        let db=req.app.get('db');
        db.favorites.add_favorite([beer_name, beer_label, beer_desc, abv, style, brewery, user_id, beer_id]).then(
            favorites => {return res.status(200).json(favorites)}
        )
    },
    deleteFavorite(req,res){
        let db = req.app.get('db');
        db.favorites.delete_favorite(req.params.id).then(favorites => {return res.status(200).json(favorites)})
    },
    deleteFavorite2(req,res){
        let db = req.app.get('db');
        db.favorites.delete_fav(req.params.id).then(favorites => {
            return res.status(200).json(favorites);
        })
    }
}