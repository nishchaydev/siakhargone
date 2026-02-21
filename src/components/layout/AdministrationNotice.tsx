import { schoolData } from "@/data/schoolData";

export default function AdministrationNotice() {
    return (
        <div className="bg-navy-dark text-white/90 py-2 px-4 text-center text-xs md:text-sm font-medium border-b border-gold/20">
            <div className="container mx-auto">
                Sanskar International Academy is under the able administration of <span className="text-gold font-bold">{schoolData.society}</span>
            </div>
        </div>
    );
}
