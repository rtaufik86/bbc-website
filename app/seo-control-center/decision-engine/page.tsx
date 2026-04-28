import { notFound } from 'next/navigation';
import { auditData } from '../../web-audit/audit-data';
import DecisionEngineClient from './DecisionEngineClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BBC Decision Engine | SEO OS',
  description: 'Automated task distribution and prioritization engine.',
  robots: 'noindex, nofollow',
};

export default function DecisionEnginePage() {
  if (process.env.NODE_ENV !== 'development') notFound();
  return <DecisionEngineClient auditData={auditData} />;
}
