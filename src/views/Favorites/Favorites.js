import React, { Component } from 'react';
import {connect} from 'react-redux';
import Header from '../../components/Header/Header';
import axios from 'axios';
import './Favorites.scss';
import {Link} from 'react-router-dom';

class Favorites extends Component {
    constructor(){
        super();

        this.state = {
            favs: []
        }
    }

    componentDidMount(){
        axios.get(`/api/favorites/${this.props.user.user.data.id}`).then(response => {
            this.setState({favs: response.data})
        })
    }

    deleteFavorite = (id) => {
        axios.delete(`api/favorites/${id}`).then(response => {
            this.setState({favs: response.data})
        })
    }

    render(){
        let favsList = this.state.favs && this.state.favs.map((fav, i) => {
            return (
                <div key={i} className="outerFav">
                    <button onClick={() => this.deleteFavorite(fav.id)} className="delButton">X</button>
                    <Link
                      to={`/breweries/brewery/beer/${fav.beer_id}`}
                      className="favCard"
                    >
                        <img src={fav.beer_label} alt="Not Available"/>
                        <p>{fav.beer_name}</p>
                        <p>{fav.brewery}</p>
                        <p>{fav.abv} - {fav.style}</p>
                    </Link>
                </div>
            )
        })
        console.log(this.state)
        return( 
        <div>
            <Header />
            <h1>Favorites List</h1>
            <div className="favsList">
                {favsList}
            </div>
        </div>
        )}
}

const mapStateToProps = state => state;

export default connect (mapStateToProps)(Favorites);