import React, { useState } from "react";
import { Navbars } from "../../Widgets";
import { Button, Container, Form, Image } from "react-bootstrap";
import { useMarkdown } from "../../Hooks/useMarkdown/useMarkdown";
import { useNavigate } from "react-router-dom";
import document from "../../assets/document.png"

export const CreateMarkdown = () => {
    const [mdName, setMdName] = useState("");
    const [mdIcon, setMdIcon] = useState<File | null>(null);
    const navigate = useNavigate();

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMdName(e.target.value);
    }

    const { handleCreateMarkdown } = useMarkdown();

    const handleSubmitForm = () => {
        handleCreateMarkdown(mdName, mdIcon);
        navigate("/notek_frontend/editor")
    }

    return (
        <>
            <Navbars />
            <Container
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                <h1 style={{ textAlign: "center" }}>Создание услуги</h1>
                <Container
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "50%",
                        marginTop: "20px",
                    }}
                >
                    <Container style={{ marginRight: "20px" }}>
                        <div>
                            <h4>{mdName.length === 0 ? (
                                <span>Название</span>) : (
                                mdName
                            )
                            }</h4>
                            {mdIcon && mdIcon === null ? (
                                <Image
                                    src={URL.createObjectURL(mdIcon)}
                                    alt="Service Preview"
                                    thumbnail
                                />
                            ) : (
                                <Image
                                    src={document}
                                    thumbnail
                                />
                            )}
                        </div>
                    </Container>
                    <Container>
                        <Form.Control
                            type="text"
                            placeholder="Название"
                            onChange={handleChangeName}
                        />
                        <Form.Control
                            type="file"
                            placeholder="Иконка"
                            onChange={(e) => setMdIcon(e.target.files?.[0] || null)}
                        />
                        <Button
                            style={{
                                width: "100%"
                            }}
                            onClick={handleSubmitForm}
                        >
                            Создать
                        </Button>
                    </Container>
                </Container>
            </Container>
        </>
    )
}
