import React, { JSXElementConstructor, MouseEventHandler, ReactElement, ReactNode, ReactPortal, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNote } from "../../Hooks/useNote";
import document from "../../assets/document.png";

import { noteStyle as styles } from "../../Shared/ui/note";
import { useContributor } from "../../Hooks/useContributor/useContributor";

interface NoteProps {
    children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined;
    id: Number,
    content: string,
    photo: string,
    drafts: any[],
    setDrafts: React.Dispatch<React.SetStateAction<any[]>>,
    allowedToDelete: boolean;
}

export const Draft: React.FC<NoteProps> = (props) => {
    const { redirectById } = useNote();
    const { handleDeleteDraft } = useContributor();
    const [isHovered, setHovered] = useState(false);
    const handleClick: MouseEventHandler<HTMLElement> = () => {
        redirectById(props.id)
    }

    return (
        <Container
            onClick={handleClick}
            style={{
                ...styles.container,
                ...(isHovered && styles.containerHover)
            }}
            onMouseEnter={() => { setHovered(true); }}
            onMouseLeave={() => { setHovered(false); }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    alignItems: "center"
                }}
            >
                <div>
                    <img
                        style={styles.icon}
                        src={props.photo || document} />

                </div>
                <div style={styles.propsContainer}>
                    <div>
                        <h4
                            style={{
                                ...styles.headerFont,
                                fontSize: "1.5rem"
                            }}>
                            {props.children}
                        </h4>
                    </div>
                    <div>
                        <p
                            style={{
                                ...styles.contentFont,
                                fontSize: "0.9rem"
                            }}
                        >
                            {props.content || "Никто еще не отредактировал данную запись"}
                        </p>
                    </div>
                </div>
            </div>
            <div>
                {props.allowedToDelete ? (
                <Button
                variant="danger"
                onClick={(e) => {handleDeleteDraft(e, props.id, props.drafts, props.setDrafts)}}
                >
                    Удалить
                </Button>
                ) : (
                    null
                )}
            </div>
        </Container>
    )
}