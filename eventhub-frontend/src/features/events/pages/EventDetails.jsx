import { useEffect, useState } from "react";
import { MapPin, Users, Heart } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../../components/layout/Navbar";
import { getEvent } from "../../../services/eventService";

function EventDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function loadEvent() {

            try {

                const data = await getEvent(id);

                setEvent(data);

            } catch (error) {

                setError(error.message);

            } finally {

                setLoading(false);

            }
        }

        loadEvent();

    }, [id]);

    const handleReservation = () => {

        const token = localStorage.getItem("eventhub_token");

        if (!token) {

            navigate("/login", {
                state: {
                    redirectTo: "/reservation/" + event.id
                }
            });

            return;
        }

        navigate("/reservation/" + event.id);
    };

    if (loading) {
        return (
            <>
                <Navbar />

                <div className="min-h-screen bg-[#FDFCF9] flex items-center justify-center">
                    <p className="text-stone-500">
                        Chargement...
                    </p>
                </div>
            </>
        );
    }

    if (error || !event) {
        return (
            <>
                <Navbar />

                <div className="min-h-screen bg-[#FDFCF9] flex items-center justify-center">
                    <p className="text-red-500">
                        {error || "Événement introuvable"}
                    </p>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-[#FDFCF9]">

                <div className="max-w-7xl mx-auto px-6 py-8">

                    <button onClick={() => navigate("/")} className="mb-6 text-sm font-semibold text-[#66735A] hover:text-[#263128]">
                        ← Retour aux événements
                    </button>

                    <div className="grid lg:grid-cols-2 gap-10">

                        {/* IMAGE */}
                        <div>

                            <div className="relative h-[500px] overflow-hidden rounded-[30px_12px_30px_12px] bg-stone-100">

                                {event.image ? (
                                    <img src={"http://127.0.0.1:8000/storage/" + event.image} alt={event.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-stone-400">
                                        Aucune image
                                    </div>
                                )}

                                <button type="button" className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/95 flex items-center justify-center shadow-sm text-[#263128] hover:text-[#B68D5B] transition">
                                    <Heart size={18} />
                                </button>

                            </div>

                        </div>

                        {/* INFORMATIONS */}
                        <div className="flex flex-col justify-center">

                            <p className="text-xs uppercase tracking-[3px] font-semibold text-[#78806F]">
                                {event.type}
                            </p>

                            <h1 className="mt-3 text-4xl font-bold text-[#20231F]">
                                {event.title}
                            </h1>

                            <div className="mt-6 flex flex-wrap gap-5 text-sm text-stone-600">

                                <span className="flex items-center gap-2">
                                    <MapPin size={17} className="text-[#66735A]" />
                                    {event.city}
                                </span>

                                <span className="flex items-center gap-2">
                                    <Users size={17} className="text-[#66735A]" />
                                    Jusqu'à {event.capacity} personnes
                                </span>

                            </div>

                            {/* DESCRIPTION */}
                            <div className="mt-8 border-t border-stone-200 pt-6">

                                <h2 className="text-lg font-bold text-[#20231F]">
                                    À propos de cette prestation
                                </h2>

                                <p className="mt-3 text-sm text-stone-500 leading-7">
                                    {event.description || "Aucune description disponible."}
                                </p>

                            </div>

                            {/* RESERVATION */}
                            <div className="mt-8 bg-[#F3F0E9] rounded-[22px_10px_22px_10px] p-5 flex items-center justify-between">

                                <div>

                                    <p className="text-xs text-stone-500">
                                        À partir de
                                    </p>

                                    <p className="mt-1 text-2xl font-bold text-[#20231F]">
                                        {Number(event.price).toLocaleString("fr-FR")} DH
                                    </p>

                                </div>

                                <button onClick={handleReservation} className="bg-[#263128] hover:bg-[#354137] text-white px-7 py-3 rounded-[16px_7px_16px_7px] text-sm font-semibold transition">
                                    Réserver
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

export default EventDetails;