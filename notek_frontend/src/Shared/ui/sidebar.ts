import React from "react";

export const sidebarStyle: Record<string, React.CSSProperties> = {
    styles: {
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        fontSize: "1.5em",
        backgroundColor: "var(--color-dark-secondary)",
        padding: "10px",
        overflowY: "scroll",
    }

}