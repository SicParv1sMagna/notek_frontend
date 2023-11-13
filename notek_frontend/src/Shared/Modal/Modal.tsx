import { Button, Modal, Form } from "react-bootstrap";
import { ModalContent, modal } from "../../utils/modal.types";

export const ModalWindow = (props: ModalContent) => {
    const handleSubmitForm = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        console.log("success");
    }

    const Header = () => {
        const type = props.type;

        const modalText = modal[type];
        const headerText = modalText.header;

        return (
            <div>
                {headerText}
            </div>
        );
    }

    const Footer = () => {
        const type = props.type;

        const modalText = modal[type];
        const closeButtonText = modalText.footer.close;
        const submitButtonText = modalText.footer.submit;

        return (
            <div>
                <Button
                    onClick={() => { props.setOpenModal(false) }}
                >{closeButtonText}</Button>
                <Button
                    style={{ marginLeft: "10px" }}
                >{submitButtonText}</Button>
            </div>
        );
    }

    const Body = () => {
        const type = props.type;

        switch (type) {
            case "auth":
                return (
                    <Form onSubmit={(e) => handleSubmitForm(e)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Почта</Form.Label>
                            <Form.Control type="email" placeholder="Почта" required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control type="password" placeholder="Пароль" required />
                        </Form.Group>
                    </Form>
                )
            case "register":
                return (
                    <Form>
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
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicRPassword">
                            <Form.Label>Подтвердите пароль</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                    </Form>
                )
        }
    }

    return (
        <Modal show={props.show}>
            <Modal.Header>
                <Modal.Title>
                    <Header />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Body />
            </Modal.Body>
            <Modal.Footer>
                <Footer />
            </Modal.Footer>
        </Modal>
    );
}