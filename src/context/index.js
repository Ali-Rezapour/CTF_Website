import { createContext } from "react";

export default  createContext({
    pageNumber: 1,
    wShNumber:1,
    CTFNumber:1,
    isLogin:false,
    handlePageNumber: () => {},
    handleThemeChange: () => {},
    handleWorkShopNumber: () => {},
    handleCTFNumber: () => {},
    handleIsLogin: () => {},
});
