import * as React from "react";
import Main_AppBar from "./components/Main_AppBar";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Typography,
} from "@mui/material";
import MainFooter from "./components/MainFooter";
import MainContext from "../context";

const RulesPage = () => {
  const [accRules, setAccRules] = React.useState(false);
  const { handlePageNumber } = React.useContext(MainContext);
  const handleSendSelection = (event) => {
    setAccRules(event.target.checked);
  };
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#77d177",
          width: "100%",
          maxWidth: "100%",
        }}
      >
        <Main_AppBar />
        <Container
          sx={{
            position: "absolute",
            height: "55vh",
            width: "90vw",
            top: "55%",
            left: "50%",
            transform: "Translate(-50%,-50%)",
            backgroundColor: "lightcyan",
            borderRadius: "15px",
          }}
        >
          <Typography variant="h4" sx={{ textAlignLast: "center", mt: "2vw" }}>
            قوانین و مقررات
          </Typography>
          <Typography
            variant="h5"
            sx={{ textAlignLast: "left", mt: "2vw", textAlign: "justify" }}
          >
            ۱- احراز هویت برای شرکت در مسابقه ضروری بوده و شرکت کنندگان موظفند
            اطلاعات صحیح خود را وارد نمایند. در صورت وجود هرگونه عدم تطابق در
            اطلاعات وارد شده، فرد متخلف از دریافت مدرک و جایزه محروم خواهد شد.
          </Typography>
          <Typography
            variant="h5"
            sx={{ textAlignLast: "left", mt: "2vw", textAlign: "justify" }}
          >
            ۲- اشتراک گذاری پرچم (فلگ) تخلف محسوب می شود و منجر به منع موقت
            دسترسی به چالش های مسابقه خواهد شد.
          </Typography>
          <Typography
            variant="h5"
            sx={{ textAlignLast: "left", mt: "2vw", textAlign: "justify" }}
          >
            ۳- هرگونه اسکن و تلاش جهت حمله به زیرساخت مسابقه منجر به محرومیت از
            شرکت در مسابقه خواهد شد (چنانچه تخلف یاد شده از سمت هر یک از اعضای
            تیم رخ دهد، این محرومیت مشمول سایر اعضا نیز خواهد بود).
          </Typography>
          <FormControlLabel
            sx={{ mt: "3vw", color: "red" }}
            control={
              <Checkbox
                color="success"
                size="medium"
                sx={{ color: "lightblue" }}
                onClick={(e) => handleSendSelection(e)}
              />
            }
            label="قوانین و مقررات فوق را قبول دارم."
          />
          <Button
            variant="contained"
            sx={{
              left: "30%",
              mt: "4%",
              backgroundColor: "#001B48",
              color: "white",
              ":hover": {
                backgroundColor: "#F7AD19",
                color: "#001B48",
              },
            }}
            disabled={!accRules}
            onClick={() => handlePageNumber(7)}
          >
            ورود به مسابقه
          </Button>
        </Container>
        <Box
          sx={{
            bgcolor: "red",
            height: "40vh",
            width: "100%",
            top: "100vh",
            position: "absolute",
          }}
        >
          <MainFooter />
        </Box>
      </Box>
    </>
  );
};

export default RulesPage;
