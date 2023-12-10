export interface LoginPayload {
    email: string,
    password: string,
}

export interface RegisterPayload {
    email: string,
    firstName: string,
    secondName: string,
    password: string,
    repeatPassword: string,
    middleName?: string,
}
