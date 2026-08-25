import { Search, ArrowRight } from "lucide-react";

function Hero() {
    return (
        <section className="bg-[#FDFCF9]">

            {/* HERO */}
            <div className="relative min-h-[340px] overflow-hidden">

                <img
                    src="https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1600&q=80"
                    alt="Buffet traiteur"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Overlay warm */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#F7F4ED] via-[#F7F4ED]/90 to-transparent"></div>

                <div className="relative max-w-7xl mx-auto px-6 py-12">

                    <div className="max-w-[650px]">

                        {/* Petit texte */}
                        <div className="flex items-center gap-2 mb-4">
                            <span className="w-7 h-[1px] bg-[#66735A]"></span>

                            <span className="text-xs uppercase tracking-[3px] font-semibold text-[#66735A]">
                                L'art de recevoir
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold leading-[1.12] text-[#20231F]">
                            Des moments uniques,
                            <br />
                            des saveurs qui restent.
                        </h1>

                        <p className="mt-4 text-base text-[#656A61] leading-7 max-w-xl">
                            Découvrez des traiteurs passionnés pour vos mariages,
                            anniversaires et événements professionnels.
                        </p>

                        <button className="mt-6 group bg-[#263128] hover:bg-[#354137] text-white px-6 py-3 rounded-[16px_7px_16px_7px] font-medium flex items-center gap-3 transition">
                            Découvrir les traiteurs

                            <ArrowRight
                                size={17}
                                className="group-hover:translate-x-1 transition"
                            />
                        </button>

                    </div>
                </div>
            </div>

            {/* SEARCH */}
            <div className="relative max-w-5xl mx-auto px-6 -mt-7 z-10 pb-2">

                <div className="bg-[#FDFCF9] border border-[#E5E0D5] shadow-lg shadow-black/5 rounded-[22px_10px_22px_10px] p-3 flex flex-col md:flex-row">

                    <div className="flex-1 px-5 py-2 border-b md:border-b-0 md:border-r border-[#E5E0D5]">

                        <p className="text-xs font-semibold text-[#30352E]">
                            Votre événement
                        </p>

                        <input
                            type="text"
                            placeholder="Mariage, anniversaire..."
                            className="w-full mt-1 bg-transparent outline-none text-sm text-[#555B52] placeholder:text-[#A09E96]"
                        />

                    </div>

                    <div className="flex-1 px-5 py-2">

                        <p className="text-xs font-semibold text-[#30352E]">
                            Où ?
                        </p>

                        <input
                            type="text"
                            placeholder="Casablanca, Beni Mellal..."
                            className="w-full mt-1 bg-transparent outline-none text-sm text-[#555B52] placeholder:text-[#A09E96]"
                        />

                    </div>

                    <button className="mt-2 md:mt-0 md:w-[155px] bg-[#66735A] hover:bg-[#59654E] text-white rounded-[15px_7px_15px_7px] flex items-center justify-center gap-2 text-sm font-semibold transition">

                        <Search size={17} />

                        Rechercher
                    </button>

                </div>
            </div>

        </section>
    );
}

export default Hero;