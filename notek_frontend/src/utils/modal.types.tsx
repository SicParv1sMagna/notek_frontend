import { ReactNode } from "react"

interface ModalProps {
    header: string,
    footer: {
        close: string,
        submit: string,
    }   
}

export interface ModalContent {
    type: string;
    show: boolean;
    children: ReactNode;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const modal : Record<string, ModalProps> = {
    "auth": {
        "header": "Войти",
        "footer": {
            "close": "Закрыть",
            "submit": "Войти",
        }
    },
    "register": {
        "header": "Зарегестрироваться",
        "footer": {
            "close": "Закрыть",
            "submit": "Зарегестрироваться",
        }
    }
}