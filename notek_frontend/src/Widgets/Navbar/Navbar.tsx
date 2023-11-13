import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Button, ButtonGroup } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';

export const Navbars = ({ setOpenAuthModal, setType }: any) => {
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand><NavLink to="/">Notek</NavLink></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link>
                            <NavLink to="/about">
                                About
                            </NavLink>
                        </Nav.Link>
                        <Nav.Link>
                            <NavLink to="/github">
                                GitHub
                            </NavLink>
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link>
                            <Button
                                onClick={() => {
                                    setOpenAuthModal(true)
                                    setType("auth")
                                }}
                            >Войти</Button>
                        </Nav.Link>
                        <Nav.Link>
                            <Button

                                onClick={() => {
                                    setOpenAuthModal(true)
                                    setType("register")
                                }}
                            >Зарегестрироваться</Button>
                        </Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

interface EditorNavbar {
    name: string | undefined;
    id: number | undefined;
    date: string | undefined;
}

export const EditorNavbar: React.FC<EditorNavbar> = ({ name, id, date }) => {
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        if (date !== undefined) {
            const isoDate = new Date(date);
            const formattedDate = isoDate.toLocaleString();
            setFormattedDate(formattedDate);
            console.log(formattedDate);
        }
    }, [date]);

    const deleteMarkdown = async () => {
        try {
            const response = await fetch(`/api/notes/markdown/delete-markdown/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            if (response.ok) {
                window.location.href = '/editor';
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div
            style={{
                backgroundColor: "#212529",
                height: "10vh",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
                color: "whitesmoke"
            }}
        >
            <Breadcrumbs />
            <h4
                style={{
                    margin: 0
                }}
            >
                {name} {formattedDate}
            </h4>
            <ButtonGroup>
                <Button variant="danger" onClick={deleteMarkdown}>Удалить</Button>
                <Button>Сохранить</Button>
            </ButtonGroup>
        </div>
    );
};
