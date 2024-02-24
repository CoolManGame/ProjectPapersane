import { useEffect, useState } from "react";
import { Typography, Button, Box, Grid } from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";

import Header from "../../components/Header/Header";
import ItemSliderBox from "./components/ItemSliderBox/ItemSliderBox";
import ItemSlider from "./components/ItemSlider/ItemSlider";

import { BookIds } from "../../../../store/bookflix/BookIds";
import { GocNhinMoiArticleIds } from "../../../../store/bookflix/GocNhinMoiArticleIds";

import readTextFile from "../../../../store/readTextFile";

const getDaysSinceDate = (targetDate : Date) => {
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - targetDate.getTime();
  return Math.round(timeDifference / (1000 * 60 * 60 * 24));
}

function BookflixLanding() {
  const [quoteTxtLines, setQuoteTxtLines] = useState<string[]>([])

  useEffect(() => {
    readTextFile(`/bookflix/others/quotes.txt`).then((data) => {
      setQuoteTxtLines(data.split("\n"))
    })
  }, [])

  const quoteIdx = getDaysSinceDate(new Date(2023, 6, 13)) % 100

  return (
    <Box bgcolor="var(--bookflix-background)" minHeight="100vh" height="100%" width="100%">
      <Header activePage="TrangChu" />

      <Grid container columns={24} justifyContent="center" spacing={10}>
        <Grid item xs={22} sm={22} md={14} lg={10} alignSelf="center">
          
          <Typography
            position="relative"
            variant="h4"
            align="center"
            fontFamily="var(--review-font-bookflix)"
            color="black"
            bgcolor="white"
            borderRadius="30px"
            p={5}
            mt={5}
            fontSize={{xs: 35, md: "3vw" ,lg: "2.41vw"}}
          >
            Yêu sách từ đầu sao thật khó
            <br />
            Đừng từ bỏ, có Bookflix lo!
            <img src="/bookflix/ui-pics/Flower1_BookflixLanding.png" width={50} style={{position: "absolute", top: "-15px", right: "-15px"}}/>
            <img src="/bookflix/ui-pics/Pencil_BookflixLanding.png" width={50} style={{position: "absolute", bottom: "-10px", left: "-10px", transform: "rotateX(180deg)"}}/>
          </Typography>
        </Grid>

        <Grid item xs={15} sm={15} md={8} lg={6} mt={10}>
          <Swiper slidesPerView={1} loop autoplay={{ delay: 2500 }} modules={[Autoplay]} noSwiping={true}>
            {BookIds.map((id) => (
              <SwiperSlide key={id}>
                <img
                  src={`/bookflix/book-info/cover/${id}.png`}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                ></img>
              </SwiperSlide>
            ))}
          </Swiper>

          <Button
            fullWidth
            onClick={() => {
              const randomId = BookIds[Math.floor(Math.random() * BookIds.length)]
              window.open(`/bookflix/bookinfo/${randomId}`, "_blank")
            }}
            sx={{
              mt: 1,
              bgcolor: "rgb(250, 222, 220)",
              color: "rgb(184, 88, 91)",
              borderRadius: 20,
              fontFamily: "var(--body-font-bookflix)",
              fontWeight: "bold",
              fontSize: "1rem",
              "&:hover": {
                bgcolor: "rgb(250, 222, 220)",
              },
            }}
          >
            Surprise me!
          </Button>
        </Grid>
      </Grid>

      <ItemSliderBox title="Top rated" ItemSliderComponent={<ItemSlider ids={BookIds} cardColor="rgb(204, 223, 230)" forBook={true}/>} />

      <ItemSliderBox title="Recommended for you" ItemSliderComponent={<ItemSlider ids={GocNhinMoiArticleIds} cardColor="rgb(210, 239, 173)" forBook={false}/>} />

      <Typography
        variant="h3"
        align="center"
        mt={10}
        color="var(--bookflix-logo-color)"
        fontFamily="var(--body-font-bookflix)"
        fontWeight="bold"
        fontSize={{ xs: 30, sm: 35, md: 50 }}
      >
        QUOTE OF THE DAY
      </Typography>

      <Box mt={15} position="relative" px={2}>
        <Typography
          position="relative"
          variant="h5"
          align="center"
          fontFamily="var(--body-font-bookflix)"
          fontStyle="italic"
          border="3px solid rgb(48, 48, 48)"
          bgcolor="white"
          color="black"
          borderRadius="30px"
          p={5}
          mx="auto"
          width="fit-content"
          max-width="100%"
          fontSize={{ xs: 20, lg: 25 }}
          zIndex={100}
        >
          {quoteTxtLines[quoteIdx * 2]} {/* quote content */}
          <br />
          {`- ${quoteTxtLines[quoteIdx * 2 + 1]}`} {/* quote author */}
        </Typography>
        <img src="/bookflix/ui-pics/Flower2_BookflixLanding.png" width={300} style={{position: "absolute", margin: "0 auto", left: "0", right: "0", zIndex: "9", top: "-100px"}}/>
      </Box>

      <Box bgcolor="var(--bookflix-background)" height="20px">
      </Box>
    </Box>
  )
}

export default BookflixLanding
