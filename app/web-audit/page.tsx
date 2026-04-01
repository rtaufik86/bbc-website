import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import WebAuditClient from './WebAuditClient'
import { auditData } from './audit-data'

export const metadata: Metadata = {
  title: 'Web Audit Dashboard | BBC Internal',
  robots: 'noindex, nofollow',
}

export default function WebAuditPage() {
  // Hanya izinkan di environment development (localhost)
  if (process.env.NODE_ENV !== 'development') {
    notFound()
  }

  return <WebAuditClient auditData={auditData} />
}
