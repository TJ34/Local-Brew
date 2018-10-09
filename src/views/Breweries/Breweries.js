import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import './Breweries.scss';
import axios from 'axios';
import BreweryMarkers from './BreweryMarkers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateBrewInfo} from '../../ducks/reducer';

class Breweries extends Component {
    constructor(){
        super();

        this.state = {
            breweries: []
        }
    }

    componentDidMount(){
        axios.get('/api/breweries').then((response) => {
            this.setState({breweries: response.data})
        })
    }

    getBandB = (id) => {
        axios.get(`/api/bandb/${id}`).then(response => {
            this.props.updateBrewInfo(response);
        })
    }

    render(){
        let list = this.state.breweries.map((brewery, i) => {
            return (
            <Link to="/breweries/brewery" 
                  key={i} className="brewCard"
                  onClick={() => this.getBandB(brewery.id)}
            >
                <img src={brewery.brew_logo} className="brewLogo" alt="oops!"/>
                <div className="brewInfo">
                    <p className="brewName">{brewery.brewery_name}</p>
                    <p>{brewery.brewery_address}</p>
                    <p>{brewery.brewery_city}, {brewery.brewery_state}</p>
                </div> 
            </Link>
        )})
        return <div>
            <Header />
            <div className="brewHeader">
                <h1>Brewery  <FontAwesomeIcon icon="beer"/>  List</h1>
            </div>
            <BreweryMarkers />
            <div className="brewList">
                {list}
            </div>
        </div>
    }
}

function mapStateToProps(state){
    const{brewery_info} = state;

    return {
        brewery_info
    }
}

export default connect(mapStateToProps,{updateBrewInfo})(Breweries);