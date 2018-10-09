import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import "./BreweryMarkers.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const google_key = process.env.REACT_APP_GOOGLE_API_KEY;
const Bitter = ({text}) => <div>{text}</div>
const Lakewood = ({text}) => <div>{text}</div>
const Tupps = ({text}) => <div>{text}</div>
const Franconia = ({text}) => <div>{text}</div>
const WoodCreek = ({text}) => <div>{text}</div>
const Cedar = ({text}) => <div>{text}</div>
const TAP = ({text}) => <div>{text}</div>
const Peticolas = ({text}) => <div>{text}</div>
const DeepEllum = ({text}) => <div>{text}</div>
const TNations = ({text}) => <div>{text}</div>
const WildAcre = ({text}) => <div>{text}</div>
const Rahr = ({text}) => <div>{text}</div>
const HopFusion = ({text}) => <div>{text}</div>
const Martin = ({text}) => <div>{text}</div>
const Panther = ({text}) => <div>{text}</div>
const Shannon = ({text}) => <div>{text}</div>
 

class BreweryMarkers extends Component {
  constructor() {
    super();
    this.state = {
      center: {
        lat: 32.796909,
        lng: -96.829151
      },
      zoom: 10
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
          <Bitter lat={32.955016} lng={-96.847174} text={<FontAwesomeIcon icon="beer" className="icon"/>} />
          <Lakewood lat={32.890234} lng={-96.680997} text={<FontAwesomeIcon icon="beer" className="icon"/>} />
          <Tupps lat={33.184163} lng={-96.610149} text={<FontAwesomeIcon icon="beer" className="icon"/>} />
          <Franconia lat={33.21374} lng={-96.609023} text={<FontAwesomeIcon icon="beer" className="icon"/>} />
          <WoodCreek lat={32.913667} lng={-96.44139} text={<FontAwesomeIcon icon="beer" className="icon"/>} />
          <Cedar lat={32.323305} lng={-96.20683} text={<FontAwesomeIcon icon="beer" className="icon"/>} />
          <TAP lat={32.786365} lng={-96.818234} text={<FontAwesomeIcon icon="beer" className="icon"/>} />
          <Peticolas lat={32.796909} lng={-96.829151} text={<FontAwesomeIcon icon="beer" className="icon"/>} />
          <DeepEllum lat={32.781002} lng={-96.781649} text={<FontAwesomeIcon icon="beer" className="icon"/>} />
          <TNations lat={32.931321} lng={-96.898284} text={<FontAwesomeIcon icon="beer" className="icon"/>} />
          <WildAcre lat={32.743854} lng={-97.308647} text={<FontAwesomeIcon icon="beer" className="icon"/>} />
          <Rahr lat={32.737323} lng={-97.326968} text={<FontAwesomeIcon icon="beer" className="icon"/>} />
          <HopFusion lat={32.741886} lng={-97.324766} text={<FontAwesomeIcon icon="beer" className="icon"/>} />
          <Martin lat={32.763963} lng={-97.309701} text={<FontAwesomeIcon icon="beer" className="icon"/>} />
          <Panther lat={32.763999} lng={-97.337869} text={<FontAwesomeIcon icon="beer" className="icon"/>} />
          <Shannon lat={32.946904} lng={-97.251245} text={<FontAwesomeIcon icon="beer" className="icon"/>} />

        </GoogleMapReact>
      </div>
    );
  }
}

export default BreweryMarkers;