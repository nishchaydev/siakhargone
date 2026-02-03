
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, LayoutDashboard, FileText, Image as ImageIcon, Briefcase, Megaphone, FileCheck, GraduationCap, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
    const router = useRouter();

    const handleLogout = () => {
        // Clear cookie and redirect
        document.cookie = "admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        router.push("/admin-school-portal/login");
    };

    const adminModules = [
        {
            title: "Latest News",
            icon: Megaphone,
            desc: "Add or remove homepage news items.",
            href: "/admin-school-portal/news",
            color: "text-blue-600 bg-blue-100"
        },
        {
            title: "Notices Board",
            icon: FileText,
            desc: "Update the scrolling notices.",
            href: "/admin-school-portal/notices",
            color: "text-amber-600 bg-amber-100"
        },
        {
            title: "Photo Gallery",
            icon: ImageIcon,
            desc: "Upload photos to events & albums.",
            href: "/admin-school-portal/gallery",
            color: "text-purple-600 bg-purple-100"
        },
        {
            title: "Job Openings",
            icon: Briefcase,
            desc: "Manage careers and job listings.",
            href: "/admin-school-portal/careers",
            color: "text-emerald-600 bg-emerald-100"
        },
        {
            title: "Transfer Certificates",
            icon: FileCheck,
            desc: "Issue and verify student TCs.",
            href: "/admin-school-portal/tc",
            color: "text-pink-600 bg-pink-100"
        },
        {
            title: "Student Results",
            icon: GraduationCap,
            desc: "Upload and manage exam results.",
            href: "/admin-school-portal/results",
            color: "text-indigo-600 bg-indigo-100"
        },
        {
            title: "Settings",
            icon: Settings,
            desc: "Database setup and system config.",
            href: "/admin-school-portal/settings",
            color: "text-gray-600 bg-gray-100"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Bar */}
            <header className="bg-white border-b sticky top-0 z-30 px-6 py-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="bg-navy p-2 rounded-lg">
                        <LayoutDashboard className="text-white w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-navy">Admin Console</h1>
                        <p className="text-xs text-muted-foreground">Sanskar International Academy</p>
                    </div>
                </div>
                <Button variant="ghost" onClick={handleLogout} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                    <LogOut className="w-5 h-5 mr-2" /> Logout
                </Button>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto p-6">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">Welcome back, Staff.</h2>
                    <p className="text-gray-500 mt-1">Select a module below to start managing content.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {adminModules.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link key={item.title} href={item.href} className="block group">
                                <Card className="h-full border-2 border-transparent hover:border-gold/50 transition-all hover:shadow-lg">
                                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                        <div className={`p-3 rounded-xl ${item.color}`}>
                                            <Icon className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg font-bold text-gray-800">{item.title}</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-500 text-sm leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </div>

                <div className="mt-12 p-6 bg-blue-50 border border-blue-100 rounded-xl">
                    <h3 className="text-blue-900 font-bold mb-2">💡 Help & Tips</h3>
                    <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
                        <li>Always compress images before uploading (keep under 2MB).</li>
                        <li>Changes to "Notices" and "News" appear instantly on the website.</li>
                        <li>If you make a mistake, you can simply delete the item and re-add it.</li>
                    </ul>
                </div>
            </main>
        </div>
    );
}
