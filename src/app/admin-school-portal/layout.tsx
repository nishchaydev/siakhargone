
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            <AdminSidebar />
            {/* Main Content - Pushed by sidebar on desktop */}
            <main className="flex-1 md:ml-64 p-8 overflow-y-auto h-screen w-full">
                {children}
            </main>
        </div>
    );
}
