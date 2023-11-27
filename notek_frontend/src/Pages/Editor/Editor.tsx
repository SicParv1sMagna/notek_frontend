import { useEffect, useState } from "react"
import { Navbars, Sidebar } from "../../Widgets"
import { NotesMock, NotesTypes } from "../../utils/notes.types"

export const Editor = () => {
    const [markdowns, setMarkdowns] = useState<NotesTypes[] | null>(NotesMock);
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        try {
            const fetchNotes = async () => {
                const response = await fetch("/api/api/notes/markdown/");
                const markdowns = await response.json();
                if (markdowns == undefined) {
                    setMarkdowns(NotesMock);
                } else {
                    setMarkdowns(markdowns);
                }
            }
            fetchNotes();
        } catch {
            setMarkdowns(NotesMock);
        }
    }, [])

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch(`/api/api/notes/markdown?name=${search}`);
                const searchResults = await response.json();
                setMarkdowns(searchResults);
            } catch (error) {
                console.error("Error fetching search results:", error);
                const filteredMarkdowns = NotesMock?.filter((md) =>
                    md.Name.toLowerCase().includes(search.toLowerCase())
                );
                setMarkdowns(filteredMarkdowns);
            }
        };

        const delaySearch = setTimeout(() => {
            fetchNotes();
        }, 300);

        // Clear the timeout on component unmount or when search changes
        return () => clearTimeout(delaySearch);
    }, [search]);

    return (
        <>
            <Navbars />
            <Sidebar markdowns={markdowns} setSearch={setSearch} />
        </>
    )
}