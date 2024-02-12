import matter from "gray-matter"

import readTextFile from "../../../store/readTextFile"
import { Article } from "./Article"

const CONTENT_PATH = `/bookflix/GocNhinMoi/content`
const COVER_PATH = `/bookflix/GocNhinMoi/images`
const URL_PREFIX = `/bookflix/gocnhinmoi/baiviet`

export const getArticle = async (id: string): Promise<Article> => {
  const data = await readTextFile(`${CONTENT_PATH}/${id}.md`)
  const matterResult = matter(data);

  return {
    id,
    title: matterResult.data.title,
    author: matterResult.data.author,
    publishdate: matterResult.data.publishdate,
    description: matterResult.data.description,
    content: matterResult.content,
    coverUrl: `${COVER_PATH}/${id}/articleCover.jpg`,
    url: `${URL_PREFIX}/${id}`
  }
}
