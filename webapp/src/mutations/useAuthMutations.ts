import { fetchBackend, fetchProxy } from '@/util';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { ReadUserDto, CreateUserDto, LoginUserDto } from '@/util';
import { toast } from 'react-toastify';

export const useAuthMutations = () => {

    const queryClient = useQueryClient()

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
                    throw new Error("SignUp fehlgeschlagen: " + await res.text());
                }
                const createdUser = await res.json()
                return createdUser;
            }
            catch (error: any) {
                console.log(error)
                toast.error("" + error);
                return null;
            }
        }

    })

    const getUser = useQuery({
        queryFn: async(): Promise<ReadUserDto | null> => {
            const res = await fetchProxy("user", {
                method: "GET"
            });
            if(!res){
                return null;
            }
            const user = await res.json()
            return user;


        },
        queryKey: ["userDetail"],
    });



    return {
        login,
        signUp,
        getUser
    }


}



