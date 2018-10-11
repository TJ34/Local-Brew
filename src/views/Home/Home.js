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
        console.log(this.props);
        return <div>
            <Header />
            <div className="home"></div>
        </div>
    }
}

const mapStateToProps = state => state;

export default connect (mapStateToProps,{getUser})(Home);