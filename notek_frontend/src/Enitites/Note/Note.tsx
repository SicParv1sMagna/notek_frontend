import { Button, Container } from "react-bootstrap"
import { useNote } from "../../Hooks/useNote"
import { JSXElementConstructor, MouseEventHandler, ReactElement, ReactNode, ReactPortal } from "react";

interface NoteProps {
    key: Number,
    children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined;
    id: Number,
}

export const Note: React.FC<NoteProps> = (props) => {
    const { deleteMarkdown, redirectById } = useNote();

    const handleClick: MouseEventHandler<HTMLElement> = () => {
        redirectById(props.id);
    }

    return (
        <Container
            onClick={handleClick}
            style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                marginBottom: "10px",
                marginTop: "10px",
                alignItems: "center",
                padding: "10px",
                backgroundColor: "rgb(0, 0, 0)",
                borderRadius: "10px",
            }}
        >
            <p
                style={{
                    margin: 0,
                    fontSize: "0.8em",
                    color: "white"
                }}
            >{props.children}</p>
            <Button size="sm" variant="danger" onClick={(e) => { deleteMarkdown(props.id, e) }}>Удалить</Button>
        </Container>
    )
}