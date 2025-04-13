import { useAuthMutations } from '@/mutations/useAuthMutations';
import { Button, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';


export default function loginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter()

    const { login } = useAuthMutations();

    const handleLogin = async () => {
        const statusNumber = await login.mutateAsync({ email, password })
        if (statusNumber === 200) {
            router.push("/home")
        }
    }
    return (
        <div className='h-full flex justify-center'>
            <div className='mt-[5%] text-white'>
                <TextField
                    autoFocus
                    margin="dense"
                    label="E-Mail"
                    type="email"
                    fullWidth
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Passwort"
                    type="password"
                    fullWidth
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="contained" onClick={handleLogin}>Einloggen</Button>
            </div>
        </div>
    )
}