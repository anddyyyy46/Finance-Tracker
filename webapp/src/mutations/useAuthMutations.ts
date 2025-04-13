import { fetchBackend } from '@/util';
import { useMutation } from '@tanstack/react-query';
import type { ReadUserDto, CreateUserDto, LoginUserDto } from '@/util';
import { toast } from 'react-toastify';

export const useAuthMutations = () => {

    const login = useMutation({
        mutationFn: async (user: LoginUserDto): Promise<Number | null> => {
            try {
                const res = await fetchBackend('/auth/login', {
                    method: 'POST',
                    body: JSON.stringify(user),
                    headers: { 'Content-Type': 'application/json' },
                    credentials: "include"
                });
                if (!res.ok) throw new Error('Login fehlgeschlagen: ' + res.json());
                const statusNumber = res.status;
                return statusNumber;

            }
            catch (error) {
                toast.error("" + error)
                return null;
            }
        }
    })

    const signUp = useMutation({
        mutationFn: async (user: CreateUserDto): Promise<ReadUserDto | null> => {
            try {
                const res = await fetchBackend('/auth/signup', {
                    method: 'POST',
                    body: JSON.stringify(user),
                    headers: { 'Content-Type': 'application/json' },
                });
                if (!res.ok) {
                    throw new Error("SignUp fehlgeschlagen: " + await res.json());
                }
                const createdUser = await res.json()
                console.log(createdUser)
                return createdUser;
            }
            catch (error: any) {
                toast.error("" + error);
                return null;
            }
        }

    })


    //const { isPending, error, mutateAsync, data } = useMutation({ mutationFn: login });

    return {
        login,
        signUp
    }


}



