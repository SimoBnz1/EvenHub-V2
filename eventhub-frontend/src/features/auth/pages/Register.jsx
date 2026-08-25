import { useState } from "react";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "client"
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center px-6 py-10">
            <div className="w-full max-w-5xl bg-white rounded-[32px_14px_32px_14px] overflow-hidden border border-stone-200 shadow-xl shadow-stone-200/40 grid md:grid-cols-2">

                <div className="hidden md:block relative min-h-[680px] bg-stone-900">
                    <img src="https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1600&q=95" alt="EventHub" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/5"></div>

                    <div className="absolute top-8 left-8 text-white">
                        <span className="text-2xl font-bold tracking-[-1px]">event</span>
                        <span className="text-2xl ml-1 text-stone-200 italic font-semibold">hub</span>
                        <span className="ml-1 text-amber-300 text-xs">✦</span>
                    </div>

                    <div className="absolute bottom-10 left-8 right-8 text-white">
                        <p className="text-xs uppercase tracking-[3px] text-white/60">Créer un compte</p>
                        <h2 className="mt-3 text-3xl font-bold leading-tight">Rejoignez EventHub et simplifiez vos événements.</h2>
                        <p className="mt-3 text-sm text-white/70 leading-6">Réservez facilement ou développez votre activité en tant que prestataire.</p>
                    </div>
                </div>

                <div className="p-8 md:p-10 flex flex-col justify-center">

                    <div className="md:hidden mb-7">
                        <span className="text-2xl font-bold text-stone-900">event</span>
                        <span className="text-2xl ml-1 text-[#66735A] italic font-semibold">hub</span>
                        <span className="ml-1 text-[#B68D5B] text-xs">✦</span>
                    </div>

                    <p className="text-xs uppercase tracking-[3px] text-[#78806F] font-semibold">Inscription</p>
                    <h1 className="mt-2 text-3xl font-bold text-[#20231F]">Créer votre compte.</h1>
                    <p className="mt-2 text-sm text-stone-500">Choisissez votre profil et commencez votre expérience EventHub.</p>

                    <form onSubmit={handleSubmit} className="mt-7 space-y-4">

                        <div>
                            <label className="block text-sm font-semibold text-stone-700 mb-2">Nom complet</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Votre nom" className="w-full h-12 px-4 bg-stone-50 border border-stone-200 rounded-[14px_7px_14px_7px] outline-none text-sm focus:border-[#66735A] focus:bg-white transition" />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-stone-700 mb-2">Adresse email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="exemple@email.com" className="w-full h-12 px-4 bg-stone-50 border border-stone-200 rounded-[14px_7px_14px_7px] outline-none text-sm focus:border-[#66735A] focus:bg-white transition" />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-stone-700 mb-2">Type de compte</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button type="button" onClick={() => setFormData({ ...formData, role: "client" })} className={`h-12 rounded-[14px_7px_14px_7px] border text-sm font-semibold transition ${formData.role === "client" ? "bg-[#263128] text-white border-[#263128]" : "bg-stone-50 text-stone-600 border-stone-200"}`}>Client</button>

                                <button type="button" onClick={() => setFormData({ ...formData, role: "traiteur" })} className={`h-12 rounded-[14px_7px_14px_7px] border text-sm font-semibold transition ${formData.role === "traiteur" ? "bg-[#263128] text-white border-[#263128]" : "bg-stone-50 text-stone-600 border-stone-200"}`}>Prestataire</button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-stone-700 mb-2">Mot de passe</label>
                            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Mot de passe" className="w-full h-12 px-4 bg-stone-50 border border-stone-200 rounded-[14px_7px_14px_7px] outline-none text-sm focus:border-[#66735A] focus:bg-white transition" />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-stone-700 mb-2">Confirmer le mot de passe</label>
                            <input type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} placeholder="Confirmez le mot de passe" className="w-full h-12 px-4 bg-stone-50 border border-stone-200 rounded-[14px_7px_14px_7px] outline-none text-sm focus:border-[#66735A] focus:bg-white transition" />
                        </div>

                        <button type="submit" className="w-full h-12 bg-[#263128] text-white rounded-[15px_7px_15px_7px] text-sm font-semibold hover:bg-[#354137] transition">Créer mon compte</button>

                    </form>

                    <p className="mt-6 text-center text-sm text-stone-500">
                        Vous avez déjà un compte ?{" "}
                        <button className="font-semibold text-[#66735A] hover:text-[#263128]">Se connecter</button>
                    </p>

                </div>
            </div>
        </div>
    );
}

export default Register;