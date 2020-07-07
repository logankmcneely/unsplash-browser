import React, {  useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Aux from '../hoc/Auxillary';
import Photos from '../components/Photos';
import * as actions from '../store/actions';

const PhotosContainer = props => {

    // SELECTORS
    const photos = useSelector(state => {return state.photos});
    console.log('[PhotosContainer.js] photos:', photos);

    // DISPATCH
    const dispatch = useDispatch();
    const onFetchRandomPhotos = useCallback(
        () => dispatch(actions.fetchRandomPhotos())
    , [dispatch]);

    // Initially load selection of random images to populate page
    useEffect(()=> {
        onFetchRandomPhotos();
    }, [onFetchRandomPhotos]);

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