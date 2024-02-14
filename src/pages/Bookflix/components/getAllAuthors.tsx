import { BookIds } from "../../../store/bookflix/BookIds"
import { getBook } from "./getBook"

export const getAllAuthors = async (): Promise<string[]> => {
  const authorSet = new Set<string>()

  const bookPromises = BookIds.map((id) => getBook(id))

  return Promise.all(bookPromises).then((books) => {
    books.forEach((book) => authorSet.add(book.author))
    return [...authorSet]
  })
}
