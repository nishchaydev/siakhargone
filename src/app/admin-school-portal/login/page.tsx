
"use client";

import { useState } from "react";
import { Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLogin() {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                router.push("/admin-school-portal/dashboard");
            } else {
                setError("Invalid Password. Access Denied.");
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white max-w-md w-full rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-navy p-8 text-center">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShieldCheck className="text-gold w-8 h-8" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Staff Portal</h1>
                    <p className="text-blue-200 text-sm mt-1">Sanskar International Academy</p>
                </div>

                <div className="p-8">
                    <form onSubmit={handleLogin} className="space-y-6">

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Access Key</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <Input
                                    type="password"
                                    placeholder="Enter Staff Password"
                                    className="pl-10 h-12 text-lg"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="text-center text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg border border-red-100">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full h-12 bg-navy hover:bg-navy-light text-lg font-bold shadow-lg"
                            disabled={loading}
                        >
                            {loading ? "Verifying..." : "Secure Login"}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-xs text-gray-400">
                        Unauthorized access is prohibited. <br /> IP Address Monitored.
                    </div>
                </div>
            </div>
        </div>
    );
}
