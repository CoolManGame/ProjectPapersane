import React, { useEffect, useState } from "react"
import { Box, Typography } from "@mui/material"
import Markdown from "react-markdown"

interface RenderMarkdownProps {
  children: any
}

const mustHaveProps = {
  fontFamily: "var(--body-font-bookflix)",
  color: "black",
  fontWeight: "normal",
}

const createHeaderTypography = (variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6", fontSize: number) => (props: any) => {
  const { children, ...rest } = props
  return (
    <Typography variant={variant} align="center" sx={{ fontSize }} {...mustHaveProps}>
      {children}
    </Typography>
  )
}

const RenderMarkdown: React.FC<RenderMarkdownProps> = ({ children }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  useEffect(() => {
    // Update the screen width on window resize
    const handleResize = () => {
      console.log("resized bro")
      setScreenWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const calculateImageWidth = () => {
    if (screenWidth >= 900) {
      const maxWidth = 800
      const minWidth = 400
      const maxScreenWidth = 1920
      const minScreenWidth = 900
      // formula to make pic width scale linearly with screen width
      const width = ((screenWidth - minScreenWidth) / (maxScreenWidth - minScreenWidth)) * (maxWidth - minWidth) + minWidth
      return Math.round(width)
    } else {
      const maxWidth = 500
      const minWidth = 300
      const maxScreenWidth = 750
      const minScreenWidth = 320
      // formula to make pic width scale linearly with screen width
      const width = ((screenWidth - minScreenWidth) / (maxScreenWidth - minScreenWidth)) * (maxWidth - minWidth) + minWidth
      return Math.round(width)
    }
  }

  return (
    <Markdown
      components={{
        h1: createHeaderTypography("h1", 35),
        h2: createHeaderTypography("h2", 30),
        h3: createHeaderTypography("h3", 25),
        h4: createHeaderTypography("h4", 20),
        h5: createHeaderTypography("h5", 15),
        h6: createHeaderTypography("h6", 10),
        p: (props) => {
          const { children, ...rest } = props
          return (
            <Typography variant="body1" paragraph {...mustHaveProps} sx={{ fontSize: 20 }}>
              {children}
            </Typography>
          )
        },
        img: (props) => {
          const { src, alt, ...rest } = props
          return (
            <Box
              component="img"
              sx={{
                display: "block",
                mx: "auto",
                width: calculateImageWidth(),
              }}
              alt={alt}
              src={src}
            />
          )
        },
      }}
    >
      {children}
    </Markdown>
  )
}

export default RenderMarkdown
