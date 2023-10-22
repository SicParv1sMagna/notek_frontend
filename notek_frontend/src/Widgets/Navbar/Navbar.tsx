import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export const Navbars = ({ setOpenAuthModal, setType }: any) => {
    return (
        <Navbar sticky="top" collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">Notek</Navbar.Brand>
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