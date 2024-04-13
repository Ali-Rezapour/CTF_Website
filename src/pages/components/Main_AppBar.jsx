import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { EmojiEventsRounded, HomeRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import MainContext from "../../context";
import Logo from "../../assets/logo-3.png";
import ProfileImg from "../../assets/blank-profile-picture-png.png";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

function Main_AppBar() {
  const { handlePageNumber, isLogin, handleIsLogin } =
    React.useContext(MainContext);
  const [fullName, setFullName] = React.useState("نام و نام خانوادگی");
  const [profileImage, setProfileImage] = React.useState(ProfileImg);

  const user = JSON.parse(localStorage.getItem("userData"));
  const get_user_data = () => {
    if (user) {
      handleIsLogin(true);
    }
    if (user) {
      if (user.name) {
        setFullName(user.name + " " + user.family);
      }
      if (user.photo) {
        setProfileImage(user.photo);
      }
    }
  };
  React.useEffect(() => {
    get_user_data();
  }, []);
  return (
    <AppBar
      position="absolute"
      sx={{ height: "4.5vw", backgroundColor: "#001B48" }}
    >
      <Container sx={{ width: "100%", height: "100%" }}>
        <Toolbar disableGutters sx={{ height: "100%" }}>
          <Grid
            sx={{ width: "100%", height: "100%" }}
            container
            columns={{ xl: "24" }}
          >
            <Grid
              xl={16}
              lg={8}
              md={8}
              sm={8}
              xs={8}
              sx={{
                padding: "0",
                paddingLeft: "3%",
                margin: "0",
                alignSelf: "center",
                height: "100%",
              }}
            >
              <Box sx={{ height: "100%" }}>
                <Tooltip title="مرکز آپا دانشگاه اصفهان">
                  <IconButton
                    sx={{
                      p: 0,
                      height: "4.5vw",
                      width: "4.5vw",
                    }}
                  >
                    <Avatar
                      src={Logo}
                      sx={{
                        height: "3.5vw",
                        width: "3.5vw",
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </Box>
            </Grid>
            <Grid
              sx={{
                padding: "0",
                margin: "0",
                alignSelf: "center",
                height: "100%",
              }}
              xl={2}
              lg={1}
              md={1}
              sm={1}
              xs={1}
            >
              <Box sx={{ height: "100%" }}>
                <Tooltip
                  title="صفحه اصلی"
                  onClick={() => {
                    handlePageNumber(1);
                  }}
                  sx={{ height: "100%" }}
                >
                  <IconButton
                    sx={{
                      p: 0,
                      height: "4.5vw",
                      width: "4.5vw",
                      ":hover": { backgroundColor: "#19325d" },
                    }}
                  >
                    <HomeRounded
                      sx={{ color: "whitesmoke", width: "3vw", height: "3vw" }}
                    />
                  </IconButton>
                </Tooltip>
              </Box>
            </Grid>
            <Grid
              sx={{
                padding: "0",
                margin: "0",
                alignSelf: "center",
                height: "100%",
              }}
              xl={2}
              lg={1}
              md={1}
              sm={1}
              xs={1}
            >
              <Box sx={{ ml: "1%", mr: "3%", height: "100%" }}>
                <Tooltip
                  title="امتیازات"
                  onClick={() => {
                    handlePageNumber(4);
                  }}
                >
                  <IconButton
                    sx={{
                      p: 0,
                      height: "4.5vw",
                      width: "4.5vw",
                      ":hover": { backgroundColor: "#19325d" },
                    }}
                  >
                    <EmojiEventsRounded
                      sx={{ color: "whitesmoke", width: "3vw", height: "3vw" }}
                    />
                  </IconButton>
                </Tooltip>
              </Box>
            </Grid>
            <Grid
              sx={{
                padding: "0",
                margin: "0",
                alignSelf: "center",
                height: "100%",
              }}
              xl={4}
              lg={2}
              md={2}
              sm={2}
              xs={2}
            >
              {isLogin ? (
                <Box sx={{ height: "100%" }}>
                  <Tooltip
                    title="حساب کاربری"
                    onClick={() => {
                      handlePageNumber(3);
                    }}
                  >
                    <IconButton
                      sx={{
                        p: 0,
                        height: "4.5vw",
                        width: "4.5vw",
                      }}
                    >
                      <Box
                        sx={{ border: "solid #04fa04", borderRadius: "50%" }}
                      >
                        <Avatar
                          alt={fullName}
                          src={profileImage}
                          sx={{ height: "3vw", width: "3vw" }}
                        />
                      </Box>
                    </IconButton>
                  </Tooltip>
                  <Typography
                    variant="body1"
                    sx={{
                      display: "inline-block",
                      width: "max-content",
                      color: "white",
                      fontSize: "1vw",
                    }}
                  >
                    {fullName}
                  </Typography>
                </Box>
              ) : (
                <Box>
                  <Tooltip
                    title="ورود"
                    onClick={() => {
                      handlePageNumber(2);
                    }}
                  >
                    <IconButton
                      sx={{
                        p: 0,
                        height: "4.5vw",
                        width: "4.5vw",
                        ":hover": { backgroundColor: "#001B48" },
                      }}
                    >
                      <Button
                        color="warning"
                        variant="contained"
                        sx={{
                          borderColor: "white",
                          color: "white",
                          height: "2.5vw",
                          width: "4vw",
                        }}
                      >
                        ورود
                      </Button>
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Main_AppBar;
