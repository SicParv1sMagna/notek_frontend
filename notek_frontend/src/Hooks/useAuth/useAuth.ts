import { useState } from "react"
import axios from "axios"
import { LoginPayload, RegisterPayload } from "./types"
import { useNavigate } from "react-router-dom"
import { api } from "../../api/axiosConfig"
import { useDispatch } from "react-redux"
import { userAction } from "../../store/userSlice/userSlice"

export const useAuth = () => {
    const [login, setLogin] = useState<LoginPayload>({
        email: "",
        password: "",
    })
    const [register, setRegister] = useState<RegisterPayload>({
        email: "",
        firstName: "",
        secondName: "",
        password: "",
        repeatPassword: "",
        middleName: undefined,
    })
    const [authError, setAuthError] = useState<string>("");
    const [regError, setRegError] = useState<string>("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLoginInputChange = (e: any) => {
        const { name, value } = e.target;
        setLogin((prevLogin) => ({
            ...prevLogin,
            [name]: value,
        }));
    };

    const loginUser = () => {
        api.post(`/api/user/login`,
            login
        )
            .then(response => {
                if (response?.status === 200) {
                    window.localStorage.setItem("jwtToken", response.data);
                    dispatch(userAction.setToken(response.data));
                    navigate("/notek_frontend/")
                }
            })
            .catch(error => {
                if (error.response.status === 500) {
                    setAuthError(error.response.data);
                    return
                }
            })
    }

    const handleRegisterInputChange = (e: any) => {
        const { name, value } = e.target;
        setRegister((prevRegister) => ({
            ...prevRegister,
            [name]: value,
        }));
    };

    const registerUser = () => {
        axios.post(`/api/user/register`,
            register
        )
            .then(response => {
                if (response.status === 201) {
                    navigate("/notek_frontend/authorization")
                }
            })
            .catch(error => {
                if (error.response.status === 500) {
                    setRegError(error.response.data)
                    return
                }
            })
    }

    return {
        authError,
        regError,
        login,
        register,
        setAuthError,
        setRegError,
        setLogin,
        setRegister,
        loginUser,
        registerUser,
        handleLoginInputChange,
        handleRegisterInputChange,
    }
}