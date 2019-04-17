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
      var cityCircle = new google.maps.Circle({
        strokeColor: '#0000CC',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#3399FF',

        // fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: this._map,
        center: mapOptions.center,
        radius: 1609.344 * 10
      });
    }
    
    render() {
      return ( 
        <div id="map" ref={m => this._map = m} style={{height: 250}}/>
      );
    }
  }
  export default GoogleMaps;
