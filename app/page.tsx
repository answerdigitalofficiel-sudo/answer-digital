import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Solutions } from "@/components/Solutions";
import { Showcase } from "@/components/Showcase";
import { WhyUs } from "@/components/WhyUs";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Marquee } from "@/components/Marquee";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="contenu">
        <Hero />
        <Marquee />
        <Reveal>
          <Services />
        </Reveal>
        <Reveal>
          <Solutions />
        </Reveal>
        <Reveal>
          <Showcase />
        </Reveal>
        <Reveal>
          <WhyUs />
        </Reveal>
        <Reveal>
          <About />
        </Reveal>
        <Reveal>
          <Contact />
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
