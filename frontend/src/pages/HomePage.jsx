import React, { useState, useEffect, useRef } from 'react';
import {
  FaUserPlus,
  FaClipboardList,
  FaChartLine,
  FaFileInvoiceDollar,
  FaLayerGroup,
  FaEnvelopeOpenText,
  FaRobot,
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
  FaShieldAlt,
  FaCode,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    icon: <FaClipboardList />,
    title: 'Fast Order Creation',
    desc: 'Generate orders in seconds with our intuitive form.',
  },
  {
    icon: <FaFileInvoiceDollar />,
    title: 'Generate Invoices Easily',
    desc: 'Turn any order into a compliant invoice in one click.',
  },
  {
    icon: <FaChartLine />,
    title: 'Real-Time Data Analytics',
    desc: 'Gain dynamic insights into business trends.',
  },
  {
    icon: <FaLayerGroup />,
    title: 'Bulk Ordering',
    desc: 'Upload a CSV and process hundreds of orders at once.',
  },
  {
    icon: <FaEnvelopeOpenText />,
    title: 'Email Notifications',
    desc: 'Keep your clients updated with instant email alerts.',
  },
  {
    icon: <FaRobot />,
    title: 'Chat-Bot Assistant',
    desc: "Need help? Our chatbot is on hand whenever you're stuck.",
  },
];

const faqs = [
  {
    question: 'How do I create a new order on the platform?',
    answer:
      'Creating an order is simple. Just log in, go to the Create Order section, and fill in the buyer, seller, and item details. Once submitted, an order is generated automatically and saved to your order history.',
  },
  {
    question: 'How does this benefit me?',
    answer:
      "Time is money, save both with our free and premium features which do all the things you don't want to. Tedious tasks become a thing of the past.",
  },
  {
    question: 'Is my data secure on this platform?',
    answer:
      'Yes. We use JWT-based session handling so access to your account can be revoked the moment you log out, on top of standard encrypted password storage.',
  },
  {
    question: 'Will my customers receive a confirmation email after placing an order?',
    answer:
      'Absolutely. Every successful order automatically triggers a confirmation email to both the buyer and seller, ensuring full transparency and documentation.',
  },
];

const steps = [
  { icon: <FaUserPlus />, title: 'Sign Up', desc: 'Create an account in under a minute.' },
  { icon: <FaClipboardList />, title: 'Create Orders', desc: 'Generate professional orders with ease.' },
  { icon: <FaChartLine />, title: 'Track Progress', desc: 'Follow your orders in real time.' },
];

// Shared scroll-reveal hook
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold }
    );
    observer.observe(node);
    return () => observer.unobserve(node);
  }, [threshold]);

  return [ref, isVisible];
}

function AnimatedCard({ delay = 0, children }) {
  const [ref, isVisible] = useInView(0.1);
  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease-out, transform 0.6s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// Signature element: a live-looking order ticket that animates its own state,
// standing in for an actual product screenshot.
function OrderTicket() {
  const [status, setStatus] = useState(0);
  const statuses = [
    { label: 'Draft', color: 'bg-gray-500' },
    { label: 'Sent', color: 'bg-sky-500' },
    { label: 'Paid', color: 'bg-green-500' },
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setStatus((s) => (s + 1) % statuses.length);
    }, 2200);
    return () => clearInterval(id);
  }, [statuses.length]);

  return (
    <div className="relative w-full max-w-sm">
      <div className="absolute -inset-6 bg-violet-600/20 blur-3xl rounded-full" aria-hidden="true" />

      <div className="relative rounded-2xl border border-gray-700 bg-gray-950/80 shadow-2xl shadow-black/40 backdrop-blur-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-violet-500" />
            <span className="text-sm font-semibold text-gray-200">Order #A-1042</span>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-medium text-white px-2.5 py-1 rounded-full transition-colors duration-500 ${statuses[status].color}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
            {statuses[status].label}
          </span>
        </div>

        <div className="px-5 py-4 space-y-3 text-sm">
          <div className="flex justify-between text-gray-400">
            <span>Buyer</span>
            <span className="text-gray-200 font-medium">Harbour & Co.</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Items</span>
            <span className="text-gray-200 font-medium">14</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Standard</span>
            <span className="text-gray-200 font-medium">UBL 2.1</span>
          </div>
          <div className="h-px bg-gray-800 my-2" />
          <div className="flex justify-between">
            <span className="text-gray-400">Total</span>
            <span className="text-white font-semibold">$4,820.00</span>
          </div>
        </div>

        <div className="px-5 py-3 bg-gray-900/60 border-t border-gray-800 flex items-center gap-2 text-xs text-gray-500">
          <FaShieldAlt className="text-violet-500" />
          Auto-validated against UBL schema
        </div>
      </div>
    </div>
  );
}

