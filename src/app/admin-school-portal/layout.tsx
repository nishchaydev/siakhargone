
export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto h-screen w-full">
                {children}
            </main>
        </div>
    );
}
