import axios from 'axios';

const API = process.env.REACT_APP_API;
axios.defaults.headers.common.Accept = 'application/json';

const fetch = (endpoint) => {
return axios
    .get(endpoint)
    .then((res) => res)
    .catch((err) => {
    console.error(
        'Error catch in Apiutils at fetch method. It will be thrown...');
    throw err;
    });
}

/* export const getPoints = (user = '', apiKey = '', table = '', latlng = {lat: undefined, lng: undefined}, meters = 1000) => {
    const {lng, lat} = latlng;
    const query = `https://${user}.carto.com/api/v2/sql?api_key=${apiKey}&q=SELECT * FROM ${table}`;
    return fetch(query)
      .then(res=> {
        const data = [];
        res.data.rows.forEach(point=>{
          data.push({lng: point.longitude, lat: point.latitude, color: point.color})
      });
      return data;
      });
}; */

export const getPuntos = async (lat, long) => {
  const response = await fetch(`${API}/puntos/${lat}/${long}`);
  const data = response.data;
  return data;
}

export const getDireccion = async(lat, long) => {
  const response = await fetch('https://api.geoapify.com/v1/geocode/reverse?lat=' + lat + '&lon=' + long + '&lang=de&limit=10&apiKey=f654951793c5426c858d39cd2151c58b');
  return response.data.features[0].properties;
}
