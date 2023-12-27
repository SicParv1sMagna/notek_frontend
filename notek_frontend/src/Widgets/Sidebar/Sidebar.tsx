import React, { useEffect, useState } from "react";
import { Note } from "../../Enitites";
import { Form, Button } from "react-bootstrap";
import { sidebarStyle as styles } from "../../Shared/ui/sidebar";
import { ModalWindow } from "../../Shared/Modal/Modal";
import { useMarkdown } from "../../Hooks/useMarkdown/useMarkdown";
import { useDispatch, useSelector } from "react-redux";
import { selectMarkdowns, selectSearchQuery } from "../../store/markdownSlice/markdownSelector";
import { markdownAction } from "../../store/markdownSlice/markdownSlice";
import { Notification } from "../Notifications/Notifications";

interface SidebarProps {
    setSearch: any;
}

export const Sidebar: React.FC<SidebarProps> = ({ setSearch }) => {
    const [isShow, setShow] = useState(false);
    const [mdName, setMdName] = useState("");
    const [mdIcon, setMdIcon] = useState<File | null>(null);

    const { handleCreateMarkdown, searchMarkdowns, showNotification, setNotification } = useMarkdown();

    const dispatch = useDispatch();
    const searchQuery = useSelector(selectSearchQuery);
    const markdowns = useSelector(selectMarkdowns);
    
    useEffect(() => {
        setSearch(searchQuery);
    }, [searchQuery]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setNotification({
                show: false,
                message: showNotification.message,
            });
        }, 3000);

        return () => {
            clearTimeout(timer);
        }
    }, [showNotification.show])

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
            <div style={{overflowY: "auto", paddingBottom: "75px"}}>
            {markdowns ? (
                markdowns.map((md: any) => (
                    <Note
                        key={md.Markdown_ID}
                        id={md.Markdown_ID}
                        content={md.Content}
                        photo={md.PhotoURL}
                    >
                        {md.Name}
                    </Note>
                ))
            ) : (
                <div>No markdowns available.</div>
            )}
            </div>
            <ModalWindow
                header="Создать маркдаун"
                close={"Закрыть"}
                submit="Создать"
                setShow={setShow}
                show={isShow}
                onSubmit={() => { handleCreateMarkdown(mdName, mdIcon) }}
            >
                <Form.Control
                    type="text"
                    placeholder="Название"
                    onChange={handleChangeName}
                />
                <Form.Control
                    type="file"
                    placeholder="Иконка"
                    onChange={(e) => setMdIcon(e.target.files?.[0] || null)}
                />
            </ModalWindow>
            <Notification show={showNotification.show} message={showNotification.message}/>
        </div>
    );
};