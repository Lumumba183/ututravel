import { useNavigate } from 'react-router';
import { useState } from 'react';
import {
  Send,
  MapPin,
  Mail,
  Phone,
  Clock,
  CheckCircle,
  Globe,
  ArrowLeft,
} from 'lucide-react';

export default function ContactPage() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travelDates: '',
    groupSize: '',
    destination: 'Kenya',
    product: 'Game Drive Safari',
    days: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData as any).toString(),
    })
      .then(() => {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          travelDates: '',
          groupSize: '',
          destination: 'Kenya',
          product: 'Game Drive Safari',
          days: '',
          message: '',
        });
      })
      .catch((error) => {
        console.error('Form submission error:', error);
        alert('Something went wrong. Please try again.');
      });
  };

  return (
    <div className="min-h-screen bg-[#0B0C0E]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-[#9A9B9F] hover:text-[#C9A46B] transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Back to Home</span>
        </button>

        {/* Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="gold-marker" />
            <span className="text-xs tracking-[0.12em] uppercase text-[#6E6F73] font-medium">
              Get in Touch
            </span>
          </div>
          <h1
            className="font-display font-black uppercase leading-[0.92] tracking-[-0.02em] text-[#F6F5F2] mb-4"
            style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}
          >
            Plan Your Trip
          </h1>
          <p className="text-[#6E6F73] text-lg max-w-xl">
            Tell us what you want to see. We will design the journey, the stays,
            and the transfers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="font-display font-bold text-[#F6F5F2] text-lg mb-4">
                UTU EXECUTIVE SAFARIS
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-[#9A9B9F]">
                  <MapPin size={18} className="text-[#C9A46B] mt-0.5 flex-shrink-0" />
                  <div>
                    <p>Ngong Road</p>
                    <p>Morningside Business Park</p>
                    <p>Nairobi, Kenya</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[#9A9B9F]">
                  <Mail size={18} className="text-[#C9A46B] flex-shrink-0" />
                  <a
                    href="mailto:mainaphilip2026@gmail.com"
                    className="hover:text-[#C9A46B] transition-colors"
                  >
                    mainaphilip2026@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3 text-[#9A9B9F]">
                  <Phone size={18} className="text-[#C9A46B] flex-shrink-0" />
                  <a
                    href="https://wa.me/254716417526"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#C9A46B] transition-colors"
                  >
                    +254 716 417 526
                  </a>
                </div>
                <div className="flex items-center gap-3 text-[#9A9B9F]">
                  <Clock size={18} className="text-[#C9A46B] flex-shrink-0" />
                  <p>Mon – Sat: 8:00 AM – 8:00 PM EAT</p>
                </div>
                <div className="flex items-center gap-3 text-[#9A9B9F]">
                  <Globe size={18} className="text-[#C9A46B] flex-shrink-0" />
                  <p>Kenya · Tanzania · Uganda · Rwanda</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#141518] rounded-2xl border border-white/5">
              <h4 className="font-display font-bold text-[#F6F5F2] mb-2">
                Why Book With Us?
              </h4>
              <ul className="space-y-2 text-sm text-[#9A9B9F]">
                <li className="flex items-start gap-2">
                  <CheckCircle size={14} className="text-[#C9A46B] mt-0.5 flex-shrink-0" />
                  Local experts with 10+ years experience
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={14} className="text-[#C9A46B] mt-0.5 flex-shrink-0" />
                  Customized itineraries for every traveler
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={14} className="text-[#C9A46B] mt-0.5 flex-shrink-0" />
                  24/7 support during your safari
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={14} className="text-[#C9A46B] mt-0.5 flex-shrink-0" />
                  Best price guarantee on all packages
                </li>
              </ul>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-16">
                <CheckCircle size={64} className="text-[#C9A46B] mb-6" />
                <h3 className="font-display font-bold text-2xl text-[#F6F5F2] mb-3">
                  Thank You!
                </h3>
                <p className="text-[#9A9B9F] max-w-md">
                  We have received your inquiry and will get back to you within
                  24 hours to start planning your perfect safari.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-[#C9A46B] text-sm font-medium hover:underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <input type="hidden" name="form-name" value="contact" />
                <p style={{ display: 'none' }}>
                  <label>
                    Do not fill this out if you are human:{' '}
                    <input name="bot-field" />
                  </label>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-[#6E6F73] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-[#333] text-[#F6F5F2] py-3 focus:border-[#C9A46B] outline-none transition-colors placeholder:text-[#555]"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-[#6E6F73] mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-[#333] text-[#F6F5F2] py-3 focus:border-[#C9A46B] outline-none transition-colors placeholder:text-[#555]"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-[#6E6F73] mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-[#333] text-[#F6F5F2] py-3 focus:border-[#C9A46B] outline-none transition-colors placeholder:text-[#555]"
                      placeholder="+1 234 567 890"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-[#6E6F73] mb-2">
                      Travel Dates
                    </label>
                    <input
                      type="text"
                      name="travelDates"
                      value={formData.travelDates}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-[#333] text-[#F6F5F2] py-3 focus:border-[#C9A46B] outline-none transition-colors placeholder:text-[#555]"
                      placeholder="e.g., July 15 - July 25, 2026"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-[#6E6F73] mb-2">
                      Group Size
                    </label>
                    <input
                      type="text"
                      name="groupSize"
                      value={formData.groupSize}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-[#333] text-[#F6F5F2] py-3 focus:border-[#C9A46B] outline-none transition-colors placeholder:text-[#555]"
                      placeholder="e.g., 4 adults, 2 children"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-[#6E6F73] mb-2">
                      Number of Days
                    </label>
                    <input
                      type="number"
                      name="days"
                      value={formData.days}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-[#333] text-[#F6F5F2] py-3 focus:border-[#C9A46B] outline-none transition-colors placeholder:text-[#555]"
                      placeholder="e.g., 7"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-[#6E6F73] mb-2">
                      Destination *
                    </label>
                    <select
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-[#333] text-[#F6F5F2] py-3 focus:border-[#C9A46B] outline-none transition-colors"
                    >
                      <option value="Kenya" className="bg-[#0B0C0E]">Kenya</option>
                      <option value="Tanzania" className="bg-[#0B0C0E]">Tanzania</option>
                      <option value="Uganda" className="bg-[#0B0C0E]">Uganda</option>
                      <option value="Rwanda" className="bg-[#0B0C0E]">Rwanda</option>
                      <option value="Multi-Country" className="bg-[#0B0C0E]">Multi-Country</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-[#6E6F73] mb-2">
                      Service Interested In *
                    </label>
                    <select
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-[#333] text-[#F6F5F2] py-3 focus:border-[#C9A46B] outline-none transition-colors"
                    >
                      <option value="Game Drive Safari" className="bg-[#0B0C0E]">Game Drive Safari</option>
                      <option value="Airport Transfer" className="bg-[#0B0C0E]">Airport Transfer</option>
                      <option value="Hotel Booking" className="bg-[#0B0C0E]">Hotel Booking</option>
                      <option value="Hiking Adventure" className="bg-[#0B0C0E]">Hiking Adventure</option>
                      <option value="Tour Van/Cruiser" className="bg-[#0B0C0E]">Tour Van/Cruiser</option>
                      <option value="Hot Air Balloon" className="bg-[#0B0C0E]">Hot Air Balloon</option>
                      <option value="Mountain Climbing" className="bg-[#0B0C0E]">Mountain Climbing</option>
                      <option value="Rafting" className="bg-[#0B0C0E]">Rafting</option>
                      <option value="VIP Transportation" className="bg-[#0B0C0E]">VIP Transportation</option>
                      <option value="Private Chef" className="bg-[#0B0C0E]">Private Chef</option>
                      <option value="Sporting Activities" className="bg-[#0B0C0E]">Sporting Activities</option>
                      <option value="Full Package" className="bg-[#0B0C0E]">Full Package</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs tracking-widest uppercase text-[#6E6F73] mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-transparent border-b border-[#333] text-[#F6F5F2] py-3 focus:border-[#C9A46B] outline-none transition-colors resize-none placeholder:text-[#555]"
                    placeholder="Tell us about your dream safari, special requirements, or questions..."
                  />
                </div>

                <button
                  type="submit"
                  className="group flex items-center gap-2 bg-[#C9A46B] text-[#0B0C0E] px-8 py-4 rounded-full text-sm font-medium tracking-wide uppercase hover:bg-[#d4ae75] transition-colors mt-4"
                >
                  <Send size={16} />
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
