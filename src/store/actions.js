import * as actionTypes from './actionTypes';
import axios from 'axios';
// import unsplash from '../utils/unsplash-api';

export const setSearchField = (newSearchField) => {
    return {
        type: actionTypes.SET_SEARCH_FIELD,
        searchField: newSearchField
    };
};

export const fetchPhotosStart = () => {
    return {
        type: actionTypes.FETCH_RANDOM_PHOTOS_START
    };
};

export const fetchPhotosSuccess = (photos) => {
    return {
        type: actionTypes.FETCH_RANDOM_PHOTOS_SUCCESS,
        photos: photos
    };
};

export const fetchPhotosFailed = (error) => {
    return {
        type: actionTypes.FETCH_RANDOM_PHOTOS_FAILED,
        error: error
    };
};

export const fetchRandomPhotos = () => {
    return dispatch => {
        dispatch(fetchPhotosStart());
        axios.get(`https://api.unsplash.com/photos/random?client_id=${process.env.REACT_APP_API_KEY}&count=30&orientation=landscape`)
        .then(response => {
            console.log('[response]', response.data);
            dispatch(fetchPhotosSuccess(response.data));
        })
        .catch(error => {
            console.log('[.get error]', error);
            dispatch(fetchPhotosFailed(error));
        });
    };
};

export const fetchSearchedPhotos = (searchField) => {
    // Before initiating search, update saved search value
    setSearchField(searchField);
    console.log('[fetchSearchedPhotos] searchParams:', searchField);
    return dispatch => {
        dispatch(fetchPhotosStart());
        axios.get(`https://api.unsplash.com/search/photos?client_id=${process.env.REACT_APP_API_KEY}&per_page=30&query=${searchField}`)
        .then(response => {
            console.log('[response]', response.data);
            dispatch(fetchPhotosSuccess(response.data.results));
        })
        .catch(error => {
            console.log('[.get error]', error);
            dispatch(fetchPhotosFailed(error));
        });
    };
};