import { useNavigate } from "react-router-dom";

export const useNote = () => {
    const navigate = useNavigate();
    const deleteMarkdown = async (id: Number, e: any) => {
        e.stopPropagation()
        try {
            const response = await fetch(`/api/notes/markdown/delete-markdown/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            if (response.ok) {
                
            }
        } catch(error) {
            console.error()
        }
    }

    const redirectById = (id: Number) => {
        navigate(`/notek_frontend/editor/${id}`);
    }

    return {
        deleteMarkdown,
        redirectById
    }
}