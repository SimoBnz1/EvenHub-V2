import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {LoaderCircle} from "lucide-react";
import {registerUser} from "../../../services/authService";

function Register(){
    const navigate=useNavigate();
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [passwordConfirmation,setPasswordConfirmation]=useState("");
    const [role,setRole]=useState("client");
    const [categoryId,setCategoryId]=useState("");
    const [error,setError]=useState("");
    const [loading,setLoading]=useState(false);

    const handleSubmit=async(e)=>{
        e.preventDefault();

        try{
            setError("");
            setLoading(true);

            const data=await registerUser({
                name:name,
                email:email,
                password:password,
                password_confirmation:passwordConfirmation,
                role:role,
                category_id:categoryId
            });

            localStorage.setItem("eventhub_token",data.token);
            localStorage.setItem("eventhub_role",data.user.role);
            localStorage.setItem("eventhub_category",data.user.category_id);

            if(data.user.role==="client"){
                navigate("/");
            }

            if(data.user.role==="traiteur"){
                navigate("/traiteur/dashboard");
            }
        }catch(error){
            setError(error.message);
        }finally{
            setLoading(false);
        }
    };

    return(
        <div className="min-h-screen bg-stone-50 flex items-center justify-center px-6 py-10">
            <div className="w-full max-w-5xl bg-white rounded-[32px_14px_32px_14px] overflow-hidden border border-stone-200 shadow-xl shadow-stone-200/40 grid md:grid-cols-2">

                <div className="hidden md:block relative min-h-[680px] bg-stone-900">
                    <img src="https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1600&q=95" alt="EventHub" className="absolute inset-0 w-full h-full object-cover"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/5"></div>

                    <div className="absolute top-8 left-8 text-white">
                        <span className="text-2xl font-bold">event</span>
                        <span className="text-2xl ml-1 text-stone-200 italic">hub</span>
                        <span className="ml-1 text-amber-300 text-xs">✦</span>
                    </div>

                    <div className="absolute bottom-10 left-8 right-8 text-white">
                        <p className="text-xs uppercase tracking-[3px] text-white/60">Créer un compte</p>
                        <h2 className="mt-3 text-3xl font-bold">Rejoignez EventHub et simplifiez vos événements.</h2>
                        <p className="mt-3 text-sm text-white/70">Réservez facilement ou développez votre activité.</p>
                    </div>
                </div>

                <div className="p-8 md:p-10 flex flex-col justify-center">
                    <p className="text-xs uppercase tracking-[3px] text-[#78806F] font-semibold">Inscription</p>
                    <h1 className="mt-2 text-3xl font-bold text-[#20231F]">Créer votre compte</h1>

                    {error && (
                        <p className="mt-4 text-sm text-red-500">{error}</p>
                    )}

                    <form onSubmit={handleSubmit} className="mt-7 space-y-4">

                        <div>
                            <label className="block text-sm font-semibold text-stone-700 mb-2">Nom complet</label>
                            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} required className="w-full h-12 px-4 bg-stone-50 border border-stone-200 rounded-xl"/>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-stone-700 mb-2">Adresse email</label>
                            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="w-full h-12 px-4 bg-stone-50 border border-stone-200 rounded-xl"/>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-stone-700 mb-2">Type de compte</label>

                            <div className="grid grid-cols-2 gap-3">
                                <button type="button" disabled={loading} onClick={()=>{setRole("client");setCategoryId("");}} className={role==="client" ? "h-12 bg-[#263128] text-white rounded-xl" : "h-12 bg-stone-100 rounded-xl"}>Client</button>
                                <button type="button" disabled={loading} onClick={()=>setRole("traiteur")} className={role==="traiteur" ? "h-12 bg-[#263128] text-white rounded-xl" : "h-12 bg-stone-100 rounded-xl"}>Prestataire</button>
                            </div>
                        </div>

                        {role==="traiteur" && (
                            <div>
                                <label className="block text-sm font-semibold text-stone-700 mb-2">Votre catégorie</label>

                                <select value={categoryId} onChange={(e)=>setCategoryId(e.target.value)} required className="w-full h-12 px-4 bg-stone-50 border border-stone-200 rounded-xl">
                                    <option value="">Choisir une catégorie</option>
                                    <option value="1">Traiteur</option>
                                    <option value="2">Photographe</option>
                                    <option value="3">Décoration</option>
                                    <option value="4">DJ</option>
                                    <option value="5">Matériel</option>
                                    <option value="6">Pâtisserie</option>
                                </select>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-semibold text-stone-700 mb-2">Mot de passe</label>
                            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required className="w-full h-12 px-4 bg-stone-50 border border-stone-200 rounded-xl"/>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-stone-700 mb-2">Confirmer le mot de passe</label>
                            <input type="password" value={passwordConfirmation} onChange={(e)=>setPasswordConfirmation(e.target.value)} required className="w-full h-12 px-4 bg-stone-50 border border-stone-200 rounded-xl"/>
                        </div>

                        <button type="submit" disabled={loading} className="w-full h-12 bg-[#263128] text-white rounded-xl font-semibold disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                            {loading && <LoaderCircle size={18} className="animate-spin"/>}
                            {loading ? "Création du compte..." : "Créer mon compte"}
                        </button>

                    </form>

                    <p className="mt-6 text-center text-sm text-stone-500">
                        Vous avez déjà un compte ?{" "}
                        <button onClick={()=>navigate("/login")} className="font-semibold text-[#66735A]">Se connecter</button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;