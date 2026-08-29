import { useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    CalendarDays,
    Plus,
    ClipboardList,
    Package,
    User,
    LogOut,
    ChevronRight
} from "lucide-react";
import TraiteurSidebar from "../components/TraiteurSidebar";

function Dashboard() {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("eventhub_token");
        localStorage.removeItem("eventhub_role");

        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-[#F5F3EE] flex">

            {/* SIDEBAR */}

            <aside className="w-[250px] min-h-screen bg-[#20271F] text-white fixed left-0 top-0 px-5 py-6">

                <div onClick={() => navigate("/")} className="cursor-pointer px-2">
                    <span className="text-2xl font-bold">event</span>
                    <span className="text-2xl ml-1 italic text-[#B8C1AE]">hub</span>
                    <span className="ml-1 text-[#C09A68] text-xs">✦</span>
                </div>

               <TraiteurSidebar />

                <div className="absolute bottom-6 left-5 right-5">

                    <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-3 text-white/50 hover:text-white text-sm">
                        <LogOut size={18} />
                        Déconnexion
                    </button>

                </div>

            </aside>


            {/* CONTENT */}

            <main className="ml-[250px] w-full">

                {/* HEADER */}

                <header className="h-[76px] border-b border-stone-200 flex items-center justify-between px-10">

                    <p className="text-xs text-stone-400">
                        EventHub / Tableau de bord
                    </p>

                    <div className="flex items-center gap-3">

                        <div className="text-right">
                            <p className="text-sm font-semibold text-[#20231F]">
                                Maison Amaya
                            </p>

                            <p className="text-xs text-stone-400">
                                Traiteur
                            </p>
                        </div>

                        <div className="w-10 h-10 rounded-full bg-[#D8DDD2] flex items-center justify-center text-[#263128] font-bold">
                            M
                        </div>

                    </div>

                </header>


                <div className="px-10 py-9 max-w-[1350px]">

                    {/* TITLE */}

                    <section className="flex items-end justify-between">

                        <div>

                            <p className="text-sm font-semibold text-[#66735A]">
                                Bonjour, Maison Amaya
                            </p>

                            <h1 className="mt-1 text-3xl font-bold text-[#20231F]">
                                Tableau de bord
                            </h1>

                            <p className="mt-2 text-sm text-stone-500">
                                Un aperçu simple de votre activité sur EventHub.
                            </p>

                        </div>

                        <button onClick={() => navigate("/traiteur/events/create")} className="flex items-center gap-2 bg-[#263128] text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-[#344036] transition">
                            <Plus size={17} />
                            Nouvel événement
                        </button>

                    </section>


                    {/* STATISTIQUES */}

                    <section className="mt-10 bg-white border border-stone-200 rounded-2xl px-8 py-6">

                        <p className="text-xs uppercase tracking-[2px] text-stone-400 font-semibold">
                            Vue d'ensemble
                        </p>

                        <div className="mt-6 grid grid-cols-3">

                            <div className="pr-8">

                                <div className="flex items-center gap-2 text-stone-400">
                                    <CalendarDays size={16} />
                                    <p className="text-xs">
                                        Événements publiés
                                    </p>
                                </div>

                                <p className="mt-3 text-3xl font-bold text-[#20231F]">
                                    3
                                </p>

                                <p className="mt-1 text-xs text-stone-400">
                                    événements disponibles
                                </p>

                            </div>


                            <div className="px-8 border-l border-stone-200">

                                <div className="flex items-center gap-2 text-stone-400">
                                    <ClipboardList size={16} />
                                    <p className="text-xs">
                                        Réservations
                                    </p>
                                </div>

                                <p className="mt-3 text-3xl font-bold text-[#20231F]">
                                    12
                                </p>

                                <p className="mt-1 text-xs text-stone-400">
                                    demandes reçues
                                </p>

                            </div>


                            <div className="pl-8 border-l border-stone-200">

                                <div className="flex items-center gap-2 text-stone-400">
                                    <Package size={16} />
                                    <p className="text-xs">
                                        Équipements
                                    </p>
                                </div>

                                <p className="mt-3 text-3xl font-bold text-[#20231F]">
                                    24
                                </p>

                                <p className="mt-1 text-xs text-stone-400">
                                    articles enregistrés
                                </p>

                            </div>

                        </div>

                    </section>


                    {/* EVENTS */}

                    <section className="mt-8">

                        <div className="flex items-center justify-between mb-4">

                            <div>
                                <h2 className="text-lg font-bold text-[#20231F]">
                                    Mes événements récents
                                </h2>

                                <p className="mt-1 text-xs text-stone-400">
                                    Les derniers événements publiés sur votre profil.
                                </p>
                            </div>

                            <button onClick={() => navigate("/traiteur/events")} className="flex items-center gap-1 text-sm font-semibold text-[#66735A]">
                                Voir tout
                                <ChevronRight size={16} />
                            </button>

                        </div>


                        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">

                            {/* EVENT 1 */}

                            <div className="flex items-center px-6 py-5 border-b border-stone-100">

                                <img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=500&q=80" alt="Mariage" className="w-16 h-16 rounded-xl object-cover" />

                                <div className="ml-4 flex-1">

                                    <p className="text-sm font-semibold text-[#20231F]">
                                        Mariage Jardin d'Atlas
                                    </p>

                                    <p className="mt-1 text-xs text-stone-400">
                                        Marrakech · Mariage · 180 personnes
                                    </p>

                                </div>

                                <div className="w-32">
                                    <p className="text-xs text-stone-400">
                                        Prix
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-[#20231F]">
                                        8 500 MAD
                                    </p>
                                </div>

                                <div className="w-28 text-right">
                                    <span className="text-xs px-3 py-1.5 rounded-full bg-[#EEF2EA] text-[#66735A]">
                                        Publié
                                    </span>
                                </div>

                            </div>


                            {/* EVENT 2 */}

                            <div className="flex items-center px-6 py-5 border-b border-stone-100">

                                <img src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=500&q=80" alt="Dinner" className="w-16 h-16 rounded-xl object-cover" />

                                <div className="ml-4 flex-1">

                                    <p className="text-sm font-semibold text-[#20231F]">
                                        Dîner Élégance
                                    </p>

                                    <p className="mt-1 text-xs text-stone-400">
                                        Casablanca · Dîner · 80 personnes
                                    </p>

                                </div>

                                <div className="w-32">
                                    <p className="text-xs text-stone-400">
                                        Prix
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-[#20231F]">
                                        4 200 MAD
                                    </p>
                                </div>

                                <div className="w-28 text-right">
                                    <span className="text-xs px-3 py-1.5 rounded-full bg-[#EEF2EA] text-[#66735A]">
                                        Publié
                                    </span>
                                </div>

                            </div>


                            {/* EVENT 3 */}

                            <div className="flex items-center px-6 py-5">

                                <img src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=500&q=80" alt="Birthday" className="w-16 h-16 rounded-xl object-cover" />

                                <div className="ml-4 flex-1">

                                    <p className="text-sm font-semibold text-[#20231F]">
                                        Garden Birthday
                                    </p>

                                    <p className="mt-1 text-xs text-stone-400">
                                        Rabat · Anniversaire · 120 personnes
                                    </p>

                                </div>

                                <div className="w-32">
                                    <p className="text-xs text-stone-400">
                                        Prix
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-[#20231F]">
                                        5 000 MAD
                                    </p>
                                </div>

                                <div className="w-28 text-right">
                                    <span className="text-xs px-3 py-1.5 rounded-full bg-[#EEF2EA] text-[#66735A]">
                                        Publié
                                    </span>
                                </div>

                            </div>

                        </div>

                    </section>

                </div>

            </main>

        </div>
    );
}

export default Dashboard;