import { Navbars, About, Login } from "../../Widgets";
import Container from "react-bootstrap/Container";

export const MainPage = () => {

    return (
        <>
            <Navbars />
            <Container
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "100vh",
                }}
            >
                {/* <Login /> */}
                <About />
            </Container>
        </>
    )
}