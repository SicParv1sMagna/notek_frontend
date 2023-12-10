import { useDispatch } from "react-redux"
import { api } from "../../api/axiosConfig"
import { userAction } from "../../store/userSlice/userSlice";

export const useUser = () => {
    const dispatch = useDispatch();

    const getMe = () => {
        api.get(`/api/api/user/me`, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`   
            }
        })
        .then(response => {
            if (response.status === 200) {
                dispatch(userAction.setUser(response.data))
            }
        })
        .catch(error => {
            console.error(error);
        })
    }
    
    return {
        getMe
    }
}