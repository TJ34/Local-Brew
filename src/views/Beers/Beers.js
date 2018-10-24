import React, { Component } from 'react';
import axios from 'axios';
import Header from '../../components/Header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link, withRouter} from 'react-router-dom';
import './Beers.scss';
import {connect} from 'react-redux';

class Beers extends Component {
    constructor(){
        super();

        this.state = {
            beers: [],
            searchInput: '',
            favorites: []
        }
    }

    componentDidMount(){
        axios.get('/api/beers').then(response => {
            this.setState({beers: response.data});
        });
        if(this.props.user.isAuthed){
            axios.get(`/api/favorites/${this.props.user.user.data.id}`).then(response => {
                this.setState({favorites: response.data.map(obj => obj.beer_id)});
            })
        }
    }


    getFavorites = () => {
        axios.get(`/api/favorites/${this.props.user.user.data.id}`).then(response => {
            this.setState({favorites: response.data.map(obj => obj.beer_id)});
    })}

    addToFavorites = (beer_name, beer_label, beer_desc, abv, style, brewery, user_id, beer_id) => {
        axios.post('/api/favorites', {beer_name, beer_label, beer_desc, abv, style, brewery, user_id, beer_id})
        .then(() => this.getFavorites());
    }
    


    render(){
        let allBeers = this.state.beers.filter((beer, i) => {
            return beer.beer_name.includes(this.state.searchInput) || beer.brewery.includes(this.state.searchInput);
        }).map((beer, i) => {
            return (
                    <div key={i} className="beerCards">
                        {this.props.user.isAuthed ? (
                            this.state.favorites.includes(beer.id) ?
                                <FontAwesomeIcon 
                                    icon="heart" 
                                    className="heartIcon"/>
                                
                                : <FontAwesomeIcon 
                                    icon={['far', 'heart']} 
                                    className="heartIcon"
                                    onClick={() => this.addToFavorites(beer.beer_name, beer.beer_label, beer.beer_desc, beer.abv, beer.style, beer.brewery, this.props.user.user.data.id, beer.id)}/> 
                        ):null}
                        <Link 
                            to={`/breweries/brewery/beer/${beer.id}`}
                            className="card"
                        >
                            <img className="labelImage" src={beer.beer_label} alt="Not Available"/>
                            <div className="beerName"><p>{beer.beer_name}</p></div>
                        </Link>
                    </div>
            )
        })

        return(
            <div className="beersBackground">
                <Header />
                <div className="searchBox"><input placeholder="Enter Beer or Brewery Name" onChange={(e) => this.setState({searchInput: (e.target.value)})} className="beerInput"/></div>
                <div className="beersList">
                    {allBeers}
                </div>
            </div>
        )}
}

const mapStateToProps = state => state;

export default connect (mapStateToProps)(withRouter(Beers));