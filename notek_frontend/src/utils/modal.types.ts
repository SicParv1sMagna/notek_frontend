import { ReactNode } from "react"

export interface ModalProps {
    header: string;
    close: string;
    submit: string;
    children?: ReactNode;
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    onSubmit: () => void;
}
