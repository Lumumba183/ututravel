import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function WhatsAppSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      'Hello UTU EXECUTIVE SAFARIS! I would like to inquire about your safari packages.'
    );
    window.open(`https://wa.me/254716417526?text=${message}`, '_blank');
  };

  return (
    <section
      ref={sectionRef}
      id="whatsapp"
      className="relative bg-[#C9A46B] py-20 md:py-24 z-[150]"
    >
      <div ref={contentRef} className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-[#0B0C0E] flex items-center justify-center">
            <MessageCircle size={32} className="text-[#C9A46B]" />
          </div>
        </div>

        <h2 className="font-display font-black uppercase leading-[0.92] tracking-[-0.02em] text-[#0B0C0E] mb-4"
          style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}
        >
          Chat With Us on WhatsApp
        </h2>

        <p className="text-[#0B0C0E]/80 text-lg max-w-lg mx-auto mb-8">
          Have questions about your safari? Reach out to us directly on WhatsApp
          for quick responses and personalized recommendations.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleWhatsAppClick}
            className="group flex items-center gap-2 bg-[#0B0C0E] text-[#F6F5F2] px-8 py-4 rounded-full text-sm font-medium tracking-wide uppercase hover:bg-[#1a1c20] transition-colors"
          >
            <MessageCircle size={18} />
            +254 716 417 526
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <p className="text-[#0B0C0E]/60 text-sm mt-6">
          Available Monday – Saturday, 8:00 AM – 8:00 PM EAT
        </p>
      </div>
    </section>
  );
}
