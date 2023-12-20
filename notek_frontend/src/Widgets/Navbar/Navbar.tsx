import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Button, ButtonGroup } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import { selectUser } from '../../store/userSlice/userSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { userAction } from '../../store/userSlice/userSlice';
import { useMarkdown } from '../../Hooks/useMarkdown/useMarkdown';
import { NotesTypes } from '../../utils/notes.types';
import { useUser } from '../../Hooks/useUser/useUser';
import SwitchComponent from '../../Shared/Switch/Switch';
import { navbarStyles as styles } from '../../Shared/ui/navbars';
import { editorStyles } from '../../Shared/ui/editor';
import { useContributor } from '../../Hooks/useContributor/useContributor';
import { ModalWindow } from '../../Shared/Modal/Modal';
import { Contributors } from '../../Enitites/Contributors/Contributors';
import { Notification } from '../Notifications/Notifications';

export const Navbars = () => {
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
                        {window.localStorage.getItem("jwtToken") ? (
                            <Nav.Link>
                                <NavLink to="/notek_frontend/requests">
                                    Черновые запросы
                                </NavLink>
                            </Nav.Link>
                        ) : null}
                        <SwitchComponent />
                    </Nav>
                    {window.localStorage.getItem("jwtToken") ? (
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
                    ) : (
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
    const [isShow, setShow] = useState(false);
    const { deleteMarkdown, updateMarkdown, showNotification, setNotification } = useMarkdown();
    const { handleAddMarkdownToContributor, getContributorsByMarkdown, handleDeleteRole, handleChangeRole, contributors, showContributorNotification, setContributorNotification } = useContributor();
    const { getMe } = useUser();
    const navigate = useNavigate();

    const myId = useSelector(selectUser)?.userId;
    const myRole = useSelector(selectUser)?.role;

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

    useEffect(() => {
        getContributorsByMarkdown(id);
    }, [])

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

    const ActionButton = () => {
        if (!window.localStorage.getItem('jwtToken') || userID === -1) {
            return (
                <ButtonGroup>
                    <Button onClick={() => { navigate('/notek_frontend/authorization') }}>Логин</Button>
                    <Button onClick={() => { navigate('/notek_frontend/registration') }}>Регистрация</Button>
                </ButtonGroup>
            );
        }

        if (userID === myId || myRole === 1 || myRole === 2) {
            return (
                <ButtonGroup>
                    <Button variant="danger" onClick={(e) => deleteMarkdown(id, e)}>
                        Удалить
                    </Button>
                    <Button onClick={() => { setShow(true) }}>
                        Настройки доступа
                    </Button>
                    <Button onClick={handleSaveMarkdown}>Сохранить</Button>
                </ButtonGroup>
            );
        }

        const isAllowedContribution = contributors.filter(contributor => {
            return contributor.User_ID === myId && contributor.role !== "Требует подтверждения";
        })
        if (isAllowedContribution.length !== 0) {
            return (
                <ButtonGroup>
                    <Button onClick={handleSaveMarkdown}>Сохранить</Button>
                </ButtonGroup>
            )
        }

        if (userID !== myId) {
            return <ButtonGroup>
                <Button onClick={() => { handleAddMarkdownToContributor(id) }}>
                    Запросить доступ
                </Button>
            </ButtonGroup>
        }
    };

    const SelectButton: React.FC<Record<string, any>> = ({
        contributor
    }) => {
        if (userID === myId || myRole === 2) {
            return (
                <select
                    value={contributor.role}
                    onChange={(e) => handleChangeRole(e, contributor.Contributor_ID, id, "Админ")}
                    style={{width: "150px", overflow: 'hidden'}}
                >
                    {contributor.role !== "В работе" && <option value="Требует подвтерждения">Требует подтверждения</option>}
                    <option value="В работе">В работе</option>
                    {contributor.role !== 'В работе' && <option value="Отклонен">Отклонен</option>}
                    {contributor.role !== 'Завершен' && <option value="Завершен">Завершен</option>}
                </select>
            );
        }

        if (myRole === 1) {
            return (
                <select
                    value={contributor.role}
                    onChange={(e) => handleChangeRole(e, contributor.Contributor_ID, id, "Модератор")}
                >
                    <option value="В работе">В работе</option>
                    {contributor.role !== 'В работе' && <option value="Отклонен">Отклонен</option>}
                    {contributor.role !== 'В работе' && <option value="Завершен">Завершен</option>}
                </select>
            );
        }

        return null; // or render another default component if none of the conditions are met
    }


    const handleSaveMarkdown = () => {
        const markdown: NotesTypes = {
            Markdown_ID: id,
            Content: input,
            Name: name,
            Status: '',
            User_ID: 0,
            start_date: '',
            PhotoURL: '',
        };

        updateMarkdown(markdown);
    };

    return (
        <div
            style={editorStyles.navbar}
        >
            <ModalWindow
                header="Настройки доступа"
                close="Закрыть"
                submit="Сохранить"
                setShow={setShow}
                show={isShow}
            >
                {contributors.map((contributor, idx) => (
                    <Contributors
                        id={contributor.Contributor_ID}
                        key={idx}
                    >
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "100%"
                        }}>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                {myId === userID || myRole === 2 ? (
                                    <Button variant='danger' className="btn btn-primary btn-sm" onClick={() => { handleDeleteRole(contributor.Contributor_ID, id) }}>Удалить</Button>
                                ) : (null)
                                }
                                <p style={{ marginBottom: 0, marginLeft: 10 }}>{contributor.email}</p>
                            </div>
                            <SelectButton
                                contributor={contributor}
                            />
                        </div>
                    </Contributors>
                ))}
            </ModalWindow>
            <Breadcrumbs />
            <h4 style={{ margin: 0 }}>
                {name} {formattedDate}
            </h4>
            <ActionButton />
            <Notification show={showNotification.show} message={showNotification.message}/>
            <Notification show={showContributorNotification.show} message={showContributorNotification.message}/>
        </div>
    );
};

export default EditorNavbar;