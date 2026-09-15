import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact HelloMacha',
  description: 'Get in touch with HelloMacha for questions, feedback, or collaboration opportunities.',
  alternates: {
    canonical: 'https://hellomacha.com/contact',
  },
}

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 pb-12 pt-6 sm:px-6">
      <div className="rounded-2xl border border-[var(--line)] bg-white p-6 shadow-sm sm:p-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-red)]">
          Contact
        </p>
        <h1 className="mb-4 text-3xl font-black tracking-tight text-[var(--ink)]">
          Get in touch with HelloMacha
        </h1>

        <p className="mb-6 text-base text-[var(--muted)]">
          We welcome your feedback, article suggestions, business inquiries, and questions.
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
    </main>
  )
}
