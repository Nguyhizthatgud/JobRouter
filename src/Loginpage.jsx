import React from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Link } from "@mui/material";
import "./styles/pages/LoginPage.css";

const Loginpage = ({ setIsSubmit, setIsLogin }) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    if (setIsSubmit) {
      setIsSubmit(true);
      setIsLogin(true);
    }
  };
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <TextField {...register("id")} label="User ID" variant="outlined" fullWidth />
      <TextField {...register("password")} label="Password" type="password" variant="outlined" fullWidth />
      <TextField {...register("email")} label="Email" type="email" variant="outlined" fullWidth />
      <button type="submit" className="form-submit-btn">
        Login
      </button>
      <div className="form-footer">
        Don't have an account?{" "}
        <Link href="/register" underline="hover">
          Register
        </Link>
        tạo đại cái gì cũng được, login là chạy Authen ok anh Quang ơi.
      </div>
    </form>
  );
};

export default Loginpage;
