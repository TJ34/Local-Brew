import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import "./BreweryMarkers.scss";

const google_key = process.env.REACT_APP_GOOGLE_API_KEY;
const Bitter = ({text}) => <div>{text}</div> 

class BreweryMarkers extends Component {
  constructor() {
    super();
    this.state = {
      center: {
        lat: 32.796909,
        lng: -96.829151
      },
      zoom: 8
    };
  }

  render() {
    return (
      <div className="map">
        <GoogleMapReact
          bootstrapURLKeys={{key: google_key}}  
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
        >
          <Bitter lat={32.955016} lng={-96.847174} text={'Bitter Sisters'}/>

        </GoogleMapReact>
      </div>
    );
  }
}

export default BreweryMarkers;