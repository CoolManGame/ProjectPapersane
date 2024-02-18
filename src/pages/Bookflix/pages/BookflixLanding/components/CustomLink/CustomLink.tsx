import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material"
import { Link } from "react-router-dom"

import { Book } from "../../../../components/Book"
import { Article } from "../../../../components/Article"

const CustomLink = ({ item, cardColor }: { item: Book | Article; cardColor: string }) => {
  return (
    <Box sx={{
      transition: "0.3s",
      "&:hover": {
        transform: "translateY(-30px)"
      }
    }}>
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
    </Box>
  )
}

export default CustomLink
