import React from "react";

export const noteStyle: Record<string, React.CSSProperties> = {
    container: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "40px",
        justifyContent: "space-between",
        marginTop: "5px",
        alignItems: "center",
        padding: "10px",
        backgroundColor: "transparent",
        borderRadius: "10px",
    },
    containerHover: {
        backgroundColor: "var(--color-purple-400)",
        transition: "0.4s",
    },
}
