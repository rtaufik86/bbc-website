import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import AuthorityAnalyzerClient from './AuthorityAnalyzerClient'
import { auditData } from '../../web-audit/audit-data'
import { SITE_REGISTRY } from '@/lib/seo/site-registry'

export const metadata: Metadata = { title: 'Authority Injection Analyzer | BBC SEO Control Center', robots: 'noindex, nofollow' }

export default function AuthorityAnalyzerPage() {
  if (process.env.NODE_ENV !== 'development') notFound()
  return <AuthorityAnalyzerClient auditData={auditData} registryEntries={Object.values(SITE_REGISTRY)} />
}
