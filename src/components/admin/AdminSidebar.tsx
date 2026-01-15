
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Megaphone,
    FileText,
    Image as ImageIcon,
    Briefcase,
    FileCheck,
    LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";

const sidebarItems = [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "News", href: "/news", icon: Megaphone },
    { title: "Notices", href: "/notices", icon: FileText },
    { title: "Gallery", href: "/gallery", icon: ImageIcon },
    { title: "Careers", href: "/careers", icon: Briefcase },
    { title: "Certificates (TC)", href: "/tc", icon: FileCheck },
    { title: "Applications", href: "/applications", icon: Briefcase }, // Reusing Briefcase for now
];

interface AdminSidebarProps {
    basePath?: string;
}

export default function AdminSidebar({ basePath = "/admin-school-portal" }: AdminSidebarProps) {
    const pathname = usePathname();

    const handleLogout = async () => {
        try {
            await fetch("/api/admin/logout", { method: "POST" });
            window.location.href = `${basePath}/login`;
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-white shadow-lg transition-transform md:translate-x-0 -translate-x-full md:block hidden">
            <div className="flex h-full flex-col">
                <div className="flex items-center gap-2 border-b px-6 py-6">
                    <div className="bg-navy p-1.5 rounded-lg">
                        <LayoutDashboard className="h-6 w-6 text-white" />
                    </div>
                    <span className="font-bold text-lg text-navy tracking-tight">Admin Console</span>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                    {sidebarItems.map((item) => {
                        const Icon = item.icon;
                        const fullPath = `${basePath}${item.href}`;
                        const isActive = pathname.startsWith(fullPath);
                        return (
                            <Link
                                key={item.href}
                                href={fullPath}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-blue-50 text-blue-700"
                                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                )}
                            >
                                <Icon className={cn("h-5 w-5", isActive ? "text-blue-600" : "text-gray-500")} />
                                {item.title}
                            </Link>
                        );
                    })}
                </div>

                <div className="border-t p-4">
                    <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                        <LogOut className="mr-2 h-5 w-5" />
                        Log Out
                    </Button>
                </div>
            </div>
        </aside>
    );
}
