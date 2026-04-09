import { auditData } from '../../web-audit/audit-data';
import DecisionEngineClient from './DecisionEngineClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BBC Decision Engine | SEO OS',
  description: 'Automated task distribution and prioritization engine.',
};

export default function DecisionEnginePage() {
  return <DecisionEngineClient auditData={auditData} />;
}
