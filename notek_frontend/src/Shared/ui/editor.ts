import React from "react";

export const editorStyles : Record<string, React.CSSProperties> = {
    navbar: {
        backgroundColor: 'var(--color-editor)',
        height: '10vh',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        color: 'var(--color-font)',
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    markdown: {
        width: "50%",
        height: "90vh",
        padding: "20px",
        fontSize: "1.5rem",
        outline: "none",
        border: "0.8px solid whitesmoke",
        backgroundColor: "var(--color-editor)",
        color: "var(--color-font)"
    },
    preview: {
        width: "50%",
        height: "90vh",
        padding: "20px",
        fontSize: "1.5rem",
        backgroundColor: "var(--color-editor)",
        color: "var(--color-font)",
        border: "0.8px solid whitesmoke",
        overflowY: "scroll"
    }
}
