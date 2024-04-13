import {
  CopyrightRounded,
  EmailRounded,
  LanguageRounded,
  PhoneEnabledRounded,
  PlaceRounded,
} from "@mui/icons-material";
import { Avatar, Box, Container, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import AppaLoc from "../../assets/GoogleMapTA.png";
import AppaLogo from "../../assets/logo.png";

const MainFooter = () => {
  return (
    <>
      <Box
        sx={{
          height: "40vh",
          width: "100%",
          backgroundColor: "#001B48",
        }}
      >
        <Grid container sx={{ height: "100%" }}>
          <Grid xl={3} lg={3} md={3} sm={3} xs={3}>
            <Container
              sx={{
                height: "100%",
                width: "100%",
                backgroundColor: "#001B48",
                display: "inline-block",
              }}
            >
              <Typography
                variant="h6"
                sx={{ mt: "2vw", color: "white", ml: "6vw" }}
              >
                نشانی مرکز آپا دانشگاه اصفهان
              </Typography>
              <Avatar
                variant="square"
                src={AppaLogo}
                sx={{
                  width: "15vw",
                  height: "10vw",
                  top: "1vw",
                  left: "5vw",
                }}
              />
            </Container>
          </Grid>
          <Grid xl={6} lg={6} md={6} sm={6} xs={6}>
            <Container
              sx={{
                height: "100%",
                width: "100%",
                backgroundColor: "#001B48",
                display: "inline-block",
              }}
            >
              <Box sx={{ paddingTop: "4vw", paddingLeft: "5vw" }}>
                <Typography variant="h6" sx={{ color: "white", mb: "1.5vw" }}>
                  <PlaceRounded
                    sx={{ verticalAlign: "middle", fontSize: "xx-large" }}
                  />
                  {"  "}
                  آدرس: اصفهان، میدان آزادی، دانشگاه اصفهان، مرکز تخصصی آپا
                </Typography>
                <Typography variant="h6" sx={{ color: "white", mb: "1.5vw" }}>
                  <PhoneEnabledRounded
                    sx={{ verticalAlign: "middle", fontSize: "xx-large" }}
                  />
                  {"  "}
                  تلفن: 37934500-031
                </Typography>
                <Typography variant="h6" sx={{ color: "white", mb: "1.5vw" }}>
                  <EmailRounded
                    sx={{ verticalAlign: "middle", fontSize: "xx-large" }}
                  />
                  {"  "}
                  ایمیل: cert@ui.ac.ir
                </Typography>
                <Typography variant="h6" sx={{ color: "white", mb: "1.5vw" }}>
                  <LanguageRounded
                    sx={{ verticalAlign: "middle", fontSize: "xx-large" }}
                  />
                  {"  "}
                  وبگاه: cert.ui.ac.ir
                </Typography>
              </Box>
            </Container>
          </Grid>
          <Grid xl={3} lg={3} md={3} sm={3} xs={3}>
            <Container
              sx={{
                height: "100%",
                width: "100%",
                backgroundColor: "#001B48",
                display: "inline-block",
              }}
            >
              <Avatar
                variant="square"
                src={AppaLoc}
                sx={{
                  width: "17vw",
                  height: "11vw",
                  top: "3.8vw",
                  left: "1vw",
                }}
              />
            </Container>
          </Grid>
          <Divider
            variant="middle"
            sx={{
              bgcolor: "white",
              width: "90%",
              height: "1px",
              ml: "5%",
              mr: "0",
            }}
          />
          <Typography
            sx={{
              bgcolor: "#001B48",
              width: "100%",
              color: "white",
              textAlignLast: "center",
            }}
            variant="subtitle1"
          >
            <CopyrightRounded sx={{ verticalAlign: "bottom" }} />
            طراحی و تولید در مرکز آپا دانشگاه اصفهان
          </Typography>
        </Grid>
      </Box>
    </>
  );
};

export default MainFooter;
