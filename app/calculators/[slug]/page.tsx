import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CalculatorClient from '../CalculatorClient'
import { calculatorBySlug, calculators } from '../calculatorData'

export const dynamicParams = false

export function generateStaticParams() {
  return calculators.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const calculator = calculatorBySlug[slug]
  if (!calculator) return {}
  const canonicalUrl = `https://hellomacha.com/calculators/${slug}`

  return {
    title: `${calculator.title} | HelloMacha`,
    description: calculator.seoDescription,
    keywords: calculator.keywords,
    alternates: { canonical: canonicalUrl },
    robots: { index: true, follow: true },
    openGraph: {
      title: `${calculator.title} | HelloMacha`,
      description: calculator.seoDescription,
      url: canonicalUrl,
      siteName: 'HelloMacha',
      type: 'website',
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary',
      title: `${calculator.title} | HelloMacha`,
      description: calculator.seoDescription,
    },
  }
}

export default async function CalculatorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const calculator = calculatorBySlug[slug]
  if (!calculator) notFound()

  const canonicalUrl = `https://hellomacha.com/calculators/${slug}`
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: calculator.title,
        url: canonicalUrl,
        description: calculator.seoDescription,
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        isAccessibleForFree: true,
        inLanguage: 'en-IN',
        provider: {
          '@type': 'Organization',
          name: 'HelloMacha',
          url: 'https://hellomacha.com',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://hellomacha.com' },
          { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://hellomacha.com/calculators' },
          { '@type': 'ListItem', position: 3, name: calculator.title, item: canonicalUrl },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <CalculatorClient calculator={calculator} />
    </>
  )
}
