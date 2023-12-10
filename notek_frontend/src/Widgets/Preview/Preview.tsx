import React from "react";
import ReactMarkdown from "react-markdown";
import { editorStyles as styles } from "../../Shared/ui/editor";

interface PreviewProps {
    input: string | undefined;
}

export const Preview : React.FC<PreviewProps> = ({ input }) => {
    return (
        <div
            style={styles.preview}
        >
            <ReactMarkdown>{input}</ReactMarkdown>
        </div>
    )
}
