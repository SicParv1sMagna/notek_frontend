import { api } from "../../api/axiosConfig";
import { useState } from "react";
import { Contributor } from "../../utils/contributor.types";

export const useContributor = () => {
    const [contributors, setContributors] = useState<Contributor[]>([]);
    const [showContributorNotification, setContributorNotification] = useState<Record<string, any>>({
        show: false,
        message: '',
    });

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
                contributorsWithoutRoles.forEach((contributor: Contributor) => {
                    api.get(`/api/api/contributor/role/${id}/${contributor.Contributor_ID}`)
                        .then(response => {
                            contributor.role = response.data;
                            console.log(response);
                        })
                        .catch(error => {
                            console.error(error);
                        })
                })
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

    return {
        handleAddMarkdownToContributor,
        handleRequestContribution,
        getContributorsByMarkdown,
        handleDeleteRole,
        handleChangeRole,
        contributors,
        showContributorNotification,
        setContributorNotification
    }
};
