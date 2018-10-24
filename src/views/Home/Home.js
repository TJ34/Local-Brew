import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import './Home.scss';
import {connect} from 'react-redux';
import {getUser} from '../../ducks/userReducer';

class Home extends Component {

    componentDidMount(){
        this.props.getUser();
    }

    render(){
        return (
        <div className="background">
            <Header />
            <div className="home">
                <p className="homeText">
                    Local Brew
                </p>
            </div>
            <div className="footer"></div>
        </div>
        )}
}

const mapStateToProps = state => state;

export default connect (mapStateToProps,{getUser})(Home);