import {token} from "../../stores/globals.js";
export const clearToken = () => {
    localStorage.clear()
    token.set(localStorage.getItem("token"))
}
