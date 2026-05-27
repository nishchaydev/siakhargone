import Image from "next/image";

interface PageBannerProps {
    title: string;
    subtitle?: string;
    image?: string;
    objectPosition?: string;
    objectFit?: "cover" | "contain";
}

export default function PageBanner({
    title,
    subtitle,
    image = "https://res.cloudinary.com/dkits80xk/image/upload/f_auto,q_auto,c_scale,w_1920/v1765349456/infrastructure-building-1_gstqrx.webp",
    objectPosition = "center",
    objectFit = "cover"
}: PageBannerProps) {
    return (
        <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden flex items-center justify-center bg-navy">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className={objectFit === "cover" ? "object-cover" : "object-contain"}
                    style={{ objectPosition }}
                    priority
                />
                <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                <h1 
                    className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 animate-fade-in-up"
                    style={{ animationFillMode: "both" }}
                >
                    {title}
                </h1>

                {subtitle && (
                    <p 
                        className="text-lg md:text-xl text-gold/90 font-medium max-w-2xl mx-auto tracking-wide animate-fade-in-up"
                        style={{ animationDelay: "200ms", animationFillMode: "both" }}
                    >
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    );
}
