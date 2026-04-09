import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import TrustScannerClient from './TrustScannerClient'
import { auditData } from '../../web-audit/audit-data'
import { SITE_REGISTRY } from '@/lib/seo/site-registry'

export const metadata: Metadata = { title: 'Trust Signal Scanner | BBC SEO Control Center', robots: 'noindex, nofollow' }

export default function TrustScannerPage() {
  if (process.env.NODE_ENV !== 'development') notFound()
  return <TrustScannerClient auditData={auditData} registryEntries={Object.values(SITE_REGISTRY)} />
}
