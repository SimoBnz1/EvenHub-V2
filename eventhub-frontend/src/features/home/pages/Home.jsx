import {useState} from "react";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";
import Hero from "../components/Hero";
import CategoriesSection from "../components/CategoriesSection";
import EventsSection from "../components/EventsSection";
import WhyEventHub from "../components/WhyEventHub";
import TraiteursSection from "../components/TraiteursSection";
import FinalCTA from "../components/FinalCTA";

function Home(){
    const [categoryId,setCategoryId]=useState(null);

    return(
        <>
            <Navbar/>
            <Hero/>
            <CategoriesSection setCategoryId={setCategoryId}/>
            <EventsSection categoryId={categoryId}/>
            <WhyEventHub/>
            <TraiteursSection/>
            <FinalCTA/>
            <Footer/>
        </>
    );
}

export default Home;