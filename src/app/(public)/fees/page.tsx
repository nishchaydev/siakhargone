"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ExternalLink, CreditCard, Download } from "lucide-react";
import { motion } from "framer-motion";

export default function FeesPage() {
    const feeStructure = [
        { class: "Nursery - KG II", admission: "5,000", tuition: "15,000", total: "20,000" },
        { class: "Class I - V", admission: "8,000", tuition: "22,000", total: "30,000" },
        { class: "Class VI - VIII", admission: "10,000", tuition: "25,000", total: "35,000" },
        { class: "Class IX - X", admission: "12,000", tuition: "30,000", total: "42,000" },
        { class: "Class XI - XII (Commerce)", admission: "15,000", tuition: "35,000", total: "50,000" },
        { class: "Class XI - XII (Science)", admission: "15,000", tuition: "40,000", total: "55,000" },
    ];

    return (
        <div className="min-h-screen bg-grain pt-24 pb-12 px-4">
            <div className="container mx-auto max-w-5xl space-y-12">

                {/* Header Section */}
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-navy">Fee Structure & Payments</h1>
                    <p className="text-lg text-muted-foreground">
                        Transparent and affordable education. View our current session fees and pay securely online via our ERP portal.
                    </p>
                </div>

                {/* Action Card */}
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="order-2 md:order-1"
                    >
                        <Card className="border-l-4 border-l-gold shadow-lg h-full">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3 text-2xl text-navy">
                                    <CreditCard className="w-8 h-8 text-gold" />
                                    Online Fee Payment
                                </CardTitle>
                                <CardDescription>
                                    Existing parents can pay fees directly through our secure ERP portal.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="bg-blue-50 p-4 rounded-md text-sm text-blue-800">
                                    <strong>Note:</strong> You will be redirected to the secure bank/ERP login page.
                                    Please keep your Admission Number handy.
                                </div>
                                <Button asChild size="lg" className="w-full bg-navy hover:bg-gold hover:text-navy font-bold text-lg h-14 shadow-md transition-all">
                                    {/* PLACEHOLDER LINK - USER WILL UPDATE */}
                                    <a href="#" target="_blank" rel="noopener noreferrer">
                                        Proceed to Pay Fees <ExternalLink className="ml-2 w-5 h-5" />
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="order-1 md:order-2 space-y-4"
                    >
                        <h3 className="text-2xl font-bold font-display text-navy">Why Pay Online?</h3>
                        <ul className="space-y-3">
                            {["Instant Receipt Generation", "Secure & Encrypted Transaction", "Avoid Queue at School Counter", "24/7 Availability"].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-700 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                                    <div className="h-2 w-2 rounded-full bg-gold" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* Fee Table */}
                <Card className="overflow-hidden shadow-xl border-t-4 border-t-navy">
                    <CardHeader className="bg-gray-50 border-b">
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle>Academic Session 2026-27</CardTitle>
                                <CardDescription>Consolidated fee structure per annum.</CardDescription>
                            </div>
                            <Button size="sm" className="bg-gold hover:bg-gold/90 text-navy font-bold">
                                <Download className="w-4 h-4 mr-2" /> Download PDF
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-100/50">
                                    <TableHead className="font-bold text-navy w-[40%]">Class / Grade</TableHead>
                                    <TableHead className="font-bold text-navy text-right">Admission Fee</TableHead>
                                    <TableHead className="font-bold text-navy text-right">Tuition Fee</TableHead>
                                    <TableHead className="font-bold text-navy text-right text-lg">Total (Annual)</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {feeStructure.map((row, index) => (
                                    <TableRow key={index} className="hover:bg-gray-50 transition-colors">
                                        <TableCell className="font-medium text-gray-700">{row.class}</TableCell>
                                        <TableCell className="text-right text-muted-foreground">₹{row.admission}</TableCell>
                                        <TableCell className="text-right text-muted-foreground">₹{row.tuition}</TableCell>
                                        <TableCell className="text-right font-bold text-navy text-lg">₹{row.total}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div className="p-4 bg-yellow-50 text-xs text-yellow-800 border-t border-yellow-100">
                            * The above fees are subject to change. Transport & Exam fees are charged separately as per usage.
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}
