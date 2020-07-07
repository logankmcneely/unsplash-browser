import * as actionTypes from './actionTypes';
import { updateObject } from '../utils/utility';

const initialState = {
    searchField: ''
};

const setSearchField = (state, action) => {
    return updateObject(state, {searchField: action.searchField});
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_SEARCH_FIELD: return setSearchField(state, action);
        default: return state;
    };
};

export default reducer;