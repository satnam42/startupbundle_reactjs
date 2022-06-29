import { GET_USER } from './constants'



const initialState = {
    user: null
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_USER: {
            return {
                ...state,
                user: payload
            }
        }
        default: {
            return state;
        }
    }
}