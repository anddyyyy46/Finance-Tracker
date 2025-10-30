import { toast } from "react-toastify";

export const fetchBackend = async (path: string, options: RequestInit) => {
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${backendURL}${path}`, options);
    return res;
}

export const fetchProxy = async (path: string, options: RequestInit, noJson = false) => {
    try {
        let res = null;
        if(noJson){
            res = await fetch(`/api/nojsonproxy?path=/${path}`, options);
        } else {
            res = await fetch(`/api/proxy?path=/${path}`, options);
        }
        if (!res.ok) {
            const err = await res.text();
            console.log("Error: ", err)
            throw new Error('Fetch fehlgeschlagen: '+ err);
        }
        return res;
    }
    catch (error) {
        toast.error("" + error)
    }
}

export type ReadUserDto = {
    email: string,
    fullname: string,
    username: string
}

export type CreateUserDto = {
    email: string,
    password: string,
    fullname: string,
    username: string
}

export type LoginUserDto = {
    email: string,
    fullname?: string,
    password: string
}

export type LoginResponse = {
    token: string,
    refreshToken: string,
    expiresIn: number,
}

export type CreateCategoryDto = {
    title: string;
    description?: string;
    color?: string;
}

export type ReadCategoryDto = {
    id: number;
    title: string;
    description: string;
    color: string;
}

export type CreatePaymentPartnerDto = {
    name: string;
    contact?: string;
    email?: string;
    telNr?: string;
}

export type ReadPaymentPartnerDto = {
    id: number;
    name: string;
    contact: string;
    email: string;
    telNr: string;
}

export type CategoryCountDto = {
    category: ReadCategoryDto;
    count: number;
}

export type CreateTransactionDateDto = {
    startDate: Date;
    endDate: Date;
}

export interface UserReadDto{
    id: string;
    email: string;
    fullname: string;
    username: string;
}
export interface ReadTransactionDto {
    id: string;
    user: UserReadDto;
    amount: number;
    category?: ReadCategoryDto;
    date?: string;
    transactionMedium?: string;
    paymentPartner?: ReadPaymentPartnerDto;
    importance?: string;
    createdAt?: Date;
}
export interface CreateTransactionDto {
    amount: number;
    date?: Date;
    paymentPartnerId?: number;
    transactionMedium?: string;
    categoryId?: number;
    importance?: string;

}