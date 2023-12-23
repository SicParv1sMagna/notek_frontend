import React, { useState } from 'react';
import { Navbars } from '../../Widgets';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../../Hooks/useAuth/useAuth';

export const Authorization = () => {
    const { setLogin, setAuthError, loginUser, login, authError } = useAuth();

    // State for email and password input values
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e: any) => {
        setEmail(e.target.value);
        setLogin({
            ...login,
            email: e.target.value,
        });
    };

    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);
        setLogin({
            ...login,
            password: e.target.value,
        });
    };

    const handleButtonClick = () => {
        setAuthError("");
        // Your existing login functionality here
        loginUser();
    };

    return (
        <>
            <Navbars />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    marginTop: '25px',
                }}
            >
                <h1>Авторизация</h1>
                <Form
                    style={{
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        width: '400px',
                        marginBottom: '20px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}
                >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Почта</Form.Label>
                        <Form.Control type="email" placeholder="example@mail.ru" value={email} onChange={handleEmailChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password" placeholder="Пароль" value={password} onChange={handlePasswordChange} required />
                    </Form.Group>
                    {authError !== "" ? (
                        <p>{authError}</p>
                    ) : (
                        null
                    )}
                    <Button variant="primary" onClick={handleButtonClick}>
                        Логин
                    </Button>
                </Form>
            </div>
        </>
    );
};
