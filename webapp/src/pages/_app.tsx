import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "@/components/Layout";

const queryClient = new QueryClient();
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#303030',
      paper: '#424242', 
    },
    text: {
      primary: '#ffffff',
      secondary: '#bbbbbb',
    },
  },
  components: {
    
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#000 !important",
          color: "#fff !important",
        },
      },
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer position="top-left" autoClose={5000} />
        </Layout>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
