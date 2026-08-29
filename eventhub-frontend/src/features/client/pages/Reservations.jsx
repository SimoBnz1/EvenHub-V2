import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CalendarDays, MapPin, Users } from "lucide-react";
import { useState } from "react";
import Navbar from "../../../components/layout/Navbar";

function Reservation() {
    const { id } = useParams();

    const [formData, setFormData] = useState({
        date: "",
        location: "",
        guests: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log({
            event_id: id,
            ...formData
        });
    };

    return (
        <>
        <Navbar />
            <div className="min-h-screen bg-[#FDFCF9]">
            <div className="max-w-5xl mx-auto px-6 py-10">

                <Link to={`/events/${id}`} className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-[#263128]">
                    <ArrowLeft size={16} />
                    Retour à l'événement
                </Link>

                <div className="mt-8 grid lg:grid-cols-[1fr_360px] gap-8">

                    <div className="bg-white border border-stone-200 rounded-[28px_12px_28px_12px] p-7">
                        <p className="text-xs uppercase tracking-[3px] text-[#78806F] font-semibold">
                            Réservation
                        </p>

                        <h1 className="mt-2 text-3xl font-bold text-[#20231F]">
                            Préparez votre événement
                        </h1>

                        <p className="mt-2 text-sm text-stone-500">
                            Indiquez les informations principales de votre réservation.
                        </p>

                        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

                            <div>
                                <label className="block text-sm font-semibold text-stone-700 mb-2">
                                    Date de l'événement
                                </label>

                                <div className="relative">
                                    <CalendarDays size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />

                                    <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full h-12 pl-11 pr-4 bg-stone-50 border border-stone-200 rounded-[14px_7px_14px_7px] outline-none text-sm focus:border-[#66735A] focus:bg-white transition" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-stone-700 mb-2">
                                    Lieu
                                </label>

                                <div className="relative">
                                    <MapPin size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />

                                    <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Ex: Marrakech" className="w-full h-12 pl-11 pr-4 bg-stone-50 border border-stone-200 rounded-[14px_7px_14px_7px] outline-none text-sm focus:border-[#66735A] focus:bg-white transition" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-stone-700 mb-2">
                                    Nombre d'invités
                                </label>

                                <div className="relative">
                                    <Users size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />

                                    <input type="number" name="guests" value={formData.guests} onChange={handleChange} placeholder="Ex: 120" min="1" className="w-full h-12 pl-11 pr-4 bg-stone-50 border border-stone-200 rounded-[14px_7px_14px_7px] outline-none text-sm focus:border-[#66735A] focus:bg-white transition" />
                                </div>
                            </div>

                            <button type="submit" className="w-full h-12 bg-[#263128] hover:bg-[#354137] text-white rounded-[15px_7px_15px_7px] text-sm font-semibold transition">
                                Continuer
                            </button>

                        </form>
                    </div>

                    <div className="bg-[#263128] text-white rounded-[26px_10px_26px_10px] p-6 h-fit">
                        <p className="text-xs uppercase tracking-[2px] text-white/50">
                            Votre choix
                        </p>

                        <h2 className="mt-3 text-xl font-bold">
                            Événement #{id}
                        </h2>

                        <p className="mt-3 text-sm text-white/60 leading-6">
                            Les détails complets et le prix seront récupérés automatiquement depuis l'événement.
                        </p>

                        <div className="mt-6 pt-5 border-t border-white/10">
                            <p className="text-xs text-white/50">
                                Statut initial
                            </p>

                            <span className="inline-block mt-2 px-3 py-1.5 bg-white/10 rounded-full text-xs">
                                En attente
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        </>
        
    );
}

export default Reservation;