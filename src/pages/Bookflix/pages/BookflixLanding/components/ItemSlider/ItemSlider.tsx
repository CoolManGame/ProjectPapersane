// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/autoplay"

import { Card, CardContent, CardMedia, Typography } from "@mui/material"
import { Link } from "react-router-dom"

import { Book } from "../../../../components/Book"
import { getBook } from "../../../../components/getBook"
import { useEffect, useState } from "react"
import { Article } from "../../../../components/Article"
import { getArticle } from "../../../../components/getArticle"

const ItemSlider = ({ ids, cardColor, forBook }: { ids: string[]; cardColor: string; forBook: boolean }) => {
  const [info, setInfo] = useState<(Book | Article)[]>([])

  const swiperBreakpoint = {
    0: {
      slidesPerView: 1,
    },
    600: {
      slidesPerView: 2,
    },
    900: {
      slidesPerView: 4,
    },
    1200: {
      slidesPerView: 6,
    },
    1536: {
      slidesPerView: 7,
    },
  }

  useEffect(() => {
    ids.forEach((id) => {
      ;(forBook ? getBook(id) : getArticle(id)).then((item) => {
        setInfo((oldInfo) => oldInfo.some((itemIn) => itemIn.id == item.id) ? oldInfo : [...oldInfo, item])
      })
    })
  }, [])

  return (
    <Swiper breakpoints={swiperBreakpoint}>
      {info.map((item) => (
        <SwiperSlide key={`${item.id}`}>
          <Link to={item.url}>
            <Card
              elevation={0}
              sx={{
                maxWidth: 200,
                backgroundColor: cardColor,
                padding: 1,
              }}
            >
              <CardMedia component="img" image={item.coverUrl} alt={item.title} />
              <CardContent>
                <Typography variant="h5" fontFamily="var(--body-font-bookflix)" fontWeight="500">
                  {item.title}
                </Typography>
                <Typography variant="subtitle1" fontFamily="var(--body-font-bookflix)">
                  {item.author}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default ItemSlider
