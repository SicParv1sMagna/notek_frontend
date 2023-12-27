import { useEffect, useState } from 'react';
import { Button, Container, Form, InputGroup, Table } from 'react-bootstrap';
import { useContributor } from '../../Hooks/useContributor/useContributor';
import { useDispatch, useSelector } from 'react-redux';
import { selectEndDateQuery, selectStartDateQuery, selectStatusQuery } from '../../store/contributorSlice/contributorSelector';
import { contributorAction } from '../../store/contributorSlice/contributorSlice';
import { useNavigate } from 'react-router-dom';

export const HistoryTable = () => {
    const { getAllRequests } = useContributor();
    const [requests, setRequests] = useState<any[]>([]);
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [status, setStatus] = useState<string>("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const selectedStartDate = useSelector(selectStartDateQuery);
    const selectedEndDate = useSelector(selectEndDateQuery);
    const selectedStatus = useSelector(selectStatusQuery);

    useEffect(() => {
        setStartDate(selectedStartDate);
        setEndDate(selectedEndDate);
        setStatus(selectedStatus);
    }, [selectedStatus, selectEndDateQuery, selectStartDateQuery])

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await getAllRequests(status, startDate, endDate);
                console.log(response);
                if (response !== undefined) {
                    setRequests(response);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchRequests();
    }, [status, startDate, endDate]);

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

        return formatter.format(dateObject);
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

    return (
        <Container>
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
                        <option value="Черновик">Черновик</option>
                        <option value="Требует подтверждения">Требует подтверждения</option>
                        <option value="В работе">В работе</option>
                        <option value="Отклонен">Отклонен</option>
                        <option value="Удален">Удален</option>
                        <option value="Завершен">Завершен</option>
                    </Form.Select>

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
                <tbody>
                    {requests.map((request) => (
                        <tr>
                            <td>{request.Contributor_ID}</td>
                            <td>{request.email}</td>
                            <td>{request.status}</td>
                            <td>{formatDate(request.created_date)}</td>
                            <td>{formatDate(request.formed_date)}</td>
                            <td>{formatDate(request.completion_date)}</td>
                            <td><Button variant='info' onClick={() => {navigate(`/notek_frontend/history/${request.Contributor_ID}`)}}>Подробнее</Button></td>
                        </tr>
                    ))
                    }
                </tbody>
            </Table>
        </Container>
    );
};
