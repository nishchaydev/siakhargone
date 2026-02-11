"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { ImageSkeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ImageWithSkeletonProps extends Omit<ImageProps, 'onLoad'> {
    skeletonClassName?: string;
}

export default function ImageWithSkeleton({
    skeletonClassName,
    className,
    alt,
    ...props
}: ImageWithSkeletonProps) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="relative">
            {isLoading && (
                <ImageSkeleton
                    className={cn(
                        "absolute inset-0 z-10",
                        skeletonClassName
                    )}
                />
            )}
            <Image
                {...props}
                alt={alt}
                className={cn(
                    "transition-opacity duration-300",
                    isLoading ? "opacity-0" : "opacity-100",
                    className
                )}
                onLoad={() => setIsLoading(false)}
            />
        </div>
    );
}
