import { useState } from 'react';
import './ForeverBloomPage.css';
import { contactApi } from '../api/client';

// ─── Botanical SVG ────────────────────────────────────────────────────────────

function BotanicalSprig({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Main stem */}
      <path
        d="M30 76 C29 65 27 52 24 40 C21 28 14 17 6 8"
        stroke="#7A9E7E"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.55"
      />
      {/* Left branch */}
      <path
        d="M24 40 C24 40 12 36 5 28"
        stroke="#7A9E7E"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.4"
      />
      {/* Right branch */}
      <path
        d="M27 52 C27 52 38 48 44 40"
        stroke="#7A9E7E"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.4"
      />
      {/* Leaves */}
      <ellipse cx="21" cy="37" rx="8" ry="4" transform="rotate(-35 21 37)" fill="#7A9E7E" opacity="0.2" />
      <ellipse cx="36" cy="46" rx="8" ry="4" transform="rotate(30 36 46)" fill="#7A9E7E" opacity="0.2" />
      {/* Blooms */}
      <circle cx="7" cy="7" r="3.5" fill="#C4714F" opacity="0.3" />
      <circle cx="13" cy="3" r="2.5" fill="#C4714F" opacity="0.25" />
      <circle cx="2" cy="15" r="2" fill="#C4714F" opacity="0.2" />
    </svg>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-[#FAF7F2]/95 backdrop-blur-sm border-b border-[#E8E0D5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <a href="#" className="fb-serif text-xl sm:text-2xl text-[#7A9E7E] tracking-wide">
          Forever Bloom
        </a>
        <div className="flex items-center gap-5 sm:gap-8">
          <a
            href="#how-it-works"
            className="text-sm text-[#6B6B6B] hover:text-[#2C2C2C] transition-colors"
          >
            How it works
          </a>
          <a
            href="#contact"
            className="text-sm font-medium text-[#7A9E7E] hover:text-[#5A8A5E] transition-colors"
          >
            Get in touch
          </a>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="bg-gradient-to-b from-[#FAF7F2] to-[#F5EDE3] py-20 sm:py-32 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex justify-center mb-10">
          <BotanicalSprig className="w-12 h-16 sm:w-14 sm:h-20 opacity-80" />
        </div>
        <h1 className="fb-serif text-4xl sm:text-5xl lg:text-6xl text-[#2C2C2C] leading-tight tracking-wide mb-6">
          A farewell as unique as the life it celebrates.
        </h1>
        <p className="text-lg sm:text-xl text-[#6B6B6B] leading-relaxed mb-10 max-w-xl mx-auto">
          We create ceremonies shaped around the person — their passions, their places,
          the things that made them who they were.
        </p>
        <a
          href="#contact"
          className="inline-block px-8 py-3.5 bg-[#7A9E7E] text-white rounded-full text-sm sm:text-base font-medium hover:bg-[#6A8E6E] transition-colors tracking-wide"
        >
          Tell us about them
        </a>
      </div>
    </section>
  );
}

// ─── What We Offer ────────────────────────────────────────────────────────────

