import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import EntityAuditClient from './EntityAuditClient'
import { auditData } from '../../web-audit/audit-data'
import { SITE_REGISTRY } from '@/lib/seo/site-registry'

export const metadata: Metadata = {
  title: 'Entity & Angle Audit | BBC SEO Control Center',
  robots: 'noindex, nofollow',
}

export default function EntityAuditPage() {
  if (process.env.NODE_ENV !== 'development') notFound()
  const registryEntries = Object.values(SITE_REGISTRY)
  return <EntityAuditClient auditData={auditData} registryEntries={registryEntries} />
}