// Stub XML document used purely for the homepage's live-typing visual --
// not a real order, just representative output to show what the platform
// actually generates under the hood.
const STUB_XML = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Order>
  <orderId>9fLqM2pXkz8wYh3-Nbz</orderId>
  <buyer>
    <buyerName>Harbour & Co.</buyerName>
    <buyerEmail>accounts@harbourco.com</buyerEmail>
    <buyerCountry>Australia</buyerCountry>
  </buyer>
  <seller>
    <sellerName>OrderNova Pty Ltd</sellerName>
    <sellerCountry>Australia</sellerCountry>
  </seller>
  <items>
    <itemDescription>Industrial Shelving Unit</itemDescription>
    <itemQuantity>14</itemQuantity>
    <itemPrice>344.29</itemPrice>
  </items>
  <timestamp>2026-06-30T09:12:04.118Z</timestamp>
</Order>`;

// Lightweight XML syntax tokenizer -- colors tags, attributes, and text
// content distinctly. The declaration/attribute-value patterns tolerate
// truncation (no closing ?> or closing quote yet) since this renders a
// live, in-progress typing animation, not always-complete XML.
function XmlSyntax({ xml }) {
  const tokenPattern = /(<\?[\s\S]*?(\?>|$))|(<\/?[\w:.-]*)|(\s[\w:.-]+(?==))|(="[^"]*"?)|(\/?>)|([^<]+)/g;
  const nodes = [];
  let match;
  let key = 0;

  while ((match = tokenPattern.exec(xml)) !== null) {
    if (match[0] === '') {
      tokenPattern.lastIndex++;
      continue;
    }
    const [, decl, , tagOpen, attrName, attrValue, tagClose, text] = match;
    if (decl !== undefined) {
      nodes.push(<span key={key++} className="text-gray-500">{match[0]}</span>);
    } else if (tagOpen !== undefined) {
      nodes.push(<span key={key++} className="text-violet-400 font-medium">{match[0]}</span>);
    } else if (attrName !== undefined) {
      nodes.push(<span key={key++} className="text-sky-400">{match[0]}</span>);
    } else if (attrValue !== undefined) {
      nodes.push(<span key={key++} className="text-emerald-400">{match[0]}</span>);
    } else if (tagClose !== undefined) {
      nodes.push(<span key={key++} className="text-violet-400 font-medium">{match[0]}</span>);
    } else if (text !== undefined) {
      nodes.push(<span key={key++} className="text-gray-200">{match[0]}</span>);
    }
  }

  return <>{nodes}</>;
}

// Types the stub XML out character by character, holds it briefly, fades
// out, then restarts -- a slow, deliberate loop rather than an abrupt reset.
function XmlTypewriterSection() {
  const [visibleChars, setVisibleChars] = useState(0);
  const [phase, setPhase] = useState('typing'); // 'typing' | 'holding' | 'fading'
  const [sectionRef, isVisible] = useInView(0.2);

  useEffect(() => {
    if (!isVisible) return;

    let frame;
    let timeout;

    if (phase === 'typing') {
      if (visibleChars < STUB_XML.length) {
        frame = setTimeout(() => setVisibleChars((c) => c + 1), 14);
      } else {
        timeout = setTimeout(() => setPhase('holding'), 1800);
      }
    } else if (phase === 'holding') {
      timeout = setTimeout(() => setPhase('fading'), 2200);
    } else if (phase === 'fading') {
      timeout = setTimeout(() => {
        setVisibleChars(0);
        setPhase('typing');
      }, 700);
    }

    return () => {
      clearTimeout(frame);
      clearTimeout(timeout);
    };
  }, [phase, visibleChars, isVisible]);

  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-xs font-semibold tracking-widest text-violet-400 uppercase">
            Under the hood
          </span>
          <h2 className="text-3xl font-bold text-white mt-2 mb-4">
            Every order, standards-compliant
          </h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            Every order you create is automatically generated as a structured,
            UBL-standard XML document -- ready to validate, archive, or hand
            off to any system that speaks the standard. No manual formatting,
            no inconsistent records.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FaShieldAlt className="text-violet-500" />
            Generated automatically on every order
          </div>
        </div>

        <div ref={sectionRef} className="relative">
          <div className="absolute -inset-6 bg-violet-600/15 blur-3xl rounded-full" aria-hidden="true" />
          <div className="relative rounded-2xl border border-gray-800 bg-gray-900/80 shadow-2xl shadow-black/40 backdrop-blur-sm overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-gray-800">
              <FaCode className="text-violet-400 text-xs" />
              <span className="text-xs font-medium text-gray-400">order.xml</span>
            </div>
            <pre
              className={`px-5 py-4 text-xs leading-relaxed font-mono whitespace-pre-wrap overflow-hidden transition-opacity duration-700 ${
                phase === 'fading' ? 'opacity-0' : 'opacity-100'
              }`}
              style={{ minHeight: '19rem' }}
            >
              <code>
                <XmlSyntax xml={STUB_XML.slice(0, visibleChars)} />
                <span
                  className={`inline-block w-1.5 h-3.5 bg-violet-400 ml-0.5 align-middle ${
                    phase === 'typing' ? 'animate-pulse' : 'opacity-0'
                  }`}
                  aria-hidden="true"
                />
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="group bg-gray-800/60 border border-gray-800 rounded-xl p-6 hover:border-violet-600/50 hover:bg-gray-800 transition-all duration-300 h-full">
      <div className="w-10 h-10 rounded-lg bg-violet-600/15 text-violet-400 flex items-center justify-center text-lg mb-4 group-hover:bg-violet-600 group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <h4 className="text-base font-semibold mb-1.5 text-white">{title}</h4>
      <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}

function FAQCard({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-colors">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex justify-between items-center gap-4 px-6 py-5 text-left"
      >
        <h3 className="text-base font-medium text-white">{question}</h3>
        <FaChevronDown
          className={`text-violet-400 flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`px-6 text-sm text-gray-400 leading-relaxed transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 pb-0 opacity-0'
        } overflow-hidden`}
      >
        {answer}
      </div>
    </div>
  );
}