function WhatWeOffer() {
  const cards = [
    {
      icon: '🌿',
      title: 'A Ceremony Designed Around Their Life',
      body: 'Their passions, places, and people — woven into every detail.',
    },
    {
      icon: '🪴',
      title: 'Living Memorials',
      body: 'A plant, a garden, a tree. Something that grows as their memory does.',
    },
    {
      icon: '🤝',
      title: 'A Dedicated Guide',
      body: 'Someone who listens first, then plans — so you can simply be present.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-[#FAF7F2]">
      <div className="max-w-5xl mx-auto">
        <h2 className="fb-serif text-3xl sm:text-4xl text-[#2C2C2C] text-center tracking-wide mb-12 sm:mb-16">
          A farewell shaped around them.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((card) => (
            <div key={card.title} className="bg-[#7A9E7E]/10 rounded-2xl p-7 sm:p-8">
              <div className="text-3xl mb-4">{card.icon}</div>
              <h3 className="fb-serif text-xl text-[#2C2C2C] leading-snug mb-3">
                {card.title}
              </h3>
              <p className="text-[#6B6B6B] text-sm sm:text-base leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Story Block ──────────────────────────────────────────────────────────────

function StoryBlock() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-[#FEF6F2]">
      <div className="max-w-2xl mx-auto">
        <h2 className="fb-serif text-3xl sm:text-4xl text-[#2C2C2C] text-center tracking-wide mb-10 sm:mb-14">
          Every life has a story. Every farewell should tell it.
        </h2>
        <div className="border-l-2 border-[#C4714F]/30 pl-6 sm:pl-8 space-y-5 text-[#2C2C2C] text-lg sm:text-xl leading-[1.85]">
          <p>
            Margaret spent forty years in her garden. She knew the name of every rose,
            kept notes on the soil, and pressed flowers in the back of every book she
            ever read.
          </p>
          <p>When she died, her family didn't want a chapel. They wanted her garden.</p>
          <p>
            We held her farewell on a warm Tuesday afternoon, among the roses she'd
            tended since her children were small. Each guest carried a seedling from
            her collection. A portion of her ashes was placed in a hand-thrown pot,
            alongside a cutting from her favourite climbing rose — now living on her
            daughter's front porch.
          </p>
          <p>That pot blooms every November.</p>
        </div>
        <p className="mt-10 fb-serif text-base sm:text-lg italic text-[#7A9E7E] leading-relaxed">
          This is what a Forever Bloom farewell looks like. Different every time.
          Exactly right, every time.
        </p>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────

function HowItWorks() {
  const steps = [
    {
      n: '1',
      title: 'Tell us about them',
      body: 'We ask about their life, not just the logistics. Their hobbies, humour, the things that made them them.',
    },
    {
      n: '2',
      title: 'We design the ceremony',
      body: 'You review a plan built around who they were — the setting, the ritual, the living memorial.',
    },
    {
      n: '3',
      title: 'Be present, not burdened',
      body: 'We handle everything on the day. You just show up and celebrate them.',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 px-4 sm:px-6 bg-[#FAF7F2]">
      <div className="max-w-5xl mx-auto">
        <h2 className="fb-serif text-3xl sm:text-4xl text-[#2C2C2C] text-center tracking-wide mb-12 sm:mb-16">
          Three steps to a farewell they'd be proud of.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
          {steps.map((step) => (
            <div key={step.n} className="flex flex-col items-start">
              <span className="fb-serif text-6xl sm:text-7xl text-[#7A9E7E] leading-none mb-4 opacity-60">
                {step.n}
              </span>
              <h3 className="fb-serif text-xl text-[#2C2C2C] mb-3">{step.title}</h3>
              <p className="text-[#6B6B6B] text-sm sm:text-base leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Trust ────────────────────────────────────────────────────────────────────

function Trust() {
  const items = [
    {
      title: 'No funeral home required',
      body: 'We work independently of the traditional funeral industry.',
    },
    {
      title: 'A compassionate guide, always',
      body: 'Every family has a dedicated coordinator from first call to final day.',
    },
    {
      title: 'Fully personalised, every time',
      body: 'No packages, no checklists. Every ceremony is built from scratch.',
    },
    {
      title: 'Something living left behind',
      body: 'Every farewell ends with something that grows.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-[#F2EDE5]">
      <div className="max-w-3xl mx-auto">
        <h2 className="fb-serif text-3xl sm:text-4xl text-[#2C2C2C] text-center tracking-wide mb-12 sm:mb-14">
          For families who want something real.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {items.map((item) => (
            <div key={item.title} className="border-t-2 border-[#7A9E7E]/40 pt-5">
              <h3 className="font-medium text-[#2C2C2C] mb-2">{item.title}</h3>
              <p className="text-[#6B6B6B] text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await contactApi.submit(form);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const inputClass =
    'w-full border border-[#E8E0D5] rounded-lg px-4 py-3 bg-white text-[#2C2C2C] placeholder-[#6B6B6B]/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#7A9E7E]/40 transition-shadow';
  const labelClass = 'block text-sm font-medium text-[#2C2C2C] mb-1.5';

  if (status === 'success') {
    return (
      <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 bg-[#FAF7F2]">
        <div className="max-w-xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <BotanicalSprig className="w-10 h-14 opacity-70" />
          </div>
          <h2 className="fb-serif text-3xl sm:text-4xl text-[#2C2C2C] tracking-wide mb-4">
            Thank you.
          </h2>
          <p className="text-[#6B6B6B] text-lg leading-relaxed">
            We'll be in touch within a few hours. In the meantime, take all the time
            you need.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 bg-[#FAF7F2]">
      <div className="max-w-xl mx-auto">
        <h2 className="fb-serif text-3xl sm:text-4xl text-[#2C2C2C] text-center tracking-wide mb-4">
          Tell us about them.
        </h2>
        <p className="text-[#6B6B6B] text-center text-base sm:text-lg leading-relaxed mb-10">
          We'll be in touch within a few hours. There's no obligation — just a gentle
          first conversation.
        </p>
        {status === 'error' && (
          <p className="text-red-600 text-sm text-center mb-6">
            Something went wrong — please try again.
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fb-name" className={labelClass}>Your name</label>
            <input
              type="text"
              id="fb-name"
              required
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="fb-email" className={labelClass}>Your email</label>
            <input
              type="email"
              id="fb-email"
              required
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="fb-phone" className={labelClass}>
              Your phone{' '}
              <span className="text-[#6B6B6B] font-normal">(optional)</span>
            </label>
            <input
              type="tel"
              id="fb-phone"
              value={form.phone}
              onChange={(e) => set('phone', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="fb-message" className={labelClass}>
              Tell us a little about them
            </label>
            <textarea
              id="fb-message"
              rows={4}
              value={form.message}
              onChange={(e) => set('message', e.target.value)}
              className={`${inputClass} resize-none`}
            />
          </div>
          <div className="pt-2">
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#C4714F] text-white rounded-full text-sm font-medium hover:bg-[#B3613F] transition-colors tracking-wide disabled:opacity-60"
            >
              {status === 'submitting' ? 'Sending…' : 'Start the conversation'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="py-8 px-4 sm:px-6 border-t border-[#E8E0D5] bg-[#FAF7F2]">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className="fb-serif text-lg text-[#7A9E7E]">Forever Bloom</span>
        <span className="text-xs text-[#6B6B6B]">Personalised farewells across Australia.</span>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ForeverBloomPage() {
  return (
    <div className="fb-sans fb-fade-in bg-[#FAF7F2] min-h-screen text-[#2C2C2C]">
      <Nav />
      <Hero />
      <WhatWeOffer />
      <StoryBlock />
      <HowItWorks />
      <Trust />
      <Contact />
      <Footer />
    </div>
  );
}
