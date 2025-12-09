
import { fetchStrapi, getStrapiMedia } from "@/lib/strapi";
import { FileText, Download } from "lucide-react";
import { Section } from "@/components/common/Section";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export const metadata = {
    title: "School Managing Committee",
    description: "View our Managing Committee members and documents.",
};

export default async function CommitteePage() {
    const committeeRes = await fetchStrapi("school-managing-committees", "populate=deep,10");
    const committees = committeeRes?.data || [];

    return (
        <div className="min-h-screen bg-grain pt-[70px]">
            <Section id="committee" title="School Managing Committee" subtitle="Governance and Leadership">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {committees.length === 0 ? (
                        <p className="text-center col-span-full text-muted-foreground">No committee documents available.</p>
                    ) : (
                        committees.map((item: any) => {
                            const fileUrl = getStrapiMedia(item.attributes.document?.data?.attributes?.url);
                            return (
                                <Card key={item.id} className="card-premium hover:shadow-lg transition-shadow">
                                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                        <div className="bg-primary/10 p-3 rounded-lg">
                                            <FileText className="h-6 w-6 text-primary" />
                                        </div>
                                        <CardTitle className="text-lg">{item.attributes.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Button asChild className="w-full gap-2" variant="outline">
                                            <a href={fileUrl || "#"} target="_blank" rel="noopener noreferrer" download>
                                                <Download className="h-4 w-4" /> Download Document
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
