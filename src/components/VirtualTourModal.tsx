
'use client';

import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import VirtualTourPageClient from '@/app/virtual-tour/VirtualTourPageClient';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface VirtualTourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VirtualTourModal({ isOpen, onClose }: VirtualTourModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] h-[90vh] w-full p-0 bg-black border-0 flex flex-col">
        <VisuallyHidden>
            <DialogTitle>Virtual Tour</DialogTitle>
            <DialogDescription>An interactive tour of the school campus.</DialogDescription>
        </VisuallyHidden>
        <div className="w-full h-full flex-grow">
          {isOpen && <VirtualTourPageClient />}
        </div>
      </DialogContent>
    </Dialog>
  );
}

    