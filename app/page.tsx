import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Partners from "./components/Partners";
import PopularDestinations from "./components/PopularDestinations";
import Steps from "./components/Steps";
import GmapsDestinations from "./components/GmapsDestinations";
import Promo from "./components/Promo";
import Stats from "./components/Stats";
import CtaBar from "./components/CtaBar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Partners />
      <PopularDestinations />
      <Steps />
      <GmapsDestinations />
      <Stats />
      <Promo />
      <CtaBar />
      <Footer />
    </>
  );
}
