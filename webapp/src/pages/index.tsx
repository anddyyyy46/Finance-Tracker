import { Button } from '@mui/material';
import { useState } from 'react';
import LoginDialog from '@/components/LoginDialog';
import SignUpDialog from '@/components/SignUpDialog';

export default function Home() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  return (
    <div className="h-full">
      <main className="h-full flex items-center justify-center">
        <div >
          <div>
            <h2>Finance-tracker: </h2>
            <p>Tracke deine Finanzen um einen besseren <span>Überblick</span> zu bekommen und somit <span>Geld sparen</span></p>
          </div>
          <div>
            <Button variant='outlined' onClick={() => setSignUpOpen(true)}> Sign up</Button>
            <Button variant='outlined' onClick={() => setLoginOpen(true)}>Login</Button>
            <LoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} />
            <SignUpDialog open={signUpOpen} onClose={() => setSignUpOpen(false)} />
          </div>
        </div>
      </main>
    </div >
  );
}
