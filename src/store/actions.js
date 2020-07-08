import * as actionTypes from './actionTypes';
import unsplash from '../utils/unsplash-api';
import { toJson } from "unsplash-js";

export const setSearchParams = (searchParams) => {
    return {
        type: actionTypes.SET_SEARCH_PARAMS,
        searchParams: searchParams
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

// export const fetchRandomPhotos = () => {
//     return dispatch => {
//         dispatch(fetchPhotosStart());
//         axios.get(`https://api.unsplash.com/photos/random?client_id=${process.env.REACT_APP_API_KEY}&count=30&orientation=landscape`)
//         .then(response => {
//             console.log('[fetchRandomPhotos]', response.data);
//             dispatch(fetchPhotosSuccess(response.data));
//         })
//         .catch(error => {
//             // console.log('[.get error]', error.message);
//             dispatch(fetchPhotosFailed(error.message));
//         });
//     };
// };

// export const fetchSearchedPhotos = (searchParams) => {  
//     // console.log('[fetchSearchedPhotos] searchParams:', searchParams);
//     return dispatch => {
//         dispatch(fetchPhotosStart());
//         axios.get(`https://api.unsplash.com/search/photos?client_id=${process.env.REACT_APP_API_KEY}&per_page=30&query=${searchParams.searchField}`)
//         .then(response => {
//             console.log('[fetchSearchedPhotos]', response.data);
//             dispatch(fetchPhotosSuccess(response.data.results));
//         })
//         .catch(error => {
//             // console.log('[.get error]', error);
//             dispatch(fetchPhotosFailed(error.message));
//         });
//     };
// };

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