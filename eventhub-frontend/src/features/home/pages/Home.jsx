import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";

import Hero from "../components/Hero";
import CategoriesSection from "../components/CategoriesSection";
import EventsSection from "../components/EventsSection";
import WhyEventHub from "../components/WhyEventHub";
import TraiteursSection from "../components/TraiteursSection";
import FinalCTA from "../components/FinalCTA";

function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <CategoriesSection />
            <EventsSection />
            <WhyEventHub />
            <TraiteursSection />
            <FinalCTA />
            <Footer />
        </>
    );
}

export default Home;