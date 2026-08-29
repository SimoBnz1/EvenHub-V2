import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Image, Upload } from "lucide-react";
import { createEvent } from "../../../services/eventService";

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
        <div className="min-h-screen bg-[#F5F3EE]">

            <header className="border-b border-stone-200 bg-[#F5F3EE]">

                <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">

                    <div onClick={() => navigate("/")} className="cursor-pointer">

                        <span className="text-2xl font-bold text-[#20231F]">
                            event
                        </span>

                        <span className="text-2xl ml-1 italic text-[#66735A]">
                            hub
                        </span>


                    </div>

                    <button onClick={() => navigate("/traiteur/Dashboard")} className="flex items-center gap-2 text-sm text-stone-500 hover:text-[#263128]">
                        <ArrowLeft size={16} />
                        Tableau de bord
                    </button>

                </div>

            </header>


            <main className="max-w-5xl mx-auto px-6 py-10">

                <div>

                    <p className="text-sm font-semibold text-[#66735A]">
                        Nouvelle publication
                    </p>

                    <h1 className="mt-2 text-3xl font-bold text-[#20231F]">
                        Créer un événement
                    </h1>

                    <p className="mt-2 text-sm text-stone-500">
                        Ajoutez les informations de votre événement.
                    </p>

                </div>


                <form onSubmit={handleSubmit} className="mt-8 bg-white border border-stone-200 rounded-2xl p-8">

                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm">
                            {error}
                        </div>
                    )}


                    <div className="grid md:grid-cols-2 gap-6">

                        <div>

                            <label className="block mb-2 text-sm font-semibold text-stone-700">
                                Titre de l'événement
                            </label>

                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Mariage Jardin Atlas" className="w-full h-12 px-4 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-[#66735A] focus:bg-white" />

                        </div>


                        <div>

                            <label className="block mb-2 text-sm font-semibold text-stone-700">
                                Type
                            </label>

                            <select value={type} onChange={(e) => setType(e.target.value)} className="w-full h-12 px-4 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-[#66735A] focus:bg-white">

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

                            <label className="block mb-2 text-sm font-semibold text-stone-700">
                                Ville
                            </label>

                            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Marrakech" className="w-full h-12 px-4 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-[#66735A] focus:bg-white" />

                        </div>


                        <div>

                            <label className="block mb-2 text-sm font-semibold text-stone-700">
                                Capacité
                            </label>

                            <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} placeholder="150 personnes" className="w-full h-12 px-4 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-[#66735A] focus:bg-white" />

                        </div>


                        <div>

                            <label className="block mb-2 text-sm font-semibold text-stone-700">
                                Prix
                            </label>

                            <div className="relative">

                                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="8500" className="w-full h-12 px-4 pr-16 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-[#66735A] focus:bg-white" />

                                <span className="absolute right-4 top-3.5 text-xs text-stone-400">
                                    MAD
                                </span>

                            </div>

                        </div>

                    </div>


                    <div className="mt-6">

                        <label className="block mb-2 text-sm font-semibold text-stone-700">
                            Description
                        </label>

                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="5" placeholder="Décrivez votre événement, le service proposé, le menu..." className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl outline-none resize-none focus:border-[#66735A] focus:bg-white"></textarea>

                    </div>


                    <div className="mt-6">

                        <label className="block mb-2 text-sm font-semibold text-stone-700">
                            Photo de l'événement
                        </label>

                        <label className="w-full min-h-[150px] border-2 border-dashed border-stone-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-[#66735A] hover:bg-[#F7F8F5] transition">

                            {image ? (
                                <>
                                    <Image size={28} className="text-[#66735A]" />

                                    <p className="mt-3 text-sm font-semibold text-[#20231F]">
                                        {image.name}
                                    </p>

                                    <p className="mt-1 text-xs text-stone-400">
                                        Cliquez pour changer la photo
                                    </p>
                                </>
                            ) : (
                                <>
                                    <div className="w-11 h-11 rounded-full bg-[#EEF1E9] flex items-center justify-center">
                                        <Upload size={19} className="text-[#66735A]" />
                                    </div>

                                    <p className="mt-3 text-sm font-semibold text-[#20231F]">
                                        Importer une photo
                                    </p>

                                    <p className="mt-1 text-xs text-stone-400">
                                        JPG, PNG ou WEBP
                                    </p>
                                </>
                            )}

                            <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => setImage(e.target.files[0])} className="hidden" />

                        </label>

                    </div>


                    <div className="mt-8 pt-6 border-t border-stone-100 flex justify-end gap-3">

                        <button type="button" onClick={() => navigate("/traiteur/dashboard")} className="px-6 py-3 border border-stone-200 rounded-xl text-sm font-semibold text-stone-600 hover:bg-stone-50">
                            Annuler
                        </button>

                        <button type="submit" disabled={loading} className="px-7 py-3 bg-[#263128] text-white rounded-xl text-sm font-semibold hover:bg-[#344036] disabled:opacity-50">
                            {loading ? "Publication..." : "Publier l'événement"}
                        </button>

                    </div>

                </form>

            </main>

        </div>
    );
}

export default CreateEvent;