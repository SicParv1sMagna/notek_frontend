import { useState } from "react"
import { api } from "../../api/axiosConfig"
import { NotesMock, NotesTypes } from "../../utils/notes.types"
import { useDispatch } from "react-redux"
import { markdownAction } from "../../store/markdownSlice/markdownSlice"
import { useNavigate } from "react-router-dom"

export const useMarkdown = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showNotification, setNotification] = useState<Record<string, any>>({
        show: false,
        message: '',
    });

    const handleCreateMarkdown = (name: string, image: File | null) => {
        api.post(
            "/api/api/notes/markdown/create",
            {
                Name: name,
                Status: "Активен"
            },
            {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
                    'Content-Type': 'application/json', // Include content type in headers
                },
            }
        )
            .then((response) => {
                if (response.status === 201) {
                    let markdown: NotesTypes = {
                        Markdown_ID: response.data.Markdown_ID,
                        Name: response.data.Name,
                        Content: response.data.Content,
                        Status: response.data.Status,
                        User_ID: response.data.User_ID,
                        start_date: response.data.start_date,
                        PhotoURL: "",  // You can initialize the property here if needed
                    };

                    if (image !== null) {
                        const markdownId = response.data.Markdown_ID;
                        const formData = new FormData();
                        formData.append('image', image);

                        api.post(
                            `/api/api/notes/markdown/${markdownId}/image`, formData, {
                            headers: {
                                Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
                                "Content-Type": "multipart/form-data",
                            }
                        })
                            .then((imageResponse) => {
                                markdown.PhotoURL = imageResponse.data;
                                dispatch(markdownAction.addMarkdown(markdown));
                                setNotification({
                                    show: true,
                                    message: "Маркдаун создан!"
                                })
                            })
                            .catch((imageError) => {
                                console.error('Error uploading image', imageError);
                                setNotification({
                                    show: true,
                                    message: "Ошибка при загрузке фотографии!",
                                })
                            });
                    } else {
                        dispatch(markdownAction.addMarkdown(markdown));
                        setNotification({
                            show: true,
                            message: "Маркдаун создан!"
                        })
                    }
                }
            })
            .catch((error) => {
                console.error(error);
                setNotification({
                    show: true,
                    message: "Ошибка при создании маркдауна!"
                })
            });
    };

    const fetchMarkdowns = () => {
        api.get("/api/api/notes/markdown/")
            .then(response => {
                dispatch(markdownAction.setAllMarkdowns(response.data))
            })
            .catch(() => {
                dispatch(markdownAction.setAllMarkdowns(NotesMock))
            })
    }

    const searchMarkdowns = (search: string) => {
        // dispatch(markdownAction.setSearchQuery(search))
        api.get(`/api/api/notes/markdown/?name=${search}`)
            .then(response => {
                dispatch(markdownAction.setAllMarkdowns(response.data))
            })
            .catch(() => {
                dispatch(markdownAction.setAllMarkdowns(NotesMock))
            })
    };

    const fetchMarkdown = (id: number) => {
        api.get(`/api/api/notes/markdown/${id}`)
            .then(response => {
                dispatch(markdownAction.setMarkdown(response.data))
            })
            .catch(() => {
                navigate("/notek_frontend/editor")
            })
    }

    const deleteMarkdown = (id: number, e: any) => {
        e.stopPropagation()
        api.delete(`/api/api/notes/markdown/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
                }
            })
            .then(response => {
                if (response.status === 200) {
                    navigate("/notek_frontend/editor")
                }
                setNotification({
                    show: true,
                    message: 'Маркдаун удален!'
                })
            })
            .catch(() => {
                setNotification({
                    show:true,
                    message: 'Ошибка при удалении маркдауна!'
                })
            })
    }

    const updateMarkdown = (markdown: NotesTypes) => {
        api.put(
            `/api/api/notes/markdown/`,
            {
                Markdown_ID: markdown.Markdown_ID,
                Name: markdown.Name,
                Content: markdown.Content || ' ',
            },
            {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
                },
            })
            .then(response => {
                if (response.status === 200) {
                    setNotification({
                        show: true,
                        message: "Маркдаун успешно изменен!"
                    });
                }
            })
            .catch(() => {
                setNotification({
                    show: true,
                    message: "Ошибка при изменении маркдауна!",
                })
            })
    };

    return {
        handleCreateMarkdown,
        fetchMarkdowns,
        fetchMarkdown,
        searchMarkdowns,
        deleteMarkdown,
        updateMarkdown,
        showNotification,
        setNotification
    }
}

