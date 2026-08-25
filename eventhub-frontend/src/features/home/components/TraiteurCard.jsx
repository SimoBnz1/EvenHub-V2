import { MapPin, Star, ArrowUpRight } from "lucide-react";

function TraiteurCard({ traiteur }) {
    return (
        <article className="group relative overflow-hidden rounded-[28px_12px_28px_12px] min-h-[300px]">
            <img src={traiteur.image} alt={traiteur.name} className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent"></div>

            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-[11px] font-semibold text-[#384036]">
                {traiteur.speciality}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <div className="flex items-end justify-between gap-4">

                    <div>
                        <h3 className="text-xl font-bold">{traiteur.name}</h3>

                        <div className="mt-2 flex items-center gap-3 text-xs text-white/80">
                            <span className="flex items-center gap-1">
                                <MapPin size={14} />
                                {traiteur.city}
                            </span>

                            <span className="flex items-center gap-1">
                                <Star size={13} fill="currentColor" />
                                {traiteur.rating}
                            </span>
                        </div>
                    </div>

                    <button className="w-10 h-10 shrink-0 rounded-full bg-white text-[#263128] flex items-center justify-center transition group-hover:rotate-45">
                        <ArrowUpRight size={17} />
                    </button>

                </div>
            </div>
        </article>
    );
}

export default TraiteurCard;