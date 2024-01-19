import React from "react";
import ReactMarkdown from "react-markdown";

interface PreviewProps {
    input: string | undefined;
}

export const Preview : React.FC<PreviewProps> = ({ input }) => {
    return (
        <div
            style={{
                width: "50%",
                height: "90vh",
                padding: "20px",
                fontSize: "1.5rem",
                backgroundColor: "white",
                color: "black",
                borderTop: "1px solid black",
            }}
        >
            <ReactMarkdown>{input}</ReactMarkdown>
        </div>
    )
}
