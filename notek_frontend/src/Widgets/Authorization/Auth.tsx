import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        // Выполняйте здесь необходимые действия для входа, если необходимо

        // Перенаправление на "/editor" после успешного входа
        navigate("/notek_frontend/editor");
    };

    return (
        <>
            <Form
                style={{
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    width: "400px",
                    marginBottom: "20px",
                    alignItems: "center",

                }}
            >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" onClick={handleButtonClick}>
                    Submit
                </Button>
            </Form>
        </>
    );
};
