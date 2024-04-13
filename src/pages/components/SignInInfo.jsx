import { Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import MainContext from "../../context";

const SignInInfo = () => {
  const { isLogin } = useContext(MainContext);
  return (
    <Box sx={{ backgroundColor: "whitesmoke", height: "73vh", width: "100vw" }}>
      <Box
        sx={{
          position: "absolute",
          height: "25vh",
          width: "75vw",
          top: "50%",
          right: "50%",
          transform: "translate(50%, -120%)",
          display: "grid",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: "2%" }}>
          توضیحات ثبت نام
        </Typography>
        <Typography
          variant="body1"
          sx={{ textAlign: "justify", fontSize: "1.2rem", lineHeight: "3.4vw" }}
        >
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
          ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و
          کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی
          در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می
          طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی
          الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این
          صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و
          شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای
          اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده
          قرار گیرد.
        </Typography>
        <a href="https://google.com" target="_blank">
          <Button
            variant="contained"
            sx={{
              mt: "5%",
              height: "fit-content",
              width: "fit-content",
              left: "50%",
              backgroundColor: "#001B48",
              color: "white",
              ":hover": { backgroundColor: "#F7AD19", color: "#001B48" },
            }}
            disabled={isLogin}
            size="large"
          >
            ثبت نام
          </Button>
        </a>
      </Box>
    </Box>
  );
};

export default SignInInfo;
