import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import ControlCenterClient from './ControlCenterClient'
import { auditData } from '../web-audit/audit-data'
import { SITE_REGISTRY } from '@/lib/seo/site-registry'

export const metadata: Metadata = {
  title: 'SEO Control Center | BBC Internal',
  robots: 'noindex, nofollow',
}

export default function SEOControlCenterPage() {
  if (process.env.NODE_ENV !== 'development') {
    notFound()
  }
  const registryEntries = Object.values(SITE_REGISTRY)
  return <ControlCenterClient auditData={auditData} registryEntries={registryEntries} />
}
