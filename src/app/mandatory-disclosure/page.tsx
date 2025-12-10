
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from 'lucide-react';
import { mandatoryDisclosure, pdfLinks } from '@/lib/pdf-links';
import Link from 'next/link';

export const metadata = {
    title: 'Mandatory Disclosure | Sanskar International Academy',
    description: 'Mandatory disclosure documents and certificates.',
};

export default function MandatoryDisclosurePage() {
    const documents = [
        { name: "Affiliation Certificate", link: pdfLinks.highSchoolAffiliation?.preview },
        { name: "Building Safety Certificate", link: pdfLinks.buildingSafety?.preview },
        { name: "Fire Safety Certificate", link: pdfLinks.fireSafety?.preview },
        { name: "Land Certificate", link: pdfLinks.landCertificate?.preview },
        { name: "Recognition Certificate (Middle School)", link: pdfLinks.middleManyata2022_25?.preview },
        { name: "Water, Health & Sanitation Certificate", link: pdfLinks.waterSafety?.preview },
        { name: "No Objection Certificate (NOC)", status: mandatoryDisclosure.placeholders.nocCertificate },
        { name: "Society Registration", status: mandatoryDisclosure.placeholders.societyRegistration },
        { name: "Staff List", status: mandatoryDisclosure.placeholders.staffList },
        { name: "PTA Members List", status: mandatoryDisclosure.placeholders.ptaList },
        { name: "Student Strength", status: mandatoryDisclosure.placeholders.studentStrength },
    ];

    return (
        <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Card>
                    <CardHeader className="text-center border-b bg-navy text-white rounded-t-xl">
                        <CardTitle className="text-2xl md:text-3xl font-bold font-headline">Mandatory Disclosure</CardTitle>
                        <p className="text-gray-200 mt-2">Official documents and certificates of Sanskar International Academy</p>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-100/50">
                                    <tr>
                                        <th className="p-4 md:p-6 font-semibold text-navy w-2/3">Document Name</th>
                                        <th className="p-4 md:p-6 font-semibold text-navy w-1/3 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {documents.map((doc, index) => (
                                        <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="p-4 md:p-6 font-medium text-gray-700">{doc.name}</td>
                                            <td className="p-4 md:p-6 text-right">
                                                {doc.link ? (
                                                    <Button asChild size="sm" variant="outline" className="gap-2 border-navy text-navy hover:bg-navy hover:text-white">
                                                        <a href={doc.link} target="_blank" rel="noopener noreferrer">
                                                            <Download className="h-4 w-4" />
                                                            View PDF
                                                        </a>
                                                    </Button>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                                                        Coming Soon
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
