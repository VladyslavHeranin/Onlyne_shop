import axios from "axios"
import { setUser, setList } from "../reducers/userRed"




export const registration = async (email, password, name) => {

    try {
        const response = await axios.post("https://app-23456789.herokuapp.com/api/auth/registration", {
            email,
            password,
            name
        })

        window.M.toast({ html: response.data.message })

    } catch (error) {
        window.M.toast({ html: error.response.data.message })
    }

}



export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post("https://app-23456789.herokuapp.com/api/auth/login", {
                email, password
            })
            console.log("Login", response.data)
            dispatch(setList(response.data))
            localStorage.setItem("token", response.data.token)
        } catch (error) {
            alert(error)
        }
    }
}



export const Update = (name, id, currentId) => {
    return async dispatch => {
        try {
            const response = await axios.post(`https://app-23456789.herokuapp.com/api/auth/update`, {
                name, id, currentId
            })

            dispatch(setList(response.data))
            localStorage.setItem("token", response.data.token)
        } catch (error) {
            alert(error)
        }
    }
}



export const delListItem = (id, currentId) => {
    return async dispatch => {
        try {
            const response = await axios.post(`https://app-23456789.herokuapp.com/api/auth/delItem`, {
                id, currentId
            })

            window.M.toast({ html: response.data.message })
            dispatch(setList(response.data))

            localStorage.setItem("token", response.data.token)
        } catch (error) {
            alert(error)
        }
    }
}



export const Auth = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`https://app-23456789.herokuapp.com/api/auth/auth`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })

            dispatch(setList(response.data))

            localStorage.setItem("token", response.data.token)
        } catch (error) {
            localStorage.removeItem("token")
        }
    }
}

export const SortFirstWord = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`https://app-23456789.herokuapp.com/api/auth/sortWord`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
            
            dispatch(setList(response.data))

            localStorage.setItem("token", response.data.token)
        } catch (error) {
            localStorage.removeItem("token")
        }
    }
}

export const SortCount = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`https://app-23456789.herokuapp.com/api/auth/sortCount`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
            
            dispatch(setList(response.data))

            localStorage.setItem("token", response.data.token)
        } catch (error) {
            localStorage.removeItem("token")
        }
    }
}




export const ListUser = () => {

    return async dispatch => {

        try {
            const response = await axios.get(`https://app-23456789.herokuapp.com/api/auth/users`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })

            dispatch(setList(response.data))

            localStorage.setItem("token", response.data.token)
        } catch (error) {
            localStorage.removeItem("token")
        }
    }
}




export const update = (id, name) => {
    return async dispatch => {
        try {
            const response = await axios.post("https://app-23456789.herokuapp.com/api/auth/updateName", {
                id, name
            })

            dispatch(setUser(response.data))

            window.M.toast({ html: response.data.message })
            localStorage.setItem("token", response.data.token)
        } catch (error) {
            localStorage.removeItem("token")
        }
    }
}


export function createComment(id, productId, description, data) {
    return async dispatch => {
        try {
            const response = await axios.post(`https://app-23456789.herokuapp.com/api/auth/comments`, {
                id, productId, description, data
            })

            console.log("discription", response.data)

            dispatch(setList(response.data))
            localStorage.setItem("token", response.data.token)

        } catch (error) {
            localStorage.removeItem("token")
        }
    }
}






