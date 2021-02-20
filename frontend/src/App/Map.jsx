import React, { useRef, useEffect } from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';
import { getDireccion } from '../Utils/ApiUils';
import { createPointsLayer, makeMarkupOnePoint } from '../funciones/mapaFunciones';
import './Map.css';

function Map (props) {
  const {
    lat,
    lng,
    zoom,
    basemapURL,
  } = props;
  
  const map = useRef({});
    
  useEffect(() => {
    map.current = L.map('map', {
      center: [lat, lng],
      zoom,
      zoomControl: true      
    });
    const basemap = L.tileLayer(basemapURL, {
      detectRetina: true,
      retina: '@2x',
    });
    basemap.addTo(map.current);

    const requestPoints = async (event) => {

      const {latlng} = event;

      const pointsLayer = await createPointsLayer(latlng.lat, latlng.lng);
      
      const popup = L.popup({ closeButton: true });

      pointsLayer.addTo(map.current);

      pointsLayer.eachLayer(point=> {
        point.on('click', async (e) => {
          const {latlng} = e;
          let name;
          let direccion;
          const info = await getDireccion(latlng.lat, latlng.lng);
          info.name ? name = info.name : name = 'Sin nombre';
          info.formatted ? direccion = info.formatted : direccion = 'Sin dirección';
          let htmlContent;
          htmlContent = makeMarkupOnePoint(latlng.lat, latlng.lng, direccion, name);
          popup.setContent(htmlContent);
          popup.setLatLng(latlng);
          if (!popup.isOpen()) {
            popup.openOn(map.current);
          }
        });
      });
    }

    map.current.on('click', requestPoints);

  }, [
    lat,
    lng,
    zoom,
    basemapURL,
  ]);
  return (
    <div id="map"/>
  );
}
     
Map.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  basemapURL: PropTypes.string,
  zoom: PropTypes.number,
};

Map.defaultProps = {
  basemapURL: 'https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png',
  zoom: 13,
}
    
export default Map;
    
