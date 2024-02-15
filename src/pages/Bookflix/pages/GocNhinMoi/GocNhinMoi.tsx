import React, { useEffect, useState } from "react"
import { Typography, Box, Hidden } from "@mui/material"
import Header from "../../components/Header/Header"
import ArticlePreviewCard from "./components/ArticlePreviewCard/ArticlePreviewCard"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"

import { GocNhinMoiArticleIds } from "../../../../store/bookflix/GocNhinMoiArticleIds"
import { getArticle } from "../../components/getArticle"
import { Article } from "../../components/Article"

function GocNhinMoi() {
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    const fetchArticles = async () => {
      GocNhinMoiArticleIds.forEach(async (id) => {
        const article = await getArticle(id)
        setArticles((oldArticles) => (oldArticles.some((a) => a.id == article.id) ? oldArticles : [...oldArticles, article]))
      })
    }

    fetchArticles()
  }, [])

  return (
    <Box bgcolor="var(--bookflix-background)" minHeight="100vh" height="100%" width="100%">
      <Header activePage="GocNhinMoi" />

      <Typography
        variant="h1"
        align="center"
        fontFamily="var(--body-font-bookflix)"
        color="rgb(232, 129, 119)"
        fontWeight="bold"
        mt={5}
        fontSize={{ xs: 30, sm: 50 }}
      >
        <AutoAwesomeIcon sx={{ color: "yellow", fontSize: { xs: 25, sm: 45 } }} />
        {" GÓC NHÌN MỚI"}
      </Typography>

      <Box display="flex" gap={10} justifyContent="center" mx={2}>
        <Box flexBasis={{ xs: "100%", md: "60%" }}>
          {articles.map((article) => (
            <ArticlePreviewCard article={article} key={article.id} />
          ))}
        </Box>

        <Box flexBasis="30%" alignSelf="flex-start" justifyContent="flex-end" display={{ xs: "none", md: "flex" }}>
          <img src="/bookflix/ui-pics/FillerPic_GocNhinMoi.png" />
        </Box>
      </Box>
    </Box>
  )
}

export default GocNhinMoi
