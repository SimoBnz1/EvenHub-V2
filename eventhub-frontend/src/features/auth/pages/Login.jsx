import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../services/authService";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await loginUser({
                email: email,
                password: password
            });

            localStorage.setItem("eventhub_token", data.token);
            localStorage.setItem("eventhub_role",data.user.role);
            localStorage.setItem("eventhub_category",data.user.category_id);

            if (data.user.role==='client') {
                navigate("/"); 
            }
            if (data.user.role==='traiteur') {
                navigate('/traiteur/dashboard')
            }
            if (data.user.role==='admin') {
                navigate('/admin/dashboard')
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
    <div className="min-h-screen bg-[#F7F4ED] flex items-center justify-center p-5">
        <div className="w-full max-w-6xl min-h-[650px] bg-white rounded-[30px_12px_30px_12px] overflow-hidden grid lg:grid-cols-2 shadow-sm">

            <div className="relative hidden lg:block">
                <img src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1600&q=95" alt="EventHub" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                <div className="absolute top-8 left-8 text-white">
                    <span className="text-2xl font-bold">event</span>
                    <span className="text-2xl ml-1 italic text-[#D6DCCB]">hub</span>
                    <span className="ml-1 text-[#C09A68]">✦</span>
                </div>

                <div className="absolute bottom-10 left-10 right-10 text-white">
                    <p className="text-xs uppercase tracking-[3px] text-white/70">EventHub</p>
                    <h2 className="mt-3 text-4xl font-bold leading-tight">Vos événements commencent ici.</h2>
                    <p className="mt-4 text-sm text-white/70 max-w-md">Découvrez des prestataires et organisez vos événements simplement.</p>
                </div>
            </div>

            <div className="flex items-center justify-center px-8 py-12">
                <div className="w-full max-w-md">

                    <button onClick={() => navigate("/")} className="text-sm text-stone-500 hover:text-[#263128] mb-10">
                        ← Retour à l'accueil
                    </button>

                    <p className="text-xs uppercase tracking-[3px] text-[#66735A] font-semibold">Bienvenue</p>

                    <h1 className="mt-3 text-4xl font-bold text-[#20231F]">Connexion</h1>

                    <p className="mt-3 text-sm text-stone-500">Connectez-vous pour gérer vos réservations et vos événements.</p>

                    {error && (
                        <p className="mt-5 bg-red-50 text-red-500 text-sm p-3 rounded-xl">
                            {error}
                        </p>
                    )}

                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">

                        <div>
                            <label className="text-sm font-medium text-[#20231F]">Adresse email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="exemple@email.com" className="mt-2 w-full h-12 border border-stone-300 rounded-[14px_6px_14px_6px] px-4 text-sm outline-none focus:border-[#66735A]" />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-[#20231F]">Mot de passe</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Votre mot de passe" className="mt-2 w-full h-12 border border-stone-300 rounded-[14px_6px_14px_6px] px-4 text-sm outline-none focus:border-[#66735A]" />
                        </div>

                        <button type="submit" className="w-full h-12 bg-[#263128] hover:bg-[#354137] text-white rounded-[14px_6px_14px_6px] text-sm font-semibold transition">
                            Se connecter
                        </button>

                    </form>

                    <p className="mt-7 text-center text-sm text-stone-500">
                        Vous n'avez pas de compte ?{" "}
                        <button onClick={() => navigate("/register")} className="font-semibold text-[#66735A] hover:text-[#263128]">
                            Créer un compte
                        </button>
                    </p>

                </div>
            </div>

        </div>
    </div>
);
}

export default Login;