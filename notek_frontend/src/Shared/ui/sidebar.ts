import React from "react";

export const sidebarStyle: Record<string, React.CSSProperties> = {
    container: {
        display: "flex",
        flexDirection: "column",
        width: window.innerWidth > 600 ? "20vw" : "100vw",
        height: "100vh",
        fontSize: "1.5em",
        backgroundColor: "var(--color-tabs)",
        overflowY: "scroll",
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    search: {
        borderRadius: "0",
        border: "none",
        backgroundColor: "var(--color-search)",
        color: "var(--color-font)",
        borderBottom: "0.5px solid black"
    },
    '::placeholder': {
        color: "red",
    },
    add: {
        borderRadius: "0",
    }
}