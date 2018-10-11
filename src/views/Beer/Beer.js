import React, { Component } from 'react';
import axios from 'axios';
import Logo from '../../components/Logo/Logo';
import './Beer.scss';

export default class Beer extends Component {
    constructor() {
        super();
        this.state = {
            beer: []
         }
        }

    componentDidMount(){
        axios.get(`/api/beer/${+this.props.match.params.id}`).then(response => {
            this.setState({beer: response.data[0]});
        })
    }

    render(){
        const {beer} = this.state;
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
        </div>
        )}
}