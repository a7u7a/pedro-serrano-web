import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { PesePost } from '../lib/interfaces'
import probe from "probe-image-size";

const postsDir = path.join(process.cwd(), 'content/photos')

export const getPosts = (): Promise<PesePost[]> => {
    const fileNames = fs.readdirSync(postsDir)
    const allPostsData = async (fileName: string) => {
        const id = fileName.replace(/\.md$/, '')
        const fullPath = path.join(postsDir, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const matterResult = matter(fileContents)
        const body = matterResult.content
        const img = fs.createReadStream(path.join(process.cwd(), "public" + matterResult.data.image))
        const dimensions = await probe(img)
        return {
            id,
            body,
            title: matterResult.data.title,
            date: matterResult.data.date,
            image: matterResult.data.image,
            alt: matterResult.data.alt,
            category: matterResult.data.category,
            imgWidth: dimensions.width,
            imgHeight: dimensions.height
        }
    }
    const processFileNames = async () => {
        return await Promise.all(fileNames.map(allPostsData))
    }

    return processFileNames()
}