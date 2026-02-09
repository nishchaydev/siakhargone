"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Database, CheckCircle, AlertTriangle } from "lucide-react";

export default function AdminSettings() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleSetup = async () => {
        setLoading(true);
        setResult(null);
        try {
            const res = await fetch("/api/admin/fix-sheets", { method: "POST" });
            const json = await res.json();
            setResult(json);
        } catch (error) {
            console.error(error);
            setResult({ success: false, error: "Failed to connect to API" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 md:p-10 space-y-8 max-w-4xl">
            <div>
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">System Settings</h1>
                <p className="text-gray-500 mt-1">Manage system configurations and database connections.</p>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <Database className="w-6 h-6" />
                        </div>
                        <div>
                            <CardTitle>Database Initialization</CardTitle>
                            <CardDescription>
                                Automatically create missing Google Sheet tabs and update column headers.
                                <br />
                                <span className="text-xs text-orange-600 font-medium">Run this if you encounter missing data errors or after system updates.</span>
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4">
                        <Button
                            onClick={handleSetup}
                            disabled={loading}
                            className="w-full md:w-auto self-start bg-blue-600 hover:bg-blue-700"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                    Verifying...
                                </>
                            ) : (
                                "Run Safe Verification"
                            )}
                        </Button>

                        {result && (
                            <div className={`p-4 rounded-md border ${result.success ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"}`}>
                                <div className="flex items-center gap-2 font-bold mb-2">
                                    {result.success ? <CheckCircle className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                                    {result.success ? "Verification Complete" : "Verification Failed"}
                                </div>
                                <p className="text-sm">{result.message || result.error}</p>

                                {result.report && (
                                    <div className="mt-4 space-y-2 text-xs">
                                        {result.report.fixed.length > 0 && (
                                            <div>
                                                <strong className="block text-green-700">Fixed/Created:</strong>
                                                <ul className="list-disc list-inside opacity-90">
                                                    {result.report.fixed.map((item: string, i: number) => (
                                                        <li key={i}>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {result.report.missing.length > 0 && (
                                            <div>
                                                <strong className="block text-orange-700">Missing (Not Fixed):</strong>
                                                <ul className="list-disc list-inside opacity-90">
                                                    {result.report.missing.map((item: string, i: number) => (
                                                        <li key={i}>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {result.report.errors.length > 0 && (
                                            <div>
                                                <strong className="block text-red-700">Errors:</strong>
                                                <ul className="list-disc list-inside opacity-90">
                                                    {result.report.errors.map((item: string, i: number) => (
                                                        <li key={i}>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {result.report.fixed.length === 0 && result.report.missing.length === 0 && result.report.errors.length === 0 && (
                                            <p className="italic opacity-70">All systems operational. No issues found.</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
