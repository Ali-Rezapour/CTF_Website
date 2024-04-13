import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Main_AppBar from "./components/Main_AppBar";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import MainFooter from "./components/MainFooter";
import MainContext from "../context";

const ScoresPage = () => {
  const [data, setData] = React.useState();
  const [is_loaded, setIsLoaded] = React.useState(false);
  const { handlePageNumber } = React.useContext(MainContext);
  function createData(
    fullName,
    score_ctf1,
    score_ctf2,
    score_ctf3,
    total_score,
    is_you
  ) {
    return {
      fullName,
      score_ctf1,
      score_ctf2,
      score_ctf3,
      total_score,
      is_you,
    };
  }
  const user = JSON.parse(localStorage.getItem("userData"));
  async function get_data(url) {
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
  React.useEffect(() => {
    setIsLoaded(false);
    let data = get_data(
      "https://ctf-apa-backend.onrender.com/api/scoreboards/get_scoreboard/"
    );
    data.then((d) => {
      setData(d["users"]);
      setIsLoaded(true);
    });
  }, []);
  let rows = [];
  if (data) {
    for (let d in data) {
      let ctfs = [];
      for (let i in data[d]["competitions"]) {
        ctfs.push(data[d]["competitions"][i]);
      }
      rows.push(
        createData(
          data[d].name + " " + data[d].family,
          ctfs[0],
          ctfs[1],
          ctfs[2],
          data[d].total_points,
          data[d].is_you
        )
      );
    }
    for (let i in rows) {
      for (let j in rows) {
        if (rows[i].total_score > rows[j].total_score) {
          let tmp = rows[i];
          rows[i] = rows[j];
          rows[j] = tmp;
        }
      }
    }
  }
  return (
    <>
      <Box
        sx={{
          backgroundColor: "orange",
          width: "100%",
          maxWidth: "100%",
        }}
      >
        <Main_AppBar />
        {is_loaded ? (
          <Container
            sx={{
              position: "absolute",
              height: "80vh",
              width: "90vw",
              top: "55%",
              left: "50%",
              transform: "Translate(-50%,-50%)",
              backgroundColor: "lightcyan",
              borderRadius: "15px",
            }}
          >
            {user ? (
              <TableContainer
                component={Paper}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "90%",
                  transform: "Translate(-50%,-50%)",
                }}
              >
                <Table
                  sx={{ minWidth: 650 }}
                  size="medium"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography
                          sx={{ fontWeight: "600" }}
                          variant="subtitle1"
                        >
                          نام و نام خانوادگی
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{ fontWeight: "600" }}
                          variant="subtitle1"
                        >
                          امتیاز مسابقه اول
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{ fontWeight: "600" }}
                          variant="subtitle1"
                        >
                          امتیاز مسابقه دوم
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{ fontWeight: "600" }}
                          variant="subtitle1"
                        >
                          امتیاز مسابقه سوم
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          sx={{ fontWeight: "600" }}
                          variant="subtitle1"
                        >
                          امتیاز کل
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.fullName}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          bgcolor: row.is_you ? "#001B48" : "inherit",
                        }}
                      >
                        <TableCell
                          sx={{ color: row.is_you ? "white" : "inherit" }}
                          component="th"
                          scope="row"
                        >
                          {row.fullName != " " && row.fullName
                            ? row.fullName
                            : "نامعلوم"}
                        </TableCell>
                        <TableCell
                          sx={{ color: row.is_you ? "white" : "inherit" }}
                          component="th"
                          scope="row"
                        >
                          {row.score_ctf1 ? row.score_ctf1 : "نامشخص"}
                        </TableCell>
                        <TableCell
                          sx={{ color: row.is_you ? "white" : "inherit" }}
                          component="th"
                          scope="row"
                        >
                          {row.score_ctf2 ? row.score_ctf2 : "نامشخص"}
                        </TableCell>
                        <TableCell
                          sx={{ color: row.is_you ? "white" : "inherit" }}
                          component="th"
                          scope="row"
                        >
                          {row.score_ctf3 ? row.score_ctf3 : "نامشخص"}
                        </TableCell>
                        <TableCell
                          sx={{ color: row.is_you ? "white" : "inherit" }}
                          align="right"
                          component="th"
                          scope="row"
                        >
                          {row.total_score}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <>
                <Typography
                  variant="h4"
                  sx={{
                    top: "50%",
                    position: "absolute",
                    right: "50%",
                    transform: "translate(50%,-50%)",
                  }}
                >
                  برای مشاهده ی جدول امتیازات وارد شوید.
                </Typography>
                <Button
                  sx={{
                    top: "60%",
                    position: "absolute",
                    right: "50%",
                    transform: "translate(50%,-50%)",
                    backgroundColor: "#001B48",
                    color: "white",
                    ":hover": { backgroundColor: "#F7AD19", color: "#001B48" },
                  }}
                  onClick={() => handlePageNumber(2)}
                >
                  ورود
                </Button>
              </>
            )}
          </Container>
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

export default ScoresPage;
