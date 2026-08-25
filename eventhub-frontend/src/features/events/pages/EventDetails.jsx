import { MapPin, Users, Star, Heart, ArrowLeft } from "lucide-react";

import { Link, useParams, useNavigate } from "react-router-dom";
function EventDetails() {
    const { id } = useParams();
const navigate = useNavigate();

    const handleReservation = () => {
    const token = localStorage.getItem("eventhub_token");

    if (!token) {
        navigate("/login", {
            state: {
                redirectTo: `/reservation/${event.id}`
            }
        });
        return;
    }

    navigate(`/reservation/${event.id}`);
};

    const events = [
        {
            id: 1,
            title: "Mariage Jardin d'Atlas",
            traiteur: "Maison Amaya",
            city: "Marrakech",
            capacity: 180,
            price: 8500,
            rating: 4.9,
            reviews: 42,
            type: "Mariage",
            description: "Une prestation complète pour un mariage élégant dans une ambiance chaleureuse avec buffet, service et décoration de table.",
            image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=90"
        },
        {
            id: 2,
            title: "Dîner Élégance",
            traiteur: "Atelier Saveur",
            city: "Casablanca",
            capacity: 80,
            price: 4200,
            rating: 4.8,
            reviews: 31,
            type: "Dîner",
            description: "Une expérience élégante pour vos dîners privés et professionnels avec menu raffiné et service soigné.",
            image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1600&q=90"
        },
        {
            id: 3,
            title: "Garden Birthday",
            traiteur: "Noura Events",
            city: "Rabat",
            capacity: 120,
            price: 5000,
            rating: 4.7,
            reviews: 26,
            type: "Anniversaire",
            description: "Une prestation conviviale pour anniversaire en extérieur avec buffet, décoration et espace adapté aux invités.",
            image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1600&q=90"
        }
    ];

    const event = events.find((item) => item.id === Number(id));

    return (
        <div className="min-h-screen bg-[#FDFCF9]">
            <div className="max-w-7xl mx-auto px-6 py-8">

                <Link to="/" className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-[#263128]">
                    <ArrowLeft size={16} />
                    Retour
                </Link>

                <div className="mt-6 grid lg:grid-cols-2 gap-10">

                    <div>
                        <div className="relative h-[500px] overflow-hidden rounded-[30px_12px_30px_12px]">
                            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />

                            <button className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow">
                                <Heart size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center">

                        <p className="text-xs uppercase tracking-[3px] font-semibold text-[#78806F]">
                            {event.type}
                        </p>

                        <h1 className="mt-3 text-4xl font-bold text-[#20231F]">
                            {event.title}
                        </h1>

                        <p className="mt-2 text-sm text-[#66735A] font-semibold">
                            Par {event.traiteur}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-5 text-sm text-stone-600">
                            <span className="flex items-center gap-2">
                                <MapPin size={17} />
                                {event.city}
                            </span>

                            <span className="flex items-center gap-2">
                                <Users size={17} />
                                Jusqu'à {event.capacity} personnes
                            </span>

                            <span className="flex items-center gap-2">
                                <Star size={17} />
                                {event.rating} ({event.reviews} avis)
                            </span>
                        </div>

                        <div className="mt-8 border-t border-stone-200 pt-6">
                            <h2 className="text-lg font-bold text-[#20231F]">
                                À propos de cette prestation
                            </h2>

                            <p className="mt-3 text-sm text-stone-500 leading-7">
                                {event.description}
                            </p>
                        </div>

                        <div className="mt-8 bg-stone-100 rounded-[22px_10px_22px_10px] p-5 flex items-center justify-between">
                            <div>
                                <p className="text-xs text-stone-500">
                                    À partir de
                                </p>

                                <p className="text-2xl font-bold text-[#20231F]">
                                    {event.price} DH
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
    );
}

export default EventDetails;