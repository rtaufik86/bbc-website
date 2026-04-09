import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import InternalLinksClient from './InternalLinksClient'
import { auditData } from '../web-audit/audit-data'

export const metadata: Metadata = {
  title: 'Internal Link Inventory | BBC Audit',
  robots: 'noindex, nofollow',
}

export default function InternalLinksPage() {
  // Hanya izinkan di environment development untuk keamanan SEO & data
  if (process.env.NODE_ENV !== 'development') {
    notFound()
  }

  // Transform auditData to PageLinks if necessary, but according to current check they match
  const pageLinks = auditData.map(page => ({
    path: page.path,
    pageType: page.pageType,
    title: page.title,
    indexability: page.indexability,
    linksOut: page.linksOut,
    linksIn: page.linksIn,
    status: page.status
  }));

  return <InternalLinksClient linksData={pageLinks} />
}
