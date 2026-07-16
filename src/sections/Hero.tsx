import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Auto-play entrance animation on page load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.fromTo(
        imageRef.current,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9 }
      )
        .fromTo(
          panelRef.current,
          { x: '60vw', opacity: 0 },
          { x: 0, opacity: 1, duration: 0.9 },
          '<'
        )
        .fromTo(
          labelRef.current,
          { opacity: 0, scaleX: 0.9 },
          { opacity: 1, scaleX: 1, duration: 0.5 },
          '-=0.4'
        )
        .fromTo(
          headlineRef.current?.querySelectorAll('.headline-word') || [],
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.06, duration: 0.7 },
          '-=0.3'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Pinned scroll-driven exit animation
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset to visible when scrolling back to top
            gsap.set([imageRef.current, panelRef.current], {
              x: 0,
              opacity: 1,
            });
            gsap.set(
              headlineRef.current?.querySelectorAll('.headline-word') || [],
              { y: 0, opacity: 1 }
            );
            gsap.set(bgRef.current, { opacity: 0 });
          },
        },
      });

      // EXIT (70% - 100%) - panels slide out, background revealed
      scrollTl.fromTo(
        bgRef.current,
        { opacity: 0 },
        { opacity: 1, ease: 'power2.out' },
        0.65
      );
      scrollTl.fromTo(
        imageRef.current,
        { x: 0, opacity: 1 },
        { x: '-30vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        panelRef.current,
        { x: 0, opacity: 1 },
        { x: '30vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="section-pinned bg-[#F6F5F2] z-10"
    >
      {/* Savannah background - revealed when panels part */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full opacity-0 will-change-transform"
      >
        <img
          src="/images/wildebeest_crossing.jpg"
          alt="African savannah"
          className="w-full h-full object-cover"
          style={{ filter: 'blur(6px)' }}
        />
        <div className="absolute inset-0 bg-[#C9A46B]/10" />
      </div>

      {/* Left Image Panel */}
      <div
        ref={imageRef}
        className="absolute left-0 top-0 w-[50vw] h-full will-change-transform hidden md:block"
      >
        <img
          src="/images/hero_elephant.jpg"
          alt="African Elephant at sunset"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#F6F5F2]/20" />
      </div>

      {/* Mobile full-bleed image */}
      <div className="absolute inset-0 md:hidden">
        <img
          src="/images/hero_elephant.jpg"
          alt="African Elephant at sunset"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F6F5F2]/80 to-[#F6F5F2]/40" />
      </div>

      {/* Right Title Panel */}
      <div
        ref={panelRef}
        className="absolute right-0 top-0 w-full md:w-[50vw] h-full bg-[#F6F5F2]/90 md:bg-[#F6F5F2] flex items-end will-change-transform"
      >
        <div className="px-6 md:px-[6vw] pb-[9vh] w-full max-w-full md:max-w-[34vw]">
          {/* Label with hairlines */}
          <div ref={labelRef} className="mb-8">
            <div className="hairline w-32 md:w-[18vw] mb-4" />
            <p className="text-xs tracking-[0.12em] uppercase text-[#6E6F73] font-medium">
              UTU EXECUTIVE SAFARIS
            </p>
            <div className="hairline w-40 md:w-[26vw] mt-4" />
          </div>

          {/* Headline */}
          <div ref={headlineRef} className="mb-6">
            <h1
              className="font-display font-black uppercase leading-[0.88] tracking-[-0.03em] text-[#0B0C0E]"
              style={{ fontSize: 'clamp(48px, 7vw, 120px)' }}
            >
              <span className="headline-word inline-block">Discover</span>
              <br />
              <span className="headline-word inline-block">Africa</span>
            </h1>
          </div>

          {/* Subheadline */}
          <p className="text-[#6E6F73] text-base md:text-lg leading-relaxed mb-8 max-w-md">
            Curated journeys through Kenya, Tanzania, Uganda and Rwanda.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => {
                const el = document.getElementById('packages');
                if (el) {
                  const pinned = ScrollTrigger.getAll().filter(
                    (st) => st.vars.pin
                  );
                  pinned.forEach((st) => st.disable(false));
                  el.scrollIntoView({ behavior: 'instant', block: 'start' });
                  requestAnimationFrame(() => {
                    pinned.forEach((st) => st.enable());
                    ScrollTrigger.refresh();
                  });
                }
              }}
              className="group flex items-center justify-center sm:justify-start gap-2 bg-[#0B0C0E] text-[#F6F5F2] px-6 py-3.5 rounded-full text-sm font-medium tracking-wide uppercase hover:bg-[#C9A46B] transition-colors"
            >
              <Calendar size={16} />
              Explore Journeys
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="text-[#0B0C0E] text-sm font-medium tracking-wide uppercase hover:text-[#C9A46B] transition-colors underline underline-offset-4 text-center sm:text-left"
            >
              Plan a Private Trip
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
