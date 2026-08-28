import { useNavigate } from "react-router-dom";
import { CalendarDays, Heart, LogOut, ArrowRight } from "lucide-react";

function Dashboard() {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("eventhub_token");
        localStorage.removeItem("eventhub_role");

        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-[#F7F4ED]">

            {/* NAVBAR */}

            <header className="bg-[#F7F4ED] border-b border-stone-200">

                <div className="max-w-6xl mx-auto px-6 h-[76px] flex items-center justify-between">

                    <div onClick={() => navigate("/")} className="cursor-pointer">

                        <span className="text-2xl font-bold text-[#20231F]">
                            event
                        </span>

                        <span className="text-2xl ml-1 italic text-[#66735A]">
                            hub
                        </span>

                        <span className="ml-1 text-[#C09A68] text-xs">
                            ✦
                        </span>

                    </div>

                    <nav className="flex items-center gap-7 text-sm">

                        <button onClick={() => navigate("/")} className="text-stone-600 hover:text-[#263128]">
                            Accueil
                        </button>

                        <button onClick={() => navigate("/events")} className="text-stone-600 hover:text-[#263128]">
                            Événements
                        </button>

                        <button onClick={() => navigate("/client/favorites")} className="text-stone-600 hover:text-[#263128]">
                            Favoris
                        </button>

                        <button onClick={() => navigate("/client/reservations")} className="text-stone-600 hover:text-[#263128]">
                            Mes réservations
                        </button>

                    </nav>

                    <button onClick={logout} className="flex items-center gap-2 text-sm text-stone-500 hover:text-red-500">
                        <LogOut size={16} />
                        Déconnexion
                    </button>

                </div>

            </header>


            {/* CONTENT */}

            <main className="max-w-6xl mx-auto px-6 py-10">

                {/* WELCOME */}

                <section className="flex items-end justify-between">

                    <div>

                        <p className="text-sm font-semibold text-[#66735A]">
                            Espace client
                        </p>

                        <h1 className="mt-2 text-4xl font-bold text-[#20231F]">
                            Bonjour 👋
                        </h1>

                        <p className="mt-2 text-sm text-stone-500">
                            Retrouvez vos réservations et vos événements préférés.
                        </p>

                    </div>

                    <button onClick={() => navigate("/events")} className="bg-[#263128] text-white px-5 py-3 rounded-xl text-sm font-semibold flex items-center gap-2">
                        Explorer les événements
                        <ArrowRight size={16} />
                    </button>

                </section>


                {/* RESERVATIONS */}

                <section className="mt-12">

                    <div className="flex items-center justify-between">

                        <div>
                            <h2 className="text-xl font-bold text-[#20231F]">
                                Mes réservations
                            </h2>

                            <p className="mt-1 text-sm text-stone-400">
                                Suivez vos dernières réservations.
                            </p>
                        </div>

                        <button onClick={() => navigate("/client/reservations")} className="text-sm font-semibold text-[#66735A]">
                            Voir tout
                        </button>

                    </div>


                    <div className="mt-5 bg-white border border-stone-200 rounded-2xl px-6 py-12 text-center">

                        <CalendarDays size={30} className="mx-auto text-stone-300" />

                        <p className="mt-4 font-semibold text-[#20231F]">
                            Aucune réservation
                        </p>

                        <p className="mt-2 text-sm text-stone-400">
                            Vous n'avez encore effectué aucune réservation.
                        </p>

                        <button onClick={() => navigate("/events")} className="mt-5 text-sm font-semibold text-[#66735A]">
                            Découvrir les événements
                        </button>

                    </div>

                </section>


                {/* FAVORIS */}

                <section className="mt-10">

                    <div className="flex items-center justify-between">

                        <div>
                            <h2 className="text-xl font-bold text-[#20231F]">
                                Mes favoris
                            </h2>

                            <p className="mt-1 text-sm text-stone-400">
                                Les événements que vous souhaitez garder.
                            </p>
                        </div>

                        <button onClick={() => navigate("/client/favorites")} className="text-sm font-semibold text-[#66735A]">
                            Voir mes favoris
                        </button>

                    </div>


                    <div className="mt-5 border-t border-stone-200 py-8 flex items-center justify-between">

                        <div className="flex items-center gap-4">

                            <div className="w-11 h-11 bg-[#EEF1E9] rounded-full flex items-center justify-center">
                                <Heart size={18} className="text-[#66735A]" />
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-[#20231F]">
                                    Aucun favori pour le moment
                                </p>

                                <p className="mt-1 text-xs text-stone-400">
                                    Ajoutez des événements à vos favoris depuis la page d'accueil.
                                </p>
                            </div>

                        </div>

                        <button onClick={() => navigate("/")} className="text-sm text-[#66735A] font-semibold">
                            Parcourir
                        </button>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default Dashboard;