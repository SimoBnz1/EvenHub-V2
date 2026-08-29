import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEvent, updateEvent } from "../../../services/eventService";
import TraiteurSidebar from "../components/TraiteurSidebar";

function EditEvent() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [city, setCity] = useState("");
    const [capacity, setCapacity] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    const [oldImage, setOldImage] = useState("");
    const [image, setImage] = useState(null);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        async function loadEvent() {

            try {

                const event = await getEvent(id);

                setTitle(event.title);
                setType(event.type);
                setCity(event.city);
                setCapacity(event.capacity);
                setPrice(event.price);
                setDescription(event.description || "");
                setOldImage(event.image);

            } catch (error) {

                setError(error.message);

            } finally {

                setLoading(false);
            }
        }

        loadEvent();

    }, [id]);


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setError("");

            await updateEvent(id, {
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
        }
    };


    if (loading) {
        return (
            <div className="min-h-screen bg-[#F5F3EE]">

                <TraiteurSidebar />

                <main className="ml-64 p-10">
                    <p className="text-stone-500">
                        Chargement...
                    </p>
                </main>

            </div>
        );
    }


    return (
        <div className="min-h-screen bg-[#F5F3EE]">

            <TraiteurSidebar />

            <main className="ml-64 min-h-screen px-10 py-10">

                <div className="max-w-4xl">

                    <p className="text-sm font-semibold text-[#66735A]">
                        Gestion des événements
                    </p>

                    <h1 className="mt-2 text-3xl font-bold text-[#20231F]">
                        Modifier l'événement
                    </h1>

                    <p className="mt-2 text-sm text-stone-500">
                        Modifiez les informations de votre événement.
                    </p>


                    <form onSubmit={handleSubmit} className="mt-8 bg-white border border-stone-200 rounded-2xl p-8">

                        {error && (
                            <div className="mb-6 bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">
                                {error}
                            </div>
                        )}


                        <div className="grid grid-cols-2 gap-5">

                            <div>

                                <label className="block mb-2 text-sm font-semibold text-stone-700">
                                    Titre
                                </label>

                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full h-12 px-4 border border-stone-200 rounded-xl outline-none focus:border-[#66735A]" />

                            </div>


                            <div>

                                <label className="block mb-2 text-sm font-semibold text-stone-700">
                                    Type
                                </label>

                                <select value={type} onChange={(e) => setType(e.target.value)} className="w-full h-12 px-4 border border-stone-200 rounded-xl outline-none focus:border-[#66735A]">

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
                                        Entreprise
                                    </option>

                                </select>

                            </div>


                            <div>

                                <label className="block mb-2 text-sm font-semibold text-stone-700">
                                    Ville
                                </label>

                                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="w-full h-12 px-4 border border-stone-200 rounded-xl outline-none focus:border-[#66735A]" />

                            </div>


                            <div>

                                <label className="block mb-2 text-sm font-semibold text-stone-700">
                                    Capacité
                                </label>

                                <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} className="w-full h-12 px-4 border border-stone-200 rounded-xl outline-none focus:border-[#66735A]" />

                            </div>


                            <div>

                                <label className="block mb-2 text-sm font-semibold text-stone-700">
                                    Prix
                                </label>

                                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full h-12 px-4 border border-stone-200 rounded-xl outline-none focus:border-[#66735A]" />

                            </div>

                        </div>


                        <div className="mt-5">

                            <label className="block mb-2 text-sm font-semibold text-stone-700">
                                Description
                            </label>

                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="5" className="w-full px-4 py-3 border border-stone-200 rounded-xl outline-none resize-none focus:border-[#66735A]"></textarea>

                        </div>


                        <div className="mt-5">

                            <label className="block mb-2 text-sm font-semibold text-stone-700">
                                Image actuelle
                            </label>

                            {oldImage && (
                                <img src={"http://127.0.0.1:8000/storage/" + oldImage} alt={title} className="w-48 h-32 object-cover rounded-xl border border-stone-200 mb-4" />
                            )}

                            <label className="block mb-2 text-sm font-semibold text-stone-700">
                                Changer l'image
                            </label>

                            <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => setImage(e.target.files[0])} className="block w-full text-sm text-stone-500 border border-stone-200 rounded-xl p-3" />

                            <p className="mt-2 text-xs text-stone-400">
                                Laissez vide pour garder l'image actuelle.
                            </p>

                        </div>


                        <div className="mt-8 flex justify-end gap-3">

                            <button type="button" onClick={() => navigate("/traiteur/events")} className="px-6 py-3 border border-stone-200 rounded-xl text-sm font-semibold text-stone-600">
                                Annuler
                            </button>

                            <button type="submit" className="px-6 py-3 bg-[#263128] text-white rounded-xl text-sm font-semibold">
                                Enregistrer
                            </button>

                        </div>

                    </form>

                </div>

            </main>

        </div>
    );
}

export default EditEvent;