import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router';

interface NavigationProps {
  onNavigate: (section: string) => void;
}

export default function Navigation({ onNavigate }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', section: 'hero', isRoute: false },
    { label: 'Services', section: 'services', isRoute: false },
    { label: 'Packages', section: 'packages', isRoute: false },
    { label: 'Destinations', section: 'destinations', isRoute: false },
    { label: 'Blog', section: 'blog', isRoute: false },
    { label: 'Contact', section: 'contact', isRoute: true },
  ];

  const handleClick = (link: { label: string; section: string; isRoute: boolean }) => {
    if (link.isRoute) {
      navigate('/contact');
    } else {
      onNavigate(link.section);
    }
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
          scrolled
            ? 'bg-[#F6F5F2]/95 backdrop-blur-sm py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="flex items-center justify-between px-[3vw]">
          <button
            onClick={() => onNavigate('hero')}
            className="font-display text-xl font-bold tracking-tight text-[#0B0C0E] hover:text-[#C9A46B] transition-colors"
          >
            UTU
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 text-sm font-medium tracking-widest uppercase text-[#0B0C0E] hover:text-[#C9A46B] transition-colors"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
              <span className="hidden sm:inline">{menuOpen ? 'Close' : 'Menu'}</span>
            </button>
            <div className="gold-marker" />
          </div>
        </div>
      </nav>

      {/* Full-screen menu overlay */}
      <div
        className={`fixed inset-0 z-[99] bg-[#0B0C0E] transition-all duration-500 ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <button
              key={link.section}
              onClick={() => handleClick(link)}
              className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight text-[#F6F5F2] hover:text-[#C9A46B] transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="mt-8 flex items-center gap-3">
            <div className="gold-marker" />
            <span className="text-[#6E6F73] text-sm tracking-widest uppercase">
              UTU Tours & Safaris
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
