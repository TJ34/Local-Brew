import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Header.scss';

export default class Header extends Component {
    render(){
        return( 
        <div className = "header">
           <Logo />
           <nav className = "navLinks">
             <Link to="/"><button className="navButtons">Home</button></Link>
             <Link to="/breweries"><button className="navButtons">Breweries</button></Link>
             <Link to="/beers"><button className="navButtons">Beers</button></Link>
            </nav> 
        </div>
    )}
}