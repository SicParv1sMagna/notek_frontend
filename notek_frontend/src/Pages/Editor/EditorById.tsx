import { useEffect, useState } from "react";
import { Markdown } from "../../Widgets/Markdown/Markdown";
import { Preview } from "../../Widgets/Preview/Preview";
import { EditorNavbar } from "../../Widgets/Navbar/Navbar";
import { useParams } from "react-router-dom";
import { NotesMock, NotesTypes } from "../../utils/notes.types";

export const EditorById = () => {
    const { id } = useParams();
    const [input, setInput] = useState<string | undefined>();
    const [note, setNote] = useState<NotesTypes | null>()

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await fetch(`/api/api/notes/markdown/${id}`);
                const markdown = await response.json();
                console.log(markdown);
                if (markdown == undefined) {
                    setInput(NotesMock[Number(id) - 1].Content);
                    setNote(NotesMock[Number(id) - 1]);
                } else {
                    setInput(markdown.Content);
                    setNote(markdown);
                }
            }
            catch {
                setInput(NotesMock[Number(id) - 1].Content);
                setNote(NotesMock[Number(id) - 1]);
            }
        }

        fetchNote();
    }, [])

    return (
        <>
            <EditorNavbar
                name={note?.Name}
                id={note?.Markdown_ID}
                date={note?.start_date}
            />
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Markdown
                    input={input}
                    setInput={setInput}
                />
                <Preview
                    input={input}
                />
            </div>
        </>
    )
}
