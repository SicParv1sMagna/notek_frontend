import React from "react";
interface MarkdownProps {
    input : string | undefined;
    setInput : React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const Markdown : React.FC<MarkdownProps> = ({ input, setInput }) => {
    return (
        <textarea
            style={{
                width: "50%",
                height: "90vh",
                padding: "20px",
                fontSize: "1.5rem",
                outline: "none",
            }}
            autoFocus
            value={input}
            onChange={
                (e) => setInput(e.target.value)
            }
        />
    )
}
