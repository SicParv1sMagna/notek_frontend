import { Button, Modal, ModalProps } from "react-bootstrap";

export const ModalWindow = (props: ModalProps) => {

    const Header = () => {

        const headerText = props.header;

        return (
            <div>
                {headerText}
            </div>
        );
    }

    const Footer = () => {
        const closeButtonText = props.close;
        const submitButtonText = props.submit;

        return (
            <div>
                <Button
                    onClick={() => { props.setShow(false) }}
                >{closeButtonText}</Button>
                <Button
                    style={{ marginLeft: "10px" }}
                    onClick={() => {
                        props.onSubmit();
                        props.setShow(false);
                    }}
                >{submitButtonText}</Button>
            </div>
        );
    }

    return (
        <Modal show={props.show}>
            <Modal.Header>
                <Modal.Title>
                    <Header />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                <Footer />
            </Modal.Footer>
        </Modal>
    );
}