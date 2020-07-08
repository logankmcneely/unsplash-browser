import * as actionTypes from './actionTypes';
import { updateObject } from '../utils/utility';

// State
const initialState = {
    photos: [],
    searchParams: {
        searchField: '',
        page: 1,
        totalPages: 1,
        per_page: 30,
        orientation: "landscape"
    }
};

// Helper functions to keep the reducer clean
const setSearchField = (state, action) => {
    const updatedSearchParams = updateObject(state.searchParams, {searchField: action.searchField});
    const updatedState = updateObject(state, { searchParams: updatedSearchParams});
    return updatedState;
};

const fetchRandomPhotosStart = (state, action) => {
    return state;
};

const fetchRandomPhotosSuccess = (state, action) => {
    return updateObject(state, { photos: action.photos });
};

const fetchRandomPhotosFailed = (state, action) => {
    return state;
};

// Reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_SEARCH_FIELD: return setSearchField(state, action);
        case actionTypes.FETCH_RANDOM_PHOTOS_START: return fetchRandomPhotosStart(state, action);
        case actionTypes.FETCH_RANDOM_PHOTOS_SUCCESS: return fetchRandomPhotosSuccess(state, action);
        case actionTypes.FETCH_RANDOM_PHOTOS_FAILED: return fetchRandomPhotosFailed(state, action);
        default: return state;
    };
};

export default reducer;