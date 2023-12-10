import React from "react";
import { editorStyles as styles } from "../../Shared/ui/editor";

interface MarkdownProps {
    input : string | undefined;
    setInput : React.Dispatch<React.SetStateAction<string>>;
}

export const Markdown : React.FC<MarkdownProps> = ({ input, setInput }) => {

    return (
        <textarea
            style={styles.markdown}
            autoFocus
            value={input}
            onChange={
                (e) => setInput(e.target.value)
            }
        />
    )
}
