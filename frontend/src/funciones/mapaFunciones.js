import * as L from 'leaflet';
import { getPuntos } from '../Utils/ApiUils';

export const createPointsLayer = async (lat, long) => {
    let pointData;
  
    pointData = await getPuntos(lat, long);
  
    const pointsArray = [];
    pointData.forEach(p=>{
      const circleMarker = L.circleMarker(p, {
        bubblingMouseEvents: false,
        color: `#${p.color}`
      }).setRadius(3);
      pointsArray.push(circleMarker);
    });
  
    return L.layerGroup(pointsArray);
};
      
export const makeMarkupOnePoint = (lat, lng, direccion, nombre) => {
    return `
      <div class="widget">
      ${lat ? `
      <h3>${lat}, ${lng}</h3>
      `: ''}
      <center><h3>${nombre}</h3></center>
      <h4>Dirección: ${direccion}</h4>
      </div>
    `;
}