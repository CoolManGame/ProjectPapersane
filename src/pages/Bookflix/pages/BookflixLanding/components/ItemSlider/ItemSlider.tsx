// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
import { Scrollbar } from 'swiper';

// Import Swiper styles
import "swiper/css"
import "swiper/css/scrollbar"

import { Card, CardContent, CardMedia, Typography } from "@mui/material"
import { Link } from "react-router-dom"

import { Book } from "../../../../components/Book"
import { getBook } from "../../../../components/getBook"
import { useEffect, useState } from "react"
import { Article } from "../../../../components/Article"
import { getArticle } from "../../../../components/getArticle"

import CustomLink from "../CustomLink/CustomLink"

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
      (forBook ? getBook(id) : getArticle(id)).then((item) => {
        setInfo((oldInfo) => oldInfo.some((itemIn) => itemIn.id == item.id) ? oldInfo : [...oldInfo, item])
      })
    })
  }, [])

  return (
    <Swiper breakpoints={swiperBreakpoint} grabCursor={true} modules={[Scrollbar]} scrollbar={true} spaceBetween={10}>
      {info.map((item) => (
        <SwiperSlide key={item.id} style={{paddingBottom: 30, paddingTop: 30}}>
          <CustomLink item={item} cardColor={cardColor} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default ItemSlider
