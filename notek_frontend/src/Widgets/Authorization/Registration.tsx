import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { Navbars } from "..";
import Button from 'react-bootstrap/Button';

export const Registration = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/notek_frontend/editor")
    }

    return (
        <>
            <Navbars />
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
                    <Form.Control type="text" placeholder="Фамилия" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Имя</Form.Label>
                    <Form.Control type="text" placeholder="Имя" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicMiddleName">
                    <Form.Label>Отчество</Form.Label>
                    <Form.Control type="text" placeholder="Отчество" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Почта</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" placeholder="Пароль" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicRPassword">
                    <Form.Label>Подтвердите пароль</Form.Label>
                    <Form.Control type="password" placeholder="Пароль" />
                </Form.Group>
                <Button variant="primary" onClick={handleButtonClick}>
                    Submit
                </Button>
            </Form>
            </>
    )
}