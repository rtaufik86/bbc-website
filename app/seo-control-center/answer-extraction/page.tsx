import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import AnswerExtractionClient from './AnswerExtractionClient'
import { auditData } from '../../web-audit/audit-data'
import { SITE_REGISTRY } from '@/lib/seo/site-registry'

export const metadata: Metadata = { title: 'Answer Extraction Audit | BBC SEO Control Center', robots: 'noindex, nofollow' }

export default function AnswerExtractionPage() {
  if (process.env.NODE_ENV !== 'development') notFound()
  return <AnswerExtractionClient auditData={auditData} registryEntries={Object.values(SITE_REGISTRY)} />
}
