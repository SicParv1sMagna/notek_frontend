import React from "react";

export const notificationStyle: Record<string, React.CSSProperties> = {
    container: {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: "9999"
    },
    notification: {
        backgroundColor: "var(--color-tabs-active)",
        color: "var(--color-font-active)",
        padding: "15px",
        margin: "10px",
        borderRadius: "5px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        transition: "opacity 0.5s ease-in-out",
    },
}