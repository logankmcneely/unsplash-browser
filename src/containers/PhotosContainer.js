import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Aux from '../hoc/Auxillary';
import Photos from '../components/Photos';

const PhotosContainer = props => {

    // STATE
    const [photos, setPhotos] = useState();

    // SELECTORS
    const searchField = useSelector(state => {return state.searchField})

    const KEY = process.env.REACT_APP_API_KEY;

    // Initially load selection of random images to populate page
    useEffect(()=> {
        axios.get(`https://api.unsplash.com/photos/random?client_id=${KEY}&count=30&orientation=landscape`)
        .then(response => {
            console.log(response.data);
            setPhotos(response.data);
        });
    }, [KEY]);

    useEffect(()=> {
        axios.get(`https://api.unsplash.com/photos/random?client_id=${KEY}&count=30&orientation=landscape&query=${searchField}`)
        .then(response => {
            console.log(response.data);
            setPhotos(response.data);
        });
    }, [searchField, KEY]);


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