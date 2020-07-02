import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import PhotoContainer from './components/PhotoContainer';

function App() {

  const [photos, setPhotos] = useState();

  const KEY = 'EXJCxiKAXZf_IRdOMnH7Rgv2QzwBmEaTXIWo2ihme7k';

  useEffect(() => {
    axios.get(`https://api.unsplash.com/photos/random?client_id=${KEY}&count=30`)
    .then(response => {
      console.log(response.data);
      setPhotos(response.data);
    });
  }, []);
  
  let photoDisplay = <p>Loading...</p>;

  if (photos) {
    photoDisplay =  <PhotoContainer data={photos}/>;
  }

  return photoDisplay;
}

export default App;
