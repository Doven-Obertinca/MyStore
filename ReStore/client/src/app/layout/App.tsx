import { useState } from "react";

import Header from "./Header";
import {
  CssBaseline,
  Container,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const palettetype = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: palettetype,
      background: {
        default: palettetype === "light" ? "#e8f1e7" : "#121212",
      },
    },
  });

  const handleChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header darkMode={darkMode} onChange={handleChange} />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
