const SET_USER = "SET_USER"
const LOGOUT = "LOG_OUT"
const USERS_LIST = "USERS_LIST"
const GROUPS_LIST = "GROUPS_LIST "


const defaultState = {
    currentUser: {},
    isAuth: false,
    list: true,
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                currentUser: action.payload,
                list: false,
                isAuth: true,
            }
        case USERS_LIST:
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true,
                list: true,
            }
        case GROUPS_LIST:
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true,
                list: false,
            }
        case LOGOUT:
            localStorage.removeItem("token")
            return {
                ...state,
                currentUser: {},
                isAuth: false,
                list: false,
            }
        default:
            return state
    }
}

export const setUser = user => ({ type: SET_USER, payload: user })

export const setList = user => ({ type: USERS_LIST, payload: user })

export const setGroupList = user => ({ type: GROUPS_LIST, payload: user })

export const logOut = () => ({ type: LOGOUT })