import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Binoculars,
  Plane,
  Hotel,
  Mountain,
  Car,
  Trophy,
  Waves,
  CloudSun,
  Flame,
  Crown,
  ChefHat,
  ArrowRight,
} from 'lucide-react';
import { useNavigate } from 'react-router';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Binoculars,
    title: 'Game Drives',
    description: 'Expert-guided wildlife safaris in national parks and private conservancies across East Africa.',
  },
  {
    icon: Plane,
    title: 'Airport Transfers',
    description: 'Seamless pick-up and drop-off services at all major airports in the region.',
  },
  {
    icon: Hotel,
    title: 'Hotel Booking',
    description: 'Curated selection of luxury lodges, tented camps, and boutique hotels.',
  },
  {
    icon: Mountain,
    title: 'Hiking Adventures',
    description: 'Guided hiking trails through stunning landscapes and scenic routes.',
  },
  {
    icon: Car,
    title: 'Tour Vans & Cruisers',
    description: 'Premium 4x4 land cruisers and overland trucks with pop-up roofs.',
  },
  {
    icon: Trophy,
    title: 'Sporting Activities',
    description: 'Quad biking, horseback riding, camel treks and more adventure sports.',
  },
  {
    icon: Waves,
    title: 'White Water Rafting',
    description: 'Thrilling rafting experiences on the Nile River and other waterways.',
  },
  {
    icon: CloudSun,
    title: 'Mountain Climbing',
    description: 'Summit iconic peaks including Mount Kilimanjaro and Mount Kenya.',
  },
  {
    icon: Flame,
    title: 'Hot Air Balloon',
    description: 'Sunrise balloon rides over the Serengeti and Masai Mara.',
  },
  {
    icon: Crown,
    title: 'VIP Transportation',
    description: 'Executive vehicles and private aviation for discerning travelers.',
  },
  {
    icon: ChefHat,
    title: 'Private Chef',
    description: 'Gourmet dining experiences with private chefs at your safari camp.',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const cards = cardsRef.current?.querySelectorAll('.service-card') || [];
      gsap.fromTo(
        cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative bg-[#F6F5F2] py-24 md:py-32 z-20"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headingRef} className="mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="gold-marker" />
            <span className="text-xs tracking-[0.12em] uppercase text-[#6E6F73] font-medium">
              What We Offer
            </span>
          </div>
          <h2 className="font-display font-black uppercase leading-[0.92] tracking-[-0.02em] text-[#0B0C0E] mb-4"
            style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}
          >
            Our Services
          </h2>
          <p className="text-[#6E6F73] text-lg max-w-xl">
            From thrilling game drives to luxury accommodations, we provide
            everything for your perfect African safari.
          </p>
        </div>

        {/* Services Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group bg-white rounded-2xl p-6 border border-transparent hover:border-[#C9A46B]/30 transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-xl bg-[#C9A46B]/10 flex items-center justify-center mb-4 group-hover:bg-[#C9A46B]/20 transition-colors">
                <service.icon size={24} className="text-[#C9A46B]" />
              </div>
              <h3 className="font-display font-bold text-[#0B0C0E] mb-2 text-sm uppercase tracking-wide">
                {service.title}
              </h3>
              <p className="text-[#6E6F73] text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => navigate('/contact')}
            className="group flex items-center gap-2 text-[#0B0C0E] text-sm font-medium tracking-wide uppercase hover:text-[#C9A46B] transition-colors"
          >
            Book a Service
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
