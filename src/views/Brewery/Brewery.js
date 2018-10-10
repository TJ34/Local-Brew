import React, { Component } from 'react';
import {connect} from 'react-redux';
import Header from '../../components/Header/Header';
import GoogleMapReact from "google-map-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Brewery.scss';
import {Link} from 'react-router-dom';

const google_key = process.env.REACT_APP_GOOGLE_API_KEY;
const Brew = ({text}) => <div>{text}</div>

class Brewery extends Component {
    constructor() {
        super();
        this.state = {
          center: {
            lat: null,
            lng: null
          },
          zoom: 11
        };
      }
    
      componentDidMount(){
        setTimeout(function(){
            this.setState({center: {
                lat: +this.props.brewery_info[0].lat,
                lng: +this.props.brewery_info[0].long
            }})
        }.bind(this), 100)  
      }
    render(){
        const {brewery_info} = this.props
        let beerList = brewery_info.map((beer, i) => {
            return (
                <Link to={`/breweries/brewery/beer/${beer.id}`} key={i} className="beerCard">
                        <FontAwesomeIcon icon={['far', 'heart']} className="heartIcon"/>
                        <p>{beer.beer_name}</p>
                </Link>
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
                    <p>{brewery_info[0] && brewery_info[0].brewery_city}, {brewery_info[0] && brewery_info[0].brewery_state}</p>
                </div>
              </div>
              <div className="brList">
                {beerList} 
              </div>   
            </div>
        )}
}

function mapStateToProps(state){
    return {
        brewery_info: state.brewery_info
    }
}

export default connect(mapStateToProps)(Brewery);