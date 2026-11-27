import { SmoothScroll } from "./components/SmoothScroll";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { RhythmFinder } from "./components/RhythmFinder";
import { About } from "./components/About";
import { StudioFinder } from "./components/StudioFinder";
import { Programs } from "./components/Programs";
import { Gallery } from "./components/Gallery";
import { Instructors } from "./components/Instructors";
import { Schedule } from "./components/Schedule";
import { Pricing } from "./components/Pricing";
import { Faq } from "./components/Faq";
import { TrialForm } from "./components/TrialForm";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <SmoothScroll>
      <a
        href="#main"
        className="skip"
      >
        Skip to content
      </a>
      <div className="grain" aria-hidden />
      <Navbar />
      <main id="main" className="campaign">
        <Hero />
        <RhythmFinder />
        <About />
        <Programs />
        <StudioFinder />
        <Gallery />
        <Instructors />
        <Schedule />
        <Pricing />
        <Faq />
        <TrialForm />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
