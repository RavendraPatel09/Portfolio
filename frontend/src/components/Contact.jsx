import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { Mail, MapPin, Linkedin, Github, Send, CheckCircle2, AlertCircle } from 'lucide-react'
import SectionReveal from './SectionReveal'

const TO_EMAIL = 'patelsamerth9@gmail.com'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [toast, setToast] = useState(null)

  const send = async (e) => {
    e.preventDefault()
    setSending(true)
    setToast(null)

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    // If EmailJS keys are the placeholders or missing, alert user gracefully
    if (
      !serviceId ||
      !templateId ||
      !publicKey ||
      publicKey === 'your_public_key' ||
      serviceId === 'your_service_id'
    ) {
      setToast({
        type: 'error',
        text: 'Configure real EmailJS keys in frontend/.env to enable direct mailing.',
      })
      setSending(false)
      setTimeout(() => setToast(null), 5000)
      return
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: name,
          from_email: email,
          message,
          reply_to: email,
          to_email: TO_EMAIL,
        },
        { publicKey },
      )
      setToast({ type: 'success', text: 'Message delivered successfully! 🚀' })
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      setToast({ type: 'error', text: 'Failed to send message. Please reach out directly via email.' })
    } finally {
      setSending(false)
      setTimeout(() => setToast(null), 4500)
    }
  }

  const cards = [
    {
      icon: Mail,
      title: 'Email',
      value: TO_EMAIL,
      href: `mailto:${TO_EMAIL}`,
      hint: 'Send an email',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Bhopal, Madhya Pradesh, India',
      href: null,
      hint: 'Open to remote & onsite',
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      value: 'linkedin.com/in/ravendra-patel-3bb375338',
      href: 'https://www.linkedin.com/in/ravendra-patel-3bb375338/',
      hint: 'Professional profile',
    },
    {
      icon: Github,
      title: 'GitHub',
      value: 'github.com/RavendraPatel09',
      href: 'https://github.com/RavendraPatel09',
      hint: 'Source code & repositories',
    },
  ]

  return (
    <SectionReveal>
      <section id="contact" className="relative scroll-mt-24 overflow-hidden px-6 py-24 sm:px-8">
        {/* Ambient glow backgrounds */}
        <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[var(--neon)]/10 blur-[120px] aurora-blob" />
        <div
          className="pointer-events-none absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-[var(--electric)]/12 blur-[130px] aurora-blob"
          style={{ animationDelay: '-6s' }}
        />

        <div className="relative mx-auto max-w-6xl">
          <div className="text-center">
            <span className="inline-block rounded-full border border-[var(--neon)]/30 bg-[var(--neon)]/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[var(--neon)]">
              Get In Touch
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
              Start a Conversation <span className="text-[var(--neon)]">📡</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[var(--text-muted)] sm:text-lg">
              Have a question, an opportunity, or want to collaborate on engineering projects? Feel free to reach out.
            </p>
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-start">
            <div className="space-y-4">
              {cards.map((c) => (
                <InfoCard key={c.title} {...c} />
              ))}
            </div>

            <form
              onSubmit={send}
              className="glass relative rounded-3xl border border-[var(--glass-border)] bg-[var(--bg)]/70 p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
            >
              <h3 className="font-display text-xl font-bold text-[var(--text)] mb-6">Send a Message</h3>
              <Field id="contact-name" label="Your Name" value={name} onChange={setName} />
              <Field id="contact-email" label="Your Email" type="email" value={email} onChange={setEmail} />
              <Field id="contact-msg" label="Your Message" textarea value={message} onChange={setMessage} />

              <motion.button
                type="submit"
                disabled={sending}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--neon)]/50 bg-gradient-to-r from-[var(--neon)]/20 via-[var(--neon)]/15 to-[var(--electric)]/20 py-3.5 text-sm font-bold text-[var(--text)] shadow-[0_0_24px_rgba(0,255,157,0.15)] transition-all duration-300 hover:border-[var(--neon)] hover:shadow-[0_0_36px_rgba(0,255,157,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neon)] disabled:opacity-60"
              >
                <motion.span
                  animate={sending ? { rotate: [0, 360] } : {}}
                  transition={{ duration: 1, repeat: sending ? Infinity : 0, ease: 'linear' }}
                  className="inline-flex"
                >
                  <Send size={16} className="text-[var(--neon)]" />
                </motion.span>
                <span>{sending ? 'Transmitting…' : 'Send Message 🚀'}</span>
              </motion.button>
            </form>
          </div>
        </div>

        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className={`fixed bottom-8 left-1/2 z-[12000] flex w-[min(90vw,420px)] -translate-x-1/2 items-center gap-3 rounded-2xl border px-5 py-4 text-sm font-semibold shadow-2xl backdrop-blur-2xl ${
                toast.type === 'success'
                  ? 'border-[var(--neon)]/50 bg-[var(--bg)]/95 text-[var(--neon)] shadow-[0_0_30px_rgba(0,255,157,0.2)]'
                  : 'border-red-400/50 bg-[var(--bg)]/95 text-red-300 shadow-[0_0_30px_rgba(248,113,113,0.2)]'
              }`}
            >
              {toast.type === 'success' ? (
                <CheckCircle2 size={20} className="shrink-0 text-[var(--neon)]" />
              ) : (
                <AlertCircle size={20} className="shrink-0 text-red-400" />
              )}
              <span>{toast.text}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </SectionReveal>
  )
}

function InfoCard({ icon: Icon, title, value, href, hint }) {
  const content = (
    <div className="glass flex items-center justify-between rounded-2xl border border-[var(--glass-border)] bg-[var(--bg)]/70 p-5 transition-all duration-300 hover:border-[var(--neon)]/35 hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--neon)]/10 text-[var(--neon)] ring-1 ring-[var(--neon)]/25">
          <Icon size={20} />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--electric)]">{title}</p>
          <p className="mt-0.5 break-all text-sm font-medium text-[var(--text)]">{value}</p>
        </div>
      </div>
      {hint && (
        <span className="hidden sm:block text-[11px] font-medium text-[var(--text-muted)] opacity-60">
          {hint}
        </span>
      )}
    </div>
  )

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neon)] rounded-2xl"
      >
        {content}
      </a>
    )
  }
  return content
}

function Field({ id, label, type = 'text', textarea, value, onChange }) {
  const common =
    'peer w-full rounded-xl border border-[var(--glass-border)] bg-[var(--bg)]/50 px-4 text-[var(--text)] outline-none transition-all duration-200 focus:border-[var(--neon)]/60 focus:ring-2 focus:ring-[var(--neon)]/20'

  return (
    <div className="relative mb-5">
      {textarea ? (
        <textarea
          id={id}
          required
          rows={5}
          placeholder=" "
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${common} pb-3 pt-7`}
        />
      ) : (
        <input
          id={id}
          required
          type={type}
          placeholder=" "
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${common} h-14 pt-5`}
        />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-3.5 origin-left text-sm text-[var(--text-muted)] transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:-translate-y-2.5 peer-focus:scale-85 peer-focus:text-[var(--neon)] peer-[:not(:placeholder-shown)]:-translate-y-2.5 peer-[:not(:placeholder-shown)]:scale-85"
      >
        {label}
      </label>
    </div>
  )
}
