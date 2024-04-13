import * as React from "react";
import List from "@mui/material/List";
import { Box, CircularProgress } from "@mui/material";
import Main_AppBar from "./components/Main_AppBar";
import MainFooter from "./components/MainFooter";
import MainContext from "../context";
import { ToastContainer, toast } from "react-toastify";
import Flag from "./components/Flag";
import "react-toastify/dist/ReactToastify.css";

const FlagsPage = () => {
  const { CTFNumber } = React.useContext(MainContext);
  const [is_loaded, setIsLoaded] = React.useState(true);
  const user = JSON.parse(localStorage.getItem("userData"));
  async function get_data(url) {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    var data = await response.json();
    return data;
  }
  const fetchData = () => {
    const ctf_Data = get_data(
      `https://ctf-apa-backend.onrender.com/api/ctfs/get_ctf/${CTFNumber}/`
    );
    ctf_Data.then((data) => {
      console.log(data);
    });
  };
  const ctf1_data = [
    {
      name: "سطح اول",
      information: "توضیحات سطح اول",
      photo: "",
      id: "1",
      link: "ctf1.link1.com",
    },
    {
      name: "سطح دوم",
      information: "توضیحات سطح دوم",
      photo: "",
      id: "2",
      link: "ctf1.link2.com",
    },
    {
      name: "سطح سوم",
      information: "توضیحات سطح سوم",
      photo: "",
      id: "3",
      link: "ctf1.link3.com",
    },
  ];
  const ctf2_data = [
    {
      name: "سطح اول",
      information: "توضیحات سطح اول",
      photo: "",
      id: "1",
      link: "ctf2.link1.com",
    },
    {
      name: "سطح دوم",
      information: "توضیحات سطح دوم",
      photo: "",
      id: "2",
      link: "ctf2.link2.com",
    },
    {
      name: "سطح سوم",
      information: "توضیحات سطح سوم",
      photo: "",
      id: "3",
      link: "ctf2.link3.com",
    },
  ];
  const ctf3_data = [
    {
      name: "سطح اول",
      information: "توضیحات سطح اول",
      photo: "",
      id: "1",
      link: "ctf3.link1.com",
    },
    {
      name: "سطح دوم",
      information: "توضیحات سطح دوم",
      photo: "",
      id: "2",
      link: "ctf3.link2.com",
    },
    {
      name: "سطح سوم",
      information: "توضیحات سطح سوم",
      photo: "",
      id: "3",
      link: "ctf3.link3.com",
    },
  ];
  async function post_flag(url, input) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + user.access_token,
      },
      body: JSON.stringify(input),
    });
    var data = await response.json();
    return data;
  }

  const SubmitFlag = (id) => {
    const flag = document.getElementById(id).value;
    if (flag) {
      let input = {
        ctf_comp_id: CTFNumber,
      };
      if (id == 1) {
        input = { ...input, flag1: flag };
      } else if (id == 2) {
        input = { ...input, flag2: flag };
      } else if (id == 3) {
        input = { ...input, flag3: flag };
      }
      setIsLoaded(false);
      const flags_status = post_flag(
        "https://ctf-apa-backend.onrender.com/api/ctfs/submit_flag/",
        input
      );
      if (id == 1) {
        flags_status.then((flags) => {
          setIsLoaded(true);
          if (flags["is_done1"]) {
            toast.success("فلگ سطح اول شما با موفقیت ثبت گردید.");
            document.getElementById(id).value = "";
          } else {
            toast.error("فلگ وارد شده اشتباه می باشد.");
          }
        });
      } else if (id == 2) {
        flags_status.then((flags) => {
          setIsLoaded(true);
          if (flags["is_done2"]) {
            toast.success("فلگ سطح دوم شما با موفقیت ثبت گردید.");
            document.getElementById(id).value = "";
          } else {
            toast.error("فلگ وارد شده اشتباه می باشد.");
          }
        });
      } else if (id == 3) {
        flags_status.then((flags) => {
          setIsLoaded(true);
          if (flags["is_done3"]) {
            toast.success("فلگ سطح سوم شما با موفقیت ثبت گردید.");
            document.getElementById(id).value = "";
          } else {
            toast.error("فلگ وارد شده اشتباه می باشد.");
          }
        });
      }
    } else {
      toast.error("محتوای فلگ نمی تواند خالی باشد!");
    }
  };

  return (
    <>
      <Main_AppBar />
      <ToastContainer
        position="top-right"
        rtl
        closeOnClick
        pauseOnHover
        theme="colored"
      />
      <List
        sx={{
          width: "100vw",
          maxWidth: "100vw",
          height: "70vh",
          bgcolor: "background-paper",
          top: "30%",
          left: "45%",
          transform: "Translate(-50%,-50%)",
        }}
      >
        {is_loaded ? (
          <>
            {CTFNumber == 1 ? (
              <>
                <Flag
                  name={ctf1_data[0].name}
                  information={ctf1_data[0].information}
                  photo={ctf1_data[0].photo}
                  fid={ctf1_data[0].id}
                  SubmitFlag={SubmitFlag}
                  ctf_comp_link={ctf1_data[0].link}
                />
                <Flag
                  name={ctf1_data[1].name}
                  information={ctf1_data[1].information}
                  photo={ctf1_data[1].photo}
                  fid={ctf1_data[1].id}
                  SubmitFlag={SubmitFlag}
                  ctf_comp_link={ctf1_data[1].link}
                />
                <Flag
                  name={ctf1_data[2].name}
                  information={ctf1_data[2].information}
                  photo={ctf1_data[2].photo}
                  fid={ctf1_data[2].id}
                  SubmitFlag={SubmitFlag}
                  ctf_comp_link={ctf1_data[2].link}
                />
              </>
            ) : null}
            {CTFNumber == 2 ? (
              <>
                <Flag
                  name={ctf2_data[0].name}
                  information={ctf2_data[0].information}
                  photo={ctf2_data[0].photo}
                  fid={ctf2_data[0].id}
                  SubmitFlag={SubmitFlag}
                  ctf_comp_link={ctf2_data[0].link}
                />
                <Flag
                  name={ctf2_data[1].name}
                  information={ctf2_data[1].information}
                  photo={ctf2_data[1].photo}
                  fid={ctf2_data[1].id}
                  SubmitFlag={SubmitFlag}
                  ctf_comp_link={ctf2_data[1].link}
                />
                <Flag
                  name={ctf2_data[2].name}
                  information={ctf2_data[2].information}
                  photo={ctf2_data[2].photo}
                  fid={ctf2_data[2].id}
                  SubmitFlag={SubmitFlag}
                  ctf_comp_link={ctf2_data[2].link}
                />
              </>
            ) : null}
            {CTFNumber == 3 ? (
              <>
                <Flag
                  name={ctf3_data[0].name}
                  information={ctf3_data[0].information}
                  photo={ctf3_data[0].photo}
                  fid={ctf3_data[0].id}
                  SubmitFlag={SubmitFlag}
                  ctf_comp_link={ctf3_data[0].link}
                />
                <Flag
                  name={ctf3_data[1].name}
                  information={ctf3_data[1].information}
                  photo={ctf3_data[1].photo}
                  fid={ctf3_data[1].id}
                  SubmitFlag={SubmitFlag}
                  ctf_comp_link={ctf3_data[1].link}
                />
                <Flag
                  name={ctf3_data[2].name}
                  information={ctf3_data[2].information}
                  photo={ctf3_data[2].photo}
                  fid={ctf3_data[2].id}
                  SubmitFlag={SubmitFlag}
                  ctf_comp_link={ctf3_data[2].link}
                />
              </>
            ) : null}
          </>
        ) : (
          <CircularProgress
            sx={{
              position: "absolute",
              top: "60%",
              left: "55%",
              color: "#001B48",
            }}
          />
        )}
      </List>
      <Box
        sx={{
          bgcolor: "red",
          height: "40vh",
          width: "100%",
          top: "130vh",
          position: "absolute",
        }}
      >
        <MainFooter />
      </Box>
    </>
  );
};

export default FlagsPage;
