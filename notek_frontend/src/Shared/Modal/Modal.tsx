import { Button, Modal } from "react-bootstrap";
import { ModalContent, modal } from "../../utils/modal.types";

export const ModalWindow = (props: ModalContent) => {
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
                    onClick={()=>{props.setOpenModal(false)}}
                >{closeButtonText}</Button>
                <Button
                    style={{marginLeft: "10px"}}
                >{submitButtonText}</Button>
            </div>
        );
    }

    return (
        <Modal show={props.show}>
            <Modal.Header closeButton>
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
