import { MapPin, Star, ArrowUpRight } from "lucide-react";

function TraiteursSection() {
    const traiteurs = [
        {
            id: 1,
            name: "Maison Amaya",
            city: "Marrakech",
            speciality: "Mariages & réceptions",
            rating: 4.9,
            reviews: 42,
            image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=85"
        },
        {
            id: 2,
            name: "Atelier Saveur",
            city: "Casablanca",
            speciality: "Buffets & événements",
            rating: 4.8,
            reviews: 31,
            image: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=900&q=85"
        },
        {
            id: 3,
            name: "Noura Events",
            city: "Rabat",
            speciality: "Cuisine marocaine",
            rating: 4.7,
            reviews: 26,
            image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=85"
        }
    ];

    return (
        <section className="bg-gradient-to-b from-stone-50 via-stone-100 to-stone-100 pt-10 pb-20">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <p className="text-xs uppercase tracking-[3px] font-semibold text-[#78806F]">Nos professionnels</p>

                        <h2 className="mt-2 text-3xl font-bold text-[#20231F]">
                            Les traiteurs du moment.
                        </h2>

                        <p className="mt-2 text-sm text-stone-500">
                            Découvrez des professionnels prêts à donner vie à votre événement.
                        </p>
                    </div>

                    <button className="hidden md:flex items-center gap-2 text-sm font-semibold text-[#66735A] hover:text-[#263128]">
                        Voir tous les traiteurs <ArrowUpRight size={16} />
                    </button>
                </div>

                {/* Content */}
                <div className="grid lg:grid-cols-2 gap-5">

                    {/* Grand traiteur */}
                    <div className="group relative min-h-[440px] overflow-hidden rounded-[32px_12px_32px_12px] cursor-pointer">
                        <img src={traiteurs[0].image} alt={traiteurs[0].name} className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105" />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent"></div>

                        <div className="absolute top-5 left-5">
                            <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-stone-700">
                                Coup de cœur
                            </span>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
                            <p className="text-xs text-white/70">{traiteurs[0].speciality}</p>

                            <div className="mt-2 flex items-end justify-between gap-4">
                                <div>
                                    <h3 className="text-2xl font-bold">{traiteurs[0].name}</h3>

                                    <div className="flex items-center gap-4 mt-2 text-sm text-white/80">
                                        <span className="flex items-center gap-1"><MapPin size={14} /> {traiteurs[0].city}</span>
                                        <span className="flex items-center gap-1"><Star size={14} /> {traiteurs[0].rating} · {traiteurs[0].reviews} avis</span>
                                    </div>
                                </div>

                                <button className="w-11 h-11 shrink-0 bg-white text-[#263128] rounded-full flex items-center justify-center transition group-hover:rotate-45">
                                    <ArrowUpRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 2 petits traiteurs */}
                    <div className="grid gap-5">
                        {traiteurs.slice(1).map((traiteur) => (
                            <div key={traiteur.id} className="group bg-white rounded-[24px_10px_24px_10px] p-3 flex gap-5 border border-stone-200 hover:shadow-lg hover:shadow-stone-200/50 transition cursor-pointer">

                                <div className="w-[180px] h-[190px] shrink-0 overflow-hidden rounded-[18px_7px_18px_7px]">
                                    <img src={traiteur.image} alt={traiteur.name} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
                                </div>

                                <div className="flex-1 py-3 pr-3 flex flex-col justify-between">
                                    <div>
                                        <p className="text-xs text-[#78806F] font-medium">{traiteur.speciality}</p>

                                        <h3 className="mt-2 text-xl font-bold text-[#20231F]">
                                            {traiteur.name}
                                        </h3>

                                        <p className="mt-3 flex items-center gap-1 text-sm text-stone-500">
                                            <MapPin size={14} />
                                            {traiteur.city}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center gap-1 text-sm text-stone-600">
                                            <Star size={14} className="text-amber-600" />
                                            <b>{traiteur.rating}</b>
                                            <span className="text-stone-400">({traiteur.reviews})</span>
                                        </span>

                                        <button className="w-9 h-9 border border-stone-200 rounded-full flex items-center justify-center group-hover:bg-[#263128] group-hover:text-white transition">
                                            <ArrowUpRight size={15} />
                                        </button>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </section>
    );
}

export default TraiteursSection;