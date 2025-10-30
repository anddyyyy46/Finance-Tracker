import { Button } from '@mui/material';
import { useState } from 'react';
import LoginDialog from '@/components/LoginDialog';
import SignUpDialog from '@/components/SignUpDialog';
import { useAuthMutations } from '@/mutations/useAuthMutations';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export default function Home() {
  
  const [loginOpen, setLoginOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);


  const { login } = useAuthMutations();
  const router = useRouter()

  const demoAcc = async() => {
    if (process.env.NEXT_PUBLIC_DEMO_ACC_MAIL && process.env.NEXT_PUBLIC_DEMO_ACC_PW){
      const statusNumber = await login.mutateAsync({ 
        email: process.env.NEXT_PUBLIC_DEMO_ACC_MAIL,
        password: process.env.NEXT_PUBLIC_DEMO_ACC_PW || "", 
      })
      if (statusNumber === 200) {
        router.push("/home")
      }
    } else {
      toast.error("Demo Account aktuell nicht verfügbar")
    }

        


  }

  return (
    <div className="h-full">
      <main className="h-full flex items-center justify-center">
        <div >
          <div>
            <h2>Finance-tracker: </h2>
            <p>Tracke deine Finanzen um einen besseren <span>Überblick</span> zu bekommen und somit <span>Geld sparen</span></p>
          </div>
          <div>
            <Button variant='outlined' onClick={() => setSignUpOpen(true)}>Sign up</Button>
            <Button variant='outlined' onClick={() => setLoginOpen(true)}>Login</Button>
            <Button variant='outlined' onClick={() => demoAcc()}>Demo</Button>
            <LoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} />
            <SignUpDialog open={signUpOpen} onClose={() => setSignUpOpen(false)} />
          </div>
        </div>
      </main>
    </div >
  );
}
