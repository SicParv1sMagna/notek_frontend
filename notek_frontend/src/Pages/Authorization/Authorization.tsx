import { Navbars } from "../../Widgets"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export const Authorization = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        // Выполняйте здесь необходимые действия для входа, если необходимо

        // Перенаправление на "/editor" после успешного входа
        navigate("/notek_frontend/editor");
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
                    marginTop: "25px"
                }}
            >
                <h1>Авторизация</h1>
                <Form
                    style={{
                        padding: "20px",
                        display: "flex",
                        flexDirection: "column",
                        width: "400px",
                        marginBottom: "20px",
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
                >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Почта</Form.Label>
                        <Form.Control type="email" placeholder="example@mail.ru" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password" placeholder="Пароль" />
                    </Form.Group>
                    <Button variant="primary" onClick={handleButtonClick}>
                        Submit
                    </Button>
                </Form>
            </div>
        </>
    )
}