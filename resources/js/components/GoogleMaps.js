import React from 'react';

// Google Maps Component ------
// Wraps the google maps API 
class GoogleMaps extends React.Component {
    constructor() {
      super();
    }
    
    shouldComponentUpdate() {
      return false;
    }
    
    componentWillReceiveProps(nextProps) {
      this._setOptions(
        nextProps.lat,
        nextProps.lng,
        nextProps.zoom
      );
    }
    
    componentDidMount() {
      this._renderMap();
    }
    
    _setOptions(lat, lng, zoom) {
      let mapOptions = {
        center: { lat, lng },
        zoom
      };
      console.log(mapOptions);
      
      this._map.setOptions(mapOptions);
    }
    
    _renderMap() {
      let mapOptions= {
        center: { lat: this.props.lat, lng: this.props.lng },
        zoom: this.props.zoom
      }
      this._map = new google.maps.Map(this._map, mapOptions);
    }
    
    render() {
      return ( 
        <div id="map" ref={m => this._map = m} style={{height: 250}}/>
      );
    }
  }
  export default GoogleMaps;
