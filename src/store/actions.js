import * as actionTypes from './actionTypes';
// import unsplash from '../utils/unsplash-api';

export const setSearchField = (newSearchField) => {
    return {
        type: actionTypes.SET_SEARCH_FIELD,
        searchField: newSearchField
    };
};
