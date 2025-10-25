import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "@/components/Layout";

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
    MuiPickersTextField: {
      styleOverrides: {
        root: {
          color: "#fff",
          "& .MuiFormLabel-root": {
            color: "#fff !important",
          },
          "& .MuiInputBase-root": {
            color: "#fff !important",
          },
        },
      },
    },
    MuiPickersOutlinedInput: {
      styleOverrides: {
        root: {
          color: "#fff !important",
          backgroundColor: "#000 !important",
          "& .MuiPickersInputBase-input": {
            color: "#fff !important",
          },
          "& .MuiSvgIcon-root": {
            color: "#fff !important",
            fill: "white !important",
          },
          "& .MuiPickersOutlinedInput-notchedOutline": {
            borderColor: "#fff !important",
          },
          "&:hover .MuiPickersOutlinedInput-notchedOutline": {
            borderColor: "#fff !important",
          },
          "&.Mui-focused .MuiPickersOutlinedInput-notchedOutline": {
            borderColor: "#90caf9 !important",
          },
        },
      },
    },
    MuiPickersInputBase: {
      styleOverrides: {
        root: {
          color: "#fff !important",
          "& .MuiPickersSectionList-sectionContent": {
            color: "#fff !important",
          },
          "& .MuiPickersSectionList-section": {
            color: "#fff !important",
          },
          "& .MuiPickersSectionList-sectionSeparator": {
            color: "#fff !important",
          },
        },
      },
    },
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
