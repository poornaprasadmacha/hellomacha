import type { Metadata } from 'next'
import EmergencyFundClient from '../EmergencyFundClient'

export const metadata: Metadata = {
  title: 'Emergency Fund Calculator India | HelloMacha',
  description: 'Estimate your emergency fund target in India using essential expenses, income stability, dependants, health costs, current savings, and a funding timeline.',
  keywords: ['emergency fund calculator India', 'emergency savings calculator', 'contingency fund calculator', 'how much emergency fund do I need'],
  alternates: { canonical: 'https://hellomacha.com/calculators/emergency-fund' },
  openGraph: {
    title: 'Emergency Fund Calculator India | HelloMacha',
    description: 'Calculate a practical emergency fund target from your household expenses and risk profile.',
    url: 'https://hellomacha.com/calculators/emergency-fund',
    siteName: 'HelloMacha',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary',
    title: 'Emergency Fund Calculator India | HelloMacha',
    description: 'Calculate a practical emergency fund target from your household expenses and risk profile.',
  },
}

export default function EmergencyFundPage() {
  return <EmergencyFundClient />
}
