import axios from 'axios'
import { setList } from "../reducers/userRed"



export function createDir(id, name, imgURL, size, weidht, count, discription) {
    return async dispatch => {
        try {
            const response = await axios.post(`https://app-23456789.herokuapp.com//api/group/groups`, {
                id, name, imgURL, size, weidht, count, discription
            })

            dispatch(setList(response.data))
            localStorage.setItem("token", response.data.token)

        } catch (error) {
            localStorage.removeItem("token")
        }
    }
}





