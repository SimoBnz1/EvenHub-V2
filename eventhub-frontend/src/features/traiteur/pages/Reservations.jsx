import { useEffect, useState } from "react";
import { CalendarDays, MapPin, Users, Check, X, Clock, Inbox } from "lucide-react";
import TraiteurSidebar from "../components/TraiteurSidebar";
import { getReservations, updateReservationStatus } from "../../../services/reservationService";

function Reservations() {

    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function loadReservations() {

            try {

                const data = await getReservations();

                setReservations(data);

            } catch (error) {

                setError(error.message);

            } finally {

                setLoading(false);
            }
        }

        loadReservations();

    }, []);

    const handleStatus = async (id, status) => {

        try {

            setError("");

            await updateReservationStatus(id, status);

            const newReservations = reservations.map((reservation) => {

                if (reservation.id === id) {

                    return {
                        id: reservation.id,
                        client_id: reservation.client_id,
                        event_id: reservation.event_id,
                        event_date: reservation.event_date,
                        location: reservation.location,
                        guest_count: reservation.guest_count,
                        total_amount: reservation.total_amount,
                        status: status,
                        created_at: reservation.created_at,
                        updated_at: reservation.updated_at,
                        event: reservation.event,
                        client: reservation.client
                    };
                }

                return reservation;
            });

            setReservations(newReservations);

        } catch (error) {

            setError(error.message);
        }
    };

    const pendingCount = reservations.filter((reservation) => reservation.status === "pending").length;
    const acceptedCount = reservations.filter((reservation) => reservation.status === "accepted").length;
    const rejectedCount = reservations.filter((reservation) => reservation.status === "rejected").length;

    return (
        <div className="min-h-screen bg-[#F5F3EE]">

            <TraiteurSidebar />

            <main className="ml-64 min-h-screen px-10 py-9">

                {/* HEADER */}
                <div className="flex items-end justify-between">

                    <div>

                        <p className="text-[10px] uppercase tracking-[2.5px] font-bold text-[#7B8573]">
                            Gestion des demandes
                        </p>

                        <h1 className="mt-2 text-3xl font-bold text-[#20231F]">
                            Réservations
                        </h1>

                        <p className="mt-2 text-sm text-[#858981]">
                            Consultez et gérez les demandes reçues pour vos événements.
                        </p>

                    </div>

                    <div className="bg-white border border-[#E4E0D7] rounded-full px-4 py-2 flex items-center gap-2">

                        <span className="w-2 h-2 bg-[#B68D5B] rounded-full"></span>

                        <span className="text-xs font-semibold text-[#656A62]">
                            {pendingCount} en attente
                        </span>

                    </div>

                </div>


                {/* STATS */}
                <div className="mt-7 grid grid-cols-3 gap-4">

                    <div className="bg-white border border-[#E5E1D8] rounded-2xl px-5 py-4 flex items-center justify-between">

                        <div>
                            <p className="text-xs text-[#8B8E88]">
                                En attente
                            </p>

                            <p className="mt-1 text-2xl font-bold text-[#20231F]">
                                {pendingCount}
                            </p>
                        </div>

                        <div className="w-10 h-10 rounded-xl bg-[#F5EFE4] flex items-center justify-center">
                            <Clock size={18} className="text-[#B68D5B]" />
                        </div>

                    </div>


                    <div className="bg-white border border-[#E5E1D8] rounded-2xl px-5 py-4 flex items-center justify-between">

                        <div>
                            <p className="text-xs text-[#8B8E88]">
                                Acceptées
                            </p>

                            <p className="mt-1 text-2xl font-bold text-[#20231F]">
                                {acceptedCount}
                            </p>
                        </div>

                        <div className="w-10 h-10 rounded-xl bg-[#EDF1E9] flex items-center justify-center">
                            <Check size={18} className="text-[#66735A]" />
                        </div>

                    </div>


                    <div className="bg-white border border-[#E5E1D8] rounded-2xl px-5 py-4 flex items-center justify-between">

                        <div>
                            <p className="text-xs text-[#8B8E88]">
                                Refusées
                            </p>

                            <p className="mt-1 text-2xl font-bold text-[#20231F]">
                                {rejectedCount}
                            </p>
                        </div>

                        <div className="w-10 h-10 rounded-xl bg-[#F6ECE9] flex items-center justify-center">
                            <X size={18} className="text-[#A86658]" />
                        </div>

                    </div>

                </div>


                {/* ERROR */}
                {error && (
                    <div className="mt-6 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm">
                        {error}
                    </div>
                )}


                {/* CONTENT */}
                <div className="mt-7">

                    {loading ? (

                        <div className="bg-white border border-[#E5E1D8] rounded-2xl p-10 text-center">
                            <p className="text-sm text-stone-500">
                                Chargement des réservations...
                            </p>
                        </div>

                    ) : reservations.length === 0 ? (

                        <div className="bg-white border border-[#E5E1D8] rounded-2xl py-16 text-center">

                            <div className="mx-auto w-12 h-12 rounded-full bg-[#EEF1E9] flex items-center justify-center">
                                <Inbox size={20} className="text-[#66735A]" />
                            </div>

                            <h2 className="mt-4 text-lg font-bold text-[#20231F]">
                                Aucune réservation
                            </h2>

                            <p className="mt-1 text-sm text-[#8A8E86]">
                                Les nouvelles demandes apparaîtront ici.
                            </p>

                        </div>

                    ) : (

                        <div className="space-y-3">

                            {reservations.map((reservation) => (

                                <div key={reservation.id} className="bg-white border border-[#E5E1D8] rounded-2xl px-5 py-4 transition hover:border-[#CBC7BD]">

                                    <div className="flex items-center gap-5">

                                        {/* EVENT IMAGE */}
                                        <div className="w-[86px] h-[86px] rounded-xl overflow-hidden bg-[#F1EFE9] shrink-0">

                                            {reservation.event && reservation.event.image ? (

                                                <img src={"http://127.0.0.1:8000/storage/" + reservation.event.image} alt={reservation.event.title} className="w-full h-full object-cover" />

                                            ) : (

                                                <div className="w-full h-full flex items-center justify-center">
                                                    <CalendarDays size={20} className="text-stone-300" />
                                                </div>

                                            )}

                                        </div>


                                        {/* CLIENT + EVENT */}
                                        <div className="w-[210px] shrink-0">

                                            <p className="text-[10px] uppercase tracking-[1.5px] font-bold text-[#8B9284]">
                                                {reservation.event ? reservation.event.type : "Événement"}
                                            </p>

                                            <h3 className="mt-1 text-sm font-bold text-[#20231F]">
                                                {reservation.event ? reservation.event.title : "Événement"}
                                            </h3>

                                            <p className="mt-2 text-xs text-[#777C74]">
                                                Client : <span className="font-semibold text-[#4E534C]">{reservation.client ? reservation.client.name : "Client"}</span>
                                            </p>

                                        </div>


                                        {/* DETAILS */}
                                        <div className="flex-1 grid grid-cols-3 gap-4">

                                            <div>
                                                <p className="text-[10px] text-[#A09F9A]">
                                                    Date
                                                </p>

                                                <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-[#555A53]">
                                                    <CalendarDays size={13} className="text-[#7A8472]" />
                                                    {reservation.event_date}
                                                </p>
                                            </div>


                                            <div>
                                                <p className="text-[10px] text-[#A09F9A]">
                                                    Lieu
                                                </p>

                                                <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-[#555A53]">
                                                    <MapPin size={13} className="text-[#7A8472]" />
                                                    {reservation.location}
                                                </p>
                                            </div>


                                            <div>
                                                <p className="text-[10px] text-[#A09F9A]">
                                                    Invités
                                                </p>

                                                <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-[#555A53]">
                                                    <Users size={13} className="text-[#7A8472]" />
                                                    {reservation.guest_count}
                                                </p>
                                            </div>

                                        </div>


                                        {/* PRICE */}
                                        <div className="w-[100px] shrink-0">

                                            <p className="text-[10px] text-[#A09F9A]">
                                                Montant
                                            </p>

                                            <p className="mt-1 text-sm font-bold text-[#20231F]">
                                                {Number(reservation.total_amount).toLocaleString("fr-FR")} DH
                                            </p>

                                        </div>


                                        {/* STATUS / ACTIONS */}
                                        <div className="w-[190px] shrink-0 flex justify-end">

                                            {reservation.status === "pending" && (

                                                <div className="flex gap-2">

                                                    <button type="button" onClick={() => handleStatus(reservation.id, "rejected")} className="h-9 px-3 border border-[#E4D6D2] text-[#A35F52] rounded-lg text-xs font-semibold hover:bg-[#F8EFED] transition">
                                                        Refuser
                                                    </button>

                                                    <button type="button" onClick={() => handleStatus(reservation.id, "accepted")} className="h-9 px-3 bg-[#263128] text-white rounded-lg text-xs font-semibold hover:bg-[#354137] transition">
                                                        Accepter
                                                    </button>

                                                </div>

                                            )}


                                            {reservation.status === "accepted" && (

                                                <span className="inline-flex items-center gap-1.5 bg-[#EEF2EA] text-[#5C6B54] px-3 py-2 rounded-full text-xs font-bold">
                                                    <Check size={13} />
                                                    Acceptée
                                                </span>

                                            )}


                                            {reservation.status === "rejected" && (

                                                <span className="inline-flex items-center gap-1.5 bg-[#F7EDEB] text-[#9B5C50] px-3 py-2 rounded-full text-xs font-bold">
                                                    <X size={13} />
                                                    Refusée
                                                </span>

                                            )}

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </main>

        </div>
    );
}

export default Reservations;