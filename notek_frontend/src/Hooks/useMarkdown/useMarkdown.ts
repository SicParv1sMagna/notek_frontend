import { api } from "../../api/axiosConfig"
import { NotesMock, NotesTypes } from "../../utils/notes.types"
import { useDispatch } from "react-redux"
import { markdownAction } from "../../store/markdownSlice/markdownSlice"
import { useNavigate } from "react-router-dom"

export const useMarkdown = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCreateMarkdown = (name: string) => {
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
              dispatch(markdownAction.addMarkdown(response.data));
            } 
          })
          .catch((error) => {
            console.error(error);
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
                console.log(response.data)
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
            })
            .catch(error => {
                console.error(error);
            })
    }

    const updateMarkdown = (markdown: NotesTypes) => {
        api.put(
            `/api/api/notes/markdown/`,
            {
                Markdown_ID: markdown.Markdown_ID,
                Name: markdown.Name,
                Content: markdown.Content,
            },
            {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
                },
            })
            .then(response => {
                if (response.status === 200) {
                    console.log(response);
                }
            })
            .catch(error => {
                console.error(error);
            })
    };

    return {
        handleCreateMarkdown,
        fetchMarkdowns,
        fetchMarkdown,
        searchMarkdowns,
        deleteMarkdown,
        updateMarkdown,
    }
}

