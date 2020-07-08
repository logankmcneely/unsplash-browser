import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Aux from '../hoc/Auxillary';
import Photos from '../components/Photos';
import * as actions from '../store/actions';

const PhotosContainer = props => {

    // SELECTORS
    const photos = useSelector(state => { return state.photos });
    // console.log('[PhotosContainer.js] photos:', photos);
    const searchParams = useSelector(state => { return state.searchParams });
    // console.log('[PhotosContainer.js] searchParams:', searchParams);

    // DISPATCH
    const dispatch = useDispatch();
    const onFetchRandomPhotos = useCallback(
        () => dispatch(actions.fetchRandomPhotos())
        , [dispatch]);
    const onFetchSearchedPhotos = useCallback(
        (searchParams) => dispatch(actions.fetchSearchedPhotos(searchParams))
        , [dispatch]);

    // Initially load selection of random images to populate page
    useEffect(() => {
        onFetchRandomPhotos();
    }, [onFetchRandomPhotos]);

    useEffect(() => {
        // Check if search isn't empty
        if (searchParams.searchField) {
            onFetchSearchedPhotos(searchParams);
        }
    }, [onFetchSearchedPhotos, searchParams]);

    // Scroll to top on new search
    useEffect(() => {
        if (searchParams.page === 1){
            setTimeout(()=> {
                window.scrollTo({top: 0, behavior: 'smooth'});
            }, 500);
        }
    }, [searchParams]);

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