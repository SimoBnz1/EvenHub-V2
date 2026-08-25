import { Heart, MapPin, Users, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

function EventCard({ event }) {
    return (
        <article className="group">
            <Link to={`/events/${event.id}`} className="block cursor-pointer">
                <div className="relative h-[230px] overflow-hidden rounded-[26px_10px_26px_10px]">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"></div>

                    <span className="absolute top-4 left-4 bg-[#F7F4ED]/95 px-3 py-1.5 rounded-full text-[11px] font-semibold text-[#384036]">
                        {event.type}
                    </span>

                    <div className="absolute bottom-4 left-4 text-white">
                        <span className="text-xs opacity-80">À partir de</span>
                        <p className="text-lg font-bold">{event.price} DH</p>
                    </div>
                </div>

                <div className="pt-4 px-1">
                    <p className="text-[11px] uppercase tracking-[1.5px] font-semibold text-[#78806F]">
                        {event.traiteur}
                    </p>

                    <h3 className="mt-1 text-[17px] font-bold text-[#20231F]">
                        {event.title}
                    </h3>

                    <div className="mt-3 flex items-center gap-4 text-xs text-[#777C74]">
                        <span className="flex items-center gap-1">
                            <MapPin size={14} />
                            {event.city}
                        </span>

                        <span className="flex items-center gap-1">
                            <Users size={14} />
                            {event.capacity} personnes
                        </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-[#777C74]">
                            <b className="text-[#B68D5B]">★ {event.rating}</b> · {event.reviews} avis
                        </span>

                        <span className="w-8 h-8 rounded-full border border-[#DCD8CF] flex items-center justify-center transition group-hover:bg-[#263128] group-hover:text-white group-hover:border-[#263128]">
                            <ArrowUpRight size={15} />
                        </span>
                    </div>
                </div>
            </Link>

            <button type="button" className="absolute">
                <Heart size={16} />
            </button>
        </article>
    );
}

export default EventCard;