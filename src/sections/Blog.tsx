import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { useNavigate } from 'react-router';
import { blogPosts } from '../data/blogPosts';

gsap.registerPlugin(ScrollTrigger);

export default function Blog() {
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

      const cards = cardsRef.current?.querySelectorAll('.blog-card') || [];
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
      id="blog"
      className="relative bg-[#F6F5F2] py-24 md:py-32 z-[140]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headingRef} className="mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="gold-marker" />
            <span className="text-xs tracking-[0.12em] uppercase text-[#6E6F73] font-medium">
              Stories & Insights
            </span>
          </div>
          <h2
            className="font-display font-black uppercase leading-[0.92] tracking-[-0.02em] text-[#0B0C0E] mb-4"
            style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}
          >
            From the Blog
          </h2>
          <p className="text-[#6E6F73] text-lg max-w-xl">
            Expert tips, destination guides, and stories from the heart of East
            Africa.
          </p>
        </div>

        {/* Blog Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              onClick={() => navigate(`/blog/${post.slug}`)}
              className="blog-card group bg-white rounded-2xl overflow-hidden border border-transparent hover:border-[#C9A46B]/30 transition-all duration-300 hover:shadow-lg cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3 text-xs text-[#6E6F73]">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="font-display font-bold text-[#0B0C0E] text-lg mb-3 group-hover:text-[#C9A46B] transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-[#6E6F73] text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <span className="inline-flex items-center gap-2 text-[#C9A46B] text-sm font-medium group-hover:gap-3 transition-all">
                  Read Article
                  <ArrowRight size={14} />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
