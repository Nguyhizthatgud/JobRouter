import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import { Link, Dialog, DialogTitle, DialogContent } from "@mui/material";
import Loginpage from "./Loginpage";
// Navbar component now uses React Router for navigation
const Navbar = ({ darkMode, toggleDarkMode, isLogin, setIsLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.pathname === "/" ? "home" : location.pathname.substring(1);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleLoginSuccess = () => {
    setIsLogin(true);
    setIsModalOpen(false); // Close modal after successful login
  };

  // React Hook Form setup
  const { control, handleSubmit } = useForm({
    defaultValues: {
      searchJobValue: ""
    }
  });

  const onSubmit = (data) => {
    if (data.searchJobValue.trim()) {
      // Navigate to jobs page with search parameter
      navigate(`/jobs?search=${encodeURIComponent(data.searchJobValue.trim())}`);
    } else {
      // Navigate to jobs page without search parameter
      navigate("/jobs");
    }
  };
  return (
    <Box className="Navbar" sx={{ flexGrow: 1, position: "fixed", width: "100%", zIndex: 1000 }}>
      <AppBar position="fixed" color={darkMode ? "primary" : "secondary"}>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold", fontFamily: "Arial, sans-serif", mr: 10 }}>
            <Link underline="none" sx={{ color: "inherit", cursor: "pointer" }} onClick={() => navigate("/")}>
              <span className="logo">JobRouter</span>
            </Link>
          </Typography>
          {isLogin ? (
            <Paper
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ p: "2", display: "flex", alignItems: "center", width: 400 }}
            >
              <Controller
                name="searchJobValue"
                control={control}
                render={({ field }) => (
                  <InputBase
                    {...field}
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="looking for job?"
                    inputProps={{ "aria-label": "looking for job?" }}
                  />
                )}
              />
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton type="submit" color="primary" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          ) : null}
          <div style={{ display: "flex", flexGrow: 1, justifyContent: "flex-end" }}>
            <IconButton color="inherit" onClick={toggleDarkMode} aria-label="toggle dark mode" sx={{ mr: 2 }}>
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

            <Button
              color="inherit"
              onClick={() => navigate("/")}
              variant={currentPage === "home" ? "outlined" : "text"}
              sx={{ mr: 2 }}
            >
              Home
            </Button>

            <Button
              color="inherit"
              onClick={() => navigate("/jobs")}
              variant={currentPage === "jobs" ? "outlined" : "text"}
              sx={{ mr: 2 }}
            >
              Jobs
            </Button>
            <Button
              color="inherit"
              onClick={isLogin ? () => setIsLogin(false) : handleOpenModal}
              variant={currentPage === "login" ? "outlined" : "text"}
              sx={{ mr: 2 }}
            >
              {isLogin ? "Logout" : "Login"}
            </Button>
          </div>
        </Toolbar>
        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <LockPersonIcon
                sx={{
                  fontSize: "2rem",
                  color: "white",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  padding: "0.5rem",
                  borderRadius: "50%",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "3rem",
                  height: "3rem"
                }}
              />
              <div>
                <div>Login</div>
                <div style={{ fontSize: "0.8rem", color: "#666" }}>#Sign-in for more features and job details</div>
              </div>
            </div>
          </DialogTitle>
          <DialogContent>
            <Loginpage setIsSubmit={handleLoginSuccess} />
          </DialogContent>
        </Dialog>
      </AppBar>
    </Box>
  );
};

export default Navbar;
