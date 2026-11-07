import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Solutions } from "@/components/Solutions";
import { Showcase } from "@/components/Showcase";
import { WhyUs } from "@/components/WhyUs";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="contenu">
        <Hero />
        <Services />
        <Solutions />
        <Showcase />
        <WhyUs />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
