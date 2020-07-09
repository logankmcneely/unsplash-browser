import * as actionTypes from './actionTypes';
import { updateObject } from '../utils/utility';

// State
const initialState = {
    photos: [],
    searchParams: {
        searchType: 'random',
        searchField: '',
        orderBy: 'newest',
        page: 1,
        perPage: 30,
        orientation: 'portrait'
    },
    status: {
        loading: false,
        error: false,
        errorMessage: '',
        totalPages: 1,
    }
};

// Helper functions to keep the reducer clean
const setSearchParams = (state, action) => {
    const updatedSearchParams = updateObject(state.searchParams, action.searchParams);
    const updatedState = updateObject(state, {
        searchParams: updatedSearchParams
    });
    console.log('[setSearchParams] updatedState', updatedState);
    return updatedState;
};

const setSearchTotalPages = (state, action) => {
    const updatedStatus = updateObject(state.status, {
        totalPages: action.totalPages
    });
    const updatedState = updateObject(state, {
        status: updatedStatus
    });
    console.log('[setSearchTotalPages] updatedState', updatedState);
    return updatedState;
}

const incrementSearchPage = (state, action) => {
    // Verify current searchParams page is not at the end of the available
    // search pages. Update state with incremented page if so, else return original
    // state
    if (state.searchParams.page < state.status.totalPages) {
        const updatedSearchParams = updateObject(state.searchParams, {
            page: state.searchParams.page + 1
        });
        const updatedState = updateObject(state, {
            searchParams: updatedSearchParams
        });
        console.log('[incrementSearchPage]', updatedState)
        return updatedState;
    } else {
        return state;
    }
};

const fetchPhotosStart = (state, action) => {
    const updatedStatus = updateObject(state.status, {
        loading: true,
        error: false,
        errorMessage: ''
    });
    const updatedState = updateObject(state, { status: updatedStatus });
    return updatedState;
};

const fetchPhotosSuccess = (state, action) => {
    const updatedStatus = updateObject(state.status, {
        loading: false,
        error: false,
        errorMessage: ''

    });
    // If searching page 1, then replace photos with new results, else if searching
    // additional pages, add new results to the array of existing photos and only
    // keep the most recent 60

    const updatedPhotos = state.searchParams.page === 1 ?
        action.photos :
        state.photos.concat(action.photos).slice(state.photos.length - 30);
    const updatedState = updateObject(state, {
        photos: updatedPhotos,
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
    const updatedState = updateObject(state, { status: updatedStatus });
    return updatedState;
};

// Reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_SEARCH_PARAMS: return setSearchParams(state, action);
        case actionTypes.SET_SEARCH_TOTAL_PAGES: return setSearchTotalPages(state, action);
        case actionTypes.INCREMENT_SEARCH_PAGE: return incrementSearchPage(state, action);
        case actionTypes.FETCH_PHOTOS_START: return fetchPhotosStart(state, action);
        case actionTypes.FETCH_PHOTOS_SUCCESS: return fetchPhotosSuccess(state, action);
        case actionTypes.FETCH_PHOTOS_FAILED: return fetchPhotosFailed(state, action);
        default: return state;
    };
};

export default reducer;