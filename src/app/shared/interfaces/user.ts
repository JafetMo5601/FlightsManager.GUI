import { Countries } from "./countries";

export interface User {
    userId: string,
    name: string,
    lastname: string,
    birthDate: Date,
    passportNumber: string,
    country: Countries,
    userName: string,
    email: string,
    phoneNumber: string,
}