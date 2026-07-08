import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Users, MapPin, ArrowRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router';

gsap.registerPlugin(ScrollTrigger);

const packages = [
  {
    name: 'Masai Mara Classic',
    destination: 'Kenya',
    days: 4,
    people: '2-6',
    price: 1250,
    image: '/images/dest_kenya.jpg',
    highlights: ['Game drives in Masai Mara', 'Big Five spotting', 'Sunset sundowners', 'Luxury tented camp'],
  },
  {
    name: 'Serengeti Explorer',
    destination: 'Tanzania',
    days: 6,
    people: '2-6',
    price: 1890,
    image: '/images/dest_tanzania.jpg',
    highlights: ['Serengeti game drives', 'Ngorongoro Crater', 'Hot air balloon option', 'Bush dinners'],
  },
  {
    name: 'Gorilla Trekking',
    destination: 'Uganda',
    days: 5,
    people: '2-8',
    price: 2100,
    image: '/images/dest_uganda.jpg',
    highlights: ['Gorilla trekking permit', 'Bwindi Impenetrable Forest', 'Community visit', 'Lake Bunyonyi'],
  },
  {
    name: 'Rwanda Primate Safari',
    destination: 'Rwanda',
    days: 4,
    people: '2-6',
    price: 2450,
    image: '/images/dest_rwanda.jpg',
    highlights: ['Volcanoes National Park', 'Golden monkey tracking', 'Kigali city tour', 'Luxury lodge stay'],
  },
  {
    name: 'East Africa Grand Tour',
    destination: 'Kenya & Tanzania',
    days: 12,
    people: '2-6',
    price: 4500,
    image: '/images/blog_migration.jpg',
    highlights: ['Masai Mara & Serengeti', 'Wildebeest migration', 'Cultural visits', 'All park fees included'],
  },
  {
    name: 'Adventure Explorer',
    destination: 'Uganda & Rwanda',
    days: 10,
    people: '2-8',
    price: 3200,
    image: '/images/service_rafting.jpg',
    highlights: ['Gorilla & chimp trekking', 'White water rafting', 'Hiking & nature walks', 'Multi-country experience'],
  },
];

export default function Packages() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      const cards = cardsRef.current?.querySelectorAll('.package-card') || [];
      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.7,
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
      id="packages"
      className="relative bg-[#0B0C0E] py-24 md:py-32 z-30"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headingRef} className="mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="gold-marker" />
            <span className="text-xs tracking-[0.12em] uppercase text-[#6E6F73] font-medium">
              Tour Packages
            </span>
          </div>
          <h2 className="font-display font-black uppercase leading-[0.92] tracking-[-0.02em] text-[#F6F5F2] mb-4"
            style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}
          >
            Signature Journeys
          </h2>
          <p className="text-[#6E6F73] text-lg max-w-xl">
            Handcrafted safari packages designed for unforgettable experiences
            across East Africa.
          </p>
        </div>

        {/* Packages Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {packages.map((pkg, index) => (
            <div
              key={index}
              className="package-card group bg-[#141518] rounded-2xl overflow-hidden border border-white/5 hover:border-[#C9A46B]/30 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141518] to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-[#C9A46B] px-3 py-1 rounded-full">
                  <MapPin size={12} className="text-[#0B0C0E]" />
                  <span className="text-xs font-medium text-[#0B0C0E]">
                    {pkg.destination}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display font-bold text-[#F6F5F2] text-lg mb-3">
                  {pkg.name}
                </h3>

                <div className="flex items-center gap-4 mb-4 text-sm text-[#6E6F73]">
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} />
                    {pkg.days} Days
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users size={14} />
                    {pkg.people}
                  </span>
                </div>

                <ul className="space-y-2 mb-6">
                  {pkg.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-[#9A9B9F]"
                    >
                      <Check size={14} className="text-[#C9A46B] mt-0.5 flex-shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div>
                    <span className="text-xs text-[#6E6F73] uppercase tracking-wide">From</span>
                    <p className="font-display font-bold text-xl text-[#C9A46B]">
                      ${pkg.price.toLocaleString()}
                      <span className="text-sm font-normal text-[#6E6F73]"> /pp</span>
                    </p>
                  </div>
                  <button
                    onClick={() => navigate('/contact')}
                    className="flex items-center gap-1.5 bg-[#C9A46B] text-[#0B0C0E] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#d4ae75] transition-colors"
                  >
                    Book Now
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
