import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../App';
import Aux from '../hoc/Auxillary';
import Photos from '../components/Photos';

const PhotosContainer = props => {

    //State
    const [photos, setPhotos] = useState();

    // Context API state
    const { state, dispatch } = useContext(AppContext);

    // API Key. Figure out how best to hide this
    const KEY = 'Ju8wqatqIbiBad86kTRQ5ISJOhuI7epXpPmA4qNXOLc';

    // Initially load selection of random images to populate page
    useEffect(()=> {
        axios.get(`https://api.unsplash.com/photos/random?client_id=${KEY}&count=30&orientation=landscape`)
        .then(response => {
            console.log(response.data);
            setPhotos(response.data);
        });
    }, []);

    useEffect(()=> {
        axios.get(`https://api.unsplash.com/photos/random?client_id=${KEY}&count=30&orientation=landscape&query=${state.searchQuery}`)
        .then(response => {
            console.log(response.data);
            setPhotos(response.data);
        });
    }, [state.searchQuery]);


    // Update to spinner later
    const photosDisplay = photos ?
        <Photos
            data={photos} />
        : <p>Loading...</p>;

    return (
        <Aux>
            {photosDisplay}
        </Aux>
    );
};

export default PhotosContainer;