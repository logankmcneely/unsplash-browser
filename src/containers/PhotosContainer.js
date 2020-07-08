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
    const onFetchSortedPhotos = useCallback(
        (searchParams) => dispatch(actions.fetchSortedPhotos(searchParams))
        , [dispatch]);

    useEffect(() => {
        switch (searchParams.searchType) {
            case 'random': {
                onFetchRandomPhotos();
                break;
            }
            case 'sorted':  {
                onFetchSortedPhotos(searchParams);
                break;
            }
            case 'search': {
                onFetchSearchedPhotos(searchParams);
                break;
            }
            default:
                break;
        }
    }, [onFetchRandomPhotos, onFetchSortedPhotos, onFetchSearchedPhotos, searchParams]);

    // Scroll to top on new search
    useEffect(() => {
        if (searchParams.page === 1) {
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
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