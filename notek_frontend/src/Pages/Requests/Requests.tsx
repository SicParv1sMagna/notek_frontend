import { Container } from "react-bootstrap";
import { Navbars } from "../../Widgets";
import { useContributor } from "../../Hooks/useContributor/useContributor";
import { useEffect, useState } from "react";
import { Draft } from "../../Enitites/Note/Draft";
import { Footer } from "../../Shared/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../store/userSlice/userSelectors";
import { useSelector } from "react-redux";
import { selectContributorId } from "../../store/markdownSlice/markdownSelector";

export const Requests = () => {
    const { getDraftByContributor, handleRequestContribution } = useContributor();
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");

    const selectedEmail = useSelector(selectUser)?.email;

    useEffect(() => {
        setEmail(selectedEmail || "");
    }, [selectedEmail]);

    const [drafts, setDrafts] = useState<any[]>([]);

    const contributorId = useSelector(selectContributorId);

    useEffect(() => {
        const fetchData = async () => {
            if (contributorId !== undefined) {
                const drafts = await getDraftByContributor(contributorId);
                setDrafts(drafts);
                console.log(drafts);
            }
        };

        fetchData();
    }, [contributorId]);

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
                    {drafts.map(md => (
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
                    }
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