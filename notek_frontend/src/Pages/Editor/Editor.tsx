import { useEffect, useState } from "react"
import { Navbars, Sidebar } from "../../Widgets"
import { useMarkdown } from "../../Hooks/useMarkdown/useMarkdown"
import { useSelector } from "react-redux";
import { selectUser } from "../../store/userSlice/userSelectors";
import { MarkdownsTable } from "../../Widgets/MarkdownsTable/MarkdownsTable";

export const Editor = () => {
    const { fetchMarkdowns, searchMarkdowns } = useMarkdown();
    const [search, setSearch] = useState<string>("");

    const role = useSelector(selectUser)?.role;

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
            {role !== 2 ? (
                <Sidebar
                    setSearch={setSearch}
                />
            ) : (
                <MarkdownsTable
                    setSearch={setSearch}
                />
            )}
        </>
    )
}