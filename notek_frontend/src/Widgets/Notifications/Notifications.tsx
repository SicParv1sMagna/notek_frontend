import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

interface NotificationProps {
    message: string,
    show: boolean,
}

export const Notification: React.FC<NotificationProps> = ({
    show,
    message,
}) => {
    return (
        <ToastContainer position="bottom-end">
            <Toast show={show} delay={3000} autohide>
                <Toast.Header>
                    <strong className="mr-auto">Уведомление</strong>
                </Toast.Header>
                <Toast.Body>{message}</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}
