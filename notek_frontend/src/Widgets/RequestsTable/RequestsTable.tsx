import { useEffect, useState } from "react";
import { Button, Container, Form, InputGroup, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { contributorAction } from "../../store/contributorSlice/contributorSlice";
import { selectEmailQuery, selectEndDateQuery, selectStartDateQuery, selectStatusQuery } from "../../store/contributorSlice/contributorSelector";
import { api } from "../../api/axiosConfig";
import { useNavigate } from "react-router-dom";

export const RequestsTable = () => {
    const [requests, setRequests] = useState<any[]>([]);
    const [email, setEmail] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [status, setStatus] = useState<string>("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const selectedStartDate = useSelector(selectStartDateQuery);
    const selectedEndDate = useSelector(selectEndDateQuery);
    const selectedStatus = useSelector(selectStatusQuery);
    const selectedEmail = useSelector(selectEmailQuery);

    useEffect(() => {
        setEmail(selectedEmail);
    }, [selectedEmail])

    const formatDate = (dateString: string) => {
        if (dateString === null) {
            return "Не указано";
        }

        const dateObject = new Date(dateString);

        

        const formatter = Intl.DateTimeFormat('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZone: 'Europe/Moscow',
        });

        return formatter.format(dateObject) || "";
    };

    const handleStatusChange = (selectedStatus: string) => {
        dispatch(contributorAction.setStatus(selectedStatus));
        setStatus(selectedStatus);
    };

    const handleStartDateChange = (selectedStartDate: string) => {
        dispatch(contributorAction.setStartDateQuery(selectedStartDate))
        setStartDate(selectedStartDate);
    };

    const handleEndDateChange = (selectedEndDate: string) => {
        dispatch(contributorAction.setEndDateQuery(selectedEndDate));
        setEndDate(selectedEndDate);
    };

    const handleEmailChange = (selectedEmail: string) => {
        console.log(email);
        setEmail(selectedEmail)
        dispatch(contributorAction.setEmail(selectedEmail));
    }

    const handleCurrentStatusChange = (e: any, id: number) => {
        console.log('Selected value:', e);  // Log the selected value to check if it's received correctly

        api.put(
            `/api/api/contributor/moderator`,
            {
                Contributor_ID: id,
                Access: e,  // Use 'e' directly instead of 'e.target.value'
            },
            {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
                },
            }
        )
            .then(() => {
                // Handle success
                const updatedRequests = requests.map(request =>
                    request.Contributor_ID === id
                        ? { ...request, status: e }
                        : request
                );
                setRequests(updatedRequests);
            })
            .catch(error => {
                // Handle error
                console.error(error);
            });
    }

    const fetchData = (status: string, endDate: string, startDate: string) => {
        const queryParams = {
            start_date: startDate,
            end_date: endDate,
            status: status,
        };

        console.log(queryParams)

        api.get(`/api/api/contributor/`, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`
            },
            params: queryParams,
        })
            .then(response => {
                let filteredData = response.data;
                if (email !== "") {
                    filteredData = filteredData.filter(req => req.email.includes(email))
                }
                setRequests(filteredData);
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        const filteredData = requests.filter(req => req.email.includes(email))
        setRequests(filteredData);
    }, [email])

    useEffect(() => {
        fetchData(status, endDate, startDate);
    }, [status, endDate, startDate]);

    useEffect(() => {
        const pollingInterval = setInterval(() => {
            fetchData(status, endDate, startDate);
        }, 1000);
    
        return () => clearInterval(pollingInterval);
    }, [status, endDate, startDate, email]);

    return (
        <Container >
            <Container
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <InputGroup className="mb-3">
                    <Form.Select
                        aria-label="Default select"
                        onChange={(e) => handleStatusChange(e.target.value)}
                        title='Статус'
                        value={selectedStatus}
                    >
                        <option value="">Статус</option>
                        <option value="Требует подтверждения">Требует подтверждения</option>
                        <option value="В работе">В работе</option>
                        <option value="Отклонен">Отклонен</option>
                        <option value="Завершен">Завершен</option>
                    </Form.Select>
                    <Form.Control
                        type="text"
                        onChange={(e) => handleEmailChange(e.target.value)}
                        value={selectedEmail}
                        placeholder="Почта"
                    />
                    <Form.Control
                        type="date"
                        onChange={(e) => handleStartDateChange(e.target.value)}
                        value={selectedStartDate}
                    />
                    <Form.Control
                        type="date"
                        onChange={(e) => handleEndDateChange(e.target.value)}
                        value={selectedEndDate}
                    />
                </InputGroup>
            </Container>
            <Container
                style={{
                    display: "flex",
                    flexDirection: "column",
                    overflowY: "scroll",  // Set overflow-y to scroll
                    maxHeight: "80vh",
                }}
            >
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Почта</th>
                            <th>Статус</th>
                            <th>Дата создания</th>
                            <th>Дата формирования</th>
                            <th>Дата завершения</th>
                            <th></th>
                        </tr>
                    </thead>
                    {requests.length > 0 ? (
                        <tbody>
                            {requests.map((request) => (
                                <tr>
                                    <td>{request.Contributor_ID}</td>
                                    <td>{request.email}</td>
                                    <td>
                                        <Form.Select
                                            value={request.status}
                                            onChange={(e) =>
                                                handleCurrentStatusChange(e.target.value, request.Contributor_ID)
                                            }
                                            disabled={request.status === "Черновик" || request.status === "В работе" || request.status === "Отклонен"}
                                        >
                                            {/* Options based on your conditions */}
                                            <option value="Требует подтверждения" disabled>
                                                Требует подтверждения
                                            </option>
                                            <option value="В работе">В работе</option>
                                            <option value="Отклонен">Отклонен</option>
                                            <option value="Завершен" disabled>
                                                Завершен
                                            </option>
                                        </Form.Select>
                                    </td>
                                    <td>{formatDate(request.created_date) || ("")}</td>
                                    <td>{formatDate(request.formed_date) || ("")}</td>
                                    <td>{formatDate(request.completion_date) || ("")}</td>
                                    <td><Button variant="info" onClick={() => { navigate(`/notek_frontend/history/${request.Contributor_ID} `) }}>Подробнее</Button></td>
                                </tr>
                            ))
                            }
                        </tbody>
                    ) : (null)}
                </Table>
            </Container>
        </Container>
    )
}