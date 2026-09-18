import {useEffect,useState} from "react";
import {Heart,MapPin,Users,ArrowUpRight} from "lucide-react";
import {Link,useNavigate} from "react-router-dom";
import {addFavorite,getFavorites} from "../../../services/favoriteService";

function EventCard({event}){
    const [favorite,setFavorite]=useState(false);
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();

    useEffect(()=>{
        async function checkFavorite(){
            const token=localStorage.getItem("eventhub_token");
            const role=localStorage.getItem("eventhub_role");

            if(!token || role!="client"){
                return;
            }

            try{
                const favorites=await getFavorites();

                for(let i=0;i<favorites.length;i++){
                    if(favorites[i].event_id==event.id){
                        setFavorite(true);
                    }
                }
            }catch(error){
                console.log(error);
            }
        }

        checkFavorite();
    },[event.id]);

    async function handleFavorite(e){
        e.preventDefault();

        const token=localStorage.getItem("eventhub_token");
        const role=localStorage.getItem("eventhub_role");

        if(!token){
            navigate("/login");
            return;
        }

        if(role!="client"){
            return;
        }

        if(favorite){
            return;
        }

        try{
            setLoading(true);
            await addFavorite(event.id);
            setFavorite(true);
        }catch(error){
            if(error.message=="Cet événement est déjà dans vos favoris."){
                setFavorite(true);
            }else{
                alert(error.message);
            }
        }finally{
            setLoading(false);
        }
    }

    return(
        <article className="group relative bg-white border border-[#E8E3D9] rounded-[28px] p-2.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(38,49,40,0.10)]">

            <Link to={"/events/"+event.id} className="block">

                <div className="relative h-[245px] overflow-hidden rounded-[22px] bg-[#F1EEE7]">

                    {event.image ? (
                        <img src={"http://127.0.0.1:8000/storage/"+event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"/>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-sm text-[#8A8E86]">
                            Aucune image
                        </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#172019]/70 via-transparent to-black/5"></div>

                    <span className="absolute top-4 left-4 bg-[#F8F5EE]/95 backdrop-blur-sm px-3.5 py-2 rounded-full text-[10px] uppercase tracking-[1.5px] font-bold text-[#4F5C4A]">
                        {event.type}
                    </span>

                    <button type="button" onClick={handleFavorite} disabled={loading} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition hover:bg-white disabled:opacity-60">
                        <Heart size={17} className={favorite ? "text-red-500 fill-red-500" : "text-[#4C514B]"}/>
                    </button>

                    <div className="absolute bottom-4 left-4 text-white">
                        <p className="text-[10px] uppercase tracking-[1.5px] text-white/70">
                            À partir de
                        </p>

                        <div className="flex items-end gap-1 mt-0.5">
                            <span className="text-[23px] leading-none font-bold">
                                {Number(event.price).toLocaleString("fr-FR")}
                            </span>

                            <span className="text-xs font-semibold text-white/80 mb-[2px]">
                                DH
                            </span>
                        </div>
                    </div>

                </div>

                <div className="px-3 pt-5 pb-3">

                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-[10px] uppercase tracking-[2px] font-bold text-[#87907F]">
                                EventHub Selection
                            </p>

                            <h3 className="mt-1.5 text-[19px] leading-snug font-bold text-[#20231F] group-hover:text-[#52604D] transition-colors">
                                {event.title}
                            </h3>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-2">

                        <div className="flex items-center gap-1.5 bg-[#F7F5F0] px-3 py-2 rounded-full text-xs font-medium text-[#686E65]">
                            <MapPin size={13} className="text-[#66735A]"/>
                            <span>{event.city}</span>
                        </div>

                        <div className="flex items-center gap-1.5 bg-[#F7F5F0] px-3 py-2 rounded-full text-xs font-medium text-[#686E65]">
                            <Users size={13} className="text-[#66735A]"/>
                            <span>{event.capacity} personnes</span>
                        </div>

                    </div>

                    <div className="mt-5 pt-4 border-t border-[#EEEAE2] flex items-center justify-between">
                        <span className="text-xs font-medium text-[#8A8E86]">
                            Découvrir l'offre
                        </span>

                        <span className="w-9 h-9 rounded-full bg-[#263128] text-white flex items-center justify-center transition-all duration-300 group-hover:bg-[#66735A] group-hover:rotate-45">
                            <ArrowUpRight size={16}/>
                        </span>
                    </div>

                </div>

            </Link>

        </article>
    );
}

export default EventCard;