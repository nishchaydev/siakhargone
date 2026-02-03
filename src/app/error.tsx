"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service if needed
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border-t-4 border-gold max-w-lg w-full">
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="h-10 w-10 text-red-500" />
                </div>

                <h2 className="text-3xl font-display font-bold text-navy mb-4">
                    Something went wrong!
                </h2>

                <p className="text-gray-600 mb-8 leading-relaxed">
                    We encountered an unexpected error while processing your request.
                    Our technical team has been notified.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        onClick={() => reset()}
                        size="lg"
                        className="bg-navy hover:bg-navy-dark min-w-[140px]"
                    >
                        <RefreshCw className="mr-2 h-4 w-4" /> Try Again
                    </Button>

                    <Button
                        size="lg"
                        asChild
                        className="bg-gold hover:bg-gold-dark text-navy font-bold min-w-[140px] border-2 border-gold"
                    >
                        <Link href="/">
                            <Home className="mr-2 h-4 w-4" /> Go Home
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
