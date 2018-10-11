import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Header.scss';
import {connect} from 'react-redux';

class Header extends Component {
    render(){
        return( 
        <div className = "header">
            <Logo />
            <div className="rightNav">
                <div>
                    {!this.props.user.isAuthed ? 
                        (<a href={process.env.REACT_APP_LOGIN}>
                            <div className="logInOut">Login</div>
                        </a>):
                        (<a href={process.env.REACT_APP_LOGOUT}>
                            <div className="logInOut">Logout</div>
                        </a>)}
                </div>
                <nav>
                    <Link to="/"><button className="navButtons">Home</button></Link>
                    <Link to="/breweries"><button className="navButtons">Breweries</button></Link>
                    <Link to="/beers"><button className="navButtons">Beers</button></Link>
                    {this.props.user.isAuthed ? (<Link to="/favorites"><button className="navButtons">Favorites</button></Link>):null}
                </nav>
            </div>
        </div>
    )}
}

const mapStateToProps = state => state;

export default connect (mapStateToProps)(Header);