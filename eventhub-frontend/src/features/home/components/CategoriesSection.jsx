import {
    Utensils,
    Camera,
    Sparkles,
    Music2,
    Armchair,
    CakeSlice,
    LayoutGrid
} from "lucide-react";

import CategoryCard from "./CategoryCard";

function CategoriesSection({setCategoryId}){

    const categories=[
        {id:null,name:"All",icon:LayoutGrid},
        {id:1,name:"Traiteur",icon:Utensils},
        {id:2,name:"Photographe",icon:Camera},
        {id:3,name:"Décoration",icon:Sparkles},
        {id:4,name:"DJ",icon:Music2},
        {id:5,name:"Matériel",icon:Armchair},
        {id:6,name:"Pâtisserie",icon:CakeSlice}
    ];

    return(
        <section className="w-full bg-[#FDFCF9] pt-12 pb-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="bg-[#FAF8F3] border border-[#E9E4DA] rounded-[30px_14px_30px_14px] px-6 py-5 flex flex-col lg:flex-row lg:items-center gap-6 shadow-[0_10px_35px_rgba(32,35,31,0.05)]">

                    <div className="lg:w-[230px] shrink-0">
                        <p className="text-[11px] uppercase tracking-[2px] text-[#8B907F] font-semibold">
                            Explorer
                        </p>

                        <h2 className="mt-1 text-xl font-bold text-[#20231F] leading-tight">
                            Trouvez votre
                            <br/>
                            prestation
                        </h2>
                    </div>

                    <div className="flex-1 grid grid-cols-3 sm:grid-cols-7 gap-3">
                        {categories.map((category)=>(
                            <CategoryCard
                                key={category.name}
                                icon={category.icon}
                                name={category.name}
                                onClick={()=>setCategoryId(category.id)}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}

export default CategoriesSection;