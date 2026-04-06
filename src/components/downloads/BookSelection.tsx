"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Book } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function BookSelection() {
    const [selectedClass, setSelectedClass] = useState<string>("");
    const router = useRouter();

    const handleViewBooks = () => {
        if (selectedClass) {
            router.push(`/downloads/books/${selectedClass}`);
        }
    };

    return (
        <Card className="mb-12 card-premium group">
            <CardHeader className="pb-4 bg-navy text-white">
                <CardTitle className="text-2xl font-display flex items-center gap-2">
                    <Book size={24} className="text-gold" />
                    Prescribed Book Lists (2026-27)
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-end gap-4 max-w-2xl">
                    <div className="flex-1 w-full space-y-2">
                        <label className="text-sm font-medium text-navy">Select Class</label>
                        <Select onValueChange={setSelectedClass} value={selectedClass}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="-- Select a Class --" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="6th">Class - 6th</SelectItem>
                                <SelectItem value="7th">Class - 7th</SelectItem>
                                <SelectItem value="8th">Class - 8th</SelectItem>
                                <SelectItem value="10th">Class - 10th</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button 
                        onClick={handleViewBooks} 
                        disabled={!selectedClass}
                        className="w-full sm:w-auto bg-gold text-navy font-bold hover:bg-gold/80 btn-magnetic transition-all disabled:opacity-50"
                    >
                        View Book List
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
