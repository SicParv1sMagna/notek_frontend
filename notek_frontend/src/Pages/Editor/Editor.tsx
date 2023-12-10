import { useEffect, useState } from "react"
import { Navbars, Sidebar } from "../../Widgets"
import { useMarkdown } from "../../Hooks/useMarkdown/useMarkdown"

export const Editor = () => {
    const { fetchMarkdowns, searchMarkdowns } = useMarkdown();
    const [search, setSearch] = useState<string>("");


    useEffect(() => {
        fetchMarkdowns();
    }, [])

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            searchMarkdowns(search);
        }, 100);
        return () => clearTimeout(delaySearch);

        // Clear the timeout on component unmount or when search changes
    }, [search]);

    return (
        <>
            <Navbars />
            <Sidebar
                setSearch={setSearch}
            />
        </>
    )
}