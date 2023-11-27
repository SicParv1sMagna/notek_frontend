import React, { useState } from "react";
import { Note } from "../../Enitites";
import { Form } from "react-bootstrap";

interface SidebarProps {
    markdowns: any[] | null;
    setSearch: any;
}

export const Sidebar: React.FC<SidebarProps> = ({ markdowns, setSearch }) => {
    const styles: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        width: window.innerWidth > 600 ? "25vw" : "100vw",
        height: "100vh",
        fontSize: "1.5em",
        backgroundColor: "whitesmoke",
        padding: "10px",
    };

    const handleSearchMarkdowns = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    return (
        <div style={styles}>
            <Form.Control
                type="text"
                placeholder="Поиск"
                onChange={handleSearchMarkdowns}
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