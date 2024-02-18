import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Markdown from "react-markdown"
import { Box, Button, Grid, Rating, Typography } from "@mui/material"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"

import Header from "../../components/Header/Header"
import { Notfound } from "../../../"
import { BookIds } from "../../../../store/bookflix/BookIds"
import { getBook } from "../../components/getBook"
import { Book } from "../../components/Book"

const BOOK_INFO_PATH = `/bookflix/book-info`

const BookInfo = () => {
  const { bookId } = useParams()

  if (!BookIds.includes(bookId as string)) {
    return <Notfound />
  }

  const [book, setBook] = useState<Book>({
    id: "#",
    title: "#",
    author: "#",
    genres: [],
    publishyear: 0,
    rating: 0,
    review: "#",
    coverUrl: "#",
    url: "#",
  });

  useEffect(() => {
    bookId && getBook(bookId).then((book) => setBook(book))
  }, [])

  return (
    <Box bgcolor="var(--bookflix-background)" minHeight="100vh" height="100%" width="100%">
      <Header activePage="TimSach" />

      <Button
        onClick={() => window.history.back()}
        sx={{
          ml: 3,
          mt: 2,
          fontFamily: "var(--body-font-bookflix)",
          color: "var(--bookflix-logo-color)",
          fontSize: 30,
          "&:hover": {
            bgcolor: "transparent",
          },
        }}
      >
        <ArrowBackIosNewIcon sx={{ color: "black", fontSize: 20 }} />
        Trở lại
      </Button>

      <Box mx={{ xs: 1, sm: 3, md: 3, lg: 10, xl: 30 }} mt={10}>
        <Grid container direction="row" alignItems="center" justifyContent="center">
          {/* Book cover */}
          <Grid item xs={10} md={4}>
            <Box width={{ xs: "100%", md: "80%" }}>
              <img src={`${BOOK_INFO_PATH}/cover/${bookId}.png`} style={{ width: "100%", objectFit: "contain" }} />
            </Box>
          </Grid>

          <Grid container item direction="column" xs={12} md={8} mt={{ xs: 5, md: 0 }} alignSelf="center" rowSpacing={{ xs: 2, sm: 1, md: 2, lg: 3 }}>
            {/* Book title */}
            <Grid item alignSelf="center">
              <Typography
                variant="h3"
                fontSize={{ xs: 40, lg: 45, xl: 50 }}
                fontFamily="var(--body-font-bookflix)"
                fontWeight="bold"
                color="var(--bookflix-logo-color)"
                align="center"
              >
                {book.title.toUpperCase()}
              </Typography>
            </Grid>

            {/* Book author */}
            <Grid item alignSelf={{ xs: "center", sm: "center" }}>
              <Typography variant="h5" color="black" fontFamily="var(--body-font-bookflix)" fontSize={{ sm: 20, md: 25 }}>
                <span style={{ fontWeight: "bold" }}>Tác giả: </span>
                {book.author}
              </Typography>
            </Grid>

            {/* Book publish date */}
            <Grid item alignSelf={{ xs: "center", sm: "center" }}>
              <Typography variant="h5" color="black" fontFamily="var(--body-font-bookflix)" fontSize={{ sm: 20, md: 25 }}>
                <span style={{ fontWeight: "bold" }}>Năm phát hành: </span> {book.publishyear}
              </Typography>
            </Grid>

            {/* Book genre */}
            <Grid item mt={5} ml={{ xs: 1, md: 10 }}>
              <Box display="flex" flexWrap="wrap" alignItems="center" justifyContent="flex-start" gap={2}>
                <Typography variant="h5" sx={{ color: "rgb(184, 88, 91)", fontWeight: "bold" }} fontSize={{ md: 25, lg: 35 }}>
                  Thể loại:
                </Typography>

                {book.genres.map((genre) => (
                  <Typography
                    key={genre}
                    variant="h6"
                    sx={{
                      fontFamily: "var(--body-font-bookflix)",
                      border: "1px solid rgb(132, 163, 219)",
                      borderRadius: 20,
                      px: 2,
                      py: 1,
                      bgcolor: "rgb(132, 163, 219)",
                      color: "white",
                    }}
                    align="center"
                    fontSize={{ md: 20, lg: 20 }}
                  >
                    {genre}
                  </Typography>
                ))}
              </Box>
            </Grid>

            {/* Book rating */}
            <Grid item ml={{ xs: 1, md: 10 }}>
              <Box display="flex" alignItems="center" gap={2} mt={3}>
                <Typography variant="h5" fontFamily="var(--body-font-bookflix)" fontStyle="italic" color="black" fontSize={{ md: 25, lg: 30 }}>
                  Đánh giá:{" "}
                </Typography>
                <Rating value={book.rating} precision={0.25} readOnly sx={{ fontSize: { md: 30, lg: 40 } }} />
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {/* Book review */}
        <Box
          display="flex"
          justifyContent="flex-start"
          flexWrap={{ xs: "wrap", md: "nowrap" }}
          gap={5}
          mt={10}
          border="4px solid black"
          borderRadius={5}
          p={5}
          bgcolor="white"
        >
          <Box minWidth={{ xs: 200 }} maxWidth={{ xs: 100, md: 200 }}>
            <img src="/bookflix/ui-pics/SummaryIcon.png" />
          </Box>
          <Box>
            <Markdown
              components={{
                p: (props) => {
                  const { children, ...rest } = props
                  return (
                    <Typography variant="subtitle1" paragraph color="black" fontFamily="var(--review-font-bookflix)" fontSize={{ xs: 15, sm: 15, md: 18, lg: 22 }}>
                      {children}
                    </Typography>
                  )
                },
              }}
            >
              {book.review}
            </Markdown>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default BookInfo
