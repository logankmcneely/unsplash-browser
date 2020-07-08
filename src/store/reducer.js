import * as actionTypes from './actionTypes';
import { updateObject } from '../utils/utility';

// State
const initialState = {
    photos: [],
    searchParams: {
        searchType: 'random',
        searchField: '',
        page: 1,
        totalPages: 1,
        orderBy: 'newest',
        perPage: 30,
        orientation: 'landscape'
    },
    status: {
        loading: false,
        error: false,
        errorMessage: ''
    }
};

// Helper functions to keep the reducer clean
const setSearchParams = (state, action) => {
    console.log('[setSearchParams], action.searchParams', action.searchParams);
    const updatedSearchParams = updateObject(state.searchParams, action.searchParams);
    console.log('[setSearchParams], updatedSearchParams', updatedSearchParams);
    const updatedState = updateObject(state, { searchParams: updatedSearchParams});
    console.log('[setSearchParams], updatedState', updatedState);
    return updatedState;
};

const fetchPhotosStart = (state, action) => {
    const updatedStatus = updateObject(state.status, {
        loading: true,
        error: false,
        errorMessage: ''
    });
    const updatedState = updateObject(state, { status: updatedStatus});
    return updatedState;
};

const fetchPhotosSuccess = (state, action) => {
    const updatedStatus = updateObject(state.status, {
        loading: false,
        error: false,
        errorMessage: ''
    });
    const updatedState = updateObject(state, {
         photos: action.photos,
         status: updatedStatus 
    });
    return updatedState;
};

const fetchPhotosFailed = (state, action) => {
    const updatedStatus = updateObject(state.status, {
        loading: false,
        error: true,
        errorMessage: action.errorMessage
    });
    const updatedState = updateObject(state, { status: updatedStatus});
    return updatedState;
};

// Reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_SEARCH_PARAMS: return setSearchParams(state, action);
        case actionTypes.FETCH_PHOTOS_START: return fetchPhotosStart(state, action);
        case actionTypes.FETCH_PHOTOS_SUCCESS: return fetchPhotosSuccess(state, action);
        case actionTypes.FETCH_PHOTOS_FAILED: return fetchPhotosFailed(state, action);
        default: return state;
    };
};

export default reducer;