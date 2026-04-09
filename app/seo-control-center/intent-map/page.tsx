import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import IntentMapClient from './IntentMapClient'
import { auditData } from '../../web-audit/audit-data'
import { SITE_REGISTRY, QUERY_BANK_BY_CLUSTER } from '@/lib/seo/site-registry'

export const metadata: Metadata = { 
  title: 'Intent Coverage Map | BBC SEO Control Center', 
  robots: 'noindex, nofollow' 
}

export default function IntentMapPage() {
  if (process.env.NODE_ENV !== 'development') notFound()
  return (
    <IntentMapClient 
      auditData={auditData} 
      registryEntries={Object.values(SITE_REGISTRY)} 
      queryBankByCluster={QUERY_BANK_BY_CLUSTER}
    />
  )
}
