import {
  Avatar,
  Box,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import Link from "@mui/material/Link";

const Flag = ({ name, photo, information, fid, SubmitFlag, ctf_comp_link }) => {
  return (
    <ListItem
      alignItems="flex-start"
      sx={{
        height: "35vh",
        top: "55%",
        width: "90%",
        transform: "Translate(10%,-50%)",
      }}
    >
      <ListItemAvatar sx={{ height: "16vw", width: "26vw" }}>
        <Avatar
          sx={{ borderRadius: "3%", height: "90%", width: "90%" }}
          alt={name}
          src={photo}
        />
      </ListItemAvatar>
      <ListItemText
        primary=""
        secondary={
          <React.Fragment>
            <Typography
              sx={{
                display: "block",
                fontWeight: "bold",
                mb: "2%",
              }}
              component="span"
              variant="h5"
              color="text.primary"
            >
              {name}
            </Typography>
            <Typography
              variant="h6"
              sx={{ textAlign: "justify", lineHeight: "2.5vw" }}
            >
              {information}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                display: "inline",
                position: "absolute",
                top: "70%",
              }}
            >
              <Typography color="black" variant="h6" sx={{ display: "inline" }}>
                لینک ورود به مسابقه:{" "}
              </Typography>
              <Link
                href={ctf_comp_link}
                underline="hover"
                sx={{ color: "purple" }}
              >
                {ctf_comp_link}
              </Link>
            </Typography>
          </React.Fragment>
        }
      />
      <Box sx={{ width: "30%" }}>
        <TextField
          sx={{
            position: "relative",
            width: "80%",
            right: "-2%",
            top: ".03vw",
          }}
          id={fid}
        ></TextField>
        <Button
          sx={{
            position: "absolute",
            height: "17.4%",
            borderTopLeftRadius: "0",
            borderBottomLeftRadius: "0",
            backgroundColor: "#001B48",
            color: "white",
            ":hover": { backgroundColor: "#F7AD19", color: "#001B48" },
          }}
          variant="contained"
          onClick={() => SubmitFlag(fid)}
        >
          ثبت
        </Button>
      </Box>
    </ListItem>
  );
};

export default Flag;
