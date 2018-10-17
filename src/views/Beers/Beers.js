import React, { Component } from 'react';
import axios from 'axios';
import Header from '../../components/Header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';
import './Beers.scss';
import {connect} from 'react-redux';

class Beers extends Component {
    constructor(){
        super();

        this.state = {
            beers: [],
            searchInput: ''
        }
    }

    componentDidMount(){
        axios.get('/api/beers').then(response => {
            this.setState({beers: response.data});
        })
    }

    addToFavorites = (beer_name, beer_label, beer_desc, abv, style, brewery, user_id, beer_id) => {
        axios.post('/api/favorites', {beer_name, beer_label, beer_desc, abv, style, brewery, user_id, beer_id})
    }

    render(){
        let allBeers = this.state.beers.filter((beer, i) => {
            return beer.beer_name.includes(this.state.searchInput) || beer.brewery.includes(this.state.searchInput);
        }).map((beer, i) => {
            return (
                <div key={i} className="beerCards">
                  <FontAwesomeIcon 
                            icon={['far', 'heart']} 
                            className="heartIcon"
                            onClick={() => this.addToFavorites(beer.beer_name, beer.beer_label, beer.beer_desc, beer.abv, beer.style, beer.brewery, this.props.user.user.data.id, beer.id)}
                    />
                    <Link 
                        to={`/breweries/brewery/beer/${beer.id}`}
                            className="card">  
                            <p>{beer.beer_name}</p>
                    </Link>
                </div>
            )
        })

        return <div>
            <Header />
            <div> Search: <input placeholder="Beer or Brewery Name" onChange={(e) => this.setState({searchInput: (e.target.value)})}/></div>
            <div className="beersList">
                {allBeers}
            </div>
        </div>
    }
}

const mapStateToProps = state => state;

export default connect (mapStateToProps)(Beers);