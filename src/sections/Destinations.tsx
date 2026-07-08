import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';

gsap.registerPlugin(ScrollTrigger);

const destinations = [
  {
    name: 'Kenya',
    tagline: 'The Heart of Safari',
    description:
      'Home to the iconic Masai Mara, Amboseli National Park with views of Mount Kilimanjaro, and the pristine Kenyan coast. Witness the Big Five and experience authentic Maasai culture.',
    image: '/images/dest_kenya.jpg',
    parks: ['Masai Mara', 'Amboseli', 'Samburu', 'Tsavo'],
  },
  {
    name: 'Tanzania',
    tagline: 'Land of the Serengeti',
    description:
      'From the endless plains of the Serengeti to the Ngorongoro Crater, Tanzania offers the ultimate safari experience. Climb Mount Kilimanjaro or relax on Zanzibar beaches.',
    image: '/images/dest_tanzania.jpg',
    parks: ['Serengeti', 'Ngorongoro', 'Tarangire', 'Zanzibar'],
  },
  {
    name: 'Uganda',
    tagline: 'The Pearl of Africa',
    description:
      'Track endangered mountain gorillas in Bwindi Impenetrable Forest, cruise the Nile, and discover diverse wildlife across ten national parks. A truly unique adventure.',
    image: '/images/dest_uganda.jpg',
    parks: ['Bwindi', 'Murchison Falls', 'Queen Elizabeth', 'Kibale'],
  },
  {
    name: 'Rwanda',
    tagline: 'Land of a Thousand Hills',
    description:
      'Experience world-class gorilla trekking in Volcanoes National Park, explore Nyungwe Forest, and discover the vibrant culture of one of Africa most beautiful countries.',
    image: '/images/dest_rwanda.jpg',
    parks: ['Volcanoes NP', 'Akagera', 'Nyungwe', 'Lake Kivu'],
  },
];

export default function Destinations() {
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

      const cards = cardsRef.current?.querySelectorAll('.dest-card') || [];
      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
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
      id="destinations"
      className="relative bg-[#F6F5F2] py-24 md:py-32 z-40"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headingRef} className="mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="gold-marker" />
            <span className="text-xs tracking-[0.12em] uppercase text-[#6E6F73] font-medium">
              Explore
            </span>
          </div>
          <h2 className="font-display font-black uppercase leading-[0.92] tracking-[-0.02em] text-[#0B0C0E] mb-4"
            style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}
          >
            Destinations
          </h2>
          <p className="text-[#6E6F73] text-lg max-w-xl">
            Four incredible countries, each offering unique wildlife encounters
            and breathtaking landscapes.
          </p>
        </div>

        {/* Destinations Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {destinations.map((dest, index) => (
            <div
              key={index}
              className="dest-card group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer"
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E]/90 via-[#0B0C0E]/30 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={14} className="text-[#C9A46B]" />
                  <span className="text-xs tracking-[0.12em] uppercase text-[#C9A46B] font-medium">
                    {dest.tagline}
                  </span>
                </div>
                <h3 className="font-display font-bold text-2xl md:text-3xl text-[#F6F5F2] mb-2">
                  {dest.name}
                </h3>
                <p className="text-[#B0B1B5] text-sm leading-relaxed mb-4 max-w-md line-clamp-2">
                  {dest.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {dest.parks.map((park, i) => (
                    <span
                      key={i}
                      className="text-xs bg-white/10 text-[#F6F5F2] px-3 py-1 rounded-full"
                    >
                      {park}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => navigate('/contact')}
                  className="flex items-center gap-2 text-[#C9A46B] text-sm font-medium hover:gap-3 transition-all"
                >
                  Plan Your Visit
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
