"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoUrl: string;
}

export function VideoModal({ isOpen, onClose, videoUrl }: VideoModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-4xl p-0 bg-black overflow-hidden border-none text-white">
                <div className="sr-only">
                    <DialogTitle>Campus Tour Video</DialogTitle>
                </div>
                <div className="relative pt-[56.25%]">
                    <iframe
                        src={videoUrl}
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Campus Tour"
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
