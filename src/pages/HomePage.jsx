import { Divider } from "@mui/material";
import CourseCards from "./components/CourseCards";
import Main_AppBar from "./components/Main_AppBar";
import SignInInfo from "./components/SignInInfo";
import MainFooter from "./components/MainFooter";

const HomePage = () => {
  return (
    <>
      <Main_AppBar />
      <SignInInfo />
      <Divider sx={{ borderColor: "gray", width: "100%" }} />
      <CourseCards />
      <MainFooter />
    </>
  );
};

export default HomePage;
