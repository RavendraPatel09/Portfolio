import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { Mail, Linkedin, Github, Send, CheckCircle2, AlertCircle } from 'lucide-react'
import SectionReveal from './SectionReveal'

const RECIPIENT_EMAIL = 'patelsamerth9@gmail.com'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('') // Anti-spam bot trap
  const [sending, setSending] = useState(false)
  const [toast, setToast] = useState(null)

  const showToast = (type, text, duration = 5000) => {
    setToast({ type, text })
    setTimeout(() => setToast(null), duration)
  }

  const send = async (e) => {
    e.preventDefault()

    // 1. Bot honeypot check (hidden field)
    if (honeypot) {
      setToast({ type: 'success', text: 'Thank you for your submission.' })
      setName('')
      setEmail('')
      setMessage('')
      return
    }

    // 2. Input validation & trimming
    const trimmedName = name.trim()
    const trimmedEmail = email.trim()
    const trimmedMessage = message.trim()

    if (!trimmedName || trimmedName.length < 2) {
      showToast('error', 'Please enter your name (at least 2 characters).')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      showToast('error', 'Please provide a valid email address.')
      return
    }

    if (!trimmedMessage || trimmedMessage.length < 10) {
      showToast('error', 'Please write a message with at least 10 characters.')
      return
    }

    // 3. Client-side rate-limiting / spam prevention (30 seconds cooldown)
    const lastSent = sessionStorage.getItem('rp_last_contact_ts')
    if (lastSent && Date.now() - Number(lastSent) < 30000) {
      const remainingSec = Math.ceil((30000 - (Date.now() - Number(lastSent))) / 1000)
      showToast('error', `Please wait ${remainingSec}s before submitting another message.`)
      return
    }

    setSending(true)
    setToast(null)

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    const isPlaceholderOrMissing =
      !serviceId ||
      !templateId ||
      !publicKey ||
      publicKey === 'your_public_key' ||
      serviceId === 'your_service_id' ||
      templateId === 'your_template_id'

    // If EmailJS credentials are not yet configured in frontend/.env
    if (isPlaceholderOrMissing) {
      showToast(
        'error',
        `EmailJS keys are not set up in frontend/.env yet. Please email directly at ${RECIPIENT_EMAIL}.`,
        7000
      )
      setSending(false)
      return
    }

    // 4. Send email via EmailJS
    const timestamp = new Date().toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    })

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: trimmedName,
          name: trimmedName,
          from_email: trimmedEmail,
          email: trimmedEmail,
          reply_to: trimmedEmail,
          to_email: RECIPIENT_EMAIL,
          to_name: 'Ravendra Patel',
          subject: `New Portfolio Contact Message from ${trimmedName}`,
          message: trimmedMessage,
          submission_time: timestamp,
        },
        { publicKey }
      )

      sessionStorage.setItem('rp_last_contact_ts', String(Date.now()))
      showToast('success', `Message delivered successfully to ${RECIPIENT_EMAIL}! 🚀`, 6000)
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      showToast(
        'error',
        `Delivery encountered an issue. Please try again or email ${RECIPIENT_EMAIL} directly.`,
        6000
      )
      // Note: form inputs are preserved so visitor doesn't lose their message!
    } finally {
      setSending(false)
    }
  }

  const cards = [
    {
      icon: Mail,
      title: 'Email',
      value: RECIPIENT_EMAIL,
      href: `mailto:${RECIPIENT_EMAIL}`,
      hint: 'Direct Inbox',
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      value: 'linkedin.com/in/ravendra-patel-3bb375338',
      href: 'https://www.linkedin.com/in/ravendra-patel-3bb375338/',
      hint: 'Professional Profile',
    },
    {
      icon: Github,
      title: 'GitHub',
      value: 'github.com/RavendraPatel09',
      href: 'https://github.com/RavendraPatel09',
      hint: 'Repositories & Code',
    },
  ]

  return (
    <SectionReveal>
      <section id="contact" className="relative scroll-mt-24 overflow-hidden px-6 py-14 sm:py-16 sm:px-8">
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
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
              Start a Conversation <span className="text-[var(--neon)]">📡</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-[var(--text-muted)] sm:text-lg">
              Have a question, project proposal, or engineering collaboration in mind? Feel free to send a message.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-start">
            {/* Contact Information Cards */}
            <div className="space-y-3">
              {cards.map((c) => (
                <InfoCard key={c.title} {...c} />
              ))}
            </div>

            {/* Interactive Contact Form */}
            <form
              onSubmit={send}
              className="glass relative rounded-3xl border border-[var(--glass-border)] bg-[var(--card-bg)] p-5 sm:p-6 shadow-[var(--card-shadow)] transition-all duration-300"
            >
              {/* Anti-spam honeypot field (hidden from real users) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="contact-hp">Website / Company</label>
                <input
                  id="contact-hp"
                  type="text"
                  name="_hp"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="mb-6 flex items-center justify-between border-b border-[var(--glass-border)] pb-3">
                <h3 className="font-display text-xl font-bold text-[var(--text)]">Send a Message</h3>
                <span className="font-mono text-xs text-[var(--neon)]">Direct to Inbox</span>
              </div>

              <Field id="contact-name" label="Your Name" value={name} onChange={setName} />
              <Field id="contact-email" label="Your Email" type="email" value={email} onChange={setEmail} />
              <Field id="contact-msg" label="Your Message" textarea value={message} onChange={setMessage} />

              <motion.button
                type="submit"
                disabled={sending}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--neon)]/50 bg-gradient-to-r from-[var(--neon)]/20 via-[var(--neon)]/15 to-[var(--electric)]/20 py-3.5 text-sm font-bold text-[var(--text)] shadow-[0_0_24px_rgba(0,255,157,0.15)] transition-all duration-300 hover:border-[var(--neon)] hover:shadow-[0_0_36px_rgba(0,255,157,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neon)] disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
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

              <p className="mt-3 text-center text-[11px] text-[var(--text-muted)]">
                Recipient: <span className="font-mono text-[var(--electric)]">{RECIPIENT_EMAIL}</span>
              </p>
            </form>
          </div>
        </div>

        {/* Status Toast Notification */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className={`fixed bottom-8 left-1/2 z-[12000] flex w-[min(90vw,440px)] -translate-x-1/2 items-center gap-3 rounded-2xl border px-5 py-4 text-sm font-semibold shadow-2xl backdrop-blur-2xl transition-colors duration-200 ${
                toast.type === 'success'
                  ? 'border-[var(--neon)]/60 bg-[var(--card-bg)] text-[var(--neon)] shadow-[0_8px_32px_rgba(0,255,157,0.25)]'
                  : 'border-red-500/50 bg-[var(--card-bg)] text-red-600 dark:text-red-400 shadow-[0_8px_32px_rgba(239,68,68,0.25)]'
              }`}
            >
              {toast.type === 'success' ? (
                <CheckCircle2 size={20} className="shrink-0 text-[var(--neon)]" />
              ) : (
                <AlertCircle size={20} className="shrink-0 text-red-500" />
              )}
              <span className="leading-snug">{toast.text}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </SectionReveal>
  )
}

