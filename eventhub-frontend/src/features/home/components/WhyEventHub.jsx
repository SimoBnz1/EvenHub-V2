import { CalendarCheck, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";

function WhyEventHub() {
    return (
        <section className="bg-stone-50 pt-16 pb-6">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Image */}
                    <div className="relative">
                        <div className="h-[430px] overflow-hidden rounded-[12px_55px_12px_55px]">
                            <img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=85" alt="Organisation événement" className="w-full h-full object-cover" />
                        </div>

                        <div className="absolute -bottom-5 right-6 bg-[#263128] text-white px-6 py-4 rounded-[20px_8px_20px_8px] shadow-xl">
                            <p className="text-2xl font-bold">100%</p>
                            <p className="text-xs text-white/70 mt-1">Réservation simplifiée</p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="lg:pl-4">
                        <p className="text-[11px] uppercase tracking-[3px] font-semibold text-[#8B907F]">Pourquoi EventHub ?</p>

                        <h2 className="mt-3 text-3xl md:text-4xl font-bold leading-tight text-[#20231F]">
                            Organiser devient enfin
                            <br />
                            plus simple.
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-[#747970] max-w-lg">
                            Plus besoin de contacter plusieurs prestataires séparément. EventHub réunit les professionnels, leurs offres et leurs disponibilités dans un seul espace.
                        </p>

                        <div className="mt-8 space-y-6">

                            <div className="flex gap-4">
                                <div className="w-10 h-10 shrink-0 bg-[#EEF0E9] rounded-[14px_6px_14px_6px] flex items-center justify-center">
                                    <Sparkles size={18} className="text-[#66735A]" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-[#30352E]">Tout au même endroit</h3>
                                    <p className="text-xs text-[#858981] mt-1 leading-5">Découvrez les événements et prestations disponibles simplement.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-10 h-10 shrink-0 bg-[#EEF0E9] rounded-[14px_6px_14px_6px] flex items-center justify-center">
                                    <CalendarCheck size={18} className="text-[#66735A]" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-[#30352E]">Disponibilité vérifiée</h3>
                                    <p className="text-xs text-[#858981] mt-1 leading-5">Les dates et les disponibilités sont vérifiées avant la réservation.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-10 h-10 shrink-0 bg-[#EEF0E9] rounded-[14px_6px_14px_6px] flex items-center justify-center">
                                    <ShieldCheck size={18} className="text-[#66735A]" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-[#30352E]">Prestataires sélectionnés</h3>
                                    <p className="text-xs text-[#858981] mt-1 leading-5">Les professionnels présents sur EventHub passent par une validation.</p>
                                </div>
                            </div>

                        </div>

                        <button className="mt-8 flex items-center gap-2 text-sm font-bold text-[#263128] group">
                            Comment ça marche ?
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default WhyEventHub;