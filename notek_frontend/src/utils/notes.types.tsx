export interface NotesTypes {
    Markdown_ID: number,
    Name: string,
    Content: string,
    Status: string,
    User_ID: number,
    start_date: string,
}

export const NotesMock : NotesTypes[] = [
    {
        Markdown_ID: 1,
        Name: "Первый маркдаун",
        Content: "# Hello world",
        Status: "Активен",
        User_ID: 1,
        start_date: "25 november 2023",
    },
    {
        Markdown_ID: 2,
        Name: "Второй маркдаун",
        Content: "# Hello world 2",
        Status: "Активен",
        User_ID: 1,
        start_date: "25 november 2023",
    }
]