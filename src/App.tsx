import { Routes, Route } from 'react-router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Services from './sections/Services';
import Packages from './sections/Packages';
import Destinations from './sections/Destinations';
import VideoChapter from './sections/VideoChapter';
import Expedition from './sections/Expedition';
import BigCats from './sections/BigCats';
import Heritage from './sections/Heritage';
import EndlessPlains from './sections/EndlessPlains';
import Migration from './sections/Migration';
import Experience from './sections/Experience';
import Hospitality from './sections/Hospitality';
import Conservation from './sections/Conservation';
import Blog from './sections/Blog';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import BlogPost from './pages/BlogPost';
import ContactPage from './pages/ContactPage';
import WhatsAppButton from './components/WhatsAppButton';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* Home page with all sections */
function HomePage() {
  // Scroll-based navigation for home page sections
  const handleNavigate = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      const pinned = ScrollTrigger.getAll().filter((st) => st.vars.pin);
      pinned.forEach((st) => st.disable(false));
      const y = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo(0, y);
      requestAnimationFrame(() => {
        pinned.forEach((st) => st.enable());
        ScrollTrigger.refresh();
      });
    }
  };

  return (
    <div className="relative">
      <Navigation onNavigate={handleNavigate} />

      <main className="relative">
        <Hero />
        <Services />
        <Packages />
        <Destinations />
        <VideoChapter />
        <Expedition />
        <BigCats />
        <Heritage />
        <EndlessPlains />
        <Migration />
        <Experience />
        <Hospitality />
        <Conservation />
        <Blog />
        <Contact />
      </main>

      <Footer onNavigate={handleNavigate} />
      <WhatsAppButton />
    </div>
  );
}

/* Blog post detail page */
function BlogPostPage() {
  return (
    <>
      <BlogPost />
      <WhatsAppButton />
    </>
  );
}

/* Standalone contact page */
function ContactRoute() {
  return (
    <>
      <ContactPage />
      <WhatsAppButton />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />
      <Route path="/contact" element={<ContactRoute />} />
    </Routes>
  );
}

export default App;
