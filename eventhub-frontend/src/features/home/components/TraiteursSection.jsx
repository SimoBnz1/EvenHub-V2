import {useEffect,useState} from "react";
import {MapPin,Star,LoaderCircle} from "lucide-react";
import {getTopPrestataires} from "../../../services/top3Service";

function TraiteursSection(){
    const [prestataires,setPrestataires]=useState([]);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        async function loadPrestataires(){
            try{
                const data=await getTopPrestataires();
                setPrestataires(data);
            }catch(error){
                console.log(error);
            }finally{
                setLoading(false);
            }
        }

        loadPrestataires();
    },[]);

    function getImage(image){
        if(image){
            return "http://127.0.0.1:8000/storage/"+image;
        }

        return "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=85";
    }

    return(
        <section className="bg-gradient-to-b from-stone-50 via-stone-100 to-stone-100 pt-10 pb-20">
            <div className="max-w-7xl mx-auto px-6">

                <div className="mb-8">
                    <p className="text-xs uppercase tracking-[3px] font-semibold text-[#78806F]">Nos professionnels</p>
                    <h2 className="mt-2 text-3xl font-bold text-[#20231F]">Les prestataires les mieux notés.</h2>
                    <p className="mt-2 text-sm text-stone-500">Découvrez les professionnels les mieux notés par nos clients.</p>
                </div>

                {loading ? (
                    <div className="py-20 flex justify-center">
                        <LoaderCircle size={28} className="animate-spin text-[#66735A]"/>
                    </div>
                ) : prestataires.length===0 ? (
                    <div className="bg-white border border-stone-200 rounded-2xl py-14 text-center">
                        <Star size={25} className="mx-auto text-stone-300"/>
                        <p className="mt-3 text-sm text-stone-500">Aucun prestataire noté pour le moment.</p>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-2 gap-5">

                        <div className="group relative min-h-[440px] overflow-hidden rounded-[32px_12px_32px_12px]">

                            <img src={getImage(prestataires[0].image)} alt={prestataires[0].name} className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105"/>

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent"></div>

                            <div className="absolute top-5 left-5">
                                <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-stone-700">
                                    Coup de cœur
                                </span>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-7 text-white">

                                <p className="text-xs text-white/70">
                                    {prestataires[0].category}
                                </p>

                                <h3 className="mt-2 text-2xl font-bold">
                                    {prestataires[0].name}
                                </h3>

                                <div className="flex items-center gap-4 mt-3 text-sm text-white/80">

                                    {prestataires[0].city && (
                                        <span className="flex items-center gap-1">
                                            <MapPin size={14}/>
                                            {prestataires[0].city}
                                        </span>
                                    )}

                                    <span className="flex items-center gap-1">
                                        <Star size={14} className="fill-white"/>
                                        {prestataires[0].rating} · {prestataires[0].reviews_count} avis
                                    </span>

                                </div>

                            </div>
                        </div>

                        <div className="grid gap-5">

                            {prestataires.slice(1).map((prestataire)=>(
                                <div key={prestataire.id} className="group bg-white rounded-[24px_10px_24px_10px] p-3 flex gap-5 border border-stone-200 hover:shadow-lg hover:shadow-stone-200/50 transition">

                                    <div className="w-[180px] h-[190px] shrink-0 overflow-hidden rounded-[18px_7px_18px_7px]">
                                        <img src={getImage(prestataire.image)} alt={prestataire.name} className="w-full h-full object-cover transition duration-500 group-hover:scale-105"/>
                                    </div>

                                    <div className="flex-1 py-3 pr-3 flex flex-col justify-between">

                                        <div>
                                            <p className="text-xs text-[#78806F] font-medium">
                                                {prestataire.category}
                                            </p>

                                            <h3 className="mt-2 text-xl font-bold text-[#20231F]">
                                                {prestataire.name}
                                            </h3>

                                            {prestataire.city && (
                                                <p className="mt-3 flex items-center gap-1 text-sm text-stone-500">
                                                    <MapPin size={14}/>
                                                    {prestataire.city}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2 text-sm text-stone-600">
                                            <Star size={14} className="text-[#C09A68] fill-[#C09A68]"/>
                                            <b>{prestataire.rating}</b>
                                            <span className="text-stone-400">
                                                ({prestataire.reviews_count} avis)
                                            </span>
                                        </div>

                                    </div>

                                </div>
                            ))}

                        </div>

                    </div>
                )}

            </div>
        </section>
    );
}

export default TraiteursSection;