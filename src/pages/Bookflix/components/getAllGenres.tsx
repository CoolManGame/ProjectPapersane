import { BookIds } from "../../../store/bookflix/BookIds"
import { getBook } from "./getBook"

export const getAllGenres = async (): Promise<string[]> => {
  const genreSet = new Set<string>()

  const bookPromises = BookIds.map((id) => getBook(id))

  return Promise.all(bookPromises).then((books) => {
    books.forEach((book) => {
      book.genres.forEach((genre) => genreSet.add(genre))
    })

    return [...genreSet]
  })
}
