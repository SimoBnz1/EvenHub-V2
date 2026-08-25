function Footer() {
    return (
        <footer className="bg-[#20231F] text-white">
            <div className="max-w-7xl mx-auto px-6 pt-14 pb-8">

                <div className="grid md:grid-cols-4 gap-10">

                    <div>
                        <div className="flex items-center">
                            <span className="text-2xl font-bold tracking-[-1px]">event</span>
                            <span className="text-2xl ml-1 text-[#A8B09B] italic font-semibold">hub</span>
                            <span className="ml-1 text-[#C09A68] text-xs">✦</span>
                        </div>

                        <p className="mt-4 text-sm text-stone-400 leading-6">
                            La plateforme qui simplifie la recherche et la réservation de prestations événementielles.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold">Explorer</h3>

                        <div className="mt-4 space-y-3 text-sm text-stone-400">
                            <p className="hover:text-white cursor-pointer transition">Événements</p>
                            <p className="hover:text-white cursor-pointer transition">Prestataires</p>
                            <p className="hover:text-white cursor-pointer transition">Catégories</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold">EventHub</h3>

                        <div className="mt-4 space-y-3 text-sm text-stone-400">
                            <p className="hover:text-white cursor-pointer transition">À propos</p>
                            <p className="hover:text-white cursor-pointer transition">Comment ça marche</p>
                            <p className="hover:text-white cursor-pointer transition">Devenir prestataire</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold">Contact</h3>

                        <div className="mt-4 space-y-3 text-sm text-stone-400">
                            <p className="hover:text-white cursor-pointer transition">Instagram</p>
                            <p className="hover:text-white cursor-pointer transition">Facebook</p>
                            <p className="hover:text-white cursor-pointer transition">contact@eventhub.ma</p>
                        </div>
                    </div>

                </div>

                <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-xs text-stone-500">
                    <p>© 2026 EventHub. Tous droits réservés.</p>

                    <div className="flex gap-5">
                        <span className="cursor-pointer hover:text-stone-300">Confidentialité</span>
                        <span className="cursor-pointer hover:text-stone-300">Conditions</span>
                    </div>
                </div>

            </div>
        </footer>
    );
}

export default Footer;