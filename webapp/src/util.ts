import { toast } from "react-toastify";

export const fetchBackend = async (path: string, options: RequestInit) => {
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${backendURL}${path}`, options);
    return res;
}

export const fetchProxy = async (path: string, options: RequestInit) => {
    try {
        const res = await fetch(`/api/proxy?path=/${path}`, options);
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
    token: any,
    refreshToken: any,
    expiresIn: number,
}
