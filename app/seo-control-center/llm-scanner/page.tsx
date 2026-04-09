import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import LLMScannerClient from './LLMScannerClient'
import { auditData } from '../../web-audit/audit-data'
import { SITE_REGISTRY, QUERY_BANK_BY_CLUSTER } from '@/lib/seo/site-registry'

export const metadata: Metadata = { 
  title: 'LLM Presence Scanner | BBC SEO Control Center', 
  robots: 'noindex, nofollow' 
}

export default function LLMScannerPage() {
  if (process.env.NODE_ENV !== 'development') notFound()
  return (
    <LLMScannerClient 
      auditData={auditData} 
      registryEntries={Object.values(SITE_REGISTRY)} 
      queryBankByCluster={QUERY_BANK_BY_CLUSTER}
    />
  )
}
