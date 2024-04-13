import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box, Button, CircularProgress } from "@mui/material";
import Main_AppBar from "./components/Main_AppBar";
import Link from "@mui/material/Link";
import MainContext from "../context";
import MainFooter from "./components/MainFooter";

const WorkShopDetailPage = ({ wrkshpid }) => {
  const [is_loaded, setIsLoaded] = React.useState(false);
  const { isLogin, handlePageNumber, handleCTFNumber } =
    React.useContext(MainContext);
  const user = JSON.parse(localStorage.getItem("userData"));

  const [workShop, setWorkShop] = React.useState({});
  async function get_data(url) {
    const response = await fetch(url);
    var data = await response.json();
    return data;
  }
  async function get_loggedIn_data(url) {
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

  const fetchData = () => {
    if (!isLogin) {
      setIsLoaded(false);
      const homePageData = get_data(
        "https://ctf-apa-backend.onrender.com/api/pages/get_home/"
      );

      homePageData.then((data) => {
        data["active_workshops"].map((w) => {
          if (w.id == wrkshpid) {
            setWorkShop(w);
            setIsLoaded(true);
          }
        });
      });
    } else if (isLogin) {
      setIsLoaded(false);
      const homePageData = get_loggedIn_data(
        "https://ctf-apa-backend.onrender.com/api/pages/get_home/"
      );

      homePageData.then((data) => {
        data["active_workshops"].map((w) => {
          if (w.id == wrkshpid) {
            setWorkShop(w);
            console.log(w);
            setIsLoaded(true);
          }
        });
      });
    }
  };
  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Main_AppBar />
      {is_loaded ? (
        <List
          sx={{
            width: "100vw",
            maxWidth: "100vw",
            height: "70vh",
            bgcolor: "background-paper",
            top: "50%",
            left: "45%",
            transform: "Translate(-50%,-50%)",
          }}
        >
          <ListItem
            alignItems="flex-start"
            sx={{
              height: "35vh",
              top: "55%",
              width: "90%",
              transform: "Translate(10%,-50%)",
            }}
          >
            <ListItemAvatar sx={{ height: "100%", width: "30%" }}>
              <Avatar
                sx={{ borderRadius: "3%", height: "90%", width: "90%" }}
                alt={workShop.title}
                src={workShop.photo}
              />
            </ListItemAvatar>
            {isLogin ? (
              <ListItemText
                primary=""
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "block", fontWeight: "bold", mb: "2%" }}
                      component="span"
                      variant="h5"
                      color="text.primary"
                    >
                      {workShop.title}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ textAlign: "justify", lineHeight: "2.5vw" }}
                    >
                      {workShop.description}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        position: "absolute",
                        top: "100%",
                        left: "50%",
                        transform: "translate(100%,-50%)",
                        mt: "2%",
                        backgroundColor: "#001B48",
                        color: "white",
                        ":hover": {
                          backgroundColor: "#F7AD19",
                          color: "#001B48",
                        },
                      }}
                      disabled={!isLogin}
                      onClick={() => {
                        handleCTFNumber(workShop["ctf_competition"].id);
                        handlePageNumber(6);
                      }}
                    >
                      ورود به مسابقه
                    </Button>
                    <Typography
                      variant="h6"
                      sx={{
                        display: "inline",
                        position: "absolute",
                        top: "80%",
                      }}
                    >
                      <Typography
                        color="black"
                        variant="h6"
                        sx={{ display: "inline" }}
                      >
                        لینک ورود به کارگاه:{" "}
                      </Typography>
                      <Link
                        href={workShop.workshop_link}
                        underline="hover"
                        sx={{ color: "purple" }}
                      >
                        {workShop.workshop_link}
                      </Link>
                    </Typography>
                  </React.Fragment>
                }
              />
            ) : (
              <ListItemText
                primary=""
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "block", fontWeight: "bold", mb: "2%" }}
                      component="span"
                      variant="h5"
                      color="text.primary"
                    >
                      {workShop.title}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ textAlign: "justify", lineHeight: "2.5vw" }}
                    >
                      {workShop.description}
                    </Typography>
                    <a href="https://google.com" target="_blank">
                      <Button
                        variant="contained"
                        sx={{
                          left: "50%",
                          mt: "2%",
                          backgroundColor: "#001B48",
                          color: "white",
                          ":hover": {
                            backgroundColor: "#F7AD19",
                            color: "#001B48",
                          },
                        }}
                        disabled={isLogin}
                      >
                        ثبت نام
                      </Button>
                    </a>
                  </React.Fragment>
                }
              />
            )}
          </ListItem>
        </List>
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
          top: "95vh",
          position: "absolute",
        }}
      >
        <MainFooter />
      </Box>
    </>
  );
};

export default WorkShopDetailPage;
