import { Container } from "react-bootstrap";
import { Navbars } from "../../Widgets";

export const Requests = () => {
    return (
        <>
            <Navbars />
            <Container
            style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
            }}>
                <h2>Черновые запросы</h2>
                <div>

                </div>
                
            </Container>
        </>
    )
}