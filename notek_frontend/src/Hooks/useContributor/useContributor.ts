import { useDispatch } from "react-redux";
import { api } from "../../api/axiosConfig";
import { useState } from "react";
import { Contributor } from "../../utils/contributor.types";

export const useContributor = () => {
    const dispatch = useDispatch();
    const [contributors, setContributors] = useState<Contributor[]>([]);

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
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
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

    const handleChangeRole = (e: React.ChangeEvent<HTMLSelectElement>, id: Number, markdown_id: number, role: string) => {
        const newRole = e.target.value;
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
                    contributors.forEach((contributor) => {
                        if (contributor.Contributor_ID === id) {
                            contributor.role = newRole;
                        }
                    })
                })
                .catch(error => {
                    console.error(error);
                })
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
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.error(error);
                })
        }
    }

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
        handleRequestContribution,
        getContributorsByMarkdown,
        handleDeleteRole,
        handleChangeRole,
        contributors,
    }
};
