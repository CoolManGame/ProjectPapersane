import matter from "gray-matter"

import { Book } from "./Book"
import readTextFile from "../../../store/readTextFile"

const CONTENT_PATH = `/bookflix/book-info/content`
const COVER_PATH = `/bookflix/book-info/cover`
const URL_PREFIX = `/bookflix/bookinfo`

export const getBook = async (id: string): Promise<Book> => {
  const data = await readTextFile(`${CONTENT_PATH}/${id}.md`)
  const matterResult = matter(data);

  return {
    id,
    title: matterResult.data.title,
    author: matterResult.data.author,
    genres: matterResult.data.genres,
    publishyear: matterResult.data.publishyear,
    rating: parseFloat(matterResult.data.rating),
    review: matterResult.content,
    coverUrl: `${COVER_PATH}/${id}.png`,
    url: `${URL_PREFIX}/${id}`
  }
}
