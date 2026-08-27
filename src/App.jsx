import Header from './components/Header';
import Hero from './components/Hero';
import StatsStrip from './components/StatsStrip';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Testimonial from './components/Testimonial';
import Pricing from './components/Pricing';
import Signup from './components/Signup';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <a href="#main" class="skip-link">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <StatsStrip />
        <Features />
        <HowItWorks />
        <Testimonial />
        <Pricing />
        <Signup />
      </main>
      <Footer />
    </>
  );
}