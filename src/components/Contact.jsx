import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { Mail, MapPin, Linkedin, Github, Send } from 'lucide-react'
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

    if (!serviceId || !templateId || !publicKey) {
      setToast({ type: 'error', text: 'Configure EmailJS keys in .env (see .env.example).' })
      setSending(false)
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
      setToast({ type: 'success', text: 'Message sent! 🚀' })
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      setToast({ type: 'error', text: 'Try again 😔' })
    } finally {
      setSending(false)
      setTimeout(() => setToast(null), 4200)
    }
  }

  const cards = [
    { icon: Mail, title: 'Email', value: TO_EMAIL, href: `mailto:${TO_EMAIL}` },
    { icon: MapPin, title: 'Location', value: 'MP, India', href: null },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      value: 'linkedin.com/in/ravendra-patel-3bb375338',
      href: 'https://www.linkedin.com/in/ravendra-patel-3bb375338/',
    },
    {
      icon: Github,
      title: 'GitHub',
      value: 'github.com/RavendraPatel09',
      href: 'https://github.com/RavendraPatel09',
    },
  ]

  return (
    <SectionReveal>
      <section id="contact" className="relative scroll-mt-24 overflow-hidden px-6 py-24 sm:px-8">
        <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[var(--neon)]/15 blur-[100px] aurora-blob" />
        <div
          className="pointer-events-none absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-[var(--electric)]/20 blur-[110px] aurora-blob"
          style={{ animationDelay: '-6s' }}
        />

        <div className="relative mx-auto max-w-6xl">
          <h2 className="text-center font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            Establish Connection <span className="text-[var(--neon)]">📡</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--text-muted)]">
            Let&apos;s collaborate — whether it&apos;s Gen AI, systems, or your next big idea.
          </p>

          <div className="mt-14 grid gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              {cards.map((c) => (
                <InfoLift key={c.title} {...c} />
              ))}
            </div>

            <form onSubmit={send} className="glass relative rounded-3xl border border-[var(--glass-border)] p-6 sm:p-8">
              <Field id="nm" label="Name" value={name} onChange={setName} />
              <Field id="em" label="Email" type="email" value={email} onChange={setEmail} />
              <Field id="msg" label="Message" textarea value={message} onChange={setMessage} />

              <motion.button
                type="submit"
                disabled={sending}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--neon)]/40 bg-gradient-to-r from-[var(--neon)]/20 to-[var(--electric)]/20 py-3.5 text-sm font-bold text-[var(--text)] shadow-[0_0_28px_rgba(0,255,157,0.12)] transition disabled:opacity-60"
              >
                <motion.span
                  animate={sending ? { x: [0, 6, 0], rotate: [0, 12, 0] } : {}}
                  transition={{ duration: 0.6, repeat: sending ? Infinity : 0 }}
                  className="inline-flex"
                >
                  <Send size={18} className="text-[var(--neon)]" />
                </motion.span>
                Send 🚀
              </motion.button>
            </form>
          </div>
        </div>

        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              className={`fixed bottom-8 left-1/2 z-[12000] w-[min(90vw,380px)] -translate-x-1/2 rounded-2xl border px-5 py-4 text-center text-sm font-semibold shadow-xl backdrop-blur-xl ${
                toast.type === 'success'
                  ? 'border-[var(--neon)]/40 bg-[var(--bg)]/90 text-[var(--neon)]'
                  : 'border-red-400/40 bg-[var(--bg)]/90 text-red-300'
              }`}
            >
              {toast.text}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </SectionReveal>
  )
}

function InfoLift({ icon: Icon, title, value, href }) {
  const ref = useRef(null)
  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width / 2) * 0.06
    const y = (e.clientY - r.top - r.height / 2) * 0.06
    el.style.transform = `translate(${x}px, ${y}px) translateY(-4px)`
  }
  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate(0,0)'
  }

  const inner = (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="glass flex items-start gap-4 rounded-2xl border border-[var(--glass-border)] p-5 transition-shadow duration-300 hover:shadow-[0_16px_50px_rgba(0,0,0,0.35)]"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--neon)]/10 text-[var(--neon)] ring-1 ring-[var(--neon)]/25">
        <Icon size={22} />
      </span>
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--electric)]">{title}</p>
        <p className="mt-1 break-all text-sm text-[var(--text)]">{value}</p>
      </div>
    </div>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="block">
        {inner}
      </a>
    )
  }
  return inner
}

function Field({ id, label, type = 'text', textarea, value, onChange }) {
  const common =
    'peer w-full rounded-xl border border-[var(--glass-border)] bg-[var(--bg)]/40 px-4 text-[var(--text)] outline-none transition focus:border-[var(--neon)]/50 focus:ring-2 focus:ring-[var(--neon)]/20'

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
        className="pointer-events-none absolute left-4 top-3.5 origin-left text-sm text-[var(--text-muted)] transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-translate-y-2 peer-focus:scale-90 peer-focus:text-[var(--neon)] peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:scale-90"
      >
        {label}
      </label>
    </div>
  )
}
