import { Search, Heart } from "lucide-react";
import { Link } from "react-router-dom";
function Navbar() {
    return (
        <header className="w-full bg-[#FDFCF9] border-b border-[#EAE6DD]">
            <nav className="max-w-7xl mx-auto h-[72px] px-6 flex items-center justify-between">

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-[#66735A] rounded-[14px_6px_14px_6px] flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                            E
                        </span>
                    </div>

                    {/* Logo */}
                    <a href="#" className="group flex items-end">
                        <span
                            className="text-[27px] font-bold tracking-[-1.5px] text-[#20231F]"
                        >
                            Event
                        </span>

                        <span
                            className="text-[29px] ml-[2px] text-[#66735A] leading-none"
                            style={{
                                fontFamily: "'Playfair Display', serif",
                                fontStyle: "italic",
                                fontWeight: 600,
                            }}
                        >
                            Hub
                        </span>

                        <span className="w-[5px] h-[5px] bg-[#B68D5B] rounded-full mb-[4px] ml-[2px]"></span>
                    </a>
                </div>

                {/* Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <Link to="/" className="text-sm font-semibold text-[#66735A]">Accueil</Link>
                    <Link to="/providers" className="text-sm text-[#555B52] hover:text-[#66735A] transition">Prestataires</Link>
                    <Link to="/categories" className="text-sm text-[#555B52] hover:text-[#66735A] transition">Catégories</Link>
                    <Link to="/events" className="text-sm text-[#555B52] hover:text-[#66735A] transition">Événements</Link>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <Search size={19} className="hidden md:block text-[#444A42] cursor-pointer" />
                    <Heart size={19} className="hidden md:block text-[#444A42] cursor-pointer" />

                    <Link to="/login" className="hidden sm:block px-5 py-2.5 text-sm font-medium text-[#30352E]">
                        Connexion
                    </Link>

                    <Link to="/register" className="px-5 py-2.5 bg-[#263128] hover:bg-[#354137] text-white text-sm font-medium rounded-[14px_7px_14px_7px] transition">
                        Créer un compte
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;