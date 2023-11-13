import { useEffect, useState } from "react"
import { Navbars, Sidebar } from "../../Widgets"
import { NotesMock, NotesTypes } from "../../utils/notes.types"
import { ModalWindow } from "../../Shared/Modal/Modal";

export const Editor = () => {
    const [markdowns, setMarkdowns] = useState<NotesTypes[] | null>(NotesMock);
    const [openAuthModal, setOpenAuthModal] = useState(false);
    const [type, setType] = useState("")

    useEffect(() => {
        const fetchNotes = async () => {
            const response = await fetch("/api/notes/markdown/get-all-markdowns");
            const markdowns = await response.json();
            if (markdowns == undefined) {
                setMarkdowns(NotesMock);
            } else {
                setMarkdowns(markdowns);
            }
        }
        fetchNotes();
    }, [])

    return (
        <>
            <Navbars
                setOpenAuthModal={setOpenAuthModal}
                setType={setType}
            />
            <ModalWindow
                type={type}
                show={openAuthModal}
                setOpenModal={setOpenAuthModal} children={undefined} />
            <Sidebar
                markdowns={markdowns}
                setMarkdowns={setMarkdowns}
            />
        </>
    )
}