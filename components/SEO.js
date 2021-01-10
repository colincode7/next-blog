import { NextSeo, ArticleJsonLd } from 'next-seo'
import siteMetadata from '@/data/siteMetadata'

export const SEO = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  openGraph: {
    type: 'website',
    locale: siteMetadata.language,
    url: siteMetadata.siteUrl,
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [
      {
        url: siteMetadata.socialBanner,
        alt: siteMetadata.title,
        width: 1280,
        height: 720,
      },
    ],
  },
  twitter: {
    handle: siteMetadata.twitter,
    site: siteMetadata.twitter,
    cardType: 'summary_large_image',
  },
}

export const PageSeo = ({ title, description, url }) => {
  return (
    <>
      <NextSeo
        title={`${title} – ${siteMetadata.title}`}
        description
        canonical={url}
        openGraph={{
          url,
          title,
          description,
        }}
      />
    </>
  )
}

export const BlogSeo = ({ title, summary, date, url, image = siteMetadata.socialBanner }) => {
  const publishedAt = new Date(date).toISOString()
  const featuredImage = {
    url: `${siteMetadata.siteUrl}${image}`,
    alt: title,
  }

  return (
    <>
      <NextSeo
        title={`${title} – ${siteMetadata.title}`}
        description={summary}
        canonical={url}
        openGraph={{
          type: 'article',
          article: {
            publishedTime: publishedAt,
          },
          url,
          title,
          description: summary,
          images: [featuredImage],
        }}
      />
      <ArticleJsonLd
        authorName={siteMetadata.author}
        dateModified={publishedAt}
        datePublished={publishedAt}
        description={summary}
        images={[featuredImage]}
        publisherLogo="/static/favicons/android-chrome-96x96.png"
        publisherName={siteMetadata.author}
        title={title}
        url={url}
      />
    </>
  )
}
