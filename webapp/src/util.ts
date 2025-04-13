import { useState } from 'react';



export const useInput = (initialValue: string) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return {
        value,
        onChange: handleChange,
    };
};

export const fetchBackend = async (path: string, options: RequestInit) => {
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${backendURL}${path}`, options);
    return res;
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

