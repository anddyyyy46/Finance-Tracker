import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useAuthMutations } from '@/mutations/useAuthMutations';
import Password from './Password';

interface SignUpDialog {
    open: boolean;
    onClose: () => void;
}

export default function SignUpDialog({ open, onClose }: SignUpDialog) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');


    const router = useRouter()
    const { signUp } = useAuthMutations();

    const handleCancel = () => {
        onClose()
    }

    const handleSignUp = async () => {
        const user = await signUp.mutateAsync({ email, password, fullname, username })
        if (user) {
            onClose()
            router.push("/login")
        }
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Sign Up</DialogTitle>
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
                <TextField
                    autoFocus
                    margin="dense"
                    label="fullname"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    label="username"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Password password={password} setPassword={setPassword}></Password>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Abbrechen</Button>
                <Button variant="contained" onClick={handleSignUp}>Sign Up</Button>
            </DialogActions>
        </Dialog>
    );
}