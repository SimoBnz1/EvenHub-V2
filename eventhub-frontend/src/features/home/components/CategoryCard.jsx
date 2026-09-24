function CategoryCard({icon:Icon,name,onClick}){
    return(
        <button onClick={onClick} className="group min-h-[64px] flex flex-col items-center justify-center gap-2 rounded-[20px_9px_20px_9px] bg-white border border-[#E7E2D8] transition-all duration-300 hover:-translate-y-1 hover:rotate-[-1deg] hover:border-[#BCC5B3] hover:shadow-md">
            <div className="w-8 h-8 rounded-[12px_6px_12px_6px] bg-[#F7F4ED] flex items-center justify-center transition group-hover:bg-[#66735A]">
                <Icon size={16} strokeWidth={1.7} className="text-[#66735A] group-hover:text-white transition"/>
            </div>

            <span className="text-[11px] font-semibold text-[#3B4039]">
                {name}
            </span>
        </button>
    );
}

export default CategoryCard;