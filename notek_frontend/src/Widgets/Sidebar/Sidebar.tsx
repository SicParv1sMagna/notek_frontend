import React, { useEffect, useState } from "react";
import { Note } from "../../Enitites";
import { Form, Button } from "react-bootstrap";
import { sidebarStyle as styles } from "../../Shared/ui/sidebar";
import { ModalWindow } from "../../Shared/Modal/Modal";
import { useMarkdown } from "../../Hooks/useMarkdown/useMarkdown";
import { useDispatch, useSelector } from "react-redux";
import { selectMarkdowns, selectSearchQuery } from "../../store/markdownSlice/markdownSelector";
import { markdownAction } from "../../store/markdownSlice/markdownSlice";

interface SidebarProps {
    setSearch: any;
}

export const Sidebar: React.FC<SidebarProps> = ({ setSearch }) => {
    const [isShow, setShow] = useState(false);
    const [mdName, setMdName] = useState("");

    const { handleCreateMarkdown, searchMarkdowns } = useMarkdown();

    const dispatch = useDispatch();
    const searchQuery = useSelector(selectSearchQuery);
    const markdowns = useSelector(selectMarkdowns);

    useEffect(() => {
        setSearch(searchQuery);
    }, [searchQuery]);

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMdName(e.target.value);
    }

    const handleSearchMarkdowns = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(markdownAction.setSearchQuery(e.target.value));
        searchMarkdowns(e.target.value);
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <Form.Control
                    style={styles.search}
                    type="text"
                    placeholder="Поиск"
                    onChange={handleSearchMarkdowns}
                    value={searchQuery || ''}
                />
                <Button
                    style={styles.add}
                    onClick={() => { setShow(true) }}
                >
                    +
                </Button>
            </div>
            {markdowns ? (
                markdowns.map((md: any) => (
                    <Note
                        key={md.Markdown_ID}
                        id={md.Markdown_ID}
                        photo={md.Photo_URL}
                        content={md.Content}
                    >
                        {md.Name}
                    </Note>
                ))
            ) : (
                <div>No markdowns available.</div>
            )}
            <ModalWindow
                header="Создать маркдаун"
                close={"Закрыть"}
                submit="Создать"
                setShow={setShow}
                show={isShow}
                onSubmit={() => { handleCreateMarkdown(mdName) }}
            >
                <Form.Control
                    type="text"
                    placeholder="Название"
                    onChange={handleChangeName}
                />
            </ModalWindow>
        </div>
    );
};