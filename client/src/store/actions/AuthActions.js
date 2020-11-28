import axios from "axios";
import
{
    USER_LOADED, USER_LOADING, AUTH_ERROR, REGISTER_SUCCESS, REGISTER_FAIL, LOGOUT_SUCCESS, LOGIN_SUCCESS, LOGIN_FAIL,
} from "./../constants";
import { returnErrors } from "./ErrorActions";


// Register User
export const register = ({ name, email, password }) => async (dispatch) =>
{
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request body
    const body = JSON.stringify({ name, email, password })
    try
    {
        let res = await axios.post('/api/users', body, config)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })

    } catch (error)
    {
        dispatch(returnErrors(error.response.data, error.response.status, 'REGISTER_FAIL'))
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

// Logout user
export const logout = () =>
{
    return {
        type: LOGOUT_SUCCESS
    }
}

// Login user
export const login = ({ email, password }) => async (dispatch) =>
{
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request body
    const body = JSON.stringify({ email, password })
    try
    {
        let res = await axios.post('/api/auth', body, config)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })

    } catch (error)
    {
        dispatch(returnErrors(error.response.data, error.response.status, 'LOGIN_FAIL'))
        dispatch({
            type: LOGIN_FAIL
        })
    }
}
// check token and load user
export const loadUser = () => (dispatch, getState) =>
{
    // User loading
    dispatch({
        type: USER_LOADING
    })



    // Fetch the user
    axios.get('/api/auth/user', tokenConfig(getState)).then(
        (res) =>
        {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        }
    ).catch(err =>
    {
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch({
            type: AUTH_ERROR
        })
    })
    // if (res)
    // {
    //     dispatch({
    //         type: USER_LOADED,
    //         payload: res.data
    //     })
    // }
    // else
    // {
    // dispatch(returnErrors(res.data, res.status))
    // dispatch({
    //     type: AUTH_ERROR
    // })
    // }
}

// Set up config/headers and token
export const tokenConfig = getState =>
{
    // get token from localstorage
    const token = getState().AuthReducer.token

    // Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    // if token then add to headers
    if (token)
    {
        config.headers['x-auth-token'] = token
    }

    return config
}