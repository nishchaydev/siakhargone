import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center bg-gray-50/50">
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl max-w-lg w-full border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl -mr-6 -mt-6"></div>
                <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="w-10 h-10 text-red-500" />
                </div>
                <h2 className="text-5xl font-display font-bold text-navy mb-2">404</h2>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Page Not Found</h3>
                <p className="text-gray-500 mb-8 leading-relaxed">
                    Oops! It seems you've wandered off the path. The page you are looking for might have been moved, deleted, or doesn't exist.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild variant="secondary" size="lg" className="font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                        <Link href="/">
                            Return to Homepage
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="border-navy/20 text-navy hover:bg-gray-50">
                        <Link href="/contact">
                            Report Issue
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
