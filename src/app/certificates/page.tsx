

import { loadCertificates } from "@/lib/content";
import { Award, Eye } from "lucide-react";
import { Section } from "@/components/common/Section";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata = {
    title: "Certificates",
    description: "View our school's recognitions and affiliations.",
};

export default async function CertificatesPage() {
    const certificates = loadCertificates();

    return (
        <div className="min-h-screen bg-grain pt-[70px]">
            <Section id="certificates" title="Certificates & Affiliations" subtitle="Our commitment to quality standards">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certificates.length === 0 ? (
                        <p className="text-center col-span-full text-muted-foreground">No certificates uploaded yet.</p>
                    ) : (
                        certificates.map((cert: any, index: number) => {
                            const fileUrl = cert.file;
                            return (
                                <Card key={index} className="card-premium hover:shadow-lg transition-shadow">
                                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                        <div className="bg-primary/10 p-3 rounded-lg">
                                            <Award className="h-6 w-6 text-primary" />
                                        </div>
                                        <CardTitle className="text-lg">{cert.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Button asChild className="w-full gap-2">
                                            <a href={fileUrl || "#"} target="_blank" rel="noopener noreferrer">
                                                <Eye className="h-4 w-4" /> View Certificate
                                            </a>
                                        </Button>
                                    </CardContent>
                                </Card>
                            );
                        })
                    )}
                </div>
            </Section>
        </div>
    );
}
