import {useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";
import {CalendarDays,Plus,ClipboardList,Package,ChevronRight} from "lucide-react";
import TraiteurSidebar from "../components/TraiteurSidebar";
import {getMyEvents} from "../../../services/eventService";
import {getReservations} from "../../../services/reservationService";
import {getEquipment} from "../../../services/equipmentService";

function Dashboard(){
    const navigate=useNavigate();

    const [events,setEvents]=useState([]);
    const [reservations,setReservations]=useState([]);
    const [equipment,setEquipment]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState("");

    useEffect(()=>{
        loadDashboard();
    },[]);

    async function loadDashboard(){
        try{
            const eventsData=await getMyEvents();
            const reservationsData=await getReservations();
            const equipmentData=await getEquipment();

            setEvents(eventsData);
            setReservations(reservationsData);
            setEquipment(equipmentData);
        }catch(error){
            setError(error.message);
        }finally{
            setLoading(false);
        }
    }

    return(
        <div className="min-h-screen bg-[#F5F3EE]">
            <TraiteurSidebar/>

            <main className="ml-64 min-h-screen">
                <header className="h-[76px] border-b border-stone-200 flex items-center justify-between px-10">
                    <p className="text-xs text-stone-400">EventHub / Tableau de bord</p>

                    <div className="px-4 py-2 rounded-xl bg-[#ECE9DF]">
                        <p className="text-[10px] uppercase tracking-[2px] font-bold text-[#8B9284]">EventHub</p>
                        <p className="text-xs font-semibold text-[#66735A]">Espace prestataire</p>
                    </div>
                </header>

                <div className="px-10 py-9 max-w-[1350px]">
                    <section className="flex items-end justify-between">
                        <div>
                            <p className="text-sm font-semibold text-[#66735A]">Bienvenue sur EventHub</p>
                            <h1 className="mt-1 text-3xl font-bold text-[#20231F]">Tableau de bord</h1>
                            <p className="mt-2 text-sm text-stone-500">Un aperçu simple de votre activité sur EventHub.</p>
                        </div>

                        <button onClick={()=>navigate("/traiteur/events/create")} className="flex items-center gap-2 bg-[#263128] text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-[#344036] transition">
                            <Plus size={17}/>
                            Nouvel événement
                        </button>
                    </section>

                    {error && (
                        <div className="mt-6 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    {loading ? (
                        <p className="mt-10 text-sm text-stone-500">Chargement...</p>
                    ) : (
                        <>
                            <section className="mt-10 bg-white border border-stone-200 rounded-2xl px-8 py-6">
                                <p className="text-xs uppercase tracking-[2px] text-stone-400 font-semibold">Vue d'ensemble</p>

                                <div className="mt-6 grid grid-cols-3">
                                    <div className="pr-8">
                                        <div className="flex items-center gap-2 text-stone-400">
                                            <CalendarDays size={16}/>
                                            <p className="text-xs">Événements publiés</p>
                                        </div>

                                        <p className="mt-3 text-3xl font-bold text-[#20231F]">{events.length}</p>
                                        <p className="mt-1 text-xs text-stone-400">événements disponibles</p>
                                    </div>

                                    <div className="px-8 border-l border-stone-200">
                                        <div className="flex items-center gap-2 text-stone-400">
                                            <ClipboardList size={16}/>
                                            <p className="text-xs">Réservations</p>
                                        </div>

                                        <p className="mt-3 text-3xl font-bold text-[#20231F]">{reservations.length}</p>
                                        <p className="mt-1 text-xs text-stone-400">demandes reçues</p>
                                    </div>

                                    <div className="pl-8 border-l border-stone-200">
                                        <div className="flex items-center gap-2 text-stone-400">
                                            <Package size={16}/>
                                            <p className="text-xs">Équipements</p>
                                        </div>

                                        <p className="mt-3 text-3xl font-bold text-[#20231F]">{equipment.length}</p>
                                        <p className="mt-1 text-xs text-stone-400">équipements enregistrés</p>
                                    </div>
                                </div>
                            </section>

                            <section className="mt-8">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h2 className="text-lg font-bold text-[#20231F]">Mes événements récents</h2>
                                        <p className="mt-1 text-xs text-stone-400">Vos derniers événements publiés.</p>
                                    </div>

                                    <button onClick={()=>navigate("/traiteur/events")} className="flex items-center gap-1 text-sm font-semibold text-[#66735A]">
                                        Voir tout
                                        <ChevronRight size={16}/>
                                    </button>
                                </div>

                                <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
                                    {events.length==0 ? (
                                        <p className="p-6 text-sm text-stone-500">Aucun événement publié.</p>
                                    ) : (
                                        events.slice(0,3).map((event)=>(
                                            <div key={event.id} className="flex items-center px-6 py-5 border-b border-stone-100">
                                                {event.image ? (
                                                    <img src={"http://127.0.0.1:8000/storage/"+event.image} alt={event.title} className="w-16 h-16 rounded-xl object-cover"/>
                                                ) : (
                                                    <div className="w-16 h-16 rounded-xl bg-[#E8ECE3] flex items-center justify-center">
                                                        <CalendarDays size={20} className="text-[#66735A]"/>
                                                    </div>
                                                )}

                                                <div className="ml-4 flex-1">
                                                    <p className="text-sm font-semibold text-[#20231F]">{event.title}</p>
                                                    <p className="mt-1 text-xs text-stone-400">{event.city} · {event.type} · {event.capacity} personnes</p>
                                                </div>

                                                <div className="w-32">
                                                    <p className="text-xs text-stone-400">Prix</p>
                                                    <p className="mt-1 text-sm font-semibold text-[#20231F]">{event.price} MAD</p>
                                                </div>

                                                <div className="w-28 text-right">
                                                    <span className="text-xs px-3 py-1.5 rounded-full bg-[#EEF2EA] text-[#66735A]">Publié</span>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </section>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Dashboard;