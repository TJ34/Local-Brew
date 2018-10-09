import React, { Component } from 'react';
import {connect} from 'react-redux';

class Brewery extends Component {
    render(){
        return( 
            <div>
            <p>Testing</p>
            </div>
        )}
}

function mapStateToProps(state){
    return {
        brewery_info: state.brewery_info
    }
}

export default connect(mapStateToProps)(Brewery);