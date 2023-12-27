import { Container } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { useMarkdown } from "../../Hooks/useMarkdown/useMarkdown";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectMarkdown } from "../../store/markdownSlice/markdownSelector";
import { Preview } from "../../Widgets/Preview/Preview";
import { Markdown } from "../../Widgets/Markdown/Markdown";
import { EditorNavbar } from "../../Widgets/Navbar/Navbar";
import { CreateMarkdown } from "../CreateMarkdown/CreateMarkdown";

export const MarkdownEdit = () => {
    const { id } = useParams();
    if (Number(id) === 0) {
        return <CreateMarkdown />
    }

    const { fetchMarkdown } = useMarkdown();
    const [input, setInput] = useState<string>('');

    const markdown = useSelector(selectMarkdown);

    useEffect(() => {
        fetchMarkdown(Number(id));
    }, [id])

    useEffect(() => {
        setInput(markdown?.Content || '');
    }, [markdown])

    return (
        <>
            <EditorNavbar
                name={markdown?.Name || ''}
                id={markdown?.Markdown_ID || NaN}
                date={markdown?.start_date || ''}
                userID={markdown?.User_ID || -1}
                input={input}
                icon={markdown.PhotoURL}
            />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
            >
                <Markdown input={input} setInput={setInput} />
                <Preview input={input} />
            </div>
        </>
    )
}