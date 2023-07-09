import { slug } from 'github-slugger'
import { getAllTags, allCoreContent } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { tag: string } }): Promise<Metadata> {
  const tag = params.tag
  return genPageMetadata({ title: tag, description: `${siteMetadata.title} ${tag} tagged content` })
}

export const generateStaticParams = async () => {
  const tags = await getAllTags(allBlogs)
  const paths = Object.keys(tags).map((tag) => ({
    tag: tag,
  }))
  return paths
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const { tag } = params
  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  const filteredPosts = allCoreContent(
    allBlogs.filter(
      (post) => post.draft !== true && post.tags && post.tags.map((t) => slug(t)).includes(tag)
    )
  )
  return <ListLayout posts={filteredPosts} title={title} />
}