function InfoCard({ icon: Icon, title, value, href, hint }) {
  const content = (
    <div className="glass flex items-center justify-between rounded-2xl border border-[var(--glass-border)] bg-[var(--card-bg)] p-5 transition-all duration-300 hover:border-[var(--neon)]/35 shadow-[var(--card-shadow)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.18)]">
      <div className="flex items-center gap-4 min-w-0">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--neon)]/10 text-[var(--neon)] ring-1 ring-[var(--neon)]/25">
          <Icon size={20} />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--electric)]">{title}</p>
          <p className="mt-0.5 break-all text-sm font-medium text-[var(--text)]">{value}</p>
        </div>
      </div>
      {hint && (
        <span className="hidden sm:block text-[11px] font-medium text-[var(--text-muted)] opacity-70 shrink-0 ml-3">
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
    'peer w-full rounded-xl border border-[var(--glass-border)] bg-[var(--input-bg)] px-4 text-[var(--text)] outline-none transition-all duration-200 focus:border-[var(--neon)]/70 focus:ring-2 focus:ring-[var(--neon)]/20 shadow-sm'

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
        className="pointer-events-none absolute left-4 top-3.5 origin-left text-sm text-[var(--text-muted)] transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:-translate-y-2.5 peer-focus:scale-85 peer-focus:text-[var(--neon)] peer-[:not(:placeholder-shown)]:-translate-y-2.5 peer-[:not(:placeholder-shown)]:scale-85 font-medium"
      >
        {label}
      </label>
    </div>
  )
}
