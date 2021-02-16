import {
    GET_PHOTOS_REQUEST,
    GET_PHOTOS_SUCCESS,
    GET_PHOTOS_ERROR,
} from "../actions/";

const initialState = {
    isLoading: false,
    error: '',
    backgroundPhoto: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2400x1600/4801538e87a30ef6a5169dff839be71e/photo-1609342122563-a43ac8917a3a.jpg',
    photosList: [

    ],
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        // PHOTOS LIST
        case GET_PHOTOS_REQUEST:
            return { ...state, isLoading: true, error: '' }
        case GET_PHOTOS_ERROR:
            return { ...state, isLoading: false, error: 'failed to load images or no images found' }
        case GET_PHOTOS_SUCCESS:
            return { ...state, isLoading: false, backgroundColor: '', photosList: payload, error: '' }

        default:
            return state
    }
}
