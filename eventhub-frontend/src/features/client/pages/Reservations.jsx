import {useEffect,useState} from "react";
import {useParams,Link,useNavigate} from "react-router-dom";
import {ArrowLeft,CalendarDays,MapPin,Users,CheckCircle} from "lucide-react";
import Navbar from "../../../components/layout/Navbar";
import {getEvent} from "../../../services/eventService";
import {createReservation} from "../../../services/reservationService";
import moroccoCities from "../../../data/moroccoCities";

function Reservation(){
    const {id}=useParams();
    const navigate=useNavigate();

    const [date,setDate]=useState("");
    const [location,setLocation]=useState("");
    const [guests,setGuests]=useState("");
    const [showCities,setShowCities]=useState(false);
    const [event,setEvent]=useState(null);
    const [error,setError]=useState("");
    const [loading,setLoading]=useState(false);

    const filteredCities=moroccoCities.filter((city)=>
        city.toLowerCase().startsWith(location.toLowerCase())
    );

    const total=event && guests ? Number(event.price)*Number(guests) : 0;

    useEffect(()=>{
        async function loadEvent(){
            try{
                const data=await getEvent(id);
                setEvent(data);
            }catch(error){
                setError(error.message);
            }
        }

        loadEvent();
    },[id]);

    const handleSubmit=async(e)=>{
        e.preventDefault();

        if(!moroccoCities.includes(location)){
            setError("Veuillez choisir une ville dans la liste");
            return;
        }

        if(event && Number(guests)>Number(event.capacity)){
            setError("Le nombre d'invités dépasse la capacité maximale");
            return;
        }

        try{
            setError("");
            setLoading(true);

            await createReservation({
                event_id:id,
                event_date:date,
                location:location,
                guest_count:guests
            });

            navigate("/reservations");
        }catch(error){
            setError(error.message);
        }

        setLoading(false);
    };

    return(
        <>
            <Navbar/>

            <main className="bg-[#F7F5F0] min-h-[calc(100vh-70px)]">

                <div className="max-w-5xl mx-auto px-6 py-5">

                    <Link to={"/events/"+id} className="inline-flex items-center gap-2 text-xs font-semibold text-[#777C74] hover:text-[#263128]">
                        <ArrowLeft size={14}/>
                        Retour à l'événement
                    </Link>

                    <div className="mt-4 grid lg:grid-cols-[1fr_330px] gap-5">

                        <section className="bg-white border border-[#E5E1D8] rounded-[24px] p-6">

                            <div className="flex items-center gap-3">

                                <div className="w-10 h-10 bg-[#E9EDE5] rounded-xl flex items-center justify-center">
                                    <CalendarDays size={18} className="text-[#66735A]"/>
                                </div>

                                <div>
                                    <p className="text-[10px] uppercase tracking-[2px] font-bold text-[#7D8775]">
                                        Réservation
                                    </p>

                                    <h1 className="text-xl font-bold text-[#20231F]">
                                        Réservez votre événement
                                    </h1>
                                </div>

                            </div>

                            <p className="mt-3 text-xs text-[#8A8E86]">
                                Renseignez les informations de votre événement pour envoyer votre demande.
                            </p>

                            {error && (
                                <div className="mt-4 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-xs">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="mt-5">

                                <div className="grid md:grid-cols-2 gap-4">

                                    <div>

                                        <label className="block mb-2 text-xs font-bold text-[#555A53]">
                                            Date de l'événement
                                        </label>

                                        <div className="relative">

                                            <CalendarDays size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B9187]"/>

                                            <input
                                                type="date"
                                                value={date}
                                                onChange={(e)=>{
                                                    setDate(e.target.value);
                                                    setError("");
                                                }}
                                                required
                                                className="w-full h-11 pl-10 pr-3 bg-[#FAF9F6] border border-[#E3DFD7] rounded-xl text-sm outline-none focus:bg-white focus:border-[#66735A]"
                                            />

                                        </div>

                                    </div>

                                    <div>

                                        <label className="block mb-2 text-xs font-bold text-[#555A53]">
                                            Nombre d'invités
                                        </label>

                                        <div className="relative">

                                            <Users size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B9187]"/>

                                            <input
                                                type="number"
                                                value={guests}
                                                onChange={(e)=>{
                                                    setGuests(e.target.value);
                                                    setError("");
                                                }}
                                                placeholder="Ex : 120"
                                                min="1"
                                                max={event?.capacity}
                                                required
                                                className="w-full h-11 pl-10 pr-3 bg-[#FAF9F6] border border-[#E3DFD7] rounded-xl text-sm outline-none focus:bg-white focus:border-[#66735A]"
                                            />

                                        </div>

                                        {event && (
                                            <p className="mt-1 text-[10px] text-[#92968F]">
                                                Maximum : {event.capacity} personnes
                                            </p>
                                        )}

                                    </div>

                                </div>

                                <div className="mt-4">

                                    <label className="block mb-2 text-xs font-bold text-[#555A53]">
                                        Lieu de l'événement
                                    </label>

                                    <div className="relative">

                                        <MapPin size={15} className="absolute z-10 left-4 top-[14px] text-[#8B9187]"/>

                                        <input
                                            type="text"
                                            value={location}
                                            onChange={(e)=>{
                                                setLocation(e.target.value);
                                                setShowCities(true);
                                                setError("");
                                            }}
                                            onFocus={()=>setShowCities(true)}
                                            placeholder="Commencez à écrire une ville..."
                                            autoComplete="off"
                                            required
                                            className="w-full h-11 pl-10 pr-3 bg-[#FAF9F6] border border-[#E3DFD7] rounded-xl text-sm outline-none focus:bg-white focus:border-[#66735A]"
                                        />

                                        {showCities && location && (
                                            <div className="absolute z-20 top-12 left-0 right-0 bg-white border border-[#E3DFD7] rounded-xl shadow-lg max-h-48 overflow-y-auto">

                                                {filteredCities.length>0 ? (
                                                    filteredCities.map((city)=>(
                                                        <button
                                                            type="button"
                                                            key={city}
                                                            onClick={()=>{
                                                                setLocation(city);
                                                                setShowCities(false);
                                                            }}
                                                            className="w-full text-left px-4 py-3 text-sm text-[#40453E] hover:bg-[#F2F4EF]"
                                                        >
                                                            <MapPin size={13} className="inline mr-2 text-[#66735A]"/>
                                                            {city}
                                                        </button>
                                                    ))
                                                ) : (
                                                    <p className="px-4 py-3 text-xs text-[#999D96]">
                                                        Aucune ville trouvée
                                                    </p>
                                                )}

                                            </div>
                                        )}

                                    </div>

                                </div>

                                {event && guests && (
                                    <div className="mt-5 bg-[#EEF1EA] border border-[#E0E5DA] rounded-xl p-4">

                                        <div className="flex justify-between text-xs text-[#73796E]">
                                            <span>Prix par personne</span>
                                            <span>{Number(event.price).toLocaleString("fr-FR")} DH</span>
                                        </div>

                                        <div className="mt-2 flex justify-between text-xs text-[#73796E]">
                                            <span>Nombre d'invités</span>
                                            <span>{guests}</span>
                                        </div>

                                        <div className="mt-3 pt-3 border-t border-[#D7DDD1] flex justify-between items-center">
                                            <span className="text-sm font-bold text-[#263128]">
                                                Total estimé
                                            </span>

                                            <span className="text-xl font-bold text-[#263128]">
                                                {total.toLocaleString("fr-FR")} DH
                                            </span>
                                        </div>

                                    </div>
                                )}

                                <div className="mt-5 flex gap-3 bg-[#F5F6F2] rounded-xl px-4 py-3">

                                    <CheckCircle size={16} className="text-[#66735A] mt-0.5 shrink-0"/>

                                    <p className="text-[11px] leading-5 text-[#747A70]">
                                        Votre demande sera envoyée au prestataire. Il pourra ensuite l'accepter ou la refuser.
                                    </p>

                                </div>

                                <button type="submit" disabled={loading} className="mt-5 w-full h-11 bg-[#263128] hover:bg-[#354137] text-white rounded-xl text-sm font-bold transition disabled:opacity-50">
                                    {loading ? "Envoi..." : "Envoyer la demande"}
                                </button>

                            </form>

                        </section>

                        <aside className="bg-[#263128] text-white rounded-[24px] overflow-hidden h-fit">

                            {event && event.image && (
                                <div className="h-[160px] overflow-hidden">
                                    <img src={"http://127.0.0.1:8000/storage/"+event.image} alt={event.title} className="w-full h-full object-cover"/>
                                </div>
                            )}

                            <div className="p-5">

                                <p className="text-[9px] uppercase tracking-[2px] font-bold text-white/45">
                                    Votre sélection
                                </p>

                                {event ? (
                                    <>
                                        <h2 className="mt-2 text-lg font-bold">
                                            {event.title}
                                        </h2>

                                        <div className="mt-3 flex items-center gap-2 text-xs text-white/60">
                                            <MapPin size={13}/>
                                            {event.city}
                                        </div>

                                        <div className="mt-2 flex items-center gap-2 text-xs text-white/60">
                                            <Users size={13}/>
                                            Jusqu'à {event.capacity} personnes
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-white/10">

                                            <div className="flex justify-between text-xs text-white/55">
                                                <span>Prix par personne</span>
                                                <span>{Number(event.price).toLocaleString("fr-FR")} DH</span>
                                            </div>

                                            <div className="mt-2 flex justify-between text-xs text-white/55">
                                                <span>Invités</span>
                                                <span>{guests || 0}</span>
                                            </div>

                                            <div className="mt-4 pt-4 border-t border-white/10 flex items-end justify-between">
                                                <span className="text-xs text-white/60">
                                                    Total estimé
                                                </span>

                                                <span className="text-xl font-bold">
                                                    {total.toLocaleString("fr-FR")} DH
                                                </span>
                                            </div>

                                        </div>
                                    </>
                                ) : (
                                    <p className="mt-3 text-xs text-white/50">
                                        Chargement...
                                    </p>
                                )}

                                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">

                                    <span className="text-[10px] text-white/45">
                                        Statut initial
                                    </span>

                                    <span className="px-3 py-1 bg-[#FFFFFF12] border border-white/10 rounded-full text-[10px] font-semibold">
                                        En attente
                                    </span>

                                </div>

                            </div>

                        </aside>

                    </div>

                </div>

            </main>
        </>
    );
}

export default Reservation;