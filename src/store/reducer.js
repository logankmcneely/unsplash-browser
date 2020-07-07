import * as actionTypes from './actionTypes';
import { updateObject } from '../utils/utility';

const initialState = {
    photos: [],
    searchField: '',
    page: 1,
    totalPages: 1

};

const setSearchField = (state, action) => {
    return updateObject(state, { searchParams: action.searchParams });
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