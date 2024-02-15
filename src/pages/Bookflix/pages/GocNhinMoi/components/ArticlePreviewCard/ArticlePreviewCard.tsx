import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material"
import { Link } from "react-router-dom"
import { Article } from "../../../../components/Article"

const ArticlePreviewCard = ({ article }: { article: Article }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: {xs: "column", sm: "row"},
        boxShadow: "none",
        border: "1px solid rgb(153, 153, 153)",
        borderRadius: 0,
        marginTop: 5,
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: { xs: "auto", sm: 200 }, objectFit: "cover" }}
        image={article.coverUrl}
        alt="Image"
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontSize: { xs: 15, sm: 17, lg: 20 }, fontStyle: "italic", fontWeight: 'bold' }}
          fontFamily="var(--body-font-bookflix)"
        >
          {article.title}
        </Typography>
        <Typography
          variant="subtitle1"
          component="div"
          color="text.secondary"
          sx={{ fontSize: { xs: 12, sm: 15, lg: 17 } }}
          fontFamily="var(--body-font-bookflix)"
        >
          bởi {article.author}
        </Typography>
        <Typography variant="body2" component="div" sx={{ mb: 2 }}>
          {article.description}
        </Typography>
        <Button
          component={Link}
          to={article.url}
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: "rgb(224, 143, 120)",
            borderRadius: "20px 0 0 20px",
            boxShadow: "none",
            fontFamily: "var(--body-font-bookflix)",
            "&:hover": {
              backgroundColor: "rgb(224, 143, 120)",
              boxShadow: "none",
            },
          }}
        >
          Read Now
        </Button>
      </CardContent>
    </Card>
  )
}

export default ArticlePreviewCard
