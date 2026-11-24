import { IconSprite } from "@/components/icon";
import { Marquee } from "@/components/marquee";
import { PageEffects } from "@/components/page-effects";
import { Calculator } from "@/components/sections/calculator";
import { Cta } from "@/components/sections/cta";
import { Faq } from "@/components/sections/faq";
import { Features } from "@/components/sections/features";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Idea } from "@/components/sections/idea";
import { Principles } from "@/components/sections/principles";

export default function Home() {
  return (
    <>
      <IconSprite />
      <a className="skip" href="#main">
        К содержанию
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Marquee />
        <Idea />
        <Features />
        <HowItWorks />
        <Calculator />
        <Principles />
        <Faq />
        <Cta />
      </main>
      <Footer />
      <PageEffects />
    </>
  );
}