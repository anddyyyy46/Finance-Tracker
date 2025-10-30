import Password from "@/components/Password";
import { useAuthMutations } from "@/mutations/useAuthMutations";
import { TextField, Button } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');

    const router = useRouter()
    const { signUp } = useAuthMutations();

    const handleSignUp = async () => {
        const user = await signUp.mutateAsync({ email, password, fullname, username })
        if (user) {
            router.push("/login")
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
                    autoFocus
                    margin="dense"
                    label="Voller Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    label="Benutzername"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Password password={password} setPassword={setPassword}></Password>
                <Button variant="contained" onClick={handleSignUp}>SignUp</Button>
            </div>
        </div>
    )
}