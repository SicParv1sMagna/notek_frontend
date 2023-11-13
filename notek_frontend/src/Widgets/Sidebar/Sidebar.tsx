import React, { useEffect, useState } from "react";
import { Note } from "../../Enitites";
import { Form } from "react-bootstrap";
import { NotesMock } from "../../utils/notes.types";

interface SidebarProps {
    markdowns: any[] | null;
    setMarkdowns: any;
}

export const Sidebar: React.FC<SidebarProps> = ({ markdowns, setMarkdowns }) => {
    const [searchTerm, setSearchTerm] = useState<string>("");

    const styles: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        width: window.innerWidth > 600 ? "25vw" : "100vw",
        height: "100vh",
        fontSize: "1.5em",
        backgroundColor: "whitesmoke",
        padding: "10px",
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = async () => {
        try {
            const response = await fetch(`/api/notes/markdown/search/${searchTerm}`);
            const searchResults = await response.json();
            setMarkdowns(searchResults);

        } catch (error) {
            const filteredMarkdowns = markdowns?.filter((md) =>
                md.Name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setMarkdowns(filteredMarkdowns);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            // Вызываем поиск при нажатии Enter
            handleSearchSubmit();
        }
    };

    return (
        <div style={styles}>
            <Form.Control
                type="text"
                placeholder="Поиск"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
            />
            {markdowns ? (
                markdowns.map((md: any) => (
                    <Note key={md.Markdown_ID} id={md.Markdown_ID}>
                        {md.Name}
                    </Note>
                ))
            ) : (
                <div>No markdowns available.</div>
            )}
        </div>
    );
};
