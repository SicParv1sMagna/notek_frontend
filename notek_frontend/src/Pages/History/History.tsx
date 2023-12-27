import { Container } from "react-bootstrap";
import { Navbars } from "../../Widgets";
import { HistoryTable } from "../../Widgets/HistoryTable/HistoryTable";
import { selectUser } from "../../store/userSlice/userSelectors";
import { useSelector } from "react-redux";
import { RequestsTable } from "../../Widgets/RequestsTable/RequestsTable";

export const History = () => {
    const role = useSelector(selectUser)?.role;

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
                {role !== 2 ? (
                    <>
                        <h1>История</h1>
                        <HistoryTable />
                    </>
                ) : (
                    <>
                        <h1>Запросы на редактирование</h1>
                        <RequestsTable />
                    </>
                )
                }
            </Container >
        </>
    )
}
