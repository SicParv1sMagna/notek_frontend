import React, { JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from "react";
import { Button, Container, Navbar } from "react-bootstrap";

interface FooterProps {
    children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined;
    fn: (id: number) => void;
    items: any[];
    setItems: React.Dispatch<React.SetStateAction<any[]>>
}

export const Footer: React.FC<FooterProps> = (props) => {
    const handleRequestContribution = () => {
        props.items.map(md => {
            props.fn(md.Markdown_ID);
            props.setItems([]);
        });
    };

    return (
        <div className="fixed-bottom">
            <Navbar color="dark">
                <Container>
                    <h4>
                        Отправить запрос на редактирование
                    </h4>
                    <Button
                        variant="success"
                        onClick={handleRequestContribution}
                    >
                        Отправить
                    </Button>
                </Container>
            </Navbar>
        </div>
    )
}
