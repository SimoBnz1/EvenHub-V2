import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, MapPin, Users, Pencil, Trash2 } from "lucide-react";
import { getMyEvents, deleteEvent } from "../../../services/eventService";
import TraiteurSidebar from "../components/TraiteurSidebar";


function Events() {

    const navigate = useNavigate();

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function loadEvents() {

            try {

                const data = await getMyEvents();

                setEvents(data);

            } catch (error) {

                setError(error.message);

            } finally {

                setLoading(false);
            }
        }

        loadEvents();

    }, []);

    const handleDelete = async (id) => {

        const confirmation = window.confirm(
            "Voulez-vous vraiment supprimer cet événement ?"
        );

        if (!confirmation) {
            return;
        }

        try {

            await deleteEvent(id);

            const newEvents = events.filter((event) => event.id !== id);

            setEvents(newEvents);

        } catch (error) {

            setError(error.message);

        }
    };


    return (
        <>

            <div className="min-h-screen bg-[#F5F3EE]">


                <header className="border-b border-stone-200 bg-[#F5F3EE]">

                    <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">

                        <div onClick={() => navigate("/traiteur/dashboard")} className="cursor-pointer">

                            <span className="text-2xl font-bold text-[#20231F]">
                                event
                            </span>

                            <span className="text-2xl ml-1 italic text-[#66735A]">
                                hub
                            </span>

                            <span className="ml-1 text-[#C09A68] text-xs">
                                ✦
                            </span>

                        </div>

                        <button onClick={() => navigate("/traiteur/events/create")} className="flex items-center gap-2 bg-[#263128] text-white px-5 py-3 rounded-xl text-sm font-semibold">
                            <Plus size={17} />
                            Nouvel événement
                        </button>

                    </div>

                </header>


                <main className="max-w-7xl mx-auto px-6 py-10">

                    <div className="flex gap-8">

                        {/* Sidebar */}
                        <div className="w-64 shrink-0">
                            <TraiteurSidebar />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">

                            <div>
                                <p className="text-sm font-semibold text-[#66735A]">
                                    Gestion
                                </p>

                                <h1 className="mt-2 text-3xl font-bold text-[#20231F]">
                                    Mes événements
                                </h1>

                                <p className="mt-2 text-sm text-stone-500">
                                    Gérez les événements que vous avez publiés.
                                </p>
                            </div>

                            {loading && (
                                <p className="mt-10 text-stone-500">
                                    Chargement...
                                </p>
                            )}

                            {error && (
                                <div className="mt-8 bg-red-50 text-red-600 px-4 py-3 rounded-xl">
                                    {error}
                                </div>
                            )}

                            {!loading && events.length === 0 && (
                                <div className="mt-10 bg-white border border-stone-200 rounded-2xl py-16 text-center">

                                    <h2 className="text-xl font-bold text-[#20231F]">
                                        Aucun événement
                                    </h2>

                                    <p className="mt-2 text-sm text-stone-500">
                                        Vous n'avez encore publié aucun événement.
                                    </p>

                                    <button onClick={() => navigate("/traiteur/events/create")} className="mt-6 bg-[#263128] text-white px-6 py-3 rounded-xl text-sm font-semibold">
                                        Créer un événement
                                    </button>

                                </div>
                            )}

                            {!loading && events.length > 0 && (
                                <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                                    {events.map((event) => (

                                        <div key={event.id} className="bg-white border border-stone-200 rounded-2xl overflow-hidden">

                                            <div className="h-56 bg-[#F5F3EE] overflow-hidden">

                                                {event.image ? (
                                                    <img
                                                        src={"http://127.0.0.1:8000/storage/" + event.image}
                                                        alt={event.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-sm text-stone-400">
                                                        Aucune image
                                                    </div>
                                                )}

                                            </div>

                                            <div className="p-5">

                                                <p className="text-xs font-semibold uppercase text-[#66735A]">
                                                    {event.type}
                                                </p>

                                                <h2 className="mt-2 text-lg font-bold text-[#20231F]">
                                                    {event.title}
                                                </h2>

                                                <div className="mt-4 flex items-center gap-2 text-sm text-stone-500">
                                                    <MapPin size={16} />
                                                    <span>{event.city}</span>
                                                </div>

                                                <div className="mt-2 flex items-center gap-2 text-sm text-stone-500">
                                                    <Users size={16} />
                                                    <span>{event.capacity} personnes</span>
                                                </div>

                                                <div className="mt-5 flex items-center justify-between">

                                                    <div>
                                                        <p className="text-xs text-stone-400">
                                                            À partir de
                                                        </p>

                                                        <p className="font-bold text-[#20231F]">
                                                            {event.price} MAD
                                                        </p>
                                                    </div>

                                                    <div className="flex gap-2">

                                                        <button onClick={() => navigate("/traiteur/events/" + event.id + "/edit")} className="w-10 h-10 border border-stone-200 rounded-lg flex items-center justify-center text-stone-500 hover:text-[#66735A]">
                                                            <Pencil size={16} />
                                                        </button>

                                                        <button onClick={() => handleDelete(event.id)} className="w-10 h-10 border border-stone-200 rounded-lg flex items-center justify-center text-stone-500 hover:text-red-500">
                                                            <Trash2 size={16} />
                                                        </button>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    ))}

                                </div>
                            )}

                        </div>

                    </div>

                </main>

            </div>
        </>

    );
}

export default Events;