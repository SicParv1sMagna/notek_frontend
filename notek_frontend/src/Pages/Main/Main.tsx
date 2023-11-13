import { useState } from "react";
import { Navbars, About, Login } from "../../Widgets";
import Container from "react-bootstrap/Container";
import { ModalWindow } from "../../Shared/Modal/Modal";

export const MainPage = () => {
    const [openAuthModal, setOpenAuthModal] = useState(false);
    const [type, setType] = useState("");

    return (
        <>
            <Navbars
                setOpenAuthModal={setOpenAuthModal}
                setType={setType}
            />
            <ModalWindow
                type={type}
                show={openAuthModal}
                setOpenModal={setOpenAuthModal} children={undefined} />
            <Container
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "100vh",
                }}
            >
                <Login />
                <About />
            </Container>
        </>
    )
}