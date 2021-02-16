import Unsplash from 'unsplash-js';
import { toJson } from 'unsplash-js';

export const GET_PHOTOS_REQUEST = "GET_PHOTOS_REQUEST";
export const GET_PHOTOS_SUCCESS = "GET_PHOTOS_SUCCESS";
export const GET_PHOTOS_ERROR = "GET_PHOTOS_ERROR";

export const changePhoto = (payload, type) => ({
    type: type,
    payload
})

export const getPhotos = (payload, type) => ({
    type: type,
    payload
})


export const getPhotosList = (keyword) => dispatch => {
const unsplash = new Unsplash({
    accessKey: "hYOqwVIT1A3BdicguvA0GDSXCxGFT9R9fCQB7yOizCk",
  secret: "h-NcEjWWU4yWXcaICY5eX4PFPj2PyP4QqvX-pDHtlx4",
});
    dispatch(getPhotos(null, GET_PHOTOS_REQUEST));
    unsplash.search.photos(keyword, 1, 10, { orientation: "landscape" })
        .then(toJson)
        .then(json => {
            dispatch(getPhotos(json.results, GET_PHOTOS_SUCCESS));
        }).catch(error => {
            dispatch(getPhotos(null, GET_PHOTOS_ERROR));
        });
} 
