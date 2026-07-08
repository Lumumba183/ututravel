import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Compass } from 'lucide-react';
import { useNavigate } from 'react-router';

gsap.registerPlugin(ScrollTrigger);

export default function VideoChapter() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Video scale animation
      gsap.fromTo(
        videoRef.current,
        { scale: 1.12, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 0.5,
          },
        }
      );

      // Panel slide in
      gsap.fromTo(
        panelRef.current,
        { x: '-10vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 0.5,
          },
        }
      );

      // Headline words
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
            start: 'top 60%',
            end: 'top 30%',
            scrub: 0.5,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] bg-[#0B0C0E] overflow-hidden z-20"
    >
      {/* Video Layer */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
      >
        <source src="/videos/savannah_drone.mp4" type="video/mp4" />
      </video>

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C0E]/60 via-transparent to-[#0B0C0E]/30" />

      {/* Dark Title Panel */}
      <div
        ref={panelRef}
        className="absolute left-0 top-0 w-full md:w-[44vw] h-full bg-[#0B0C0E]/90 md:bg-[#0B0C0E] flex items-end md:items-center will-change-transform"
      >
        <div className="px-6 md:px-[6vw] pb-[9vh] md:pb-0 w-full max-w-full md:max-w-[30vw]">
          <div ref={headlineRef}>
            <h2 className="font-display font-black uppercase leading-[0.88] tracking-[-0.03em] text-[#F6F5F2] mb-6"
              style={{ fontSize: 'clamp(40px, 6vw, 100px)' }}
            >
              <span className="headline-word inline-block">The</span>{' '}
              <span className="headline-word inline-block">Wild</span>
              <br />
              <span className="headline-word inline-block">Is</span>{' '}
              <span className="headline-word inline-block text-[#C9A46B]">Waiting</span>
            </h2>
          </div>

          <p className="text-[#9A9B9F] text-base leading-relaxed mb-8 max-w-sm">
            We handle permits, lodges, flights, and private guiding—so you
            stay present.
          </p>

          <button
            onClick={() => navigate('/contact')}
            className="group flex items-center gap-2 bg-[#C9A46B] text-[#0B0C0E] px-6 py-3.5 rounded-full text-sm font-medium tracking-wide uppercase hover:bg-[#d4ae75] transition-colors"
          >
            <Compass size={16} />
            Start Planning
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
