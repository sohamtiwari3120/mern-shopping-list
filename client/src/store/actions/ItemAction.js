import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "../constants";

export const getItems = () => async (dispatch) =>
{
    dispatch(setItemsLoading())
    let res = await axios.get('/api/items')
    dispatch({
        type: GET_ITEMS,
        payload: res.data ? res.data : []
    })
}

export const addItem = (name) => async (dispatch) =>
{
    let res = await axios.post('/api/items',
        { 'name': name },
    )
    dispatch({
        type: ADD_ITEM,
        payload: res.data
    })
}

export const deleteItem = (id) => async (dispatch) =>
{
    await axios.delete(`/api/items/${id}`)
    dispatch({
        type: DELETE_ITEM,
        payload: id
    })
}



export const setItemsLoading = () => (
    {
        type: ITEMS_LOADING
    }
)