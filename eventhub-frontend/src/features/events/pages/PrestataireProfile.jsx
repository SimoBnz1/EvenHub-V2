import {useEffect,useState} from "react";
import {useParams,Link} from "react-router-dom";
import {MapPin,Star,ArrowLeft,ArrowUpRight,LoaderCircle} from "lucide-react";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";
import {getPrestataire} from "../../../services/prestataireService";

function PrestataireProfile(){
    const {id}=useParams();
    const [prestataire,setPrestataire]=useState(null);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        loadPrestataire();
    },[id]);

    async function loadPrestataire(){
        try{
            const data=await getPrestataire(id);
            setPrestataire(data);
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    if(loading){
        return(
            <div className="min-h-screen bg-[#F7F4ED]">
                <Navbar/>
                <div className="h-[70vh] flex items-center justify-center">
                    <LoaderCircle size={30} className="animate-spin text-[#66735A]"/>
                </div>
            </div>
        );
    }

    if(!prestataire){
        return(
            <div className="min-h-screen bg-[#F7F4ED]">
                <Navbar/>
                <div className="h-[70vh] flex items-center justify-center">
                    <p className="text-[#777C74]">Prestataire introuvable.</p>
                </div>
            </div>
        );
    }

    return(
        <div className="min-h-screen bg-[#F7F4ED]">

            <Navbar/>

            <main>

                <section className="bg-[#263128] text-white">
                    <div className="max-w-6xl mx-auto px-6 py-14">

                        <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition">
                            <ArrowLeft size={16}/>
                            Retour
                        </Link>

                        <div className="mt-9 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 items-center">

                            <div className="w-[180px] h-[180px] rounded-[28px] overflow-hidden bg-white/10">

                                {prestataire.photo ? (
                                    <img src={"http://127.0.0.1:8000/storage/"+prestataire.photo} alt={prestataire.name} className="w-full h-full object-cover"/>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-5xl font-semibold text-white/60">
                                        {prestataire.name.charAt(0).toUpperCase()}
                                    </div>
                                )}

                            </div>

                            <div>

                                <p className="text-xs uppercase tracking-[2px] font-semibold text-[#C09A68]">
                                    {prestataire.category?.name || "Prestataire"}
                                </p>

                                <h1 className="mt-2 text-4xl font-semibold tracking-[-1px]">
                                    {prestataire.name}
                                </h1>

                                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/70">

                                    {prestataire.city && (
                                        <div className="flex items-center gap-2">
                                            <MapPin size={16}/>
                                            {prestataire.city}
                                        </div>
                                    )}

                                    <div className="flex items-center gap-2">
                                        <Star size={16} className="fill-[#C09A68] text-[#C09A68]"/>
                                        <span className="text-white font-semibold">{prestataire.rating}</span>
                                        <span>({prestataire.reviews_count} avis)</span>
                                    </div>

                                </div>

                                {prestataire.bio && (
                                    <p className="mt-6 max-w-2xl text-[15px] leading-7 text-white/65">
                                        {prestataire.bio}
                                    </p>
                                )}

                            </div>

                        </div>

                    </div>
                </section>

                <section className="max-w-6xl mx-auto px-6 py-14">

                    <div className="flex items-end justify-between mb-8">

                        <div>
                            <p className="text-[10px] uppercase tracking-[2px] font-bold text-[#87907F]">
                                Prestations
                            </p>

                            <h2 className="mt-2 text-2xl font-semibold text-[#20231F]">
                                Les offres de {prestataire.name}
                            </h2>
                        </div>

                        <p className="text-sm text-[#8A8E86]">
                            {prestataire.events.length} offre(s)
                        </p>

                    </div>

                    {prestataire.events.length==0 ? (

                        <div className="bg-white border border-[#E4E0D7] rounded-[24px] p-12 text-center">
                            <p className="text-[#777C74]">
                                Ce prestataire n'a pas encore publié d'offre.
                            </p>
                        </div>

                    ) : (

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                            {prestataire.events.map((event)=>(

                                <Link key={event.id} to={"/events/"+event.id} className="group bg-white border border-[#E5E1D8] rounded-[24px] overflow-hidden hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(38,49,40,0.08)] transition-all duration-300">

                                    <div className="h-[210px] bg-[#ECE9E1] overflow-hidden">

                                        {event.image ? (
                                            <img src={"http://127.0.0.1:8000/storage/"+event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500"/>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-sm text-[#8A8E86]">
                                                Aucune image
                                            </div>
                                        )}

                                    </div>

                                    <div className="p-5">

                                        <p className="text-[10px] uppercase tracking-[1.5px] font-bold text-[#7E8978]">
                                            {event.type}
                                        </p>

                                        <h3 className="mt-2 text-lg font-semibold text-[#20231F]">
                                            {event.title}
                                        </h3>

                                        <div className="mt-4 flex items-center justify-between">

                                            <div>
                                                <p className="text-[10px] text-[#999D96] uppercase">
                                                    À partir de
                                                </p>

                                                <p className="mt-1 font-bold text-[#263128]">
                                                    {Number(event.price).toLocaleString("fr-FR")} DH
                                                </p>
                                            </div>

                                            <span className="w-10 h-10 rounded-full bg-[#263128] text-white flex items-center justify-center group-hover:bg-[#66735A] transition">
                                                <ArrowUpRight size={17}/>
                                            </span>

                                        </div>

                                    </div>

                                </Link>

                            ))}

                        </div>

                    )}

                </section>

            </main>

            <Footer/>

        </div>
    );
}

export default PrestataireProfile;
