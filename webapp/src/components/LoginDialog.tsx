import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
//import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useAuthMutations } from '@/mutations/useAuthMutations';
import Password from './Password';

interface LoginDialogProps {
    open: boolean;
    onClose: () => void;
}

export default function LoginDialog({ open, onClose }: LoginDialogProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //const router = useRouter()

    const { login } = useAuthMutations();

    const handleCancel = () => {
        onClose()
    }

    const handleLogin = async () => {
        const statusNumber = await login.mutateAsync({ email, password })
        if (statusNumber === 200) {
            onClose()
            //router.push("/home")
            window.location.href = '/home';
        }
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
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
                <Password password={password} setPassword={setPassword}></Password>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Abbrechen</Button>
                <Button variant="contained" onClick={handleLogin}>Einloggen</Button>
            </DialogActions>
        </Dialog>
    );
}