import { useState, useEffect, useContext } from "react";

import EllipsisText from "react-ellipsis-text";
import {
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CardActions,
  Button,
  CardMedia,
  Slide,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import MainContext from "../../context";

const CourseCards = () => {
  async function get_data(url) {
    const response = await fetch(url);
    var data = await response.json();
    return data;
  }

  const [is_loaded, setIsLoaded] = useState(false);
  const { handlePageNumber, handleWorkShopNumber } = useContext(MainContext);
  const [workShops, setWorkShops] = useState([]);

  const fetchData = () => {
    setIsLoaded(false);
    const homePageData = get_data(
      "https://ctf-apa-backend.onrender.com/api/pages/get_home/"
    );
    homePageData.then((data) => {
      setWorkShops(data["active_workshops"]);
      setIsLoaded(true);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {is_loaded ? (
        <Card
          sx={{
            height: "60%",
            width: "100vw",
            backgroundColor: "white",
            overflowY: "scroll",
            mt: "3%",
            backgroundColor: "whitesmoke",
          }}
        >
          <CardContent>
            <Grid container sx={{ mx: 3 }}>
              {workShops.map((w, index) => (
                <Grid
                  key={index}
                  xs={12}
                  sm={6}
                  md={6}
                  lg={4}
                  sx={{ px: 2, mb: 2 }}
                >
                  <Slide
                    direction="up"
                    in={is_loaded}
                    style={{
                      transitionDelay: is_loaded ? `99ms` : "0ms",
                    }}
                  >
                    <Card
                      sx={{
                        maxWidth: 500,
                        color: "#F7AD19",
                        backgroundColor: "#001B48",
                      }}
                    >
                      <CardActionArea
                        onClick={() => {
                          handlePageNumber(5);
                          handleWorkShopNumber(w.id);
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="250"
                          width="200"
                          image={`https://ctf-apa-backend.onrender.com/${w.photo}`}
                          alt={w.title}
                        />
                        <CardContent>
                          <Typography
                            variant="h6"
                            textAlign="left"
                            gutterBottom
                          >
                            {w.title}
                          </Typography>
                          <Typography
                            variant="body1"
                            textAlign="left"
                            gutterBottom
                            sx={{ direction: "ltr", color: "white" }}
                          >
                            <EllipsisText text={w.description} length={"100"} />
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button
                          size="small"
                          color="primary"
                          target="_blank"
                          onClick={() => {
                            handlePageNumber(5);
                            handleWorkShopNumber(w.id);
                          }}
                        >
                          اطلاعات بیشتر
                        </Button>
                      </CardActions>
                    </Card>
                  </Slide>
                </Grid>
              ))}
              {/* ) */}
              {/* )} */}
            </Grid>
          </CardContent>
        </Card>
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
    </>
  );
};
export default CourseCards;
