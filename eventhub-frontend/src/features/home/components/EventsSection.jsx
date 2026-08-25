import EventCard from "./EventCard";

function EventsSection() {

    const events = [
        {
            id: 1,
            title: "Mariage Jardin d'Atlas",
            traiteur: "Maison Amaya",
            city: "Marrakech",
            capacity: 180,
            price: "8 500",
            rating: 4.9,
            reviews: 42,
            type: "Mariage",
            image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=900&q=85"
        },
        {
            id: 2,
            title: "Dîner Élégance",
            traiteur: "Atelier Saveur",
            city: "Casablanca",
            capacity: 80,
            price: "4 200",
            rating: 4.8,
            reviews: 31,
            type: "Dîner privé",
            image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=900&q=85"
        },
        {
            id: 3,
            title: "Garden Birthday",
            traiteur: "Noura Events",
            city: "Rabat",
            capacity: 120,
            price: "5 000",
            rating: 4.7,
            reviews: 26,
            type: "Anniversaire",
            image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=85"
        }
    ];

    return (
        <section className="w-full bg-gradient-to-b from-[#FDFCF9] via-[#FAF8F3] to-[#F7F4ED] py-14">

            <div className="max-w-7xl mx-auto px-6">

                <div className="flex items-end justify-between mb-7">

                    <div>
                        <span className="text-[11px] uppercase tracking-[3px] font-semibold text-[#78806F]">
                            À découvrir
                        </span>

                        <h2 className="mt-2 text-2xl md:text-3xl font-bold text-[#20231F]">
                            Des événements qui donnent envie.
                        </h2>
                    </div>

                    <button className="hidden sm:block text-sm font-semibold text-[#66735A] hover:text-[#263128]">
                        Voir tous les événements →
                    </button>

                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
                    {events.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>

            </div>

        </section>
    );
}

export default EventsSection;