import React, { useEffect, useState } from "react";
import { useMarkdown } from "../../Hooks/useMarkdown/useMarkdown";
import { useDispatch, useSelector } from "react-redux";
import { selectMarkdowns, selectSearchQuery } from "../../store/markdownSlice/markdownSelector";
import { Button, Container, Table } from "react-bootstrap";
import { api } from "../../api/axiosConfig";
import document from "../../assets/document.png";
import { markdownAction } from "../../store/markdownSlice/markdownSlice";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface MarkdownsTableProps {
    setSearch: any;
}

export const MarkdownsTable: React.FC<MarkdownsTableProps> = ({ setSearch }) => {
    const [isShow, setShow] = useState(false);
    const [mdName, setMdName] = useState("");
    const [mdIcon, setMdIcon] = useState<File | null>(null);

    const { handleCreateMarkdown, searchMarkdowns } = useMarkdown();

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const searchQuery = useSelector(selectSearchQuery);
    const markdowns = useSelector(selectMarkdowns);

    // Add the following state variable
    const [userEmails, setUserEmails] = useState<Record<string, string>>({});

    useEffect(() => {
        setSearch(searchQuery);
    }, [searchQuery])

    useEffect(() => {
        markdowns?.forEach(md => {
            api.get(`/api/api/user/${md.User_ID}`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`
                }
            })
                .then(response => {
                    // Update the user emails state
                    setUserEmails(prevUserEmails => ({
                        ...prevUserEmails,
                        [md.User_ID]: response.data.Email
                    }));
                })
                .catch(error => {
                    console.error(error);
                })
        })
    }, [markdowns]) // Add dependency to re-run effect when markdowns change

    const deleteMarkdown = (id: number, e: any) => {
        e.stopPropagation()
        api.delete(`/api/api/notes/markdown/${id}`, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
            }
        })
            .then(response => {
                if (response.status === 200) {
                    if (markdowns) {
                        const updatedMarkdowns = markdowns.filter(md => md.Markdown_ID !== id);
                        dispatch(markdownAction.setUpdatedMarkdowns(updatedMarkdowns));

                        // Update the user emails state after deleting a markdown
                        setUserEmails(prevUserEmails => {
                            const { [id]: deletedEmail, ...newUserEmails } = prevUserEmails;
                            return newUserEmails;
                        });
                    }
                }
            })
            .catch((error) => {
                console.error(error)
            });
    }

    const handleSearchMarkdowns = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(markdownAction.setSearchQuery(e.target.value));
        searchMarkdowns(e.target.value);
    }

    return (
        <>
            <Container
                style={{
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                <Form.Control
                    type="text"
                    placeholder="Поиск"
                    onChange={handleSearchMarkdowns}
                    value={searchQuery || ''}
                />
                <Button variant="success" onClick={() => {navigate("/notek_frontend/edit-markdown/0")}}>+</Button>
            </Container>
            <Container>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Название</th>
                            <th>Фотография</th>
                            <th>Статус</th>
                            <th>Дата создания</th>
                            <th>Владелец</th>
                            <th>Редактировать</th>
                            <th>Удалить</th>
                        </tr>
                    </thead>
                    <tbody>
                        {markdowns && markdowns.map((markdown, index) => (
                            <tr key={index}>
                                {/* Render your table cells here */}
                                <td>{markdown.Markdown_ID}</td>
                                <td>{markdown.Name}</td>
                                <td>
                                    <img
                                        style={{ width: "40px", height: "auto" }}
                                        src={markdown.PhotoURL || document}
                                    >
                                    </img>
                                </td>
                                <td>{markdown.Status}</td>
                                <td>{markdown.start_date}</td>
                                {/* Add other fields as needed */}
                                <td>{userEmails[markdown.User_ID]}</td>
                                <td><Button
                                    variant="info"
                                    onClick={() => { navigate(`/notek_frontend/edit-markdown/${markdown.Markdown_ID}`) }}
                                >
                                    Редактировать
                                </Button></td>
                                <td><Button
                                    variant="danger"
                                    onClick={(e) => { deleteMarkdown(markdown.Markdown_ID, e) }}
                                >
                                    Удалить
                                </Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    )
}