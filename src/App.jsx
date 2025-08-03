import { useState, useMemo, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import JobsPage from "./JobsPage";
import HomePage from "./Homepage";
import JobDetailPage from "./Jobdetailpage";
import Footer from "./Footer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import "./styles/index.css";

function App() {
  // Dark mode state

  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode === "true";
  });

  // Login state - initialize from localStorage
  const [isLogin, setIsLogin] = useState(() => {
    const loginState = localStorage.getItem("isLogin");
    return loginState === "true";
  });

  // Save login state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("isLogin", isLogin.toString());
  }, [isLogin]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  console.log("login state:", isLogin);
  const theme = useMemo(
    () =>
      createTheme({
        cssVariables: true,
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: {
            main: "#667eea"
          },
          secondary: {
            main: "#764ba2"
          },
          background: {
            default: darkMode ? "#121212" : "#f8f9fa",
            paper: darkMode ? "#1e1e1e" : "#ffffff"
          }
        }
      }),
    [darkMode]
  );

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <section className={`app ${darkMode ? "dark-mode" : "light-mode"}`}>
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} isLogin={isLogin} setIsLogin={setIsLogin} />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/jobs" element={<JobsPage isLogin={isLogin} />} />
              <Route path="/jobs/:id" element={<JobDetailPage />} />
              {/* handle not founded page */}
              <Route
                path="*"
                element={
                  <main className="main-content">
                    <h2>Page Not Found</h2>
                    <p>Sorry, the page you are looking for does not exist.</p>
                  </main>
                }
              />
            </Routes>
          </main>
        </section>
      </Router>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
