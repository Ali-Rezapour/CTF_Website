import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Profileimage from "../assets/blank-profile-picture-png.png";
import { KeyboardArrowLeft, PhotoCamera } from "@mui/icons-material";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import { useContext, useEffect, useState } from "react";
import Main_AppBar from "./components/Main_AppBar";
import MainContext from "../context";
import MainFooter from "./components/MainFooter";

const ProfilePage = () => {
  const { handlePageNumber, handleIsLogin } = useContext(MainContext);
  let [editFirstName, setEditFirstName] = useState(false);
  let [editLastName, setEditLastName] = useState(false);
  let [editPhone, setEditPhone] = useState(false);
  let [is_loaded, setIsLoaded] = useState(false);
  const [firstName, setFirstName] = useState("نام");
  const [lastName, setLastName] = useState("نام خانوادگی");
  const [phoneNumber, setPhoneNumber] = useState("۰۹*********");
  const [u_email, setEmail] = useState("email@email.com");
  const [u_score, setScore] = useState(0);
  const [profile_image, setProfileImage] = useState(Profileimage);
  const user = JSON.parse(localStorage.getItem("userData"));
  async function edit_data(url, input) {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + user.access_token,
      },
      body: JSON.stringify(input),
    });
    var data = await response.json();
    return data;
  }
  async function get_data(url) {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + user.access_token,
      },
    });
    var data = await response.json();
    return data;
  }
  const EditFName = () => {
    setEditFirstName(false);
    let fname = document.getElementById("fname").value;
    setIsLoaded(false);
    edit_data(
      "https://ctf-apa-backend.onrender.com/api/users/update_profile/",
      { name: fname }
    ).then(() => {
      const updated_data = { ...user, name: fname };
      localStorage.setItem("userData", JSON.stringify(updated_data));
    });
    setFirstName(fname);
    setIsLoaded(true);
  };
  const EditLName = () => {
    setEditLastName(false);
    let lname = document.getElementById("lname").value;
    setIsLoaded(false);
    edit_data(
      "https://ctf-apa-backend.onrender.com/api/users/update_profile/",
      { family: lname }
    ).then(() => {
      const updated_data = { ...user, family: lname };
      localStorage.setItem("userData", JSON.stringify(updated_data));
    });
    setLastName(lname);
    setIsLoaded(true);
  };
  const EditPhone = () => {
    setEditPhone(false);
    let phone = document.getElementById("phone").value;
    setIsLoaded(false);
    edit_data(
      "https://ctf-apa-backend.onrender.com/api/users/update_profile/",
      { phone_number: phone }
    ).then(() => {
      const updated_data = { ...user, phone_number: phone };
      localStorage.setItem("userData", JSON.stringify(updated_data));
    });
    setPhoneNumber(phone);
    setIsLoaded(true);
  };
  const EditProfileImage = () => {
    let image = document.getElementById("icon-button-photo").files[0];
    let reader = new FileReader();
    reader.onloadend = function () {
      setProfileImage(reader.result);
      setIsLoaded(false);
      edit_data(
        "https://ctf-apa-backend.onrender.com/api/users/update_profile/",
        { photo: reader.result }
      ).then(() => {
        const updated_data = { ...user, photo: reader.result };
        localStorage.setItem("userData", JSON.stringify(updated_data));
        setIsLoaded(true);
      });
    };
    reader.readAsDataURL(image);
  };
  const get_user_data = () => {
    setIsLoaded(false);
    let score_data = get_data(
      "https://ctf-apa-backend.onrender.com/api/scoreboards/get_scoreboard/"
    );

    score_data.then((sd) => {
      sd["users"].map((user) => {
        if (user.is_you) {
          setScore(user.total_points);
          setIsLoaded(true);
        }
      });
    });
    if (user.name) {
      setFirstName(user.name);
    }
    if (user.family) {
      setLastName(user.family);
    }
    if (user.email) {
      setEmail(user.email);
    }
    if (user.phone_number) {
      setPhoneNumber(user.phone_number);
    }
    if (user.photo) {
      setProfileImage(user.photo);
    }
  };
  const log_out = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("Access_token");
    handleIsLogin(false);
    handlePageNumber(2);
  };
  useEffect(() => {
    get_user_data();
  }, []);
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#f97d7d",
          width: "100%",
          maxWidth: "100%",
        }}
      >
        <Main_AppBar />
        {is_loaded ? (
          <Container
            sx={{
              position: "absolute",
              height: "60vh",
              width: "80vw",
              top: "50%",
              left: "50%",
              transform: "Translate(-50%,-50%)",
              backgroundColor: "lightcyan",
              borderRadius: "15px",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                left: "80%",
                top: "5%",
              }}
            >
              <Typography>
                {"  "}
                <Typography sx={{ display: "inline" }}>{u_score}</Typography>
                {"      "}
                :امتیاز کل
                <EmojiEventsOutlinedIcon
                  sx={{ verticalAlign: "bottom" }}
                  fontSize="large"
                />
              </Typography>
            </Box>
            <Avatar
              id="profImage"
              src={profile_image}
              sx={{
                position: "absolute",
                height: "14vw",
                width: "14vw",
                top: "40%",
                left: "12%",
                transform: "Translate(-50%,-50%)",
                backgroundColor: "blue",
              }}
            />
            <Button
              variant="outlined"
              color="primary"
              sx={{
                position: "absolute",
                top: "72%",
                left: "11.8%",
                transform: "Translate(-50%,-50%)",
                fontSize: "1rem",
                padding: "0",
              }}
              type="file"
            >
              <input
                accept="image/*"
                id="icon-button-photo"
                type="file"
                hidden
                onChange={EditProfileImage}
              />
              <label htmlFor="icon-button-photo">
                <IconButton
                  component="span"
                  sx={{
                    fontSize: "small",
                    color: "green",
                    borderRadius: "0",
                  }}
                >
                  ویرایش عکس
                  <PhotoCamera />
                </IconButton>
              </label>
            </Button>
            <Box
              sx={{
                backgroundColor: "white",
                position: "absolute",
                width: "50vw",
                height: "20vw",
                top: "50%",
                left: "60%",
                transform: "Translate(-50%,-50%)",
                borderRadius: "2%",
              }}
            >
              <Container sx={{ backgroundColor: "white", mt: "5%" }}>
                <KeyboardArrowLeft
                  fontSize="large"
                  sx={{ verticalAlign: "bottom" }}
                />
                <Typography sx={{ display: "inline", m: ".5vw" }}>
                  نام:
                </Typography>
                {editFirstName ? (
                  <>
                    <TextField
                      style={{
                        display: "inline-block",
                        width: "20vw",
                        border: "none",
                        height: "1vw",
                      }}
                      size="small"
                      fullWidth
                      id="fname"
                    />
                    <Button
                      variant="contained"
                      color="success"
                      onClick={EditFName}
                    >
                      ویرایش
                    </Button>
                  </>
                ) : (
                  <>
                    <Typography sx={{ display: "inline", m: ".5vw" }}>
                      {firstName}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="info"
                      sx={{ ml: "2%" }}
                      onClick={() => setEditFirstName(true)}
                    >
                      ویرایش
                    </Button>
                  </>
                )}
              </Container>

              <Container sx={{ backgroundColor: "white", mt: "5%" }}>
                <KeyboardArrowLeft
                  fontSize="large"
                  sx={{ verticalAlign: "bottom" }}
                />
                <Typography sx={{ display: "inline", m: ".5vw" }}>
                  نام خانوادگی:
                </Typography>
                {editLastName ? (
                  <>
                    <TextField
                      style={{
                        display: "inline-block",
                        width: "20vw",
                        border: "none",
                        height: "1vw",
                      }}
                      size="small"
                      fullWidth
                      id="lname"
                    />
                    <Button
                      variant="contained"
                      color="success"
                      onClick={EditLName}
                    >
                      ویرایش
                    </Button>
                  </>
                ) : (
                  <>
                    <Typography sx={{ display: "inline", m: ".5vw" }}>
                      {lastName}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="info"
                      sx={{ ml: "2%" }}
                      onClick={() => setEditLastName(true)}
                    >
                      ویرایش
                    </Button>
                  </>
                )}
              </Container>

              <Container sx={{ backgroundColor: "white", mt: "5%" }}>
                <KeyboardArrowLeft
                  fontSize="large"
                  sx={{ verticalAlign: "bottom" }}
                />
                <Typography sx={{ display: "inline", m: ".5vw" }}>
                  شماره تماس:
                </Typography>
                {editPhone ? (
                  <>
                    <TextField
                      style={{
                        display: "inline-block",
                        width: "20vw",
                        border: "none",
                        height: "1vw",
                      }}
                      size="small"
                      fullWidth
                      id="phone"
                    />
                    <Button
                      variant="contained"
                      color="success"
                      onClick={EditPhone}
                    >
                      ویرایش
                    </Button>
                  </>
                ) : (
                  <>
                    <Typography sx={{ display: "inline", m: ".5vw" }}>
                      {phoneNumber}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="info"
                      sx={{ ml: "2%" }}
                      onClick={() => setEditPhone(true)}
                    >
                      ویرایش
                    </Button>
                  </>
                )}
              </Container>

              <Container sx={{ backgroundColor: "white", mt: "5%" }}>
                <KeyboardArrowLeft
                  fontSize="large"
                  sx={{ verticalAlign: "bottom" }}
                />
                <Typography sx={{ display: "inline", m: ".5vw" }}>
                  ایمیل:
                </Typography>
                <Typography sx={{ display: "inline", m: ".5vw" }}>
                  {u_email}
                </Typography>
              </Container>
            </Box>
            <Button
              color="error"
              variant="contained"
              sx={{
                position: "absolute",
                top: "93%",
                left: "58%",
                transform: "Translate(-50%,-50%)",
                fontSize: "1rem",
                width: "10vw",
              }}
              onClick={log_out}
            >
              خروج از حساب
            </Button>
          </Container>
        ) : (
          <CircularProgress
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              color: "#001B48",
            }}
          />
        )}
        <Box
          sx={{
            bgcolor: "red",
            height: "40vh",
            width: "100%",
            top: "90vh",
            position: "absolute",
          }}
        >
          <MainFooter />
        </Box>
      </Box>
    </>
  );
};

export default ProfilePage;
