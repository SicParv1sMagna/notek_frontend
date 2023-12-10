import { Form } from 'react-bootstrap';  // Import Form from react-bootstrap
import Button from 'react-bootstrap/Button';
import { Navbars } from "../../Widgets";
import { useAuth } from '../../Hooks/useAuth/useAuth';  // Import useAuth and RegisterPayload

export const Registration = () => {
    const { registerUser, register, regError, handleRegisterInputChange } = useAuth();

    const handleButtonClick = () => {
        // You can perform any additional validation or processing here
        registerUser();
    };

    return (
        <>
            <Navbars />
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                    marginTop: "25px",
                }}
            >
                <h1>Регистрация</h1>
                <Form
                    style={{
                        padding: "20px",
                        display: "flex",
                        flexDirection: "column",
                        width: "400px",
                        marginBottom: "20px",
                        marginLeft: "auto",
                        marginRight: "auto"
                    }}
                >
                    <Form.Group className="mb-3" controlId="formBasicSurname">
                        <Form.Label>Фамилия</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Фамилия"
                            name="secondName" // Use name attribute for identification
                            value={register.secondName}
                            onChange={handleRegisterInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Имя"
                            name="firstName"
                            value={register.firstName}
                            onChange={handleRegisterInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicMiddleName">
                        <Form.Label>Отчество</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Отчество"
                            name="middleName"
                            value={register.middleName}
                            onChange={handleRegisterInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Почта</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            value={register.email}
                            onChange={handleRegisterInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Пароль"
                            name="password"
                            value={register.password}
                            onChange={handleRegisterInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicRPassword">
                        <Form.Label>Подтвердите пароль</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Пароль"
                            name="repeatPassword"
                            value={register.repeatPassword}
                            onChange={handleRegisterInputChange}
                        />
                    </Form.Group>
                    {regError !== "" ? (
                        <p>{regError}</p>
                    ) : (
                        null
                    )}
                    <Button variant="primary" onClick={handleButtonClick}>
                        Submit
                    </Button>
                </Form>
            </div>
        </>
    )
};
