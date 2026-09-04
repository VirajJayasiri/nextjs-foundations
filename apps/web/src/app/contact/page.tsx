import { ContactForm } from '@/components/contact-form'

export default function ContactPage() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-8 py-8">
      <header>
        <p className="font-medium text-sm uppercase tracking-widest text-muted-foreground">
          Server Actions
        </p>
        <h1 className="mt-2 font-bold text-4xl tracking-tight">Contact us</h1>
        <p className="mt-3 text-muted-foreground">
          Send a message and we will get back to you soon.
        </p>
      </header>

      <section className="rounded-lg border bg-muted/30 p-6">
        <ContactForm />
      </section>
    </main>
  )
}