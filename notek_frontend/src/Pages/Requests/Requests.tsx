import { Container } from "react-bootstrap";
import { Navbars } from "../../Widgets";
import { useContributor } from "../../Hooks/useContributor/useContributor";
import { useEffect, useState } from "react";
import { Draft } from "../../Enitites/Note/Draft";
import { Footer } from "../../Shared/Footer/Footer";
import { useNavigate } from "react-router-dom";

export const Requests = () => {
    const { getDraftRequest, handleRequestContribution } = useContributor();
    const navigate = useNavigate();

    const [drafts, setDrafts] = useState<any[]>([]);

    useEffect(() => {
        const fetchDrafts = async () => {
            try {
                const response = await getDraftRequest("example@example.com");
                console.log(response)
                setDrafts(response);
            } catch (error) {
                console.error(error);
            }
        };

        fetchDrafts();
    }, []);

    useEffect(() => {
        if (drafts[0]?.markdown?.length === 0) {
            navigate("/notek_frontend/editor")
        } 
    }, [drafts])

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
                    {drafts.map(draft => (
                        draft.markdown.map(md => (
                            <Draft
                                key={md.Markdown_ID}
                                id={md.Markdown_ID}
                                content={md.Content}
                                photo={md.PhotoURL}
                                drafts={drafts}
                                setDrafts={setDrafts}
                            >
                                {md.Name}
                            </Draft>
                        ))
                    ))}
                </div>
                <Footer
                    fn={handleRequestContribution}
                    children={undefined}
                    items={drafts}
                    setItems={setDrafts}
                />
            </Container >
        </>
    )
}