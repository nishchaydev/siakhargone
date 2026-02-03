import Image from "next/image";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
            <div className="relative w-24 h-24 mb-4">
                <div className="absolute inset-0 border-4 border-gold/30 rounded-full animate-ping"></div>
                <div className="relative z-10 bg-white rounded-full p-2 shadow-xl border border-gold/20">
                    <Image
                        src="https://res.cloudinary.com/dkits80xk/image/upload/v1768373239/school-logo_npmwwm.png"
                        alt="SIA Loading"
                        width={80}
                        height={80}
                        className="object-contain"
                        priority
                    />
                </div>
            </div>
            <div className="flex items-center gap-2 text-navy font-bold text-lg animate-pulse">
                <span>Loading</span>
                <span className="dot-flashing">...</span>
            </div>
        </div>
    );
}
