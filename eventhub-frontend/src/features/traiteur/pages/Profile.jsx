import {useEffect,useState} from "react";
import {Camera,MapPin,Mail,Save,LoaderCircle,CheckCircle2,ExternalLink,User,Briefcase} from "lucide-react";
import {useNavigate} from "react-router-dom";
import TraiteurSidebar from "../components/TraiteurSidebar";
import {getProfile,updateProfile} from "../../../services/profileService";

function Profile(){
    const navigate=useNavigate();
    const [profile,setProfile]=useState(null);
    const [name,setName]=useState("");
    const [city,setCity]=useState("");
    const [bio,setBio]=useState("");
    const [photo,setPhoto]=useState(null);
    const [preview,setPreview]=useState(null);
    const [loading,setLoading]=useState(true);
    const [saving,setSaving]=useState(false);
    const [message,setMessage]=useState("");

    useEffect(()=>{
        loadProfile();
    },[]);

    async function loadProfile(){
        try{
            const data=await getProfile();
            setProfile(data);
            setName(data.name || "");
            setCity(data.city || "");
            setBio(data.bio || "");

            if(data.photo){
                setPreview("http://127.0.0.1:8000/storage/"+data.photo);
            }
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    function handlePhoto(e){
        const file=e.target.files[0];

        if(file){
            setPhoto(file);
            setPreview(URL.createObjectURL(file));
        }
    }

    async function handleSubmit(e){
        e.preventDefault();

        const formData=new FormData();

        formData.append("name",name);
        formData.append("city",city);
        formData.append("bio",bio);

        if(photo){
            formData.append("photo",photo);
        }

        try{
            setSaving(true);
            setMessage("");

            const data=await updateProfile(formData);

            setProfile(data.user);
            setMessage("Profil mis à jour avec succès");
        }catch(error){
            setMessage(error.message);
        }finally{
            setSaving(false);
        }
    }

    if(loading){
        return(
            <div className="min-h-screen bg-[#F6F4EF]">
                <TraiteurSidebar/>
                <div className="ml-64 min-h-screen flex items-center justify-center">
                    <LoaderCircle size={30} className="animate-spin text-[#66735A]"/>
                </div>
            </div>
        );
    }

    return(
        <div className="min-h-screen bg-[#F6F4EF]">

            <TraiteurSidebar/>

            <main className="ml-64 min-h-screen">

                <div className="max-w-[1200px] mx-auto px-8 py-8">

                    <div className="flex items-center justify-between mb-7">

                        <div>
                            <p className="text-xs uppercase tracking-[2px] font-semibold text-[#7B8474]">
                                Espace professionnel
                            </p>

                            <h1 className="mt-1 text-[30px] font-bold text-[#20231F]">
                                Mon profil
                            </h1>
                        </div>

                        <button type="button" onClick={()=>navigate("/prestataires/"+profile.id)} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#DDD9CF] rounded-xl text-sm font-semibold text-[#354137] hover:border-[#66735A] transition">
                            <ExternalLink size={16}/>
                            Voir mon profil public
                        </button>

                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="relative h-[245px] rounded-[28px] overflow-hidden bg-[#263128]">

                            <div className="absolute inset-0 bg-gradient-to-r from-[#263128] via-[#354137] to-[#66735A]"></div>

                            <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full border border-white/10 translate-x-32 -translate-y-40"></div>

                            <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full border border-white/10 translate-x-20 -translate-y-24"></div>

                            <div className="relative h-full p-10 flex flex-col justify-center">

                                <p className="text-[#C9D0C1] text-xs uppercase tracking-[3px] font-semibold">
                                    {profile?.category?.name || "Prestataire EventHub"}
                                </p>

                                <h2 className="mt-4 max-w-[550px] text-[36px] leading-[44px] font-semibold text-white">
                                    Créez des expériences qui restent dans les mémoires.
                                </h2>

                                <p className="mt-4 text-sm text-white/60">
                                    Votre vitrine professionnelle sur EventHub.
                                </p>

                            </div>

                        </div>

                        <div className="relative -mt-14 mx-5 bg-white rounded-[24px] border border-[#E5E1D8] shadow-[0_10px_40px_rgba(38,49,40,0.08)] px-7 py-6">

                            <div className="flex flex-col md:flex-row md:items-center gap-6">

                                <div className="relative shrink-0">

                                    <div className="w-[125px] h-[125px] rounded-full overflow-hidden border-[5px] border-white shadow-lg bg-[#EEEAE1]">

                                        {preview ? (
                                            <img src={preview} alt={name} className="w-full h-full object-cover"/>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-[#E8ECE4] text-[#66735A] text-4xl font-bold">
                                                {name ? name.charAt(0).toUpperCase() : "P"}
                                            </div>
                                        )}

                                    </div>

                                    <label className="absolute bottom-1 right-0 w-10 h-10 rounded-full bg-white border border-[#DDD9CF] shadow-md flex items-center justify-center text-[#263128] cursor-pointer hover:bg-[#F5F3EE] transition">
                                        <Camera size={17}/>
                                        <input type="file" accept="image/*" onChange={handlePhoto} className="hidden"/>
                                    </label>

                                </div>

                                <div className="flex-1">

                                    <div className="flex items-center gap-3 flex-wrap">

                                        <h2 className="text-[27px] font-bold text-[#20231F]">
                                            {name || profile?.name}
                                        </h2>

                                        <span className="px-3 py-1 bg-[#EEF2EA] text-[#66735A] rounded-full text-[11px] font-bold">
                                            PROFIL ACTIF
                                        </span>

                                    </div>

                                    <p className="mt-1 text-sm font-medium text-[#78806F]">
                                        {profile?.category?.name || "Prestataire"}
                                    </p>

                                    <div className="mt-4 flex flex-wrap gap-5 text-sm text-[#777B74]">

                                        <span className="flex items-center gap-2">
                                            <MapPin size={15} className="text-[#66735A]"/>
                                            {city || "Ville non renseignée"}
                                        </span>

                                        <span className="flex items-center gap-2">
                                            <Mail size={15} className="text-[#66735A]"/>
                                            {profile?.email}
                                        </span>

                                    </div>

                                </div>

                                <div className="hidden lg:block border-l border-[#E8E4DB] pl-7">

                                    <p className="text-xs text-[#9A9D97]">
                                        Catégorie
                                    </p>

                                    <div className="mt-2 flex items-center gap-2 text-[#263128] font-semibold">
                                        <Briefcase size={17}/>
                                        {profile?.category?.name || "Prestataire"}
                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">

                            <section className="bg-white rounded-[22px] border border-[#E5E1D8]">

                                <div className="px-7 py-6 border-b border-[#EEEAE2] flex items-center justify-between">

                                    <div>
                                        <h3 className="text-lg font-bold text-[#20231F]">
                                            Informations professionnelles
                                        </h3>

                                        <p className="mt-1 text-sm text-[#8A8E86]">
                                            Ces informations seront visibles par vos clients.
                                        </p>
                                    </div>

                                    <User size={21} className="text-[#A0A69A]"/>

                                </div>

                                <div className="p-7">

                                    {message && (
                                        <div className="mb-6 flex items-center gap-2 bg-[#F0F4EC] border border-[#DCE5D6] rounded-xl px-4 py-3 text-sm font-medium text-[#53634D]">
                                            <CheckCircle2 size={17}/>
                                            {message}
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                        <div>
                                            <label className="block mb-2 text-xs font-semibold text-[#555B52]">
                                                Nom professionnel
                                            </label>

                                            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="w-full h-12 border border-[#DCD8CF] rounded-xl px-4 text-sm outline-none bg-[#FCFBF8] focus:bg-white focus:border-[#66735A] transition"/>
                                        </div>

                                        <div>
                                            <label className="block mb-2 text-xs font-semibold text-[#555B52]">
                                                Ville
                                            </label>

                                            <div className="relative">
                                                <MapPin size={16} className="absolute left-4 top-4 text-[#90958D]"/>
                                                <input type="text" value={city} onChange={(e)=>setCity(e.target.value)} placeholder="Ex: Béni Mellal" className="w-full h-12 border border-[#DCD8CF] rounded-xl pl-11 pr-4 text-sm outline-none bg-[#FCFBF8] focus:bg-white focus:border-[#66735A] transition"/>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block mb-2 text-xs font-semibold text-[#555B52]">
                                                Email
                                            </label>

                                            <input type="email" value={profile?.email || ""} disabled className="w-full h-12 border border-[#E5E1D8] rounded-xl px-4 text-sm bg-[#F3F1EC] text-[#999C96] cursor-not-allowed"/>
                                        </div>

                                        <div>
                                            <label className="block mb-2 text-xs font-semibold text-[#555B52]">
                                                Catégorie
                                            </label>

                                            <input type="text" value={profile?.category?.name || ""} disabled className="w-full h-12 border border-[#E5E1D8] rounded-xl px-4 text-sm bg-[#F3F1EC] text-[#999C96] cursor-not-allowed"/>
                                        </div>

                                    </div>

                                    <div className="mt-6">

                                        <div className="flex justify-between mb-2">

                                            <label className="text-xs font-semibold text-[#555B52]">
                                                Bio / Présentation
                                            </label>

                                            <span className="text-[11px] text-[#A0A39D]">
                                                {bio.length}/500
                                            </span>

                                        </div>

                                        <textarea value={bio} onChange={(e)=>setBio(e.target.value)} maxLength="500" rows="6" placeholder="Présentez votre activité, votre expérience et vos services..." className="w-full border border-[#DCD8CF] rounded-xl p-4 text-sm leading-6 outline-none resize-none bg-[#FCFBF8] focus:bg-white focus:border-[#66735A] transition"></textarea>

                                    </div>

                                    <div className="mt-6 pt-5 border-t border-[#EEEAE2] flex justify-end">

                                        <button type="submit" disabled={saving} className="h-11 px-6 bg-[#263128] hover:bg-[#66735A] text-white rounded-xl text-sm font-semibold flex items-center gap-2 transition disabled:opacity-60">

                                            {saving ? (
                                                <LoaderCircle size={16} className="animate-spin"/>
                                            ) : (
                                                <Save size={16}/>
                                            )}

                                            {saving ? "Enregistrement..." : "Enregistrer les modifications"}

                                        </button>

                                    </div>

                                </div>

                            </section>

                            <aside className="space-y-6">

                                <div className="bg-white rounded-[22px] border border-[#E5E1D8] p-6">

                                    <p className="text-xs uppercase tracking-[2px] font-semibold text-[#8B9186]">
                                        Photo du profil
                                    </p>

                                    <div className="mt-6 flex justify-center">

                                        <div className="relative">

                                            <div className="w-[145px] h-[145px] rounded-full overflow-hidden bg-[#EEEAE1] border-4 border-[#F5F3EE]">

                                                {preview ? (
                                                    <img src={preview} alt={name} className="w-full h-full object-cover"/>
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-[#66735A]">
                                                        {name ? name.charAt(0).toUpperCase() : "P"}
                                                    </div>
                                                )}

                                            </div>

                                            <label className="absolute bottom-1 right-1 w-10 h-10 rounded-full bg-[#263128] text-white flex items-center justify-center cursor-pointer hover:bg-[#66735A] transition">
                                                <Camera size={17}/>
                                                <input type="file" accept="image/*" onChange={handlePhoto} className="hidden"/>
                                            </label>

                                        </div>

                                    </div>

                                    <p className="mt-5 text-center text-xs text-[#999D96]">
                                        JPG ou PNG · Maximum 2 MB
                                    </p>

                                </div>

                                <div className="bg-[#EAEDE5] rounded-[22px] p-6">

                                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#66735A]">
                                        <CheckCircle2 size={19}/>
                                    </div>

                                    <h3 className="mt-4 font-bold text-[#263128]">
                                        Soignez votre profil
                                    </h3>

                                    <p className="mt-2 text-xs leading-5 text-[#73796E]">
                                        Une photo claire, une ville et une bonne présentation permettent aux clients de mieux découvrir votre activité.
                                    </p>

                                </div>

                            </aside>

                        </div>

                    </form>

                </div>

            </main>

        </div>
    );
}

export default Profile;