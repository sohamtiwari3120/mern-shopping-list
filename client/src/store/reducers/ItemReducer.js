import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "../constants";

const initalState = {
    items: [],
    loading: false
}

export default function itemReducer(state = initalState, action)
{
    switch (action.type)
    {
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload,
                loading: false
            }
        case ADD_ITEM:
            return {
                ...state,
                items: [action.payload, ...state.items]
            }
        case DELETE_ITEM:
            return {
                ...state,
                items: [...state.items.filter(item => item._id !== action.payload)]
            }
        case ITEMS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}