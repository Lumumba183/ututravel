import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        panelRef.current,
        { x: '-8vw', opacity: 0 },
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
        headlineRef.current?.querySelectorAll('.headline-word') || [],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 0.5,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] bg-[#F6F5F2] overflow-hidden z-80">
      {/* Left Heading Panel */}
      <div
        ref={panelRef}
        className="absolute left-0 top-0 w-full md:w-[56vw] h-full bg-[#F6F5F2]/90 md:bg-[#F6F5F2] flex items-end md:items-center will-change-transform"
      >
        <div className="px-6 md:px-[6vw] pb-[9vh] md:pb-0 w-full max-w-full md:max-w-[38vw]">
          <div ref={headlineRef}>
            <h2
              className="font-display font-black uppercase leading-[0.88] tracking-[-0.03em] text-[#0B0C0E] mb-6"
              style={{ fontSize: 'clamp(44px, 6vw, 100px)' }}
            >
              <span className="headline-word inline-block">Experience</span>
            </h2>
          </div>

          <p className="text-[#6E6F73] text-base leading-relaxed mb-8 max-w-md">
            Hot air balloon rides, guided hikes, rafting, and mountain trekking—tailored to your fitness and curiosity.
          </p>

          <button
            onClick={() => navigate('/contact')}
            className="group flex items-center gap-2 bg-[#0B0C0E] text-[#F6F5F2] px-6 py-3.5 rounded-full text-sm font-medium tracking-wide uppercase hover:bg-[#C9A46B] transition-colors"
          >
            Browse Activities
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
          src="/images/balloon_silhouette.jpg"
          alt="Hot air balloon over savannah"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F6F5F2]/80 via-[#F6F5F2]/40 to-transparent md:hidden" />
      </div>
    </section>
  );
}
