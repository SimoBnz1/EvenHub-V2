import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, CalendarDays, ClipboardList, Package, User, LogOut } from "lucide-react";

function TraiteurSidebar() {

    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        localStorage.removeItem("eventhub_token");
        localStorage.removeItem("eventhub_role");

        navigate("/");
    };

    const isActive = (path) => {
        return location.pathname.startsWith(path);
    };

    return (
        <aside className="fixed left-0 top-0 w-64 h-screen bg-[#263128] text-white px-5 py-7">

            <div onClick={() => navigate("/")} className="cursor-pointer mb-10 px-3">
                <span className="text-2xl font-bold">event</span>
                <span className="text-2xl ml-1 italic text-[#AEB9A1]">hub</span>
                <span className="ml-1 text-[#C09A68] text-xs">✦</span>
            </div>

            <nav className="space-y-2">

                <button onClick={() => navigate("/traiteur/dashboard")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-left ${location.pathname === "/traiteur/dashboard" ? "bg-white text-[#263128] font-semibold" : "text-stone-300 hover:bg-white/10"}`}>
                    <LayoutDashboard size={18} />
                    Tableau de bord
                </button>

                <button onClick={() => navigate("/traiteur/events")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-left ${isActive("/traiteur/events") ? "bg-white text-[#263128] font-semibold" : "text-stone-300 hover:bg-white/10"}`}>
                    <CalendarDays size={18} />
                    Mes événements
                </button>

                <button onClick={() => navigate("/traiteur/reservations")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-left ${isActive("/traiteur/reservations") ? "bg-white text-[#263128] font-semibold" : "text-stone-300 hover:bg-white/10"}`}>
                    <ClipboardList size={18} />
                    Réservations
                </button>

                <button onClick={() => navigate("/traiteur/equipment")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-left ${isActive("/traiteur/equipment") ? "bg-white text-[#263128] font-semibold" : "text-stone-300 hover:bg-white/10"}`}>
                    <Package size={18} />
                    Équipements
                </button>

                <button onClick={() => navigate("/traiteur/profile")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-left ${isActive("/traiteur/profile") ? "bg-white text-[#263128] font-semibold" : "text-stone-300 hover:bg-white/10"}`}>
                    <User size={18} />
                    Mon profil
                </button>

            </nav>

            <div className="absolute bottom-7 left-5 right-5">

                <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-stone-300 rounded-xl hover:bg-white/10">
                    <LogOut size={18} />
                    Déconnexion
                </button>

            </div>

        </aside>
    );
}

export default TraiteurSidebar;