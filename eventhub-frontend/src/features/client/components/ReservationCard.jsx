import {useEffect,useState} from "react";
import {Link} from "react-router-dom";
import {CalendarDays,MapPin,Users,Clock,Check,X,ArrowRight,Inbox,Star,LoaderCircle} from "lucide-react";
import Navbar from "../../../components/layout/Navbar";
import {getReservations} from "../../../services/reservationService";
import {createReview} from "../../../services/reviewService";

function Reservations(){
    const [reservations,setReservations]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState("");
    const [reviewEventId,setReviewEventId]=useState(null);
    const [rating,setRating]=useState(0);
    const [comment,setComment]=useState("");
    const [reviewLoading,setReviewLoading]=useState(false);
    const [reviewMessage,setReviewMessage]=useState("");

    useEffect(()=>{
        async function loadReservations(){
            try{
                const data=await getReservations();
                setReservations(data);
            }catch(error){
                setError(error.message);
            }finally{
                setLoading(false);
            }
        }

        loadReservations();
    },[]);

    function openReview(eventId){
        setReviewEventId(eventId);
        setRating(0);
        setComment("");
        setReviewMessage("");
    }

    function closeReview(){
        setReviewEventId(null);
        setRating(0);
        setComment("");
        setReviewMessage("");
    }

    async function sendReview(eventId){
        if(rating==0){
            setReviewMessage("Choisissez une note.");
            return;
        }

        try{
            setReviewLoading(true);
            setReviewMessage("");

            const data=await createReview({
                event_id:eventId,
                rating:rating,
                comment:comment
            });

            setReviewMessage(data.message);
            setRating(0);
            setComment("");
        }catch(error){
            setReviewMessage(error.message);
        }finally{
            setReviewLoading(false);
        }
    }

    return(
        <>
            <Navbar/>

            <main className="min-h-[calc(100vh-70px)] bg-[#F7F5F0]">
                <div className="max-w-6xl mx-auto px-6 py-8">

                    <div>
                        <p className="text-[10px] uppercase tracking-[2.5px] font-bold text-[#78806F]">Mon espace</p>
                        <h1 className="mt-2 text-3xl font-bold text-[#20231F]">Mes réservations</h1>
                        <p className="mt-2 text-sm text-[#858981]">Retrouvez vos demandes et suivez leur statut.</p>
                    </div>

                    {error && (
                        <div className="mt-6 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm">{error}</div>
                    )}

                    <div className="mt-7">

                        {loading ? (
                            <div className="bg-white border border-[#E5E1D8] rounded-2xl py-14 text-center">
                                <LoaderCircle size={22} className="animate-spin mx-auto text-[#66735A]"/>
                                <p className="mt-3 text-sm text-[#858981]">Chargement des réservations...</p>
                            </div>
                        ) : reservations.length===0 ? (
                            <div className="bg-white border border-[#E5E1D8] rounded-2xl py-14 text-center">
                                <div className="w-12 h-12 mx-auto bg-[#EEF1E9] rounded-full flex items-center justify-center">
                                    <Inbox size={20} className="text-[#66735A]"/>
                                </div>

                                <h2 className="mt-4 text-lg font-bold text-[#20231F]">Aucune réservation</h2>
                                <p className="mt-1 text-sm text-[#858981]">Vous n'avez pas encore envoyé de demande.</p>

                                <Link to="/" className="inline-flex items-center gap-2 mt-5 text-sm font-bold text-[#66735A] hover:text-[#263128]">
                                    Découvrir les événements
                                    <ArrowRight size={15}/>
                                </Link>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-5">

                                {reservations.map((reservation)=>(
                                    <div key={reservation.id} className="bg-white border border-[#E5E1D8] rounded-[22px] overflow-hidden">

                                        <div className="flex gap-4 p-4">

                                            <div className="w-[115px] h-[110px] bg-[#F0EEE8] rounded-xl overflow-hidden shrink-0">
                                                {reservation.event && reservation.event.image ? (
                                                    <img src={"http://127.0.0.1:8000/storage/"+reservation.event.image} alt={reservation.event.title} className="w-full h-full object-cover"/>
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <CalendarDays size={22} className="text-stone-300"/>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-2">

                                                    <div>
                                                        <p className="text-[9px] uppercase tracking-[1.5px] font-bold text-[#899080]">
                                                            {reservation.event ? reservation.event.type : "Événement"}
                                                        </p>

                                                        <h2 className="mt-1 text-base font-bold text-[#20231F]">
                                                            {reservation.event ? reservation.event.title : "Événement"}
                                                        </h2>
                                                    </div>

                                                    {reservation.status==="pending" && (
                                                        <span className="shrink-0 inline-flex items-center gap-1 bg-[#F7F1E7] text-[#A27B49] px-2.5 py-1.5 rounded-full text-[10px] font-bold">
                                                            <Clock size={11}/>
                                                            En attente
                                                        </span>
                                                    )}

                                                    {reservation.status==="accepted" && (
                                                        <span className="shrink-0 inline-flex items-center gap-1 bg-[#EEF2EA] text-[#5F7057] px-2.5 py-1.5 rounded-full text-[10px] font-bold">
                                                            <Check size={11}/>
                                                            Acceptée
                                                        </span>
                                                    )}

                                                    {reservation.status==="rejected" && (
                                                        <span className="shrink-0 inline-flex items-center gap-1 bg-[#F7ECEA] text-[#A15F53] px-2.5 py-1.5 rounded-full text-[10px] font-bold">
                                                            <X size={11}/>
                                                            Refusée
                                                        </span>
                                                    )}

                                                </div>

                                                <p className="mt-3 text-lg font-bold text-[#263128]">
                                                    {Number(reservation.total_amount).toLocaleString("fr-FR")} DH
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mx-4 border-t border-[#EEEAE2]"></div>

                                        <div className="grid grid-cols-3 px-4 py-4">

                                            <div>
                                                <p className="text-[9px] text-[#A09F9A]">Date</p>
                                                <div className="mt-1 flex items-center gap-1.5">
                                                    <CalendarDays size={12} className="text-[#66735A]"/>
                                                    <p className="text-[11px] font-semibold text-[#555A53]">{reservation.event_date}</p>
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-[9px] text-[#A09F9A]">Lieu</p>
                                                <div className="mt-1 flex items-center gap-1.5">
                                                    <MapPin size={12} className="text-[#66735A]"/>
                                                    <p className="text-[11px] font-semibold text-[#555A53] truncate">{reservation.location}</p>
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-[9px] text-[#A09F9A]">Invités</p>
                                                <div className="mt-1 flex items-center gap-1.5">
                                                    <Users size={12} className="text-[#66735A]"/>
                                                    <p className="text-[11px] font-semibold text-[#555A53]">{reservation.guest_count}</p>
                                                </div>
                                            </div>

                                        </div>

                                        {reservation.status==="accepted" && reservation.event && (
                                            <div className="mx-4 mb-4">

                                                {reviewEventId!==reservation.event.id ? (
                                                    <button onClick={()=>openReview(reservation.event.id)} className="w-full h-10 border border-[#D9DDD3] text-[#66735A] rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#EEF1E9] transition">
                                                        <Star size={14}/>
                                                        Donner un avis
                                                    </button>
                                                ) : (
                                                    <div className="bg-[#F8F7F3] border border-[#E5E1D8] rounded-xl p-4">

                                                        <p className="text-xs font-bold text-[#20231F]">Votre note</p>

                                                        <div className="flex gap-1 mt-2">
                                                            {[1,2,3,4,5].map((star)=>(
                                                                <button key={star} type="button" onClick={()=>setRating(star)}>
                                                                    <Star size={23} className={star<=rating ? "text-[#C09A68] fill-[#C09A68]" : "text-stone-300"}/>
                                                                </button>
                                                            ))}
                                                        </div>

                                                        <textarea value={comment} onChange={(e)=>setComment(e.target.value)} placeholder="Votre commentaire..." className="mt-3 w-full h-20 resize-none border border-stone-200 rounded-xl p-3 text-xs outline-none focus:border-[#66735A]"></textarea>

                                                        {reviewMessage && (
                                                            <p className="mt-2 text-xs text-[#66735A]">{reviewMessage}</p>
                                                        )}

                                                        <div className="flex gap-2 mt-3">
                                                            <button type="button" onClick={closeReview} disabled={reviewLoading} className="flex-1 h-9 border border-stone-200 rounded-lg text-xs font-semibold text-stone-500">
                                                                Annuler
                                                            </button>

                                                            <button type="button" onClick={()=>sendReview(reservation.event.id)} disabled={reviewLoading} className="flex-1 h-9 bg-[#263128] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 disabled:opacity-60">
                                                                {reviewLoading && <LoaderCircle size={14} className="animate-spin"/>}
                                                                {reviewLoading ? "Envoi..." : "Publier"}
                                                            </button>
                                                        </div>

                                                    </div>
                                                )}

                                            </div>
                                        )}

                                        <div className="bg-[#FAF9F6] border-t border-[#EEEAE2] px-4 py-3 flex items-center justify-between">

                                            <p className="text-[10px] text-[#999B95]">Réservation #{reservation.id}</p>

                                            {reservation.event && (
                                                <Link to={"/events/"+reservation.event.id} className="flex items-center gap-1.5 text-[11px] font-bold text-[#66735A] hover:text-[#263128]">
                                                    Voir l'événement
                                                    <ArrowRight size={12}/>
                                                </Link>
                                            )}

                                        </div>

                                    </div>
                                ))}

                            </div>
                        )}

                    </div>
                </div>
            </main>
        </>
    );
}

export default Reservations;