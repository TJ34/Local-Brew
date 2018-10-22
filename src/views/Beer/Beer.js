import React, { Component } from 'react';
import axios from 'axios';
import Logo from '../../components/Logo/Logo';
import './Beer.scss';
import ReactModal from 'react-modal';
import StarRatingComponent from 'react-star-rating-component';
import {connect} from 'react-redux';

ReactModal.setAppElement('body');

class Beer extends Component {
    constructor() {
        super();
        this.state = {
            beer: [],
            allReviews: [],
            showModal: false,
            showModal2: false,
            review: '',
            rating: 0,
            editId: 0,
            avgRating: 0,
            dummy: 0
         }
        }

    componentDidMount(){
        axios.get(`/api/beer/${+this.props.match.params.id}`).then(response => {
            this.setState({beer: response.data[0]});
        });
        axios.get(`/api/reviews/${+this.props.match.params.id}`).then(response => {
            this.setState({allReviews: response.data});
        });
        axios.get(`/api/rating/${+this.props.match.params.id}`).then(response => {
            this.setState({avgRating: response.data[0].round})
        })
    }

    submitReviewCloseModal = (review, star_rating, user_id, beer_id, username) => {
        axios.post('/api/review', {review, star_rating, user_id, beer_id, username}).then(response => this.setState({showModal: false, review: '', rating: 0, allReviews: response.data}));
    }

    deleteReview = (id) => {
        axios.delete(`/api/review/${id}`).then(response => {
            this.setState({allReviews: response.data});
        })
    }

    editReview = (id, review, star_rating) => {
        console.log(id);
        axios.put(`/api/review/${id}`, {review, star_rating}).then(response => {
            this.setState({allReviews: response.data, showModal2: false, review: '', rating: 0});
        })
    }

    render(){
        console.log(this.state.avgRating);
        const {beer, rating, review, avgRating, dummy} = this.state;
        let reviewList = this.state.allReviews.map((review, i) => {
            return (
                <div key={i} className="reviewCard">
                    <div>
                        <p>{review.username}</p>
                        {this.props.user.isAuthed && this.props.user.user.data.id === review.user_id ? (
                        <div>
                            <button onClick={() => this.setState({showModal2: true, rating: +review.star_rating, review: review.review, editId: review.id})}>Edit</button>
                            <ReactModal
                                isOpen={this.state.showModal2}
                                contentLabel="Editing Form"
                                shouldCloseOnEsc={true}
                            >
                            <div className="modal1">
                                    <h1 className="modalHeader">{this.state.beer.beer_name} Review</h1>
                                    <div className="nameStar">
                                        <p>{review.username}</p>
                                        <StarRatingComponent
                                            name="rate3"
                                            value={this.state.rating}
                                            onStarClick={(nextValue) => {this.setState({rating: nextValue})}}
                                        />
                                    </div>
                                    <textarea onChange={(e) => this.setState({review: e.target.value})} value={this.state.review} className="modalInput"/>
                                    <button onClick={() => this.editReview(this.state.editId, this.state.review, this.state.rating)} className="submitButton">Submit</button>
                            </div>
                            </ReactModal>
                            <button onClick={() => this.deleteReview(review.id)}>Delete</button>
                        </div>
                        ):null}
                    </div>
                    <StarRatingComponent 
                        name="rate2"
                        editing={false}
                        value={+review.star_rating}
                    />
                    <p>{review.review}</p>
                </div>
            )
        })

        return(
        <div>
            <div className="beerHeader">
                <img src={beer.brew_logo} className="headerImage" alt="Not Available"/>
                <Logo />
            </div>
            <button onClick={() => this.props.history.goBack()}>Back</button>
            <div className="beerInfo">
                <img src={beer.beer_label} className="labelPic" alt="Not Available"/>
                <div className="stats">
                    <h1>{beer.beer_name}</h1>
                    <p>{beer.abv}% - {beer.style}</p>
                    <p>{beer.beer_desc}</p>
                    <StarRatingComponent
                        name="rate4"
                        editing={false}
                        value={+avgRating}
                    />
                </div>
            </div>
            <div className="reviewsContainer">
                <div className="ribbon">
                    <p>Reviews</p>
                    {this.props.user.isAuthed ? (
                    <div>
                        <button onClick={() => this.setState({showModal: true})}>+</button>
                        <ReactModal
                            isOpen={this.state.showModal}
                            contentLabel="User Review Form"
                            shouldCloseOnEsc={true}
                            style={{
                                overlay: {
                                  position: 'fixed',
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  backgroundColor: 'rgba(255, 255, 255, 0.75)'
                                },
                                content: {
                                  position: 'absolute',
                                  top: '30%',
                                  left: '20%',
                                  right: '20%',
                                  bottom: '30%',
                                  border: '4px solid black',
                                  background: '#fff',
                                  overflow: 'auto',
                                  WebkitOverflowScrolling: 'touch',
                                  borderRadius: '4px',
                                  outline: 'none',
                                  padding: '20px'
                                }
                              }}
                        >
                        <div className="modal1">
                            <h1 className="modalHeader">{this.state.beer.beer_name} Review</h1>
                            <div className="nameStar">
                                {this.props.user.user.data.username}
                                <StarRatingComponent
                                name="rate1"
                                value={rating || dummy}
                                onStarClick={(nextValue) => {this.setState({rating: nextValue})}}
                                onStarHover={(nextValue) => {this.setState({dummy: nextValue})}}
                                className="starRating1"
                                />
                            </div>
                            <textarea onChange={(e) => this.setState({review: e.target.value})} className="modalInput"/>
                            <button onClick={() => this.submitReviewCloseModal(review, rating, this.props.user.user.data.id, this.props.match.params.id, this.props.user.user.data.username)} className="submitButton">Submit</button>
                        </div>
                        </ReactModal>
                    </div>
                    ):null}
                </div>
            </div>
            {reviewList}
        </div>
        )}
}

const mapStateToProps = state => state;

export default connect (mapStateToProps)(Beer);