import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft,Upload,CalendarPlus,MapPin,Users,Banknote,Package,Plus,Trash2 } from "lucide-react";
import { createEvent } from "../../../services/eventService";
import { getEquipment } from "../../../services/equipmentService";
import TraiteurSidebar from "../components/TraiteurSidebar";

function CreateEvent(){
    const navigate=useNavigate();

    const [title,setTitle]=useState("");
    const [type,setType]=useState("");
    const [city,setCity]=useState("");
    const [capacity,setCapacity]=useState("");
    const [price,setPrice]=useState("");
    const [description,setDescription]=useState("");
    const [image,setImage]=useState(null);

    const [equipmentList,setEquipmentList]=useState([]);
    const [selectedEquipment,setSelectedEquipment]=useState("");
    const [equipmentQuantity,setEquipmentQuantity]=useState("");
    const [eventEquipment,setEventEquipment]=useState([]);

    const [error,setError]=useState("");
    const [loading,setLoading]=useState(false);

    useEffect(()=>{
        loadEquipment();
    },[]);

    async function loadEquipment(){
        try{
            const data=await getEquipment();
            setEquipmentList(data);
        }catch(error){
            setError(error.message);
        }
    }

    function addEquipment(){
        if(!selectedEquipment || !equipmentQuantity){
            setError("Choisissez un équipement et une quantité");
            return;
        }

        const equipment=equipmentList.find(item=>item.id==selectedEquipment);

        if(Number(equipmentQuantity)>equipment.total_quantity){
            setError("La quantité dépasse le stock disponible");
            return;
        }

        const alreadyAdded=eventEquipment.find(item=>item.id==selectedEquipment);

        if(alreadyAdded){
            setError("Cet équipement est déjà ajouté");
            return;
        }

        const newItem={
            id:equipment.id,
            name:equipment.name,
            quantity:equipmentQuantity,
            total_quantity:equipment.total_quantity
        };

        setEventEquipment(eventEquipment.concat(newItem));
        setSelectedEquipment("");
        setEquipmentQuantity("");
        setError("");
    }

    function removeEquipment(id){
        const newList=eventEquipment.filter(item=>item.id!==id);
        setEventEquipment(newList);
    }

    async function handleSubmit(e){
        e.preventDefault();

        try{
            setError("");
            setLoading(true);

            await createEvent({
                title:title,
                type:type,
                city:city,
                capacity:capacity,
                price:price,
                description:description,
                image:image,
                equipment:eventEquipment
            });

            navigate("/traiteur/events");
        }catch(error){
            setError(error.message);
        }finally{
            setLoading(false);
        }
    }

    return(
        <div className="min-h-screen bg-[#F7F4ED]">
            <TraiteurSidebar/>

            <main className="ml-64 min-h-screen">
                <div className="border-b border-[#E5E1D8] bg-[#F7F4ED]">
                    <div className="px-10 py-6 flex items-center justify-between">
                        <div>
                            <button type="button" onClick={()=>navigate("/traiteur/events")} className="flex items-center gap-2 text-xs font-semibold text-[#777C74] hover:text-[#263128]">
                                <ArrowLeft size={15}/>
                                Mes événements
                            </button>

                            <div className="mt-4 flex items-center gap-3">
                                <div className="w-11 h-11 rounded-2xl bg-[#E5E9DF] flex items-center justify-center text-[#66735A]">
                                    <CalendarPlus size={20}/>
                                </div>

                                <div>
                                    <h1 className="text-2xl font-bold text-[#20231F]">Nouvel événement</h1>
                                    <p className="mt-1 text-sm text-[#888C85]">Créez votre prestation et préparez les équipements nécessaires.</p>
                                </div>
                            </div>
                        </div>

                        <div className="hidden lg:block px-4 py-2 rounded-xl bg-[#ECE9DF]">
                            <p className="text-[10px] uppercase tracking-[2px] font-bold text-[#8B9284]">EventHub</p>
                            <p className="text-xs font-semibold text-[#66735A]">Espace prestataire</p>
                        </div>
                    </div>
                </div>

                <div className="px-10 py-8">
                    <form onSubmit={handleSubmit} className="max-w-6xl">

                        {error && (
                            <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600">
                                {error}
                            </div>
                        )}

                        <div className="grid lg:grid-cols-[1fr_340px] gap-6">

                            <div className="space-y-5">

                                <section className="bg-white border border-[#E7E3DB] rounded-[22px] p-6">
                                    <div className="mb-5">
                                        <p className="text-[10px] uppercase tracking-[2px] font-bold text-[#8B9284]">Informations</p>
                                        <h2 className="mt-1 text-lg font-bold text-[#20231F]">Détails de l'événement</h2>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2">
                                            <label className="block mb-2 text-xs font-bold text-[#4D514B]">Titre</label>
                                            <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Ex : Mariage Jardin Atlas" required className="w-full h-11 px-4 bg-[#FAF9F6] border border-[#E5E1D9] rounded-xl text-sm outline-none focus:border-[#66735A]"/>
                                        </div>

                                        <div>
                                            <label className="block mb-2 text-xs font-bold text-[#4D514B]">Type</label>
                                            <select value={type} onChange={(e)=>setType(e.target.value)} required className="w-full h-11 px-4 bg-[#FAF9F6] border border-[#E5E1D9] rounded-xl text-sm outline-none focus:border-[#66735A]">
                                                <option value="">Choisir</option>
                                                <option value="Mariage">Mariage</option>
                                                <option value="Anniversaire">Anniversaire</option>
                                                <option value="Dîner">Dîner</option>
                                                <option value="Entreprise">Entreprise</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block mb-2 text-xs font-bold text-[#4D514B]">Ville</label>
                                            <div className="relative">
                                                <MapPin size={15} className="absolute left-4 top-3.5 text-[#8A9182]"/>
                                                <input type="text" value={city} onChange={(e)=>setCity(e.target.value)} placeholder="Béni Mellal" required className="w-full h-11 pl-10 pr-4 bg-[#FAF9F6] border border-[#E5E1D9] rounded-xl text-sm outline-none focus:border-[#66735A]"/>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block mb-2 text-xs font-bold text-[#4D514B]">Capacité</label>
                                            <div className="relative">
                                                <Users size={15} className="absolute left-4 top-3.5 text-[#8A9182]"/>
                                                <input type="number" value={capacity} onChange={(e)=>setCapacity(e.target.value)} min="1" placeholder="150" required className="w-full h-11 pl-10 pr-4 bg-[#FAF9F6] border border-[#E5E1D9] rounded-xl text-sm outline-none focus:border-[#66735A]"/>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block mb-2 text-xs font-bold text-[#4D514B]">Prix</label>
                                            <div className="relative">
                                                <Banknote size={15} className="absolute left-4 top-3.5 text-[#8A9182]"/>
                                                <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)} min="0" placeholder="8500" required className="w-full h-11 pl-10 pr-16 bg-[#FAF9F6] border border-[#E5E1D9] rounded-xl text-sm outline-none focus:border-[#66735A]"/>
                                                <span className="absolute right-4 top-3.5 text-xs text-[#8A8E86]">MAD</span>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section className="bg-white border border-[#E7E3DB] rounded-[22px] p-6">
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="w-9 h-9 rounded-xl bg-[#E8ECE3] flex items-center justify-center">
                                            <Package size={17} className="text-[#66735A]"/>
                                        </div>

                                        <div>
                                            <h2 className="text-base font-bold text-[#20231F]">Équipements nécessaires</h2>
                                            <p className="text-xs text-[#92958F]">Sélectionnez le matériel utilisé pour cet événement.</p>
                                        </div>
                                    </div>

                                    {equipmentList.length===0 ? (
                                        <div className="bg-[#F7F5F0] rounded-xl px-4 py-4 text-sm text-[#777C74]">
                                            Aucun équipement disponible. Ajoutez d'abord vos équipements.
                                        </div>
                                    ) : (
                                        <>
                                            <div className="grid grid-cols-[1fr_130px_44px] gap-3">
                                                <select value={selectedEquipment} onChange={(e)=>setSelectedEquipment(e.target.value)} className="h-11 px-4 bg-[#FAF9F6] border border-[#E5E1D9] rounded-xl text-sm outline-none focus:border-[#66735A]">
                                                    <option value="">Équipement</option>

                                                    {equipmentList.map((item)=>(
                                                        <option key={item.id} value={item.id}>
                                                            {item.name} · {item.total_quantity} dispo.
                                                        </option>
                                                    ))}
                                                </select>

                                                <input type="number" value={equipmentQuantity} onChange={(e)=>setEquipmentQuantity(e.target.value)} min="1" placeholder="Quantité" className="h-11 px-3 bg-[#FAF9F6] border border-[#E5E1D9] rounded-xl text-sm outline-none focus:border-[#66735A]"/>

                                                <button type="button" onClick={addEquipment} className="h-11 rounded-xl bg-[#66735A] text-white flex items-center justify-center hover:bg-[#59664F]">
                                                    <Plus size={18}/>
                                                </button>
                                            </div>

                                            {eventEquipment.length>0 && (
                                                <div className="mt-4 space-y-2">
                                                    {eventEquipment.map((item)=>(
                                                        <div key={item.id} className="flex items-center justify-between px-4 py-3 bg-[#F7F6F2] border border-[#ECE8DF] rounded-xl">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                                                                    <Package size={14} className="text-[#66735A]"/>
                                                                </div>

                                                                <div>
                                                                    <p className="text-sm font-bold text-[#30342E]">{item.name}</p>
                                                                    <p className="text-[11px] text-[#969991]">Stock total : {item.total_quantity}</p>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center gap-4">
                                                                <span className="text-xs font-bold text-[#66735A]">x {item.quantity}</span>

                                                                <button type="button" onClick={()=>removeEquipment(item.id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-50">
                                                                    <Trash2 size={15}/>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </section>

                                <section className="bg-white border border-[#E7E3DB] rounded-[22px] p-6">
                                    <h2 className="text-base font-bold text-[#20231F]">Description</h2>
                                    <p className="mt-1 text-xs text-[#92958F]">Présentez votre prestation aux clients.</p>
                                    <textarea value={description} onChange={(e)=>setDescription(e.target.value)} rows="5" placeholder="Décrivez votre prestation..." className="mt-4 w-full px-4 py-3 bg-[#FAF9F6] border border-[#E5E1D9] rounded-xl text-sm outline-none resize-none focus:border-[#66735A]"></textarea>
                                </section>
                            </div>

                            <div>
                                <section className="bg-[#263128] rounded-[22px] p-5 lg:sticky lg:top-6">
                                    <div className="mb-5">
                                        <p className="text-[10px] uppercase tracking-[2px] font-bold text-[#AEB7A8]">Présentation</p>
                                        <h2 className="mt-1 text-lg font-bold text-white">Photo principale</h2>
                                    </div>

                                    <label className="w-full h-[220px] border border-dashed border-white/25 rounded-2xl flex items-center justify-center cursor-pointer overflow-hidden bg-white/5 hover:bg-white/10">
                                        {image ? (
                                            <img src={URL.createObjectURL(image)} className="w-full h-full object-cover" alt="Preview"/>
                                        ) : (
                                            <div className="text-center">
                                                <div className="mx-auto w-11 h-11 rounded-full bg-white/10 flex items-center justify-center">
                                                    <Upload size={19} className="text-white"/>
                                                </div>
                                                <p className="mt-3 text-sm font-bold text-white">Ajouter une photo</p>
                                                <p className="mt-1 text-[11px] text-[#AEB7A8]">JPG, PNG, WEBP · 2 MB max</p>
                                            </div>
                                        )}

                                        <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(e)=>setImage(e.target.files[0])} className="hidden"/>
                                    </label>

                                    <div className="mt-5 bg-white/5 rounded-xl p-4">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-[#AEB7A8]">Équipements</span>
                                            <span className="font-bold text-white">{eventEquipment.length}</span>
                                        </div>

                                        <div className="mt-3 flex justify-between text-xs">
                                            <span className="text-[#AEB7A8]">Capacité</span>
                                            <span className="font-bold text-white">{capacity || 0} pers.</span>
                                        </div>

                                        <div className="mt-3 flex justify-between text-xs">
                                            <span className="text-[#AEB7A8]">Prix</span>
                                            <span className="font-bold text-white">{price || 0} MAD</span>
                                        </div>
                                    </div>

                                    <button type="submit" disabled={loading} className="mt-5 w-full h-12 bg-[#C09A68] text-[#263128] rounded-xl text-sm font-bold hover:opacity-90 disabled:opacity-50">
                                        {loading ? "Publication..." : "Publier l'événement"}
                                    </button>

                                    <button type="button" onClick={()=>navigate("/traiteur/events")} className="mt-3 w-full h-11 border border-white/15 text-white rounded-xl text-sm font-semibold hover:bg-white/5">
                                        Annuler
                                    </button>
                                </section>
                            </div>

                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default CreateEvent;