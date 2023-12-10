import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useNote } from "../../Hooks/useNote";
import { JSXElementConstructor, MouseEventHandler, ReactElement, ReactNode, ReactPortal } from "react";
import { noteStyle as styles } from "../../Shared/ui/note";
import document from "../../assets/document.png";

interface NoteProps {
    key: Number,
    children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined;
    id: Number,
    photo: string,
    content: string,
}

export const Note: React.FC<NoteProps> = (props) => {
    const { redirectById } = useNote();
    const [isHovered, setHovered] = useState(false);
    console.log("PROPS CONTENT", props.content);
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
            onMouseEnter={() => { setHovered(true) }}
            onMouseLeave={() => { setHovered(false) }}
        >
            <div>
                <img
                    style={styles.icon}
                    src={props.photo ?
                        props.photo : document}
                />
            </div>
            <div style={styles.propsContainer}>
                <div>
                    <h4
                        style={styles.headerFont}
                    >
                        {props.children}
                    </h4>
                </div>
                <div>
                    <p
                        style={styles.contentFont}
                    >
                        {props.content || "Никто еще не отредактировал данную запись"}
                    </p>
                </div>
            </div>
        </Container>
    )
}