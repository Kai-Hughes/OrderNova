import React, { useState, useEffect, useRef } from 'react';
import { FaUserPlus, FaClipboardList, FaChartLine } from 'react-icons/fa';
import { HiChevronRight } from 'react-icons/hi';

const features = [
  { title: "Fast Order Creation", desc: "Generate orders in seconds with our intuitive form." },
  { title: "Generate Invoices Easily", desc: "Generate invoices in seconds." },
  { title: "Real-Time Data Analytics", desc: "Gain dynamic insights into buisness trends." },
  { title: "Bulk-Ordering", desc: "More orders, more easily, save time money with our bulk-ordering." },
  { title: "Email Notifications", desc: "Keep your clients updated with instant email alerts." },
  { title: "Chat-Bot Assistant", desc: "Need help? feel free to query our chatbot if you're ever stuck." },
];

const faqs = [
  {
    question: "How do I create a new order on the platform?",
    answer: "Creating an order is simple. Just log in, go to the Create Order section, and fill in the buyer, seller, and item details. Once submitted, an order is generated automatically and saved to your order history."
  },
  {
    question: "How does this benefit me?",
    answer: "Time is money, save both with our free and premium features which do all the things you don't want to. Tedious tasks become a thing of the past."
  },
  {
    question: "Is my data secure on this platform?",
    answer: "Yes. We use JWT for token-based session blacklisting ensuring your data is secure at all times."
  },
  {
    question: "Will my customers receive a confirmation email after placing an order?",
    answer: "Absolutely. Every successful order automatically triggers a confirmation email to both the buyer and seller, ensuring full transparency and documentation."
  },
];

const steps = [
  { icon: <FaUserPlus />, title: "Sign Up", desc: "Create an account in under a minute." },
  { icon: <FaClipboardList />, title: "Create Orders", desc: "Generate professional orders with ease." },
  { icon: <FaChartLine />, title: "Track Progress", desc: "Follow your orders in real time." },
];

// revert this

function HomePage() {
  const useInView = (threshold = 0.1) => {
    const ref = useRef();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => setIsVisible(entry.isIntersecting),
        { threshold }
      );

      const node = ref.current;
      if (node) observer.observe(node);

      return () => {
        if (node) observer.unobserve(node);
      };
    }, [threshold]);

    return [ref, isVisible];
  };

  const AnimatedCard = ({ delay, children }) => {
    const [ref, isVisible] = useInView(0.1); // Trigger animation when 10% of the card is visible
    return (
      <div
        ref={ref}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: `opacity 0.6s ease-out, transform 0.6s ease-out ${delay}ms`,
        }}
        className="transition-all"
      >
        {children}
      </div>
    );
  };

  const scrollRef = useRef(null);

const scroll = (direction) => {
  if (scrollRef.current) {
    const scrollAmount = 300;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  }
};

function FAQCard({ question, answer }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div
      className="bg-gray-900 border border-gray-700 rounded-lg p-6 cursor-pointer hover:border-blue-500 transition"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">{question}</h3>
        <span className="text-blue-400 text-xl">
          {isOpen ? "−" : "+"}
        </span>
      </div>
      {isOpen && (
        <p className="mt-4 text-gray-300">{answer}</p>
      )}
    </div>
  );
}

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-gray-950 shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-violet-600">OrderNova</h1>
          <nav className="space-x-4">
            <a href="#features" className="text-gray-300 hover:text-white transition">Features</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition">How It Works</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition">Pricing</a>
            <a href="/login" className="text-violet-400 hover:text-violet-300 font-semibold">Login</a>
            <a href="/signup" className="text-violet-400 hover:text-violet-300 font-semibold">Signup</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="text-center py-30 px-30 bg-gray-900 flex items-center justify-between">
  <div className="max-w-xl text-left">
    <h2 className="text-4xl font-extrabold mb-4 text-white">Manage Orders. Save Time.</h2>
    <p className="text-lg mb-6 text-gray-300">
      OrderNova helps businesses streamline order creation, invoicing, and analyse buisness trends in one unified platform.
    </p>
    <a href="/signup" className="px-6 py-3 bg-gray-100 text-gray-900 font-semibold rounded-xl hover:bg-white transition">
      Get Started for Free
    </a>
  </div>

  {/* GIF on the right */}
  <img
    src="https://i.pinimg.com/originals/5f/08/50/5f08505655b858d52ea4ef07a6fa58d5.gif"
    alt="Working animation"
    className="rounded-lg w-96 max-w-full hidden md:block"
  />
</section>

