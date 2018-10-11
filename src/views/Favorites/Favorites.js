import React, { Component } from 'react';
import {connect} from 'react-redux';
import Header from '../../components/Header/Header';
import axios from 'axios';

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

    render(){
        let favsList = this.state.favs && this.state.favs.map((fav, i) => {
            return (
                <div key={i}>
                   <img src={fav.beer_label} alt="Not Available"/>

                </div>
            )
        })
        console.log(this.state)
        return( 
        <div>
            <Header />
            
        </div>
        )}
}

const mapStateToProps = state => state;

export default connect (mapStateToProps)(Favorites);