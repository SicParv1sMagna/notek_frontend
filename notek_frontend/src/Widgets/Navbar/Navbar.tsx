import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Button, ButtonGroup } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import { selectIsAuthenticated, selectUser } from '../../store/userSlice/userSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { userAction } from '../../store/userSlice/userSlice';
import { useMarkdown } from '../../Hooks/useMarkdown/useMarkdown';
import { NotesTypes } from '../../utils/notes.types';
import { useUser } from '../../Hooks/useUser/useUser';
import SwitchComponent from '../../Shared/Switch/Switch';
import { navbarStyles as styles } from '../../Shared/ui/navbars';
import { editorStyles } from '../../Shared/ui/editor';
import { useContributor } from '../../Hooks/useContributor/useContributor';

export const Navbars = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        window.localStorage.removeItem("jwtToken");
        dispatch(userAction.deleteToken());
        navigate("/notek_frontend/");
    }

    return (
        <Navbar
            collapseOnSelect
            expand="lg"
            style={styles.container}
        >
            <Container
                style={styles.container}
            >
                <Navbar.Brand><NavLink to="/notek_frontend">Notek</NavLink></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto" style={{ alignItems: "center" }}>
                        <Nav.Link>
                            <NavLink to="/notek_frontend/about">
                                About
                            </NavLink>
                        </Nav.Link>
                        <Nav.Link>
                            <NavLink to="/notek_frontend/github">
                                GitHub
                            </NavLink>
                        </Nav.Link>
                        <Nav.Link>
                            <NavLink to="/notek_frontend/editor">
                                Редактор
                            </NavLink>
                        </Nav.Link>
                        <SwitchComponent />
                    </Nav>
                    {!isAuthenticated ? (
                        <Nav>
                            <Nav.Link>
                                <NavLink to="/notek_frontend/authorization">
                                    <Button>Войти</Button>
                                </NavLink>
                            </Nav.Link>
                            <Nav.Link>
                                <NavLink to="/notek_frontend/registration">
                                    <Button>Зарегестрироваться</Button>
                                </NavLink>
                            </Nav.Link>
                        </Nav>
                    ) : (
                        <Nav>
                            <Nav.Link>
                                <NavLink to="/notek_frontend/profile">
                                    <Button>Профиль</Button>
                                </NavLink>
                            </Nav.Link>
                            <Nav.Link>
                                <Button onClick={handleLogout}>Выйти</Button>
                            </Nav.Link>
                        </Nav>
                    )
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

interface EditorNavbarProps {
    name: string;
    id: number;
    date?: string;
    input: string;
    userID: number;
}

export const EditorNavbar: React.FC<EditorNavbarProps> = ({ name, id, date, input, userID }) => {
    const [formattedDate, setFormattedDate] = useState('');
    const { deleteMarkdown, updateMarkdown } = useMarkdown();
    const { handleRequestContribution } = useContributor();
    const { getMe } = useUser();
    const navigate = useNavigate();

    // Use useSelector to get the user ID from the Redux store
    const myId = useSelector(selectUser)?.userId;

    useEffect(() => {
        getMe();
    }, []);

    useEffect(() => {
        if (date !== undefined) {
            const isoDate = new Date(date);
            const formattedDate = isoDate.toLocaleString();
            setFormattedDate(formattedDate);
        }
    }, [date]);

    const ActionButton = () => {
        if (!window.localStorage.getItem('jwtToken') || userID === -1) {
            return (
                <ButtonGroup>
                    <Button onClick={() => {navigate('/notek_frontend/authorization')}}>Логин</Button>
                    <Button onClick={() => {navigate('/notek_frontend/registration')}}>Регистрация</Button>
                </ButtonGroup>
            );
        }
        console.log(myId)
        if (userID === myId) {
            return (
                <ButtonGroup>
                    <Button variant="danger" onClick={(e) => deleteMarkdown(id, e)}>
                        Удалить
                    </Button>
                    <Button onClick={handleSaveMarkdown}>Сохранить</Button>
                </ButtonGroup>
            );
        }

        if (userID !== myId) {
            return <ButtonGroup>
                <Button onClick={() => {handleRequestContribution(id)}}>
                    Запросить доступ
                </Button>
            </ButtonGroup>
        }
    };

    const handleSaveMarkdown = () => {
        const markdown: NotesTypes = {
            Markdown_ID: id,
            Content: input,
            Name: name,
            Status: '',
            User_ID: 0,
            start_date: '',
        };

        updateMarkdown(markdown);
    };

    return (
        <div
            style={editorStyles.navbar}
        >
            <Breadcrumbs />
            <h4 style={{ margin: 0 }}>
                {name} {formattedDate}
            </h4>
            <ActionButton />
        </div>
    );
};

export default EditorNavbar;