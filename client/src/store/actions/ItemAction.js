import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "../constants";
import { tokenConfig } from './AuthActions';
import { returnErrors } from './ErrorActions';

export const getItems = () => async (dispatch) =>
{
    dispatch(setItemsLoading())
    try
    {
        let res = await axios.get('/api/items')
        dispatch({
            type: GET_ITEMS,
            payload: res.data ? res.data : []
        })
    } catch (error)
    {
        dispatch(returnErrors(error.response.data, error.response.status))
    }

}

export const addItem = (name) => async (dispatch, getState) =>
{
    try
    {
        let res = await axios.post('/api/items',
            { 'name': name }, tokenConfig(getState)
        )
        dispatch({
            type: ADD_ITEM,
            payload: res.data
        })
    } catch (error)
    {
        dispatch(returnErrors(error.response.data, error.response.status))
    }

}

export const deleteItem = (id) => async (dispatch, getState) =>
{
    try
    {
        await axios.delete(`/api/items/${id}`, tokenConfig(getState))
        dispatch({
            type: DELETE_ITEM,
            payload: id
        })
    } catch (error)
    {
        dispatch(returnErrors(error.response.data, error.response.status))
    }

}

export const setItemsLoading = () => (
    {
        type: ITEMS_LOADING
    }
)