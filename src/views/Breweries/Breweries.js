import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import './Breweries.scss';
import axios from 'axios';
import BreweryMarkers from './BreweryMarkers';

export default class Breweries extends Component {
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

    render(){
        let list = this.state.breweries.map((brewery, i) => {
            return (
            <div key={i} className="brewCard">
                <img src={brewery.brew_logo} className="brewLogo" alt="oops!"/>
                <div className="brewInfo">
                    <p className="brewName">{brewery.brewery_name}</p>
                    <p>{brewery.brewery_address}</p>
                    <p>{brewery.brewery_city}, {brewery.brewery_state}</p>
                </div>
            </div>
        )})
        return <div>
            <Header />
            <BreweryMarkers />
            <div className="brewList">
                {list}
            </div>
        </div>
    }
}