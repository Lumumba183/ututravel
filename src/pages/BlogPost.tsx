import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Calendar, Clock, User, CheckCircle, Send } from 'lucide-react';
import { getBlogPostBySlug } from '../data/blogPosts';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = getBlogPostBySlug(slug || '');

  if (!post) {
    return (
      <div className="min-h-screen bg-[#F6F5F2] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display font-bold text-2xl text-[#0B0C0E] mb-4">
            Article Not Found
          </h1>
          <button
            onClick={() => navigate('/')}
            className="text-[#C9A46B] font-medium hover:underline"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F5F2]">
      {/* Hero Image */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/40 to-transparent" />

        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-6 left-6 z-10 flex items-center gap-2 text-white/80 hover:text-[#C9A46B] transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Back</span>
        </button>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-4 text-xs text-[#C9A46B] uppercase tracking-widest">
              <span className="flex items-center gap-1.5">
                <Calendar size={12} />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={12} />
                {post.readTime}
              </span>
              <span className="flex items-center gap-1.5">
                <User size={12} />
                {post.author}
              </span>
            </div>
            <h1 className="font-display font-black text-3xl md:text-5xl lg:text-6xl text-[#F6F5F2] leading-tight">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-16">
        {/* Intro paragraph */}
        <p className="text-xl md:text-2xl text-[#6E6F73] leading-relaxed mb-10 font-light italic border-l-4 border-[#C9A46B] pl-6">
          {post.excerpt}
        </p>

        {/* Body paragraphs */}
        <div className="space-y-6">
          {post.content.map((paragraph, index) => (
            <p
              key={index}
              className="text-[#0B0C0E] text-base md:text-lg leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Tips Section */}
        <div className="mt-12 p-6 md:p-8 bg-white rounded-2xl border border-[#C9A46B]/20">
          <h3 className="font-display font-bold text-xl text-[#0B0C0E] mb-6 flex items-center gap-2">
            <div className="gold-marker" />
            Essential Tips
          </h3>
          <ul className="space-y-3">
            {post.tips.map((tip, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-[#6E6F73] text-sm md:text-base"
              >
                <CheckCircle
                  size={18}
                  className="text-[#C9A46B] mt-0.5 flex-shrink-0"
                />
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center p-8 md:p-12 bg-[#0B0C0E] rounded-2xl">
          <h3 className="font-display font-bold text-2xl md:text-3xl text-[#F6F5F2] mb-3">
            Ready for Your Adventure?
          </h3>
          <p className="text-[#9A9B9F] mb-6 max-w-md mx-auto">
            Let UTU EXECUTIVE SAFARIS craft your perfect safari experience. Get in touch and
            start planning today.
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="group inline-flex items-center gap-2 bg-[#C9A46B] text-[#0B0C0E] px-8 py-4 rounded-full text-sm font-medium tracking-wide uppercase hover:bg-[#d4ae75] transition-colors"
          >
            <Send size={16} />
            Plan Your Safari
          </button>
        </div>
      </article>
    </div>
  );
}
