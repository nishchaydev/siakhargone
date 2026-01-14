"use client";

import { useState } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MotionDiv } from '@/components/common/Motion';
import { User2, BadgeCheck } from "lucide-react";

interface FacultyMember {
    name: string;
    role: string;
    qualification: string;
    experience?: string;
    image?: string;
}

interface Department {
    id: string;
    label: string;
    head: FacultyMember;
    members: FacultyMember[];
}

const departments: Department[] = [
    {
        id: "science",
        label: "Science",
        head: { name: "Mr. R.K. Sharma", role: "HOD Science (Physics)", qualification: "M.Sc. Physics, B.Ed", experience: "15 Years" },
        members: [
            { name: "Mrs. Anjali Gupta", role: "Chemistry PGT", qualification: "M.Sc. Chemistry" },
            { name: "Mr. Vimal Verma", role: "Biology PGT", qualification: "M.Sc. Biotech" },
            { name: "Ms. Priya Singh", role: "Science TGT", qualification: "B.Sc., B.Ed" },
        ]
    },
    {
        id: "maths",
        label: "Mathematics",
        head: { name: "Mrs. S. Iyer", role: "HOD Mathematics", qualification: "M.Sc. Maths, M.Ed", experience: "12 Years" },
        members: [
            { name: "Mr. Amit Patel", role: "Maths PGT", qualification: "M.Sc. Maths" },
            { name: "Mrs. Ritu Jain", role: "Maths TGT", qualification: "B.Sc., B.Ed" },
        ]
    },
    {
        id: "humanities",
        label: "Humanities / English",
        head: { name: "Dr. A.K. Mishra", role: "HOD English", qualification: "Ph.D. English Lit.", experience: "20 Years" },
        members: [
            { name: "Mrs. Kavita Roy", role: "History PGT", qualification: "M.A. History" },
            { name: "Mr. Suresh Yadav", role: "Hindi PGT", qualification: "M.A. Hindi" },
        ]
    },
    {
        id: "primary",
        label: "Primary Wing",
        head: { name: "Mrs. Neeta Kapoor", role: "Headmistress - Primary", qualification: "M.A. Psych, B.Ed", experience: "18 Years" },
        members: [
            { name: "Mrs. Sunita Rao", role: "Primary Coordinator", qualification: "B.A., B.Ed" },
            { name: "Ms. Daisy Thomas", role: "PRT - English", qualification: "B.A. English" },
            { name: "Mrs. Pooja Sharma", role: "PRT - EVS", qualification: "B.Sc., B.Ed" },
        ]
    },
];

export function FacultyList() {
    return (
        <div className="w-full">
            <Tabs defaultValue="science" className="w-full flex flex-col items-center">
                <TabsList className="flex flex-wrap justify-center h-auto p-2 bg-navy/5 gap-2 mb-8 rounded-xl w-full max-w-4xl">
                    {departments.map((dept) => (
                        <TabsTrigger
                            key={dept.id}
                            value={dept.id}
                            className="data-[state=active]:bg-navy data-[state=active]:text-white py-2 px-6 rounded-lg text-sm font-medium transition-all"
                        >
                            {dept.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {departments.map((dept) => (
                    <TabsContent key={dept.id} value={dept.id} className="w-full max-w-5xl">
                        <MotionDiv
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="space-y-8"
                        >
                            {/* HOD Card */}
                            <div className="flex justify-center">
                                <Card className="w-full max-w-2xl border-t-4 border-t-gold shadow-lg bg-gradient-to-br from-white to-orange-50/30">
                                    <CardHeader className="text-center pb-2">
                                        <div className="mx-auto w-24 h-24 rounded-full bg-navy/10 flex items-center justify-center mb-3">
                                            <User2 size={40} className="text-navy" />
                                        </div>
                                        <BadgeCheck className="w-6 h-6 text-gold mx-auto mb-1" />
                                        <CardTitle className="text-2xl text-navy">{dept.head.name}</CardTitle>
                                        <CardDescription className="text-lg font-medium text-primary">{dept.head.role}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="text-center text-sm text-muted-foreground space-y-1">
                                        <p className="font-semibold text-gray-700">{dept.head.qualification}</p>
                                        <p>Teaching Experience: {dept.head.experience}</p>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Team Grid */}
                            <div>
                                <h3 className="text-xl font-bold text-navy mb-6 text-center">Department Members</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                    {dept.members.map((member, i) => (
                                        <Card key={i} className="hover:shadow-md transition-shadow">
                                            <CardHeader className="flex flex-row items-center gap-4 py-4 px-6">
                                                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                                                    <User2 size={20} className="text-gray-500" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <CardTitle className="text-base text-navy">{member.name}</CardTitle>
                                                    <CardDescription className="text-xs text-primary">{member.role}</CardDescription>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="px-6 pb-4 pt-0">
                                                <p className="text-xs text-muted-foreground ml-[64px]">{member.qualification}</p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </MotionDiv>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}
