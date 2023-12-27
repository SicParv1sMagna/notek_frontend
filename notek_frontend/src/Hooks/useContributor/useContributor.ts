import { api } from "../../api/axiosConfig";
import { useState } from "react";
import { Contributor } from "../../utils/contributor.types";
import { useNavigate } from "react-router-dom";

export const useContributor = () => {
    const [contributors, setContributors] = useState<Contributor[]>([]);
    const [showContributorNotification, setContributorNotification] = useState<Record<string, any>>({
        show: false,
        message: '',
    });
    const navigate = useNavigate();

    const handleAddMarkdownToContributor = (id: number) => {
        api.post(`/api/api/notes/markdown/add-md-to-contributor/${id}`, null, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                setContributorNotification({
                    show: true,
                    message: "Маркдаун добавлен в черновик",
                });
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const handleRequestContribution = (id: number) => {
        api.put(
            `/api/api/contributor/${id}/user`,
            null,
            {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
                    "Content-Type": "application/json",
                },
            }
        )
            .then(() => {
                setContributorNotification({
                    show: true,
                    message: "Заявка подана!"
                })
                navigate("/notek_frontend/editor")
            })
            .catch(() => {
                setContributorNotification({
                    show: true,
                    message: "Вы уже подавали заявку!"
                })
            });
    };

    const getContributorsByMarkdown = (id: number) => {
        api.get(
            `/api/api/contributor/${id}/markdown`,
            {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`
                }
            }
        )
            .then(response => {
                const contributorsWithoutRoles = response.data;
                
                setContributors(contributorsWithoutRoles);
            })
            .catch(error => {
                console.error(error);
            })
    }

    const handleChangeRole = (e: React.ChangeEvent<HTMLSelectElement>, id: number, markdown_id: number, role: string) => {
        const newRole = e.target.value;

        const updateContributor = (idToUpdate: number, newRole: string) => {
            setContributors(prevContributors => {
                return prevContributors.map(contributor => {
                    if (contributor.Contributor_ID === idToUpdate) {
                        return { ...contributor, role: newRole };
                    }
                    return contributor;
                });
            });
        };

        if (role === "Админ") {
            api.put(`/api/api/contributor/admin`, {
                Contributor_ID: id,
                Markdown_ID: markdown_id,
                Access: newRole
            }, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`
                }
            })
                .then(() => {
                    updateContributor(id, newRole);
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            api.put(`/api/api/contributor/moderator`, {
                Contributor_ID: id,
                Markdown_ID: markdown_id,
                Access: newRole,
            }, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`
                }
            })
                .then(() => {
                    updateContributor(id, newRole);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    const handleDeleteRole = (contirbutor_id: number, markdown_id: number) => {
        api.delete(`/api/api/contributor/delete`, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`
            },
            data: {
                Contributor_ID: contirbutor_id,
                Markdown_ID: markdown_id,
            }
        })
            .then(() => {
                setContributors(prevContributors => {
                    // Filter out the contributor with the given ID
                    return prevContributors.filter(contributor => contributor.Contributor_ID !== contirbutor_id);
                });
            })
            .catch(error => {
                console.error(error);
            })
    }

    const getAllRequests = async (status: string, start_date: string, end_date: string) => {
        try {
            const personalData = await api.get(`/api/api/user/me`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`
                }
            })
            console.log(personalData)
            const email = personalData.data.Email;

            const response = await api.get(`/api/api/contributor/?email=${email}&status=${status}&start_date=${start_date}&end_date=${end_date}`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`
                }
            })

            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error(error)
        }
    }

    const getDraftByContributor = async (contributorId: number) => {
        try {
            if (contributorId > 0) {
                const response = await api.get(`/api/api/contributor/${contributorId}`, {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`
                    }
                });
                return response.data.markdown;
            }
        } catch (error) {
            console.error(error);
        }
        return [];
    };

    const handleDeleteDraft = (e: { stopPropagation: () => void; }, id: Number, drafts: any[], setDrafts: React.Dispatch<React.SetStateAction<any[]>>) => {
        e.stopPropagation();

        api.delete(`/api/api/contributor/${id}/delete`,
            {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    const filteredDrafts = drafts.filter(md => {
                        return md.Markdown_ID !== id;
                    })

                    setDrafts(filteredDrafts);
                }
            })
            .catch(error => {
                console.error(error)
            })
    }

    return {
        handleAddMarkdownToContributor,
        handleDeleteDraft,
        handleRequestContribution,
        getContributorsByMarkdown,
        getAllRequests,
        getDraftByContributor,
        handleDeleteRole,
        handleChangeRole,
        contributors,
        showContributorNotification,
        setContributorNotification
    }
};
