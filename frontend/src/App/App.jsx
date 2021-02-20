import React from 'react';
import Map from './Map';
import './App.css';

function App() {
  
  return (
    <div id="app">
      <Map
        lat={19.453603}
        lng={-99.140410}
      />
    </div>
  );
}

export default App;
