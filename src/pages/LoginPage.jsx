import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import Loginimage from "../assets/blank-profile-picture-png.png";
import MainContext from "../context";
import { useContext, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import ReactCaptcha from "modern-react-captcha";
import reloadIcon from "../assets/refresh-svgrepo-com.svg";

const LoginPage = () => {
  const { handlePageNumber, handleIsLogin } = useContext(MainContext);
  const [is_loaded, setIsLoaded] = useState(true);
  const [is_captcha, setIsCaptcha] = useState(false);
  const recaptcha = useRef();

  async function get_data(url, input) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(input),
    });
    var data = await response.json();
    return data;
  }
  const Log_in = () => {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    if (!username) {
      document.getElementById("username_label").innerText =
        "نام کاربری وارد نشده است.";
      return;
    }
    if (!password) {
      document.getElementById("password_label").innerText =
        "رمز عبور وارد نشده است.";
      return;
    }
    const input = {
      email: username,
      password: password,
    };
    setIsLoaded(false);
    const userData = get_data(
      "https://ctf-apa-backend.onrender.com/api/token/",
      input
    );
    userData.then((user) => {
      setIsLoaded(true);
      if (user.message) {
        toast.error("نام کاربری یا رمز عبور اشتباه است!");
      } else {
        localStorage.setItem("userData", JSON.stringify(user));
        localStorage.setItem("Access_token", JSON.stringify(user.access_token));
        handleIsLogin(true);
        handlePageNumber(1);
      }
    });
  };
  const handleSuccess = () => {
    setIsCaptcha(true);
  };
  const handleFailure = () => {
    setIsCaptcha(false);
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          maxWidth: "100%",
          padding: "2vw",
          background: "linear-gradient(#1e3c72,#0d1727)",
        }}
      >
        <ToastContainer
          position="top-right"
          rtl
          closeOnClick
          pauseOnHover
          theme="colored"
        />
        <Container
          sx={{
            position: "absolute",
            height: "55vh",
            width: "20vw",
            top: "22.5%",
            left: "40%",
            bgcolor: "red",
            transform: "Translate(-50%,-50%)",
            borderRadius: "15px",
            transform: "rotate(3deg)",
          }}
        ></Container>
        <Container
          sx={{
            position: "absolute",
            height: "55vh",
            width: "20vw",
            top: "50%",
            left: "50%",
            transform: "Translate(-50%,-50%)",
            backgroundColor: "lightgray",
            borderRadius: "15px",
          }}
        >
          <Box
            sx={{
              backgroundColor: "lightblue",
              borderRadius: "50%",
              width: "5vw",
              height: "5vw",
              position: "absolute",
              left: "50%",
              transform: "Translate(-50%, -50%)",
            }}
          >
            <Avatar
              src={Loginimage}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "Translate(-50%, -50%)",
                width: "90%",
                height: "90%",
              }}
            />
          </Box>
          <Typography
            sx={{
              position: "absolute",
              top: "18%",
              left: "50%",
              transform: "Translate(-50%, -50%)",
            }}
            variant="h5"
          >
            ورود
          </Typography>
          <TextField
            fullWidth
            color="login_th"
            label="نام کاربری"
            id="username"
            sx={{ mt: "40%" }}
          />
          <Typography
            variant="caption"
            color="error"
            id="username_label"
          ></Typography>
          <TextField
            fullWidth
            color="login_th"
            label="رمز عبور"
            id="password"
            type="password"
            sx={{ mt: "6%" }}
          />
          <Typography
            variant="caption"
            color="error"
            id="password_label"
          ></Typography>
          <Box sx={{ mt: "8%", width: "20vw" }}>
            <ReactCaptcha
              charset="ln"
              length={6}
              color="white"
              bgColor="black"
              reload={true}
              reloadText=""
              reloadIcon={reloadIcon}
              handleSuccess={handleSuccess}
              handleFailure={handleFailure}
            />
          </Box>
          {is_loaded ? (
            <Button
              variant="contained"
              sx={{
                height: "fit-content",
                width: "88%",
                position: "absolute",
                left: "50%",
                top: "80%",
                transform: "Translate(-50%, -50%)",
                bgcolor: "#001B48",
                color: "white",
                ":hover": {
                  backgroundColor: "#F7AD19",
                  color: "#001B48",
                },
              }}
              onClick={Log_in}
              disabled={!is_captcha}
            >
              ورود
            </Button>
          ) : (
            <CircularProgress
              sx={{
                position: "absolute",
                top: "80%",
                left: "45%",
                color: "#001B48",
              }}
            />
          )}
          <Typography
            sx={{
              position: "absolute",
              top: "90%",
              left: "50%",
              transform: "Translate(-50%, -50%)",
            }}
          >
            <a href="" onClick={() => handlePageNumber(1)}>
              ثبت نام نکرده اید؟
            </a>
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default LoginPage;
