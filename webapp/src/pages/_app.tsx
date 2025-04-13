import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient(); // QueryClient-Instanz erstellen
const darkTheme = createTheme({
  palette: {
    mode: 'dark', // Dunkler Modus
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#303030', // Dunkler Hintergrund im Dark Mode
      paper: '#424242',   // Dunkler Papier-Hintergrund
    },
    text: {
      primary: '#ffffff', // Weißer Text im Dark Mode
      secondary: '#bbbbbb',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            color: '#fff', // Weißer Text im Dark Mode
            backgroundColor: '#424242', // Dunkler Hintergrund im Dark Mode
          },
          '& .MuiInputLabel-root': {
            color: '#fff', // Weiße Label-Farbe im Dark Mode
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#fff', // Weiße Border im Dark Mode
            },
            '&:hover fieldset': {
              borderColor: '#fff',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#90caf9', // Fokus mit Blau im Dark Mode
            },
          },
        },
      },
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <Component {...pageProps} />
        <ToastContainer position="top-left" autoClose={5000} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
