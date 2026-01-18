"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { tuitionFees, busFees, oneTimeFees } from "@/data/fees";
import { Calculator, Bus, RefreshCw, IndianRupee } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FeeCalculator() {
    const [selectedClass, setSelectedClass] = useState<string>("");
    const [selectedBusRoute, setSelectedBusRoute] = useState<string>("none");
    const [isNewStudent, setIsNewStudent] = useState<boolean>(true);

    const calculation = useMemo(() => {
        if (!selectedClass) return null;

        const tuition = tuitionFees.find(t => t.class === selectedClass);
        if (!tuition) return null;

        const bus = selectedBusRoute !== "none" ? busFees.find(b => b.village === selectedBusRoute) : null;
        const busTotal = bus ? bus.total : 0;

        const oneTime = isNewStudent ? (oneTimeFees.registration + oneTimeFees.admission) : 0;

        const totalAnnual = tuition.total + busTotal + oneTime;

        // Installment Breakdown
        const installments = {
            apr_june: tuition.installments.apr_june + (bus ? bus.installments.apr_june : 0) + oneTime, // One-time usually paid in 1st installment
            july_sept: tuition.installments.july_sept + (bus ? bus.installments.july_sept : 0),
            oct_dec: tuition.installments.oct_dec + (bus ? bus.installments.oct_dec : 0),
            jan_mar: tuition.installments.jan_mar + (bus ? bus.installments.jan_mar : 0),
        };

        return {
            tuitionTotal: tuition.total,
            busTotal,
            oneTime,
            totalAnnual,
            installments
        };
    }, [selectedClass, selectedBusRoute, isNewStudent]);

    const reset = () => {
        setSelectedClass("");
        setSelectedBusRoute("none");
        setIsNewStudent(true);
    };

    return (
        <Card className="w-full shadow-xl border-t-4 border-t-gold overflow-hidden bg-white">
            <CardHeader className="bg-navy/5 pb-8">
                <div className="flex items-center gap-2 text-gold font-bold uppercase tracking-wider text-xs mb-1">
                    <Calculator className="w-4 h-4" />
                    Estimate Your Fees
                </div>
                <CardTitle className="text-2xl md:text-3xl font-display font-bold text-navy">Fee Calculator</CardTitle>
                <CardDescription>Select your class and optional transport route to get an instant fee estimate.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8 space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Controls */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="class-select" className="text-navy font-bold">Class</Label>
                            <Select value={selectedClass} onValueChange={setSelectedClass}>
                                <SelectTrigger id="class-select" className="h-12 bg-gray-50 border-gray-200">
                                    <SelectValue placeholder="Select Class" />
                                </SelectTrigger>
                                <SelectContent>
                                    {tuitionFees.map((t) => (
                                        <SelectItem key={t.id} value={t.class}>{t.class}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bus-select" className="text-navy font-bold flex items-center justify-between">
                                <span>Bus Route (Optional)</span>
                                <Bus className="w-4 h-4 text-gray-400" />
                            </Label>
                            <Select value={selectedBusRoute} onValueChange={setSelectedBusRoute}>
                                <SelectTrigger id="bus-select" className="h-12 bg-gray-50 border-gray-200">
                                    <SelectValue placeholder="No Transport Needed" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">No Transport Needed</SelectItem>
                                    {busFees.sort((a, b) => a.village.localeCompare(b.village)).map((b) => (
                                        <SelectItem key={b.id} value={b.village}>{b.village} (₹{b.total.toLocaleString()}/yr)</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg border border-gray-100 bg-gray-50/50">
                            <div className="space-y-0.5">
                                <Label className="text-base font-bold text-navy">New Admission?</Label>
                                <p className="text-sm text-gray-500">Include one-time admission fees</p>
                            </div>
                            <Switch checked={isNewStudent} onCheckedChange={setIsNewStudent} />
                        </div>

                        <Button variant="ghost" className="w-full text-gray-400 hover:text-navy" onClick={reset}>
                            <RefreshCw className="w-4 h-4 mr-2" /> Reset
                        </Button>
                    </div>

                    {/* Results */}
                    <div className="bg-navy/5 rounded-2xl p-6 md:p-8 border border-navy/10 relative overflow-hidden flex flex-col justify-center min-h-[300px]">
                        <AnimatePresence mode="wait">
                            {calculation ? (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="space-y-6 w-full"
                                >
                                    <div className="text-center pb-6 border-b border-navy/10">
                                        <span className="text-gray-500 text-sm uppercase tracking-widest font-bold">Total Annual Fee</span>
                                        <div className="text-4xl md:text-5xl font-bold text-navy mt-1 font-display flex items-center justify-center">
                                            <IndianRupee className="w-8 h-8 md:w-10 md:h-10 text-gold" />
                                            {calculation.totalAnnual.toLocaleString()}
                                        </div>
                                        {calculation.oneTime > 0 && (
                                            <span className="text-xs text-gold-dark font-medium mt-2 block bg-gold/10 py-1 px-3 rounded-full inline-block">
                                                Includes ₹{calculation.oneTime.toLocaleString()} Admission Fee
                                            </span>
                                        )}
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Tuition Fee</span>
                                            <span className="font-bold text-navy">₹{calculation.tuitionTotal.toLocaleString()}</span>
                                        </div>
                                        {calculation.busTotal > 0 && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Bus Fee</span>
                                                <span className="font-bold text-navy">₹{calculation.busTotal.toLocaleString()}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="pt-4 mt-2 border-t border-navy/10">
                                        <h4 className="text-xs font-bold uppercase text-gray-400 mb-3 block">Payment Schedule (Approx)</h4>
                                        <div className="grid grid-cols-2 gap-3 text-sm">
                                            <div className="bg-white p-3 rounded-lg border border-gray-100">
                                                <span className="text-gray-400 text-xs block mb-1">1st Inst (Apr-Jun)</span>
                                                <span className="font-bold text-navy block text-lg">₹{calculation.installments.apr_june.toLocaleString()}</span>
                                            </div>
                                            <div className="bg-white p-3 rounded-lg border border-gray-100">
                                                <span className="text-gray-400 text-xs block mb-1">2nd Inst (Jul-Sep)</span>
                                                <span className="font-bold text-navy block text-lg">₹{calculation.installments.july_sept.toLocaleString()}</span>
                                            </div>
                                            <div className="bg-white p-3 rounded-lg border border-gray-100">
                                                <span className="text-gray-400 text-xs block mb-1">3rd Inst (Oct-Dec)</span>
                                                <span className="font-bold text-navy block text-lg">₹{calculation.installments.oct_dec.toLocaleString()}</span>
                                            </div>
                                            <div className="bg-white p-3 rounded-lg border border-gray-100">
                                                <span className="text-gray-400 text-xs block mb-1">4th Inst (Jan-Mar)</span>
                                                <span className="font-bold text-navy block text-lg">₹{calculation.installments.jan_mar.toLocaleString()}</span>
                                            </div>
                                        </div>
                                        <p className="text-[10px] text-gray-400 mt-3 text-center">* Actual dates and amounts may vary slightly. Please contact office for exact details.</p>
                                    </div>

                                </motion.div>
                            ) : (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex flex-col items-center justify-center text-center h-full opacity-50"
                                >
                                    <Calculator className="w-16 h-16 text-navy mb-4" />
                                    <p className="text-lg font-medium text-navy">Select a class to calculate fees</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
