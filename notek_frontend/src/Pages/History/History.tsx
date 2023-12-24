import { Container } from "react-bootstrap";
import { Navbars } from "../../Widgets";
import { HistoryTable } from "../../Widgets/HistoryTable/HistoryTable";

export const History = () => {

    
    return (
        <>
            <Navbars />
            <Container
                style={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                }}
            >
                <h1>История</h1>
                <HistoryTable />
            </Container>
        </>
    )
}
