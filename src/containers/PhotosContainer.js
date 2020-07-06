import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Photos from '../components/Photos';

const PhotosContainer = props => {

    const [photos, setPhotos] = useState();

    const KEY = 'EXJCxiKAXZf_IRdOMnH7Rgv2QzwBmEaTXIWo2ihme7k';

    useEffect(() => {
        axios.get(`https://api.unsplash.com/photos/random?client_id=${KEY}&count=30&orientation=landscape`)
            .then(response => {
                console.log(response.data);
                setPhotos(response.data);
            });
    }, []);

    let photoDisplay = <p>Loading...</p>;

    if (photos) {
        photoDisplay = <Photos data={photos} />;
    }

    return photoDisplay;
};

export default PhotosContainer;