import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import GoogleMapReact from "google-map-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Brewery.scss';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';

const google_key = process.env.REACT_APP_GOOGLE_API_KEY;
const Brew = ({text}) => <div>{text}</div>

class Brewery extends Component {
    constructor() {
        super();
        this.state = {
            brewery_info: [],
            center: {
                lat: null,
                lng: null
            },
          zoom: 11,
          favorites: []
        };
      }
      
    componentDidMount(){
        axios.get(`/api/bandb/${+this.props.match.params.id}`).then(response => {
            this.setState({brewery_info: response.data, center: {lat: +response.data[0].lat, lng: +response.data[0].long}});
        });
        if(this.props.user.isAuthed){
            axios.get(`/api/favorites/${this.props.user.user.data.id}`).then(response => {
                this.setState({favorites: response.data.map(obj => obj.beer_id)});
            })
        }
    }

    getFavorites = () => {
        axios.get(`/api/favorites/${this.props.user.user.data.id}`).then(response => {
            console.log(response)
            this.setState({favorites: response.data.map(obj => obj.beer_id)});
    })}

    addToFavorites = (beer_name, beer_label, beer_desc, abv, style, brewery, user_id, beer_id) => {
        axios.post('/api/favorites', {beer_name, beer_label, beer_desc, abv, style, brewery, user_id, beer_id}).then(() => this.getFavorites());
    }

    render(){
        const {brewery_info} = this.state;
        let beerList = brewery_info.map((beer, i) => {
            return (
                <div className="outerDiv" key={i}>
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
                        to={`/breweries/brewery/beer/${beer.id}`}  className="beerCard">  
                            <img className="labelImage" src={beer.beer_label} alt="Not Available"/>
                            <p className="beerName">{beer.beer_name}</p>
                    </Link>
                </div>
            )
        })

        return( 
            <div>
                <Header />
                <div className="nameHeader">
                    <h1>{brewery_info[0] && brewery_info[0].brewery_name}</h1>
                </div>
              <div className="topHalf">
                <div className="logoDesc">
                    <img src={brewery_info[0] && brewery_info[0].brew_logo} className="logo" alt="Not Available"/>
                </div>
                <div className="mapAddress">
                    <div className="brewMap">
                        <GoogleMapReact
                            bootstrapURLKeys={{key: google_key}}
                            center={this.state.center}
                            defaultZoom={this.state.zoom} 
                        >
                            <Brew  
                                lat={brewery_info[0] && brewery_info[0].lat}
                                lng={brewery_info[0] && brewery_info[0].long}
                                text={<FontAwesomeIcon icon="beer" className="brewIcon"/>}
                            />
                        </GoogleMapReact>
                    </div>
                    <p>{brewery_info[0] && brewery_info[0].brewery_address}</p>
                    <p>{brewery_info[0] && brewery_info[0].brewery_city}, {brewery_info[0] && brewery_info[0].brewery_state} {brewery_info[0] && brewery_info[0].brewery_zip}</p>
                </div>
              </div>
              <div className="brList">
                {beerList} 
              </div>   
            </div>
        )}
}

const mapStateToProps = state => state;

export default connect (mapStateToProps)(Brewery);