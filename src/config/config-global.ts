import { paths } from "../routes/paths"

export const HOST_API = process.env.REACT_APP_HOST_API
export const HOST_API_ASSEST = process.env.REACT_APP_HOST_API_ASSEST

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = paths.app.dashBoard

export const apiConfig = () => {
    return {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        }
    }
}
