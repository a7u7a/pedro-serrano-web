import fs from 'fs'
import path from 'path'
// import matter from 'gray-matter'
import { PesePost } from '../lib/interfaces'

const postsDir = path.join(process.cwd(), 'content/photos')

// export const getPosts = (): PesePost[] => {
//     // Get file names under /posts
//     const fileNames = fs.readdirSync(postsDir)
//     const allPostsData: PesePost[] = fileNames.map(fileName => {
//         // Remove ".md" from file name to get id
//         const id = fileName.replace(/\.md$/, '')

//         // Read markdown file as string
//         const fullPath = path.join(postsDir, fileName)
//         const fileContents = fs.readFileSync(fullPath, 'utf8')

//         // Use gray-matter to parse the post metadata section
//         const matterResult = matter(fileContents)
//         const body = matterResult.content

//         return {
//             id,
//             title: matterResult.data.title,
//             date: matterResult.data.date,
//             image: matterResult.data.image,
//             body,
//             category: matterResult.data.category
//         }
//     })
//     return allPostsData
// }