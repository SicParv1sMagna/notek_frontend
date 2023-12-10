import { useDispatch } from "react-redux";
import { api } from "../../api/axiosConfig";

export const useContributor = () => {
    const dispatch = useDispatch();


    const handleRequestContribution = (id: number) => {
        api.put(
            `/api/api/contributor/${id}/user`,
            null,
            {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
                    "Content-Type": "application/json",
                },
            }
        )
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            });
    };


    return {
        handleRequestContribution,
    }
};
