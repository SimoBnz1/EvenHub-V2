import {useEffect,useState} from "react";
import EventCard from "./EventCard";
import {getEvents} from "../../../services/eventService";

function EventsSection({categoryId,searchType,searchCity}){
    const [events,setEvents]=useState([]);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        async function loadEvents(){
            try{
                const data=await getEvents();
                setEvents(data);
            }catch(error){
                console.log(error);
            }finally{
                setLoading(false);
            }
        }

        loadEvents();
    },[]);

    const filteredEvents=events.filter((event)=>{
        if(categoryId && event.user && event.user.category_id!=categoryId){
            return false;
        }

        if(searchType && !event.type.toLowerCase().includes(searchType.toLowerCase())){
            return false;
        }

        if(searchCity && !event.city.toLowerCase().includes(searchCity.toLowerCase())){
            return false;
        }

        return true;
    });

    return(
        <section className="w-full bg-gradient-to-b from-[#FDFCF9] via-[#FAF8F3] to-[#F7F4ED] ">
            <div className="max-w-7xl mx-auto px-6">

                <div className="flex items-end justify-between mb-7">
                    <div>
                        <span className="text-[11px] uppercase tracking-[3px] font-semibold text-[#78806F]">À découvrir</span>
                        <h2 className="mt-2 text-2xl md:text-3xl font-bold text-[#20231F]">Des événements qui donnent envie.</h2>
                    </div>
                </div>

                {loading ? (
                    <p className="text-stone-500">Chargement des événements...</p>
                ) : filteredEvents.length==0 ? (
                    <p className="text-stone-500">Aucun événement trouvé.</p>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
                        {filteredEvents.map((event)=>(
                            <EventCard key={event.id} event={event}/>
                        ))}
                    </div>
                )}

            </div>
        </section>
    );
}

export default EventsSection;