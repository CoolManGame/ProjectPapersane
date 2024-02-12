import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Typography, TextField, Box, InputAdornment, Drawer, Hidden, Slider } from "@mui/material"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import SearchIcon from "@mui/icons-material/Search"
import IconButton from "@mui/material/IconButton"
import TuneIcon from "@mui/icons-material/Tune"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { ThemeProvider, createTheme } from "@mui/material/styles"

import Header from "../../components/Header/Header"
import BookCardResult from "./components/BookCardResult"
import FilterAutocomplete from "./components/FilterAutocomplete"
import FilterAutocompleteSingular from "./components/FilterAutocompleteSingular"

import { BookIds } from "../../../../store/bookflix/BookIds"
import { getAllGenres } from "../../components/getAllGenres"
import { getAllAuthors } from "../../components/getAllAuthors"
import DatePickerComponent from "./components/DatePickerComponent"
import TextFieldForBookSearch from "./components/TextFieldForBookSearch"
import { getBook } from "../../components/getBook"

function TimSach() {
  const [allGenres, setAllGenres] = useState<string[]>([])
  const [allAuthors, setAllAuthors] = useState<string[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const genres = await getAllGenres();
      setAllGenres(genres);
      
      const authors = await getAllAuthors();
      setAllAuthors(authors);
    };
    
    fetchData();
  }, []);

  const { searchQueryInURL } = useParams()
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)
  const [bookSearchValue, setBookSearchValue] = useState(searchQueryInURL ? searchQueryInURL : "")

  const handleGenreChange = (event: any, value: string[]) => {
    setFilteredGenres(value)
  }

  const handleAuthorChange = (event: any, value: string | null) => {
    setFilteredAuthor(value as string)
  }

  const handleFilteredStartYearChange = (value: Date | null) => {
    setFilteredStartYear(value ? value.getFullYear() : 1980)
  }

  const handleFilteredEndYearChange = (value: Date | null) => {
    setFilteredEndYear(value ? value.getFullYear() : 2030)
  }

  const handleFilteredRatingChange = (event: any, value: number | number[]) => {
    setFilteredRating(value)
  }

  const [filteredGenres, setFilteredGenres] = useState<string[]>([])
  const [filteredAuthor, setFilteredAuthor] = useState<string>("")
  const [filteredStartYear, setFilteredStartYear] = useState<number>(1900)
  const [filteredEndYear, setFilteredEndYear] = useState<number>(2030)
  const [filteredRating, setFilteredRating] = useState<number | number[]>([0, 5])

  const [bookSearchedInfo_stringified, setBookSearchedInfo_stringified] = useState<Set<string>>(new Set())

  function roundToNearestQuarter(value: number): number {
    return Math.round(value * 4) / 4
  }

  const updateBookSearchedInfo = async () => {
    setBookSearchedInfo_stringified(new Set())
    for (const id of BookIds) {
      const book = await getBook(id)

      const goodTitle = book.title.toLowerCase().includes(bookSearchValue.toLowerCase())
      const goodGenres = filteredGenres.every((value) => book.genres.includes(value))
      const goodAuthor = !filteredAuthor || filteredAuthor === book.author
      const goodRating = (filteredRating as number[])[0] <= book.rating && book.rating <= (filteredRating as number[])[1]
      const goodDate = filteredStartYear <= book.publishyear && book.publishyear <= filteredEndYear

      if (goodTitle && goodGenres && goodAuthor && goodRating && goodDate) {
        setBookSearchedInfo_stringified((oldSet) => new Set([...oldSet, JSON.stringify(book)]))
      }
    }
  }

  useEffect(() => {
    updateBookSearchedInfo()
  }, [])

  return (
    <Box bgcolor="var(--bookflix-background)" minHeight="100vh" height="100%" width="100%">
      <Header activePage="TimSach" />

      <Box display="flex" justifyContent="space-evenly" mt={10}>
        <Box flexBasis={{ xs: "90%", md: "60%" }}>
          <TextFieldForBookSearch
            bookSearchValue={bookSearchValue}
            setBookSearchValue={setBookSearchValue}
            updateBookSearchedInfo={updateBookSearchedInfo}
            setIsFilterDrawerOpen={setIsFilterDrawerOpen}
          />

          {[...bookSearchedInfo_stringified].map((bookResult) => (
            <BookCardResult bookInfo={JSON.parse(bookResult)} key={JSON.parse(bookResult).id} />
          ))}
        </Box>

        <Box flexBasis="20%" display={{ xs: "none", md: "block" }}>
          <Typography variant="h4" color="var(--bookflix-logo-color)" fontWeight="bold" fontFamily="var(--body-font-bookflix)">
            FILTER
          </Typography>

          <Box bgcolor="rgb(174, 170, 166)" height={4} my={3}></Box>

          <FilterAutocomplete value={filteredGenres} options={allGenres} placeholder="Thể loại" sx={undefined} onChange={handleGenreChange} />

          <FilterAutocompleteSingular value={filteredAuthor} options={allAuthors} placeholder="Tác giả" sx={{ mt: 3 }} onChange={handleAuthorChange} />

          <Typography variant="h5" fontWeight="bold" fontFamily="var(--body-font-bookflix)" color="var(--bookflix-logo-color)" mt={3}>
            Xuất bản từ
          </Typography>

          <DatePickerComponent year={filteredStartYear} handleYearChange={handleFilteredStartYearChange} />

          <Typography variant="h5" fontWeight="bold" fontFamily="var(--body-font-bookflix)" color="var(--bookflix-logo-color)" mt={3}>
            Đến
          </Typography>

          <DatePickerComponent year={filteredEndYear} handleYearChange={handleFilteredEndYearChange} />

          <Typography variant="h5" fontWeight="bold" fontFamily="var(--body-font-bookflix)" color="var(--bookflix-logo-color)" mt={3}>
            Đánh giá
          </Typography>
          <Slider value={filteredRating} step={0.25} min={0} max={5} valueLabelDisplay="auto" onChange={handleFilteredRatingChange} sx={{ mt: 1 }} />
        </Box>
      </Box>

      <Drawer
        anchor="bottom"
        open={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        PaperProps={{
          sx: { bgcolor: "var(--bookflix-background)" },
        }}
      >
        <IconButton onClick={() => setIsFilterDrawerOpen(false)}>
          <KeyboardArrowDownIcon fontSize="large" sx={{ mx: "auto" }} />
        </IconButton>

        <Box p={3} bgcolor="var(--bookflix-background)">
          <Typography variant="h4" color="var(--bookflix-logo-color)" fontWeight="bold" fontFamily="var(--body-font-bookflix)">
            THỂ LOẠI
          </Typography>

          <Box bgcolor="rgb(174, 170, 166)" height={4} my={3}></Box>

          <FilterAutocomplete value={filteredGenres} options={allGenres} placeholder="Thể loại" sx={undefined} onChange={handleGenreChange} />

          <FilterAutocompleteSingular value={filteredAuthor} options={allAuthors} placeholder="Tác giả" sx={{ mt: 3 }} onChange={handleAuthorChange} />

          <Typography variant="h5" fontWeight="bold" fontFamily="var(--body-font-bookflix)" color="var(--bookflix-logo-color)" mt={3}>
            Xuất bản từ
          </Typography>

          <DatePickerComponent year={filteredStartYear} handleYearChange={handleFilteredStartYearChange} />

          <Typography variant="h5" fontWeight="bold" fontFamily="var(--body-font-bookflix)" color="var(--bookflix-logo-color)" mt={3}>
            Đến
          </Typography>

          <DatePickerComponent year={filteredEndYear} handleYearChange={handleFilteredEndYearChange} />

          <Typography variant="h5" fontWeight="bold" fontFamily="var(--body-font-bookflix)" color="var(--bookflix-logo-color)" mt={3}>
            Đánh giá
          </Typography>
          <Slider value={filteredRating} step={0.25} min={0} max={5} valueLabelDisplay="auto" onChange={handleFilteredRatingChange} sx={{ mt: 1 }} />
        </Box>
      </Drawer>
    </Box>
  )
}

export default TimSach
