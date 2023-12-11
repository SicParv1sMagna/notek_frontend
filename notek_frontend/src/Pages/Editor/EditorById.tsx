import { useEffect, useState } from "react";
import { Markdown } from "../../Widgets/Markdown/Markdown";
import { Preview } from "../../Widgets/Preview/Preview";
import { EditorNavbar } from "../../Widgets/Navbar/Navbar";
import { useParams } from "react-router-dom";
import { useMarkdown } from "../../Hooks/useMarkdown/useMarkdown";
import { selectMarkdown } from "../../store/markdownSlice/markdownSelector";
import { useSelector } from "react-redux";

export const EditorById = () => {
    const { id } = useParams();
    const { fetchMarkdown } = useMarkdown();
    const [input, setInput] = useState<string>('');
    const markdown = useSelector(selectMarkdown);

    useEffect(() => {
        // Fetch markdown data and update input when data is received
        fetchMarkdown(Number(id));
    }, [id]); // Trigger the effect whenever the id changes

    useEffect(() => {
        // Update input when markdown changes
        setInput(markdown?.Content || '');
    }, [markdown]); // Trigger the effect whenever the markdown changes

    return (
        <>
            <EditorNavbar
                name={markdown?.Name || ''}
                id={markdown?.Markdown_ID || NaN}
                date={markdown?.start_date || ''}
                userID={markdown?.User_ID || -1}
                input={input}
            />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <Markdown input={input} setInput={setInput} />
                <Preview input={input} />
            </div>
        </>
    );
};