function HowItWorksSection() {
  const [visibleStep, setVisibleStep] = useState(0);

  useEffect(() => {
    const timers = steps.slice(1).map((_, i) =>
      setTimeout(() => setVisibleStep(i + 1), (i + 1) * 1400)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="py-20 px-4" id="how-it-works">
      <div className="max-w-5xl mx-auto text-center">
        <span className="text-xs font-semibold tracking-widest text-violet-400 uppercase">
          Getting started
        </span>
        <h2 className="text-3xl font-bold text-white mt-2 mb-12">How it works</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 relative">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`relative text-center transition-all duration-700 ${
                index > visibleStep ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
              }`}
            >
              <div className="w-14 h-14 mx-auto rounded-full bg-violet-600/15 border border-violet-600/30 text-violet-400 flex items-center justify-center text-xl mb-4">
                {step.icon}
              </div>
              <h3 className="text-lg font-semibold mb-1.5 text-white">{step.title}</h3>
              <p className="text-sm text-gray-400">{step.desc}</p>

              {index < steps.length - 1 && (
                <div
                  className={`hidden sm:block absolute top-7 left-[calc(100%+0.5rem)] w-[calc(100%-1rem)] h-px bg-gradient-to-r from-violet-600/40 to-transparent transition-opacity duration-500 ${
                    index < visibleStep ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  const navigate = useNavigate();
  const [isAuthed, setIsAuthed] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthed(!!token);
  }, []);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -300 : 300,
      behavior: 'smooth',
    });
  };

  const handleDashboardClick = () => {
    const token = localStorage.getItem('authToken');
    navigate(token ? '/dashboard' : '/login');
  };

  return (
    <div className="relative bg-gray-900 text-gray-100 min-h-screen">
      {/* Page-wide ambient glow, fixed so it stays in place as the page scrolls */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_20%_0%,_theme(colors.violet.600/0.16),_transparent_45%),radial-gradient(circle_at_80%_35%,_theme(colors.violet.600/0.10),_transparent_40%),radial-gradient(circle_at_30%_85%,_theme(colors.violet.600/0.08),_transparent_45%)]"
        aria-hidden="true"
      />

      <div className="relative z-10">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-gray-950/80 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-white tracking-tight">
            Order<span className="text-violet-500">Nova</span>
          </h1>
          <nav className="flex items-center gap-6">
            {isAuthed && (
              <button
                onClick={handleDashboardClick}
                className="text-sm text-gray-300 hover:text-white transition-colors border border-gray-700 px-3 py-1.5 rounded-lg hover:border-gray-600"
              >
                Dashboard
              </button>
            )}
            <a href="#features" className="hidden sm:inline text-sm text-gray-400 hover:text-white transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hidden sm:inline text-sm text-gray-400 hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#pricing" className="hidden sm:inline text-sm text-gray-400 hover:text-white transition-colors">
              Pricing
            </a>
            <a href="/login" className="text-sm text-gray-300 hover:text-white font-medium transition-colors">
              Login
            </a>
            <a
              href="/signup"
              className="text-sm bg-violet-600 hover:bg-violet-500 text-white font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Sign up
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 grid md:grid-cols-2 gap-16 items-center">
          <div className="max-w-xl">
            <span className="inline-block text-xs font-semibold tracking-widest text-violet-400 uppercase mb-4">
              Order &amp; invoice automation
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-5 text-white leading-[1.1]">
              Manage orders.<br />Save time.
            </h2>
            <p className="text-lg mb-8 text-gray-400 leading-relaxed">
              OrderNova helps businesses streamline order creation, invoicing, and
              business analytics in one unified platform.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="/signup"
                className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-colors"
              >
                Get started for free
              </a>
              <a
                href="#features"
                className="px-6 py-3 text-gray-300 hover:text-white font-medium transition-colors"
              >
                See features &rarr;
              </a>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <OrderTicket />
          </div>
        </div>
      </section>

      <hr className="border-t border-gray-800 mx-auto w-full max-w-7xl" />

      {/* Features */}
      <section id="features" className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs font-semibold tracking-widest text-violet-400 uppercase">
                What you get
              </span>
              <h2 className="text-3xl font-bold text-white mt-2">Features</h2>
            </div>
            <div className="hidden sm:flex gap-2">
              <button
                onClick={() => scroll('left')}
                aria-label="Scroll left"
                className="bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white p-2.5 rounded-full transition-colors"
              >
                <FaChevronLeft size={14} />
              </button>
              <button
                onClick={() => scroll('right')}
                aria-label="Scroll right"
                className="bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white p-2.5 rounded-full transition-colors"
              >
                <FaChevronRight size={14} />
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-2 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {features.map((feature) => (
              <div key={feature.title} className="flex-shrink-0 w-72">
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="border-t border-gray-800 mx-auto w-full max-w-7xl" />

      <XmlTypewriterSection />

      <hr className="border-t border-gray-800 mx-auto w-full max-w-7xl" />

      <HowItWorksSection />

      <hr className="border-t border-gray-800 mx-auto w-full max-w-7xl" />

      {/* Pricing Plans */}
      <section id="pricing" className="py-20 px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-widest text-violet-400 uppercase">
            Plans
          </span>
          <h2 className="text-3xl font-bold text-white mt-2">Pricing</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <AnimatedCard delay={0}>
            <div className="h-full flex flex-col bg-gray-800/60 border border-gray-800 rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-1 text-white">Free</h3>
              <p className="text-sm text-gray-400 mb-6">For individuals and small businesses just getting started.</p>
              <div className="text-4xl font-bold mb-6 text-white">
                $0<span className="text-base font-normal text-gray-500"> /mo</span>
              </div>
              <ul className="text-sm space-y-3 text-gray-300 mb-8 flex-1">
                <li className="flex items-center gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-violet-500" /> Orders</li>
                <li className="flex items-center gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-violet-500" /> Invoices</li>
                <li className="flex items-center gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-violet-500" /> Email notifications</li>
                <li className="flex items-center gap-2.5 text-gray-500"><span className="w-1.5 h-1.5 rounded-full bg-gray-700" /> Real-time analytics</li>
                <li className="flex items-center gap-2.5 text-gray-500"><span className="w-1.5 h-1.5 rounded-full bg-gray-700" /> Bulk order processing</li>
              </ul>
              <a
                href="/signup"
                className="text-center px-6 py-3 bg-gray-100 text-gray-900 font-semibold rounded-xl hover:bg-white transition-colors"
              >
                Get started
              </a>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={150}>
            <div className="h-full flex flex-col bg-gradient-to-br from-violet-600 to-violet-700 rounded-2xl p-8 shadow-xl shadow-violet-950/40 relative overflow-hidden">
              <span className="absolute top-5 right-5 text-xs font-semibold uppercase tracking-wide bg-white/15 text-white px-2.5 py-1 rounded-full">
                Popular
              </span>
              <h3 className="text-xl font-semibold mb-1 text-white">Premium</h3>
              <p className="text-sm text-violet-100 mb-6">Built for growing teams and high-volume workflows.</p>
              <div className="text-4xl font-bold mb-6 text-white">
                $29<span className="text-base font-normal text-violet-200"> /mo</span>
              </div>
              <ul className="text-sm space-y-3 text-violet-50 mb-8 flex-1">
                <li className="flex items-center gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-white" /> Orders</li>
                <li className="flex items-center gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-white" /> Invoices</li>
                <li className="flex items-center gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-white" /> Email notifications</li>
                <li className="flex items-center gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-white" /> Real-time analytics</li>
                <li className="flex items-center gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-white" /> Bulk order processing</li>
              </ul>
              <a
                href="/signup"
                className="text-center px-6 py-3 bg-white text-violet-700 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
              >
                Upgrade now
              </a>
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 border-t border-gray-800">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold tracking-widest text-violet-400 uppercase">
              Questions
            </span>
            <h2 className="text-3xl font-bold text-white mt-2">Frequently asked questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <FAQCard key={faq.question} {...faq} />
            ))}
          </div>
        </div>
      </section>

      <footer className="text-center py-8 text-sm text-gray-500 bg-gray-900 border-t border-gray-800">
        &copy; {new Date().getFullYear()} OrderNova. All rights reserved.
      </footer>
      </div>
    </div>
  );
}

export default HomePage;