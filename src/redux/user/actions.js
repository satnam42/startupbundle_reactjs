import { get } from '../../utilities/services/newServices'
import { GET_USER as GET_USER_API } from '../../utilities/services/constants/apiLinks'
import { GET_USER } from './constants'

export const getUser = (id, token) => (dispatch) => {

    const successActions = (userData) => {
        dispatch({
            type: GET_USER,
            payload: userData
        })
    }
    get(`${GET_USER_API}${id}`, successActions, token);
}