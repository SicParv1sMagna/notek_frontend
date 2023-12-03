import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNote } from "../../Hooks/useNote";
import { JSXElementConstructor, MouseEventHandler, ReactElement, ReactNode, ReactPortal } from "react";
import { noteStyle as styles } from "../../Shared/ui/note";
import screpka from "../../assets/icons8-скрепка-32.png";

interface NoteProps {
    key: Number,
    children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined;
    id: Number,
    photo: string,
}

export const Note: React.FC<NoteProps> = (props) => {
    const { deleteMarkdown, redirectById } = useNote();
    const [isHovered, setHovered] = useState(false);

    const handleClick: MouseEventHandler<HTMLElement> = () => {
        redirectById(props.id);
    }

    return (
        <Container
            onClick={handleClick}
            style={{
                ...styles.container,
                ...(isHovered && styles.containerHover)
            }}
            onMouseEnter={() => {setHovered(true)}}
            onMouseLeave={() => {setHovered(false)}}
        >
            <div style={{display: "flex", flexDirection:"row"}}>
                <img
                    style={{
                        width: "25px",
                        height: "auto",
                    }}
                    src={props.photo ?
                    props.photo : screpka} />
                <p
                    style={{
                        margin: 0,
                        fontSize: "0.7em",
                        color: "white"
                    }}
                >{props.children}</p>
            </div>
            <Button size="sm" variant="danger" onClick={(e) => { deleteMarkdown(props.id, e) }}>Удалить</Button>
        </Container>
    )
}