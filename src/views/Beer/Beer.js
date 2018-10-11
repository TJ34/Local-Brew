import React, { Component } from 'react';
import axios from 'axios';
import Logo from '../../components/Logo/Logo';
import './Beer.scss';
import ReactModal from 'react-modal';
import StarRatingComponent from 'react-star-rating-component';
import {connect} from 'react-redux';

class Beer extends Component {
    constructor() {
        super();
        this.state = {
            beer: [],
            showModal: false,
            review: '',
            rating: 0,
         }
        }

    componentDidMount(){
        axios.get(`/api/beer/${+this.props.match.params.id}`).then(response => {
            this.setState({beer: response.data[0]});
        })
    }

    submitReviewCloseModal = (review, star_rating, user_id, beer_id) => {
        this.setState({showModal: false})
    }

    render(){
        console.log(this.props);
        const {beer, rating, review} = this.state;
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
                </div>
            </div>
            <div>
                <button onClick={() => this.setState({showModal: true})}>Add Review</button>
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="User Review Form"
                    shouldCloseOnEsc={true}
                >
                <h1>{this.state.beer.beer_name} Review</h1>
                <div>
                    {this.props.user.user.data.username}
                    <StarRatingComponent
                    name="rate1"
                    value={rating}
                    onStarClick={(nextValue) => {this.setState({rating: nextValue})}}
                    />
                </div>
                <input onChange={(e) => this.setState({review: e.target.value})}/>
                <button onClick={() => this.submitReviewCloseModal(review, rating, this.props.user.user.data.id, this.props.match.params.id)}>Submit</button>
                </ReactModal>
            </div>
        </div>
        )}
}

const mapStateToProps = state => state;

export default connect (mapStateToProps)(Beer);