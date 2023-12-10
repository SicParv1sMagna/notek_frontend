import React from "react";

export const noteStyle: Record<string, React.CSSProperties> = {
    icon: {
        width: "25px",
        height: "auto",
        marginRight: "20px",
        filter: "var(--filter-dark)"
    },
    container: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100px",
        alignItems: "center",
        padding: "15px",
        backgroundColor: "var(--color-tabs)",
        borderBottom: "0.5px solid black",
    },
    containerHover: {
        backgroundColor: "var(--color-tabs-active)",
        color: "var(--color-font-active)",
        transition: "0.4s",
    },
    propsContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    headerFont: {
        fontSize: "0.9em",
        display: "-webkit-box",
        WebkitLineClamp: "1",
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        color: "var(--color-font)"
    },
    contentFont: {
        fontSize: "0.6em",
        display: "-webkit-box",
        WebkitLineClamp: "2",
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        marginBottom: "0",
        color: "var(--color-font)"
    }
}
