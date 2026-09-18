import {useEffect,useState} from "react";
import {Heart,Trash2,LoaderCircle} from "lucide-react";
import Navbar from "../../../components/layout/Navbar";
import EventCard from "../../home/components/EventCard";
import {getFavorites,deleteFavorite} from "../../../services/favoriteService";

function Favorites(){
    const [favorites,setFavorites]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState("");

    useEffect(()=>{
        loadFavorites();
    },[]);

    async function loadFavorites(){
        try{
            const data=await getFavorites();
            setFavorites(data);
        }catch(error){
            setError(error.message);
        }finally{
            setLoading(false);
        }
    }

    async function removeFavorite(id){
        try{
            await deleteFavorite(id);

            const newFavorites=favorites.filter((favorite)=>{
                return favorite.id!=id;
            });

            setFavorites(newFavorites);
        }catch(error){
            setError(error.message);
        }
    }

    return(
        <>
            <Navbar/>

            <main className="min-h-screen bg-[#F7F5F0]">
                <div className="max-w-7xl mx-auto px-6 py-10">

                    <div>
                        <p className="text-[10px] uppercase tracking-[2.5px] font-bold text-[#78806F]">
                            Mon espace
                        </p>

                        <h1 className="mt-2 text-3xl font-bold text-[#20231F]">
                            Mes favoris
                        </h1>

                        <p className="mt-2 text-sm text-[#858981]">
                            Retrouvez les événements que vous avez enregistrés.
                        </p>
                    </div>

                    {error && (
                        <div className="mt-6 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm">
                            {error}
                        </div>
                    )}

                    {loading ? (
                        <div className="py-20 flex justify-center">
                            <LoaderCircle size={26} className="animate-spin text-[#66735A]"/>
                        </div>
                    ) : favorites.length===0 ? (
                        <div className="mt-8 bg-white border border-[#E5E1D8] rounded-2xl py-16 text-center">
                            <div className="w-12 h-12 mx-auto bg-[#EEF1E9] rounded-full flex items-center justify-center">
                                <Heart size={20} className="text-[#66735A]"/>
                            </div>

                            <h2 className="mt-4 text-lg font-bold text-[#20231F]">
                                Aucun favori
                            </h2>

                            <p className="mt-1 text-sm text-[#858981]">
                                Ajoutez des événements à vos favoris.
                            </p>
                        </div>
                    ) : (
                        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                            {favorites.map((favorite)=>(
                                <div key={favorite.id} className="relative">

                                    <EventCard event={favorite.event}/>

                                    <button onClick={()=>removeFavorite(favorite.id)} className="absolute bottom-5 right-5 z-20 w-9 h-9 bg-white border border-red-100 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50">
                                        <Trash2 size={15}/>
                                    </button>

                                </div>
                            ))}

                        </div>
                    )}

                </div>
            </main>
        </>
    );
}

export default Favorites;