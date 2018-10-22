import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Header.scss';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Header extends Component {
    constructor(){
        super();

        this.state = {
            showMenu: false
        }
    }

    showMenu = () => {
        this.setState({showMenu: true}, () => {
            document.addEventListener('click', this.closeMenu);
        })
    }

    closeMenu = () => {
        this.setState({showMenu: false}, () => {
            document.removeEventListener('click', this.closeMenu);
        })
    }

    render(){
        return(
        <div>
            <div className = "header">
                <Logo />
                <FontAwesomeIcon icon="bars" onClick={this.showMenu} className="hamburger"/>
            </div>
            <div className="dropdown">
                {this.state.showMenu ? (
                    <div className="menu">
                        {!this.props.user.isAuthed ? 
                            (<a href={process.env.REACT_APP_LOGIN}>
                                <div className="navButtons">Login</div>
                            </a>):
                            (<a href={process.env.REACT_APP_LOGOUT}>
                                <div className="navButtons">Logout</div>
                            </a>)}
                        <Link to="/"><button className="navButtons">Home</button></Link>
                        <Link to="/breweries"><button className="navButtons">Breweries</button></Link>
                        <Link to="/beers"><button className="navButtons">Beers</button></Link>
                        {this.props.user.isAuthed ? (
                            <Link to="/favorites"><button className="navButtons">Favorites</button></Link>
                            ):null}
                        {this.props.user.isAuthed ? (
                            <Link to="/chat"><button className="navButtons">Chat</button></Link>
                            ):null}
                    </div>
                ): (null)}
            </div>
        </div> 
    )}
}

const mapStateToProps = state => state;

export default connect (mapStateToProps)(Header);