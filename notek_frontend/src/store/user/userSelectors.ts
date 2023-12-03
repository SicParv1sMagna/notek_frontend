import { useSelector } from "react-redux";
import { RootState } from "../types";

export const useUser = () => useSelector((state: RootState) => state.user)