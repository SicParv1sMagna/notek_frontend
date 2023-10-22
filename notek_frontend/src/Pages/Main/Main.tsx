import { useState } from "react";
import { Navbars, About, Login } from "../../Widgets";
import Container from "react-bootstrap/Container";
import { ModalWindow } from "../../Shared/Modal/Modal";

export const MainPage = () => {
    const [openAuthModal, setOpenAuthModal] = useState(false);
    const [type, setType] = useState("");
    console.log(openAuthModal)
    return (
        <>
            <Navbars
                setOpenAuthModal={setOpenAuthModal}
                setType={setType}
            />
            <Container
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "100vh",
                }}
            >
                <ModalWindow
                    type={type}
                    show={openAuthModal}
                    setOpenModal={setOpenAuthModal}
                >
                    asdfao;isdf
                </ModalWindow>
                <Login />
                <About />
            </Container>
        </>
    )
}