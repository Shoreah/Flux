import HomeShell from "./components/HomeShell.jsx";
import Search from "./components/Search.jsx";
import HeroCarousel from "./components/HeroCarousel.jsx";
import Rating from "./components/RatingComp.jsx";
import ThreePages from "./components/ThreePages.jsx";
import FloatingHeader from "./components/FloatingHeader.jsx";
import VideoShowcase from "./components/VideoShowcase.jsx";
import TemplateGallery from "./components/TemplateGallery.jsx";
import Overlap from "./components/Overlap.jsx";
import FiveBoxes from "./components/FiveBoxes.jsx";
import VidGroupHeader from "./components/VidGroupHeader.jsx";
import VideoCarousel from "./components/VideoCarousel.jsx";
import Marquee from "./components/Marquee.jsx";
import Footer from "./components/Footer.jsx";

export default function Home() {
  return (
    <HomeShell>
      <Search />
      <HeroCarousel />
      <Rating />
      <div id="movies">
        <ThreePages />
      </div>
      <FloatingHeader />
      <VideoShowcase />
      <div id="trending">
        <TemplateGallery />
      </div>
      <Overlap />
      <VidGroupHeader />
      <div id="tv-shows">
        <VideoCarousel />
      </div>
      <div id="why-flux">
        <FiveBoxes />
      </div>
      <Marquee />
      <Footer />
    </HomeShell>
  );
}
