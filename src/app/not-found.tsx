
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
            <h2 className="text-6xl font-display font-bold text-navy mb-4">404</h2>
            <h3 className="text-2xl font-semibold mb-6">Page Not Found</h3>
            <p className="max-w-md text-muted-foreground mb-8">
                We couldn't find the page you were looking for. It might have been moved or deleted.
            </p>
            <Link
                href="/"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-navy text-white shadow hover:bg-navy/90 h-10 px-8 py-2"
            >
                Return Home
            </Link>
        </div>
    );
}
