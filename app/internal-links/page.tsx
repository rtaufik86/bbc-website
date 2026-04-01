import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import InternalLinksClient from './InternalLinksClient'
import { linksData } from './links-data'

export const metadata: Metadata = {
  title: 'Internal Link Inventory | BBC Audit',
  robots: 'noindex, nofollow',
}

export default function InternalLinksPage() {
  // Hanya izinkan di environment development untuk keamanan SEO & data
  if (process.env.NODE_ENV !== 'development') {
    notFound()
  }

  return <InternalLinksClient linksData={linksData} />
}
