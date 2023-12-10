import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from "react";
import { Container } from "react-bootstrap"

interface ContributorsProps {
    children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined;
    id: Number,
    key: Number,
}

export const Contributors: React.FC<ContributorsProps> = (props) => {
    return (
        <Container
            style={{marginTop: "10px", justifyContent: "center"}}
        >
            <div>
                {props.children}
            </div>
        </Container>
    )
}
