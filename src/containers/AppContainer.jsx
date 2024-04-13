import { useEffect, useState } from "react";

import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import MainLayout from "../layouts/MainLayout";
import MainContext from "../context";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import ScoresPage from "../pages/ScoresPage";
import WorkShopDetailPage from "../pages/WorkShopDetailPage";
import FlagsPage from "../pages/FlagsPage";
import RulesPage from "../pages/RulesPage";

function AppContainer() {
  const [pageNumber, setPageNumber] = useState(1);
  const [wShNumber, setWShNumber] = useState(1);
  const [CTFNumber, setCTFNumber] = useState(1);
  const [isLogin, setIsLogin] = useState(false);
  const [mode, setMode] = useState();

  const theme = useTheme();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
    setMode(prefersDarkMode ? "dark" : "light");
  }, []);

  const handlePageNumber = (Pagenum) => {
    setPageNumber(Pagenum);
  };
  const handleWorkShopNumber = (WShnum) => {
    setWShNumber(WShnum);
  };
  const handleCTFNumber = (ctfnum) => {
    setCTFNumber(ctfnum);
  };
  const handleIsLogin = (is_Login) => {
    setIsLogin(is_Login);
  };

  const handleThemeChange = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <MainContext.Provider
      value={{
        pageNumber,
        wShNumber,
        CTFNumber,
        isLogin,
        handlePageNumber,
        handleThemeChange,
        handleWorkShopNumber,
        handleCTFNumber,
        handleIsLogin,
      }}
    >
      <MainLayout mode={mode}>
        {pageNumber == 1 ? <HomePage /> : null}
        {pageNumber == 2 ? <LoginPage /> : null}
        {pageNumber == 3 ? <ProfilePage /> : null}
        {pageNumber == 4 ? <ScoresPage /> : null}
        {pageNumber == 5 ? <WorkShopDetailPage wrkshpid={wShNumber} /> : null}
        {pageNumber == 6 ? <RulesPage /> : null}
        {pageNumber == 7 ? <FlagsPage /> : null}
      </MainLayout>
    </MainContext.Provider>
  );
}

export default AppContainer;