<hr className="border-t border-gray-700 my-5 mx-auto w-3/4" />

      {/* Features */}
      <section id="features" className="py-16 px-4 bg-gray-900 relative">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-3xl font-bold mb-8 text-white text-center">Features</h2>

    <div className="relative">
      {/* Left Arrow */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow z-10 hover:bg-gray-700"
      >
        &#8592;
      </button>

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4 px-10 scroll-smooth"
      >
        {features.map((feature, index) => (
          <div key={index} className="flex-shrink-0 w-72">
            <FeatureCard title={feature.title} desc={feature.desc} />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll('right')}
        className="absolute left-318 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow z-10 hover:bg-gray-700"
      >
        &#8594;
      </button>
    </div>
  </div>
</section>

<hr className="border-t border-gray-700 my-5 mx-auto w-3/4" />

{/* How It Works */}
<HowItWorksSection />

<hr className="border-t border-gray-700 my-5 mx-auto w-3/4" />

{/* Pricing Plans Section */}
<section id="pricing" className="bg-gray-900 py-20 px-4">
<h2 className="text-3xl font-bold text-white mb-10 text-center">Pricing Plans</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
    <AnimatedCard delay={100}>
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-8 shadow hover:shadow-lg transition transform hover:scale-105">
        <h3 className="text-2xl font-semibold mb-4">Free Plan</h3>
        <p className="text-gray-400 mb-4">Perfect for individuals and small businesses just getting started.</p>
        <ul className="text-left space-y-2 text-gray-300 mb-4">
          <li>✅ Orders</li>
          <li>✅ Invoices</li>
          <li>✅ Email Notifications</li>
          <li>🚫 Real-Time Data Analytics</li>
          <li>🚫 Bulk-Order Processing</li>
        </ul>
        <div className="text-3xl font-bold mb-4">$0<span className="text-base font-normal text-gray-400"> /mo</span></div>
        <a href="/signup" className="inline-block mt-2 px-6 py-3 bg-gray-100 text-gray-900 font-semibold rounded-xl hover:bg-white transition">
          Get Started
        </a>
      </div>
    </AnimatedCard>

    <AnimatedCard delay={300}>
      <div className="bg-violet-600 rounded-xl p-8 shadow-lg hover:shadow-2xl transition transform hover:scale-105">
        <h3 className="text-2xl font-semibold mb-4 text-white">Premium Plan</h3>
        <p className="text-blue-100 mb-4">Built for growing teams and high-volume workflows.</p>
        <ul className="text-left space-y-2 text-blue-100 mb-4">
          <li>✅ Orders</li>
          <li>✅ Invoices</li>
          <li>✅ Email Notifications</li>
          <li>✅ Real-Time Data Analytics</li>
          <li>✅ Bulk-Order Processing</li>
        </ul>
        <div className="text-3xl font-bold mb-4 text-white">$29<span className="text-base font-normal text-blue-100"> /mo</span></div>
        <a href="/signup" className="inline-block mt-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition">
          Upgrade Now
        </a>
      </div>
    </AnimatedCard>
  </div>
</section>

  <section className="bg-gray-800 py-16 px-4">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQCard key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  </section>

      {/* Footer */}
      <footer id="" className="text-center py-6 text-sm text-gray-400 bg-gray-900">
        &copy; {new Date().getFullYear()} OrderNova. All rights reserved.
      </footer>
    </div>
  );
}

function FeatureCard({ title, desc }) {
  return (
    <div className="group bg-gray-800 rounded-xl shadow-md p-6 hover:bg-gray-700 transition-all transform hover:scale-105 duration-300 ease-in-out relative overflow-hidden h-48 hover:h-64">
      <h4 className="text-xl font-semibold mb-2 text-white">{title}</h4>
      <p className="text-gray-300">{desc}</p>

      {/* Hidden extra content */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-4 text-sm text-gray-400">
        <p>More details about this feature go here.</p>
        <div className="mt-2">
          <svg
            className="w-6 h-6 text-violet-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 18a6 6 0 100-12 6 6 0 000 12z" />
          </svg>
        </div>
      </div>
    </div>
  );
}


function StepCard({ step, title, desc }) {
  return (
    <div className="p-4">
      <div className="text-blue-400 text-3xl font-bold mb-2">{step}</div>
      <h5 className="text-lg font-semibold mb-1 text-white">{title}</h5>
      <p className="text-gray-300">{desc}</p>
    </div>
  );
}



function HowItWorksSection() {
  const [visibleStep, setVisibleStep] = useState(0);

  useEffect(() => {
    const intervals = [];
    for (let i = 1; i < steps.length; i++) {
      intervals.push(
        setTimeout(() => {
          setVisibleStep(i);
        }, i * 2500)
      );
    }

    return () => intervals.forEach(clearTimeout);
  }, []);

  return (
    <section className="bg-gray-900 py-16 px-4" id="how-it-works">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-10">How It Works</h2>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-12 sm:space-y-0 sm:space-x-12">
          {steps.map((step, index) => (
            <div key={index} className={`relative text-white text-center transition-opacity duration-700 ${index > visibleStep ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
              <div className="text-4xl mb-4 text-violet-400">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-300">{step.desc}</p>
              {index < visibleStep && index < steps.length - 1 && (
                <div className="absolute -right-12 top-1/2 transform -translate-y-1/2 text-white text-3xl hidden sm:block">
                  <HiChevronRight />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


export default HomePage;
