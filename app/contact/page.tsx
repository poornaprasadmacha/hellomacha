import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact HelloMacha',
  description: 'Get in touch with HelloMacha for questions, feedback, article suggestions, or collaboration opportunities. Reach our editorial team by email or phone.',
  alternates: {
    canonical: 'https://hellomacha.com/contact',
  },
  openGraph: {
    title: 'Contact HelloMacha',
    description: 'Get in touch with HelloMacha for questions, feedback, article suggestions, or collaboration opportunities.',
    url: 'https://hellomacha.com/contact',
    siteName: 'HelloMacha',
    type: 'website',
  },
}

const faqs = [
  {
    question: 'How do I suggest a topic for a new article?',
    answer: 'Send an email to team.hellomacha@gmail.com with the topic you would like us to cover. Include any specific questions you have and why you think the topic would help other readers. Our editorial team reviews suggestions weekly.',
  },
  {
    question: 'How do I report an error or outdated information?',
    answer: 'Email team.hellomacha@gmail.com with the URL of the article and the correction needed. We review credible reports and correct material errors as soon as practical. You can also find our full correction policy on our editorial policy page.',
  },
  {
    question: 'Do you accept guest posts or contributions?',
    answer: 'Yes. If you have expertise in personal finance, technology, business, or home products and would like to contribute a guide, email us with a brief outline and your background. All published contributions are reviewed against our editorial policy.',
  },
  {
    question: 'Can I advertise or partner with HelloMacha?',
    answer: 'We work with advertising partners through Google AdSense and similar networks. For direct sponsorship, native content, or affiliate partnerships, email team.hellomacha@gmail.com and describe your campaign goals. Sponsored content is always clearly labelled.',
  },
  {
    question: 'How quickly do you respond to inquiries?',
    answer: 'We typically respond within one to three business days. Urgent matters related to published content errors are prioritised.',
  },
]

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 pb-16 pt-6 sm:px-6 sm:pt-8">
      <div className="rounded-2xl border border-[var(--line)] bg-white p-6 shadow-sm sm:p-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-red)]">
          Contact
        </p>
        <h1 className="mb-4 text-3xl font-black tracking-tight text-[var(--ink)]">
          Get in touch with HelloMacha
        </h1>

        <p className="mb-6 text-base text-[var(--muted)]">
          We welcome your feedback, article suggestions, business inquiries, and questions. HelloMacha is an independent editorial team focused on practical guides for everyday decisions in India.
        </p>

        <div className="space-y-4 text-base text-[var(--ink)]">
          <p>
            <span className="font-semibold">Email:</span>{' '}
            <a href="mailto:team.hellomacha@gmail.com" className="text-[var(--brand-red)] underline-offset-2 hover:underline">
              team.hellomacha@gmail.com
            </a>
          </p>

          <p>
            <span className="font-semibold">Phone:</span>{' '}
            <a href="tel:+917075864991" className="text-[var(--brand-red)] underline-offset-2 hover:underline">
              +91 70758 64991
            </a>
          </p>

          <p>
            <span className="font-semibold">Response time:</span> Typically within 1–3 business days.
          </p>

          <p>
            <span className="font-semibold">Use case:</span> Feedback, collaboration, product questions, or general inquiries.
          </p>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-bold text-[var(--ink)]">Frequently asked questions</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-xl border border-[var(--line)] bg-white p-6">
              <h3 className="text-lg font-bold text-[var(--ink)]">{faq.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-xl border border-[var(--line)] bg-white p-6">
        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">Related pages</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/editorial-policy" className="font-semibold text-[var(--brand-red)] hover:underline">Editorial policy</Link>
          <Link href="/privacy-policy" className="font-semibold text-[var(--brand-red)] hover:underline">Privacy policy</Link>
          <Link href="/disclaimer" className="font-semibold text-[var(--brand-red)] hover:underline">Disclaimer</Link>
          <Link href="/authors/sivarama-krishna" className="font-semibold text-[var(--brand-red)] hover:underline">Our authors</Link>
        </div>
      </section>
    </main>
  )
}