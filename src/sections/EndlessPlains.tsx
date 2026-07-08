import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router';

gsap.registerPlugin(ScrollTrigger);

export default function EndlessPlains() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { x: '8vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 40%',
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        topPanelRef.current,
        { y: '-6vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        bottomPanelRef.current,
        { y: '6vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            end: 'top 30%',
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        headlineRef.current?.querySelectorAll('.headline-word') || [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            end: 'top 40%',
            scrub: 0.5,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] bg-[#F6F5F2] overflow-hidden z-60">
      {/* Left Top Text Panel */}
      <div
        ref={topPanelRef}
        className="absolute left-0 top-0 w-full md:w-[56vw] h-[55vh] bg-[#F6F5F2]/90 md:bg-[#F6F5F2] flex items-center will-change-transform pt-20 md:pt-0"
      >
        <div className="px-6 md:px-[6vw] w-full max-w-full md:max-w-[38vw]">
          <div ref={headlineRef}>
            <h2
              className="font-display font-black uppercase leading-[0.88] tracking-[-0.03em] text-[#0B0C0E] mb-4"
              style={{ fontSize: 'clamp(44px, 6vw, 100px)' }}
            >
              <span className="headline-word inline-block">Endless</span>{' '}
              <span className="headline-word inline-block">Plains</span>
            </h2>
          </div>
          <p className="text-[#6E6F73] text-base leading-relaxed max-w-md">
            Dry season or green season—each window offers a different drama.
          </p>
        </div>
      </div>

      {/* Hairline divider */}
      <div className="hidden md:block absolute left-0 top-[55vh] w-[56vw] hairline" />

      {/* Left Bottom Text Panel */}
      <div
        ref={bottomPanelRef}
        className="absolute left-0 bottom-0 w-full md:w-[56vw] h-[45vh] bg-[#F6F5F2]/90 md:bg-[#F6F5F2] flex items-start md:items-center pt-8 md:pt-0 will-change-transform"
      >
        <div className="px-6 md:px-[6vw] w-full max-w-full md:max-w-[38vw]">
          <p className="text-[#6E6F73] text-base leading-relaxed mb-6 max-w-md">
            We match your dates to the right parks, camps, and flight routes.
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="group flex items-center gap-2 text-[#0B0C0E] text-sm font-medium tracking-wide uppercase hover:text-[#C9A46B] transition-colors"
          >
            <Calendar size={16} />
            Check Seasonal Calendar
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Right Tall Image Panel */}
      <div
        ref={imageRef}
        className="absolute right-0 top-0 w-full md:w-[44vw] h-full will-change-transform -z-10 md:z-0"
      >
        <img
          src="/images/zebra_plain.jpg"
          alt="Zebra on endless plains"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#F6F5F2]/30 to-[#F6F5F2]/70 md:hidden" />
      </div>
    </section>
  );
}
