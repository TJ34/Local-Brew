import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import './Home.scss';

export default class Home extends Component {
    render(){
        return <div>
            <Header />
            <div className="home"></div>
        </div>
    }
}