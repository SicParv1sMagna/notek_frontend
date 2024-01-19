import React from "react";

export const noteStyle: Record<string, React.CSSProperties> = {
    container: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100px",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        backgroundColor: "transparent",
        borderBottom: "1px solid black"
    },
    containerHover: {
        backgroundColor: "var(--color-gray-300)",
        transition: "0.4s",
    },
}
