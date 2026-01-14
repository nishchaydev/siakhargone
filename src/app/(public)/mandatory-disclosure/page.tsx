
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Eye, FileText } from 'lucide-react';
import { mandatoryDisclosure, pdfLinks } from '@/lib/pdf-links';
import Link from 'next/link';

export const metadata = {
    title: 'Mandatory Disclosure | Sanskar International Academy',
    description: 'Mandatory disclosure documents and certificates.',
};

type DocumentItem = {
    name: string;
    links?: {
        preview: string;
        download: string;
    };
    status?: string;
};

type DocumentGroup = {
    title: string;
    items: DocumentItem[];
};

export default function MandatoryDisclosurePage() {
    const groupedDocuments: DocumentGroup[] = [
        {
            title: "Affiliation & Recognition",
            items: [
                { name: "CBSE Affiliation Letter (2023–28)", links: pdfLinks.cbseAffiliation },
                { name: "No Objection Certificate (NOC)", links: pdfLinks.nocCertificate },
                { name: "Recognition Certificate (Middle School)", links: pdfLinks.middleManyata2022_25 },
                { name: "High School Affiliation", links: pdfLinks.highSchoolAffiliation },
            ]
        },
        {
            title: "Safety Certificates",
            items: [
                { name: "Building Safety Certificate", links: pdfLinks.buildingSafety },
                { name: "Fire Safety Certificate", links: pdfLinks.fireSafety },
                { name: "Water, Health & Sanitation Certificate", links: pdfLinks.waterSafety },
            ]
        },
        {
            title: "Land & Building",
            items: [
                { name: "Land Certificate", links: pdfLinks.landCertificate },
            ]
        },
        {
            title: "Trust & Society",
            items: [
                { name: "Society Registration Certificate", links: pdfLinks.societyRegistration },
            ]
        },
        {
            title: "School Management",
            items: [
                { name: "PTA / Managing Committee List", links: pdfLinks.ptaList },
            ]
        },
        {
            title: "General Information",
            items: [
                { name: "Staff List", status: mandatoryDisclosure.placeholders.staffList },
                { name: "Student Strength", status: mandatoryDisclosure.placeholders.studentStrength },
            ]
        }
    ];

    return (
        <main className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold font-headline text-navy">Mandatory Disclosure</h1>
                    <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                        Official documents and certificates of Sanskar International Academy, in compliance with CBSE and state regulations.
                    </p>
                </div>

                {groupedDocuments.map((group, groupIndex) => (
                    <Card key={groupIndex} className="overflow-hidden border-0 shadow-md">
                        <CardHeader className="bg-navy/5 border-b border-navy/10 py-4 px-6">
                            <CardTitle className="text-lg md:text-xl font-bold text-navy flex items-center gap-2">
                                <FileText className="h-5 w-5 text-gold" />
                                {group.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <tbody className="divide-y divide-gray-100">
                                        {group.items.map((doc, docIndex) => (
                                            <tr key={docIndex} className="hover:bg-gray-50 transition-colors group">
                                                <td className="p-4 md:p-5 font-medium text-gray-700 w-2/3 md:w-1/2">
                                                    {doc.name}
                                                </td>
                                                <td className="p-4 md:p-5 text-right w-1/3 md:w-1/2">
                                                    <div className="flex flex-col sm:flex-row justify-end gap-2">
                                                        {doc.links ? (
                                                            <>
                                                                <Button asChild size="sm" className="h-9 gap-1.5 border-0 bg-gold hover:bg-gold/90 text-navy font-bold">
                                                                    <a href={doc.links.preview} target="_blank" rel="noopener noreferrer">
                                                                        <Eye className="h-3.5 w-3.5" />
                                                                        <span className="hidden sm:inline">View</span>
                                                                    </a>
                                                                </Button>
                                                                <Button asChild size="sm" className="h-9 gap-1.5 bg-navy hover:bg-navy-dark text-white">
                                                                    <a href={doc.links.download} target="_blank" rel="noopener noreferrer">
                                                                        <Download className="h-3.5 w-3.5" />
                                                                        <span className="hidden sm:inline">Download</span>
                                                                    </a>
                                                                </Button>
                                                            </>
                                                        ) : (
                                                            <span className="inline-flex self-center sm:self-auto items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500 border border-gray-200">
                                                                Coming Soon
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </main>
    );
}
