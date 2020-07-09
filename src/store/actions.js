import * as actionTypes from './actionTypes';
import unsplash from '../utils/unsplash-api';
import { toJson } from "unsplash-js";

export const setSearchParams = (searchParams) => {
    return {
        type: actionTypes.SET_SEARCH_PARAMS,
        searchParams: searchParams
    };
};

export const setSearchTotalPages = (totalPages) => {
    return {
        type: actionTypes.SET_SEARCH_TOTAL_PAGES,
        totalPages: totalPages
    };
};

export const incrementSearchPage = () => {
    return {
        type: actionTypes.INCREMENT_SEARCH_PAGE
    };
};

export const fetchPhotosStart = () => {
    return {
        type: actionTypes.FETCH_PHOTOS_START
    };
};

export const fetchPhotosSuccess = (photos) => {
    return {
        type: actionTypes.FETCH_PHOTOS_SUCCESS,
        photos: photos
    };
};

export const fetchPhotosFailed = (errorMessage) => {
    return {
        type: actionTypes.FETCH_PHOTOS_FAILED,
        errorMessage: errorMessage
    };
};

export const fetchRandomPhotos = () => {
    return dispatch => {
        dispatch(fetchPhotosStart());
        unsplash.photos.getRandomPhoto({ count: 30 })
        .then(toJson)
        .then(response => {
            console.log('[fetchRandomPhotos]', response);
            dispatch(fetchPhotosSuccess(response));
        })
        .catch(error => {
            console.log('[.get error]', error);
            // dispatch(fetchPhotosFailed(error));
        });
    };
};

export const fetchSearchedPhotos = (searchParams) => {  
    // console.log('[fetchSearchedPhotos] searchParams:', searchParams);
    return dispatch => {
        dispatch(fetchPhotosStart());
        unsplash.search.photos(
            searchParams.searchField,
            searchParams.page, 
            searchParams.perPage,
            { orientation: searchParams.orientation })
        .then(toJson)
        .then(response => {
            console.log('[fetchSearchedPhotos]', response);
            dispatch(fetchPhotosSuccess(response.results));
            dispatch(setSearchTotalPages(response.total_pages));
        })
        .catch(error => {
            console.log('[.get error]', error);
            // dispatch(fetchPhotosFailed(error));
        });
    };
};

export const fetchSortedPhotos = (searchParams) => {  
    // console.log('[fetchSearchedPhotos] searchParams:', searchParams);
    return dispatch => {
        dispatch(fetchPhotosStart());
        unsplash.photos.listPhotos(
            searchParams.page, 
            searchParams.perPage,
            searchParams.orderBy)
        .then(toJson)
        .then(response => {
            console.log('[fetchSortedPhotos]', response);
            dispatch(fetchPhotosSuccess(response));
        })
        .catch(error => {
            console.log('[.get error]', error);
            dispatch(fetchPhotosFailed(error));
        });
    };
};