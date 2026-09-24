import { Search, Heart, LogOut, CalendarDays } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const token = localStorage.getItem("eventhub_token");
    const role = localStorage.getItem("eventhub_role");
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("eventhub_token");
        localStorage.removeItem("eventhub_role");
        navigate("/");
    };

    return (
        <header className="w-full bg-[#FDFCF9] border-b border-[#EAE6DD]">
            <nav className="max-w-7xl mx-auto h-[72px] px-6 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-[#66735A] rounded-[14px_6px_14px_6px] flex items-center justify-center">
                        <span className="text-white font-bold text-sm">E</span>
                    </div>

                    <div className="group flex items-end">
                        <span className="text-[27px] font-bold tracking-[-1.5px] text-[#20231F]">
                            Event
                        </span>

                        <span className="text-[29px] ml-[2px] text-[#66735A] leading-none" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 600 }}>
                            Hub
                        </span>

                        <span className="w-[5px] h-[5px] bg-[#B68D5B] rounded-full mb-[4px] ml-[2px]"></span>
                    </div>
                </Link>

                {/* Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <Link to="/" className="text-sm font-semibold text-[#66735A]">Accueil</Link>
                    <a href="/#prestataires" className="text-sm text-[#555B52] hover:text-[#66735A] transition">
                        Prestataires
                    </a>
                    <a href="/#categories" className="text-sm text-[#555B52] hover:text-[#66735A] transition">
                        Catégories
                    </a>
                    <a href="/#events" className="text-sm text-[#555B52] hover:text-[#66735A] transition">
                        Événements
                    </a>
                </div>

                {/* Guest */}
                {!token && (
                    <div className="flex items-center gap-3">
                        <Search size={19} className="hidden md:block text-[#444A42] cursor-pointer hover:text-[#66735A] transition" />

                        <Link to="/login" className="hidden sm:block px-4 py-2.5 text-sm font-medium text-[#30352E] hover:text-[#66735A] transition">
                            Connexion
                        </Link>

                        <Link to="/register" className="px-5 py-2.5 bg-[#263128] hover:bg-[#354137] text-white text-sm font-medium rounded-[14px_7px_14px_7px] transition">
                            Créer un compte
                        </Link>
                    </div>
                )}

                {/* Client */}
                {token && role === "client" && (
                    <div className="flex items-center gap-2">
                        <Link to="/favorites" className="hidden lg:flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#555B52] hover:text-[#66735A] hover:bg-[#F1EFE8] rounded-xl transition">
                            <Heart size={17} />
                            Favoris
                        </Link>

                        <Link to="/reservations" className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#555B52] hover:text-[#66735A] hover:bg-[#F1EFE8] rounded-xl transition">
                            <CalendarDays size={17} />
                            Mes réservations
                        </Link>

                        <div className="w-px h-6 bg-[#DDD8CF] mx-1"></div>

                        <button onClick={logout} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#66645F] hover:text-[#A34A4A] hover:bg-[#F8EEEE] rounded-xl transition">
                            <LogOut size={17} />
                            <span className="hidden md:block">Déconnexion</span>
                        </button>
                    </div>
                )}

            </nav>
        </header>
    );
}

export default Navbar;