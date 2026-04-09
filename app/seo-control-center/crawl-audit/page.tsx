import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import CrawlAuditClient from './CrawlAuditClient'
import { auditData } from '../../web-audit/audit-data'

export const metadata: Metadata = { title: 'Crawl & Indexability Audit | BBC SEO Control Center', robots: 'noindex, nofollow' }

export default function CrawlAuditPage() {
  if (process.env.NODE_ENV !== 'development') notFound()
  return <CrawlAuditClient auditData={auditData} />
}
