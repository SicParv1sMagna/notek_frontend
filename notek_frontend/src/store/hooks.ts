import { useDispatch } from "react-redux";

import type { AppDispatch } from "./types";

export const useAppDispatch: () => AppDispatch = useDispatch;