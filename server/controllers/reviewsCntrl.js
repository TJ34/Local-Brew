module.exports = {
    getReviews(req,res){
        let db=req.app.get('db');
        db.reviews.get_reviews(req.params.id).then(reviews => {
            return res.status(200).json(reviews);
        })
    },
    addReview(req,res){
        const {review, star_rating, user_id, beer_id, username} = req.body;
        let db=req.app.get('db');
        db.reviews.add_review([review, star_rating, user_id, beer_id, username]).then(reviews => {
            return res.status(200).json(reviews);
        })
    },
    deleteReview(req,res){
        let db = req.app.get('db');
        db.reviews.delete_review(req.params.id).then(reviews => {
            return res.status(200).json(reviews);
        })
    },
    editReview(req,res){
        const{review, star_rating} = req.body;
        const {id} = req.params;
        let db = req.app.get('db');
        db.reviews.edit_review([id, review, star_rating]).then(reviews => {
            return res.status(200).json(reviews);
        })
    }
}