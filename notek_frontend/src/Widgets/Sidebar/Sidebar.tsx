import React from "react";
import { Note } from "../../Enitites";
import { Form } from "react-bootstrap";
import { sidebarStyle as styles } from "../../Shared/ui/sidebar";

interface SidebarProps {
    markdowns: any[] | null;
    setSearch: any;
}

export const Sidebar: React.FC<SidebarProps> = ({ markdowns, setSearch }) => {

    const handleSearchMarkdowns = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    return (
        <div style={styles.styles}>

            <Form.Control
                type="text"
                placeholder="Поиск"
                onChange={handleSearchMarkdowns}
            />
            {markdowns ? (
                markdowns.map((md: any) => (
                    <Note key={md.Markdown_ID} id={md.Markdown_ID} photo={md.Photo_URL}>
                        {md.Name}
                    </Note>
                ))
            ) : (
                <div>No markdowns available.</div>
            )}
        </div>
    );
};