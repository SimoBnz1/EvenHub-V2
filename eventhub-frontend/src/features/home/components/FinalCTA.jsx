import { ArrowRight } from "lucide-react";

function FinalCTA() {
    return (
        <section className="bg-stone-100 py-16">
            <div className="max-w-7xl mx-auto px-6">
                <div className="relative overflow-hidden rounded-[34px_14px_34px_14px] bg-[#263128] px-8 py-12 md:px-12 md:py-14">

                    <div className="absolute -top-16 -right-12 w-56 h-56 rounded-full bg-white/5"></div>
                    <div className="absolute -bottom-20 -left-16 w-72 h-72 rounded-full border border-white/10"></div>

                    <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-8">

                        <div className="max-w-2xl">
                            <p className="text-xs uppercase tracking-[3px] font-semibold text-stone-300">
                                Votre prochain événement
                            </p>

                            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white leading-tight">
                                Trouvez le professionnel qui fera la différence.
                            </h2>

                            <p className="mt-4 text-sm text-stone-300 leading-6">
                                Parcourez les offres, comparez les prestataires et préparez votre événement depuis un seul espace.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <button className="group flex items-center gap-2 bg-[#F7F4ED] text-[#263128] px-6 py-3 rounded-[16px_7px_16px_7px] text-sm font-semibold hover:bg-white transition">
                                Explorer les événements
                                <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                            </button>

                            <button className="px-6 py-3 border border-white/20 text-white rounded-[16px_7px_16px_7px] text-sm font-medium hover:bg-white/10 transition">
                                Devenir prestataire
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default FinalCTA;