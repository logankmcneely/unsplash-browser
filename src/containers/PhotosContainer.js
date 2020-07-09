import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Photos from '../components/Photos';
import * as actions from '../store/actions';

const PhotosContainer = props => {

    // Local state
    const [scrollPosition, setScrollPosition] = useState(0.);


    // Selectors
    const photos = useSelector(state => { return state.photos });
    const searchParams = useSelector(state => { return state.searchParams });
    const loading = useSelector(state => { return state.status.loading });


    // Dispatch
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
    const onIncrementSearchPage = useCallback(
        () => dispatch(actions.incrementSearchPage())
        , [dispatch]);


    // Initiate search when searchParams have changed
    useEffect(() => {
        switch (searchParams.searchType) {
            case 'random': {
                onFetchRandomPhotos();
                break;
            }
            case 'sorted': {
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
    }, [searchParams, onFetchRandomPhotos, onFetchSortedPhotos, onFetchSearchedPhotos]);


    // Scroll to top on new search
    useEffect(() => {
        if (searchParams.page === 1) {
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 500);
        }
    }, [searchParams]);


    // Get scroll position
    const listenToScroll = useCallback(() => {
        const winScroll =
            document.body.scrollTop || document.documentElement.scrollTop;

        const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const scrolled = winScroll / height;
        setScrollPosition(scrolled);
        console.log('[listenToScroll] scrollPosition:', scrolled);
    }, []);


    // Initiate monitoring of scroll position
    useEffect(() => {
        window.addEventListener('scroll', listenToScroll);
    }, [listenToScroll]);


    // Trigger next page search based on scroll position. It checks that the searchType 
    // is not random as that api call doesn't use page calls and finally checks if
    // the page isn't already loading a new page to prevent additional calls before
    // loading is finished
    useEffect(() => {
        if (scrollPosition === 1 && searchParams.searchType !== 'random' && !loading) {
            onIncrementSearchPage();
            setScrollPosition(0.);
        }
    }, [scrollPosition, searchParams.searchType, loading, photos, onIncrementSearchPage]);


    // Update to spinner later
    const photosDisplay = photos ?
        <Photos
            data={photos} />
        : <p>Loading...</p>;

    return photosDisplay;
};

export default PhotosContainer;