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
    const [searchType,setSearchType]=useState("");
    const [searchCity,setSearchCity]=useState("");

    return(
        <>
            <Navbar/>
            <Hero setSearchType={setSearchType} setSearchCity={setSearchCity}/>
            <div id="categories">
                <CategoriesSection setCategoryId={setCategoryId}/>
            </div>
            <div id="events">
                <EventsSection categoryId={categoryId} searchType={searchType} searchCity={searchCity}/>
            </div>
            <WhyEventHub/>
            <div id="prestataires">
                <TraiteursSection/>
            </div>
            <FinalCTA/>
            <Footer/>
        </>
    );
}

export default Home;