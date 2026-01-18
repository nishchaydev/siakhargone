"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ExternalLink, CreditCard, Download, Search, Bus, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { tuitionFees, busFees, oneTimeFees } from "@/data/fees";
import { FeeCalculator } from "@/components/fees/FeeCalculator";

export default function FeesPage() {
    const [busSearch, setBusSearch] = useState("");

    const filteredBusFees = busFees.filter(fee =>
        fee.village.toLowerCase().includes(busSearch.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-grain pt-24 pb-12 px-4">
            <div className="container mx-auto max-w-6xl space-y-12">

                {/* Header Section */}
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-navy">Fee Structure & Payments</h1>
                    <p className="text-lg text-muted-foreground">
                        Transparent and affordable education. View our current session fees and pay securely online via our ERP portal.
                    </p>
                </div>

                {/* Fee Calculator Section - Prominently Displayed */}
                <div className="mb-20 max-w-4xl mx-auto">
                    <FeeCalculator />
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

                {/* Fees Tabs */}
                <Card className="overflow-hidden shadow-xl border-t-4 border-t-navy">
                    <CardHeader className="bg-gray-50 border-b pb-0">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
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
                        <Tabs defaultValue="tuition" className="w-full">
                            <div className="bg-gray-50 px-6 border-b">
                                <TabsList className="grid w-full max-w-md grid-cols-2">
                                    <TabsTrigger value="tuition" className="data-[state=active]:bg-white data-[state=active]:text-navy data-[state=active]:shadow-sm">
                                        <GraduationCap className="w-4 h-4 mr-2" /> Tuition Fees
                                    </TabsTrigger>
                                    <TabsTrigger value="bus" className="data-[state=active]:bg-white data-[state=active]:text-navy data-[state=active]:shadow-sm">
                                        <Bus className="w-4 h-4 mr-2" /> Bus Fees
                                    </TabsTrigger>
                                </TabsList>
                            </div>

                            <TabsContent value="tuition" className="m-0 focus-visible:ring-0">
                                <div className="p-6 bg-blue-50/50 border-b space-y-2">
                                    <div className="flex flex-wrap gap-6 text-sm">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-navy">Registration Fees:</span>
                                            <span className="font-mono bg-white px-2 py-0.5 rounded border">₹{oneTimeFees.registration}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-navy">Admission Fees:</span>
                                            <span className="font-mono bg-white px-2 py-0.5 rounded border">₹{oneTimeFees.admission}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-navy">Total One-time:</span>
                                            <span className="font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200">₹{oneTimeFees.total}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="bg-gray-100/50">
                                                <TableHead className="font-bold text-navy w-24">S.N.</TableHead>
                                                <TableHead className="font-bold text-navy w-32">Class</TableHead>
                                                <TableHead className="font-bold text-navy text-right">I Inst. (Apr-Jun)</TableHead>
                                                <TableHead className="font-bold text-navy text-right">II Inst. (Jul-Sep)</TableHead>
                                                <TableHead className="font-bold text-navy text-right">III Inst. (Oct-Dec)</TableHead>
                                                <TableHead className="font-bold text-navy text-right">IV Inst. (Jan-Mar)</TableHead>
                                                <TableHead className="font-bold text-navy text-right bg-gray-50">Total</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {tuitionFees.map((fee) => (
                                                <TableRow key={fee.id} className="hover:bg-gray-50 transition-colors">
                                                    <TableCell className="text-gray-500 font-medium">{fee.id}</TableCell>
                                                    <TableCell className="font-bold text-navy">{fee.class}</TableCell>
                                                    <TableCell className="text-right text-muted-foreground">{fee.installments.apr_june}</TableCell>
                                                    <TableCell className="text-right text-muted-foreground">{fee.installments.july_sept}</TableCell>
                                                    <TableCell className="text-right text-muted-foreground">{fee.installments.oct_dec}</TableCell>
                                                    <TableCell className="text-right text-muted-foreground">{fee.installments.jan_mar}</TableCell>
                                                    <TableCell className="text-right font-bold text-navy bg-gray-50/50">
                                                        ₹{fee.total.toLocaleString("en-IN")}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </TabsContent>

                            <TabsContent value="bus" className="m-0 focus-visible:ring-0">
                                <div className="p-4 border-b bg-gray-50 flex items-center gap-3">
                                    <Search className="w-5 h-5 text-gray-400" />
                                    <Input
                                        placeholder="Search village name..."
                                        className="max-w-sm bg-white"
                                        value={busSearch}
                                        onChange={(e) => setBusSearch(e.target.value)}
                                    />
                                </div>

                                <div className="overflow-x-auto h-[600px] overflow-y-auto">
                                    <Table>
                                        <TableHeader className="sticky top-0 bg-white z-10 shadow-sm">
                                            <TableRow className="bg-gray-100/50 hover:bg-gray-100/50">
                                                <TableHead className="font-bold text-navy w-24">S.N.</TableHead>
                                                <TableHead className="font-bold text-navy w-48">Village Name</TableHead>
                                                <TableHead className="font-bold text-navy text-right">I Inst. (Apr-Jun)</TableHead>
                                                <TableHead className="font-bold text-navy text-right">II Inst. (Jul-Sep)</TableHead>
                                                <TableHead className="font-bold text-navy text-right">III Inst. (Oct-Dec)</TableHead>
                                                <TableHead className="font-bold text-navy text-right">IV Inst. (Jan-Mar)</TableHead>
                                                <TableHead className="font-bold text-navy text-right bg-gray-50">Total</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredBusFees.length > 0 ? (
                                                filteredBusFees.map((fee) => (
                                                    <TableRow key={fee.id} className="hover:bg-gray-50 transition-colors">
                                                        <TableCell className="text-gray-500 font-medium">{fee.id}</TableCell>
                                                        <TableCell className="font-bold text-navy">{fee.village}</TableCell>
                                                        <TableCell className="text-right text-muted-foreground">{fee.installments.apr_june}</TableCell>
                                                        <TableCell className="text-right text-muted-foreground">{fee.installments.july_sept}</TableCell>
                                                        <TableCell className="text-right text-muted-foreground">{fee.installments.oct_dec}</TableCell>
                                                        <TableCell className="text-right text-muted-foreground">{fee.installments.jan_mar}</TableCell>
                                                        <TableCell className="text-right font-bold text-navy bg-gray-50/50">
                                                            ₹{fee.total.toLocaleString("en-IN")}
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                                        No village found matching "{busSearch}"
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </TabsContent>
                        </Tabs>

                        <div className="p-4 bg-yellow-50 text-xs text-yellow-800 border-t border-yellow-100">
                            * The above fees are subject to change. Transport & Exam fees are charged separately as per usage.
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}
