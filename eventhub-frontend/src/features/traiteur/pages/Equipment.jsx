import { useEffect, useState } from "react";
import {
    Package,
    Plus,
    Pencil,
    Trash2,
    Boxes,
    CheckCircle
} from "lucide-react";

import TraiteurSidebar from "../components/TraiteurSidebar";
import {
    getEquipment,
    createEquipment,
    updateEquipment,
    deleteEquipment
} from "../../../services/equipmentService";

function Equipment() {

    const [equipment, setEquipment] = useState([]);

    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");

    const [editId, setEditId] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        loadEquipment();

    }, []);

    async function loadEquipment() {

        try {

            const data = await getEquipment();

            setEquipment(data);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);
        }
    }


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setError("");

            if (editId) {

                await updateEquipment(editId, name, quantity);

            } else {

                await createEquipment(name, quantity);
            }

            setName("");
            setQuantity("");
            setEditId(null);

            loadEquipment();

        } catch (error) {

            setError(error.message);
        }
    };


    const handleEdit = (item) => {

        setEditId(item.id);

        setName(item.name);

        setQuantity(item.total_quantity);
    };


    const cancelEdit = () => {

        setEditId(null);

        setName("");

        setQuantity("");
    };


    const handleDelete = async (id) => {

        const confirmation = window.confirm(
            "Voulez-vous supprimer cet équipement ?"
        );

        if (!confirmation) {
            return;
        }

        try {

            setError("");

            await deleteEquipment(id);

            loadEquipment();

        } catch (error) {

            setError(error.message);
        }
    };


    const totalEquipment = equipment.length;

    let totalQuantity = 0;

    equipment.forEach((item) => {
        totalQuantity = totalQuantity + item.total_quantity;
    });


    return (

        <div className="min-h-screen bg-[#F5F3EE]">

            <TraiteurSidebar />


            <main className="ml-64 min-h-screen px-10 py-8">

                {/* HEADER */}

                <div className="flex items-end justify-between">

                    <div>

                        <p className="text-[10px] uppercase tracking-[2.5px] font-bold text-[#7B8573]">
                            Gestion du matériel
                        </p>

                        <h1 className="mt-2 text-3xl font-bold text-[#20231F]">
                            Équipements
                        </h1>

                        <p className="mt-2 text-sm text-[#858981]">
                            Gérez simplement votre matériel et vos quantités.
                        </p>

                    </div>


                    <div className="flex gap-3">

                        <div className="bg-white border border-[#E4E0D7] rounded-xl px-4 py-3 flex items-center gap-3">

                            <div className="w-9 h-9 bg-[#EEF1E9] rounded-lg flex items-center justify-center">

                                <Boxes
                                    size={17}
                                    className="text-[#66735A]"
                                />

                            </div>

                            <div>

                                <p className="text-[9px] text-[#969A92]">
                                    Types
                                </p>

                                <p className="text-base font-bold text-[#20231F]">
                                    {totalEquipment}
                                </p>

                            </div>

                        </div>


                        <div className="bg-white border border-[#E4E0D7] rounded-xl px-4 py-3 flex items-center gap-3">

                            <div className="w-9 h-9 bg-[#F5EFE4] rounded-lg flex items-center justify-center">

                                <Package
                                    size={17}
                                    className="text-[#B68D5B]"
                                />

                            </div>

                            <div>

                                <p className="text-[9px] text-[#969A92]">
                                    Quantité totale
                                </p>

                                <p className="text-base font-bold text-[#20231F]">
                                    {totalQuantity}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ERROR */}

                {error && (

                    <div className="mt-5 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm">
                        {error}
                    </div>

                )}


                <div className="mt-7 grid grid-cols-[330px_1fr] gap-6">


                    {/* FORMULAIRE */}

                    <div className="bg-[#263128] text-white rounded-[22px] p-6 h-fit">

                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">

                            {editId ? (
                                <Pencil size={17} />
                            ) : (
                                <Plus size={18} />
                            )}

                        </div>


                        <h2 className="mt-4 text-xl font-bold">

                            {editId
                                ? "Modifier l'équipement"
                                : "Nouvel équipement"
                            }

                        </h2>


                        <p className="mt-1 text-xs text-white/50">
                            Ajoutez le matériel disponible pour vos événements.
                        </p>


                        <form
                            onSubmit={handleSubmit}
                            className="mt-6"
                        >

                            <div>

                                <label className="block mb-2 text-xs font-semibold text-white/70">
                                    Nom
                                </label>

                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Ex : Chaises"
                                    required
                                    className="w-full h-11 px-4 bg-white/10 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 outline-none focus:border-white/40"
                                />

                            </div>


                            <div className="mt-4">

                                <label className="block mb-2 text-xs font-semibold text-white/70">
                                    Quantité
                                </label>

                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    placeholder="Ex : 200"
                                    min="1"
                                    required
                                    className="w-full h-11 px-4 bg-white/10 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 outline-none focus:border-white/40"
                                />

                            </div>


                            <button
                                type="submit"
                                className="mt-5 w-full h-11 bg-[#F7F4ED] text-[#263128] rounded-xl text-sm font-bold hover:bg-white transition"
                            >

                                {editId
                                    ? "Enregistrer"
                                    : "Ajouter l'équipement"
                                }

                            </button>


                            {editId && (

                                <button
                                    type="button"
                                    onClick={cancelEdit}
                                    className="mt-2 w-full h-10 text-xs text-white/60 hover:text-white"
                                >
                                    Annuler la modification
                                </button>

                            )}

                        </form>

                    </div>


                    {/* LISTE */}

                    <div>

                        <div className="flex items-center justify-between mb-3">

                            <h2 className="text-sm font-bold text-[#343832]">
                                Votre matériel
                            </h2>

                            <span className="text-xs text-[#92968F]">
                                {totalEquipment} équipement(s)
                            </span>

                        </div>


                        {loading ? (

                            <div className="bg-white border border-[#E5E1D8] rounded-2xl py-12 text-center">

                                <p className="text-sm text-[#858981]">
                                    Chargement...
                                </p>

                            </div>

                        ) : equipment.length === 0 ? (

                            <div className="bg-white border border-[#E5E1D8] rounded-2xl py-12 text-center">

                                <div className="w-11 h-11 mx-auto bg-[#EEF1E9] rounded-full flex items-center justify-center">

                                    <Package
                                        size={19}
                                        className="text-[#66735A]"
                                    />

                                </div>

                                <h3 className="mt-3 text-sm font-bold text-[#20231F]">
                                    Aucun équipement
                                </h3>

                                <p className="mt-1 text-xs text-[#91958E]">
                                    Ajoutez votre premier équipement.
                                </p>

                            </div>

                        ) : (

                            <div className="space-y-3">

                                {equipment.map((item) => (

                                    <div
                                        key={item.id}
                                        className="bg-white border border-[#E5E1D8] rounded-2xl px-5 py-4 flex items-center gap-4 hover:border-[#CBC7BD] transition"
                                    >

                                        {/* ICON */}

                                        <div className="w-11 h-11 bg-[#EEF1E9] rounded-xl flex items-center justify-center shrink-0">

                                            <Package
                                                size={18}
                                                className="text-[#66735A]"
                                            />

                                        </div>


                                        {/* NAME */}

                                        <div className="flex-1">

                                            <h3 className="text-sm font-bold text-[#20231F]">
                                                {item.name}
                                            </h3>

                                            <p className="mt-1 text-[10px] text-[#969A92]">
                                                Matériel événementiel
                                            </p>

                                        </div>


                                        {/* TOTAL */}

                                        <div className="w-[110px]">

                                            <p className="text-[9px] text-[#A09F9A]">
                                                Quantité totale
                                            </p>

                                            <p className="mt-1 text-sm font-bold text-[#20231F]">
                                                {item.total_quantity}
                                            </p>

                                        </div>


                                        {/* AVAILABLE */}

                                        <div className="w-[120px]">

                                            <p className="text-[9px] text-[#A09F9A]">
                                                Disponible
                                            </p>

                                            <div className="mt-1 flex items-center gap-1.5">

                                                <CheckCircle
                                                    size={13}
                                                    className="text-[#66735A]"
                                                />

                                                <p className="text-sm font-bold text-[#66735A]">
                                                    {item.available_quantity}
                                                </p>

                                            </div>

                                        </div>


                                        {/* ACTIONS */}

                                        <div className="flex gap-2">

                                            <button
                                                type="button"
                                                onClick={() => handleEdit(item)}
                                                className="w-9 h-9 border border-[#E3DFD7] rounded-lg flex items-center justify-center text-[#737970] hover:bg-[#F3F4EF] hover:text-[#263128] transition"
                                            >
                                                <Pencil size={14} />
                                            </button>


                                            <button
                                                type="button"
                                                onClick={() => handleDelete(item.id)}
                                                className="w-9 h-9 border border-[#E9DAD6] rounded-lg flex items-center justify-center text-[#A66457] hover:bg-[#F8EFED] transition"
                                            >
                                                <Trash2 size={14} />
                                            </button>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        )}

                    </div>

                </div>

            </main>

        </div>
    );
}

export default Equipment;