import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Image, Upload, CalendarPlus, MapPin, Users, Banknote } from "lucide-react";
import { createEvent } from "../../../services/eventService";
import TraiteurSidebar from "../components/TraiteurSidebar";

function CreateEvent() {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [city, setCity] = useState("");
    const [capacity, setCapacity] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setError("");
            setLoading(true);

            await createEvent({
                title: title,
                type: type,
                city: city,
                capacity: capacity,
                price: price,
                description: description,
                image: image
            });

            navigate("/traiteur/events");

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F6F4EF]">

            <TraiteurSidebar />

            <main className="ml-64 min-h-screen">

                {/* TOP */}
                <div className="border-b border-[#E5E1D8] bg-[#F6F4EF]">

                    <div className="px-10 py-7 flex items-center justify-between">

                        <div>

                            <button type="button" onClick={() => navigate("/traiteur/events")} className="flex items-center gap-2 text-xs font-semibold text-[#777C74] hover:text-[#263128] transition">
                                <ArrowLeft size={15} />
                                Mes événements
                            </button>

                            <div className="mt-4 flex items-center gap-3">

                                <div className="w-11 h-11 rounded-2xl bg-[#E8ECE3] flex items-center justify-center text-[#52604D]">
                                    <CalendarPlus size={20} />
                                </div>

                                <div>
                                    <h1 className="text-2xl font-bold text-[#20231F]">
                                        Créer un événement
                                    </h1>

                                    <p className="mt-1 text-sm text-[#888C85]">
                                        Publiez une nouvelle prestation sur EventHub.
                                    </p>
                                </div>

                            </div>

                        </div>

                        <div className="hidden lg:block text-right">
                            <p className="text-[10px] uppercase tracking-[2px] font-bold text-[#92968E]">
                                Nouvelle publication
                            </p>

                            <p className="mt-1 text-sm font-semibold text-[#66735A]">
                                EventHub Provider
                            </p>
                        </div>

                    </div>

                </div>

                {/* CONTENT */}
                <div className="px-10 py-9">

                    <form onSubmit={handleSubmit} className="max-w-6xl">

                        {error && (
                            <div className="mb-6 bg-red-50 border border-red-100 text-red-600 px-5 py-4 rounded-2xl text-sm">
                                {error}
                            </div>
                        )}

                        <div className="grid lg:grid-cols-[1fr_360px] gap-7">

                            {/* LEFT */}
                            <div className="space-y-6">

                                {/* INFORMATIONS */}
                                <section className="bg-white border border-[#E7E3DB] rounded-[24px] p-7">

                                    <div className="flex items-center justify-between mb-7">

                                        <div>
                                            <p className="text-[10px] uppercase tracking-[2px] font-bold text-[#8B9284]">
                                                Informations
                                            </p>

                                            <h2 className="mt-1 text-lg font-bold text-[#20231F]">
                                                Détails de l'événement
                                            </h2>
                                        </div>

                                        <span className="text-xs text-[#A09E98]">
                                            * Champs obligatoires
                                        </span>

                                    </div>

                                    <div className="grid md:grid-cols-2 gap-5">

                                        <div className="md:col-span-2">

                                            <label className="block mb-2 text-xs font-bold text-[#4D514B]">
                                                Titre de l'événement
                                            </label>

                                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex : Mariage Jardin Atlas" required className="w-full h-12 px-4 bg-[#FAF9F6] border border-[#E5E1D9] rounded-xl text-sm text-[#20231F] outline-none transition focus:bg-white focus:border-[#66735A] focus:ring-2 focus:ring-[#66735A]/10" />

                                        </div>

                                        <div>

                                            <label className="block mb-2 text-xs font-bold text-[#4D514B]">
                                                Type
                                            </label>

                                            <select value={type} onChange={(e) => setType(e.target.value)} required className="w-full h-12 px-4 bg-[#FAF9F6] border border-[#E5E1D9] rounded-xl text-sm text-[#20231F] outline-none transition focus:bg-white focus:border-[#66735A]">

                                                <option value="">
                                                    Choisir un type
                                                </option>

                                                <option value="Mariage">
                                                    Mariage
                                                </option>

                                                <option value="Anniversaire">
                                                    Anniversaire
                                                </option>

                                                <option value="Dîner">
                                                    Dîner
                                                </option>

                                                <option value="Entreprise">
                                                    Événement entreprise
                                                </option>

                                            </select>

                                        </div>

                                        <div>

                                            <label className="block mb-2 text-xs font-bold text-[#4D514B]">
                                                Ville
                                            </label>

                                            <div className="relative">

                                                <MapPin size={16} className="absolute left-4 top-4 text-[#8A9182]" />

                                                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Marrakech" required className="w-full h-12 pl-11 pr-4 bg-[#FAF9F6] border border-[#E5E1D9] rounded-xl text-sm text-[#20231F] outline-none transition focus:bg-white focus:border-[#66735A]" />

                                            </div>

                                        </div>

                                        <div>

                                            <label className="block mb-2 text-xs font-bold text-[#4D514B]">
                                                Capacité
                                            </label>

                                            <div className="relative">

                                                <Users size={16} className="absolute left-4 top-4 text-[#8A9182]" />

                                                <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} placeholder="150" min="1" required className="w-full h-12 pl-11 pr-20 bg-[#FAF9F6] border border-[#E5E1D9] rounded-xl text-sm text-[#20231F] outline-none transition focus:bg-white focus:border-[#66735A]" />

                                                <span className="absolute right-4 top-4 text-[11px] text-[#9A9D96]">
                                                    personnes
                                                </span>

                                            </div>

                                        </div>

                                        <div>

                                            <label className="block mb-2 text-xs font-bold text-[#4D514B]">
                                                Prix à partir de
                                            </label>

                                            <div className="relative">

                                                <Banknote size={16} className="absolute left-4 top-4 text-[#8A9182]" />

                                                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="8500" min="0" required className="w-full h-12 pl-11 pr-16 bg-[#FAF9F6] border border-[#E5E1D9] rounded-xl text-sm text-[#20231F] outline-none transition focus:bg-white focus:border-[#66735A]" />

                                                <span className="absolute right-4 top-4 text-[11px] font-semibold text-[#8A8E86]">
                                                    MAD
                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                </section>

                                {/* DESCRIPTION */}
                                <section className="bg-white border border-[#E7E3DB] rounded-[24px] p-7">

                                    <p className="text-[10px] uppercase tracking-[2px] font-bold text-[#8B9284]">
                                        Présentation
                                    </p>

                                    <h2 className="mt-1 text-lg font-bold text-[#20231F]">
                                        Description
                                    </h2>

                                    <p className="mt-1 text-xs text-[#92958F]">
                                        Présentez votre prestation aux futurs clients.
                                    </p>

                                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="6" placeholder="Décrivez votre événement, le service proposé, le menu, l'ambiance..." className="mt-5 w-full px-4 py-4 bg-[#FAF9F6] border border-[#E5E1D9] rounded-xl text-sm text-[#20231F] outline-none resize-none leading-6 transition focus:bg-white focus:border-[#66735A]"></textarea>

                                </section>

                            </div>

                            {/* RIGHT */}
                            <div>

                                <section className="bg-white border border-[#E7E3DB] rounded-[24px] p-6 lg:sticky lg:top-6">

                                    <p className="text-[10px] uppercase tracking-[2px] font-bold text-[#8B9284]">
                                        Visuel
                                    </p>

                                    <h2 className="mt-1 text-lg font-bold text-[#20231F]">
                                        Photo principale
                                    </h2>

                                    <p className="mt-1 text-xs leading-5 text-[#92958F]">
                                        Choisissez une photo qui représente bien votre prestation.
                                    </p>

                                    <label className="mt-5 w-full h-[230px] border-2 border-dashed border-[#DDD9D0] rounded-[20px] flex flex-col items-center justify-center cursor-pointer overflow-hidden bg-[#FAF9F6] hover:border-[#66735A] hover:bg-[#F6F7F3] transition">

                                        {image ? (
                                            <div className="w-full h-full flex flex-col items-center justify-center px-5 text-center">

                                                <div className="w-12 h-12 rounded-full bg-[#E8ECE3] flex items-center justify-center">
                                                    <Image size={21} className="text-[#66735A]" />
                                                </div>

                                                <p className="mt-4 max-w-[250px] text-sm font-bold text-[#30352E] truncate">
                                                    {image.name}
                                                </p>

                                                <p className="mt-1 text-xs text-[#969991]">
                                                    Cliquez pour changer
                                                </p>

                                            </div>
                                        ) : (
                                            <div className="text-center px-5">

                                                <div className="mx-auto w-12 h-12 rounded-full bg-[#E8ECE3] flex items-center justify-center">
                                                    <Upload size={20} className="text-[#66735A]" />
                                                </div>

                                                <p className="mt-4 text-sm font-bold text-[#30352E]">
                                                    Importer une photo
                                                </p>

                                                <p className="mt-1 text-xs text-[#969991]">
                                                    JPG, PNG ou WEBP
                                                </p>

                                                <p className="mt-3 text-[10px] text-[#B0B1AC]">
                                                    Maximum 2 MB
                                                </p>

                                            </div>
                                        )}

                                        <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => setImage(e.target.files[0])} className="hidden" />

                                    </label>

                                    {/* ACTIONS */}
                                    <div className="mt-6 pt-6 border-t border-[#EEEAE2]">

                                        <button type="submit" disabled={loading} className="w-full h-12 bg-[#263128] text-white rounded-xl text-sm font-bold hover:bg-[#354137] transition disabled:opacity-50">
                                            {loading ? "Publication..." : "Publier l'événement"}
                                        </button>

                                        <button type="button" onClick={() => navigate("/traiteur/events")} className="mt-3 w-full h-11 border border-[#DDD9D0] rounded-xl text-sm font-semibold text-[#686D65] hover:bg-[#F7F5F0] transition">
                                            Annuler
                                        </button>

                                    </div>

                                    <div className="mt-5 bg-[#F4F5F1] rounded-xl p-4">

                                        <p className="text-xs font-semibold text-[#5C6556]">
                                            Publication EventHub
                                        </p>

                                        <p className="mt-1 text-[11px] leading-5 text-[#8B9087]">
                                            Votre événement sera visible sur la marketplace après sa publication.
                                        </p>

                                    </div>

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