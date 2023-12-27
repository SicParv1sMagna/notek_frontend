import { Container } from "react-bootstrap"
import { Navbars } from "../../Widgets"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { api } from "../../api/axiosConfig";
import { Draft } from "../../Enitites/Note/Draft";
import Breadcrumbs from "../../Widgets/Breadcrumbs/Breadcrumbs";

export const HistoryById = () => {
    const { id } = useParams();

    const [markdowns, setMarkdowns] = useState<any[]>([])
    const [contributor, setContributor] = useState<any>();

    useEffect(() => {
        api.get(`/api/api/contributor/${id}`, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`
            }
        })
            .then(response => {
                setMarkdowns(response.data.markdown);
                setContributor(response.data.contributor);
            })
            .catch(error => {
                console.error(error);
            })
    }, []);

    return (
        <>
            <Navbars />
            <Container
                style={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center"
                }}
            >
                <Breadcrumbs></Breadcrumbs>
                <h2>Запрос №{id}</h2>
                <div>
                    {markdowns.map(md => (
                        <Draft
                            key={md.Markdown_ID}
                            id={md.Markdown_ID}
                            content={md.Content}
                            photo={md.PhotoURL}
                            setDrafts={setMarkdowns}
                            drafts={markdowns}
                            allowedToDelete={false}
                        >
                            {md.Name}
                        </Draft>
                    ))}
                </div>
            </Container>
        </>
    )
}