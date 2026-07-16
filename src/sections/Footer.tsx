import { MessageCircle, Mail, Phone, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router';

interface FooterProps {
  onNavigate: (section: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const nav = useNavigate();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', section: 'hero' },
    { label: 'Services', section: 'services' },
    { label: 'Packages', section: 'packages' },
    { label: 'Destinations', section: 'destinations' },
    { label: 'Blog', section: 'blog' },
    { label: 'Contact', section: 'contact' },
  ];

  const destinations = [
    'Kenya',
    'Tanzania',
    'Uganda',
    'Rwanda',
  ];

  return (
    <footer className="relative bg-[#0B0C0E] border-t border-white/5 z-[170]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <button
              onClick={() => onNavigate('hero')}
              className="font-display text-3xl font-black tracking-tight text-[#F6F5F2] hover:text-[#C9A46B] transition-colors mb-4"
            >
              UTU
            </button>
            <p className="text-[#6E6F73] text-sm leading-relaxed mb-6">
              EXECUTIVE SAFARIS. Curated journeys through Kenya, Tanzania,
              Uganda and Rwanda.
            </p>
            <div className="flex items-center gap-2 text-[#6E6F73] text-sm">
              <MapPin size={14} className="text-[#C9A46B]" />
              <span>Ngong Road, Morningside Business Park, Nairobi</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-[#F6F5F2] text-sm uppercase tracking-widest mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.section}>
                  <button
                    onClick={() => {
                      if (link.section === 'contact') {
                        nav('/contact');
                      } else {
                        onNavigate(link.section);
                      }
                    }}
                    className="text-[#6E6F73] text-sm hover:text-[#C9A46B] transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-display font-bold text-[#F6F5F2] text-sm uppercase tracking-widest mb-6">
              Destinations
            </h4>
            <ul className="space-y-3">
              {destinations.map((dest) => (
                <li key={dest}>
                  <button
                    onClick={() => onNavigate('destinations')}
                    className="text-[#6E6F73] text-sm hover:text-[#C9A46B] transition-colors"
                  >
                    {dest}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-[#F6F5F2] text-sm uppercase tracking-widest mb-6">
              Contact Us
            </h4>
            <div className="space-y-4">
              <a
                href="mailto:mainaphilip2026@gmail.com"
                className="flex items-center gap-3 text-[#6E6F73] text-sm hover:text-[#C9A46B] transition-colors"
              >
                <Mail size={16} className="text-[#C9A46B]" />
                mainaphilip2026@gmail.com
              </a>
              <a
                href="https://wa.me/254716417526"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#6E6F73] text-sm hover:text-[#C9A46B] transition-colors"
              >
                <MessageCircle size={16} className="text-[#C9A46B]" />
                +254 716 417 526
              </a>
              <a
                href="tel:+254716417526"
                className="flex items-center gap-3 text-[#6E6F73] text-sm hover:text-[#C9A46B] transition-colors"
              >
                <Phone size={16} className="text-[#C9A46B]" />
                +254 716 417 526
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#6E6F73] text-xs">
            &copy; {currentYear} UTU EXECUTIVE SAFARIS. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="gold-marker" />
            <span className="text-[#6E6F73] text-xs tracking-widest uppercase">
              The Wild. Delivered in Style.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
