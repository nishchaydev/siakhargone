import { notFound } from 'next/navigation';
import { bookListsData } from '@/data/bookLists';
import PageBanner from '@/components/common/PageBanner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { ArrowLeft, BookOpen, PenTool } from 'lucide-react';

interface Props {
    params: {
        classId: string;
    };
}

export default function BookListPage({ params }: Props) {
    const data = bookListsData[params.classId];

    if (!data) {
        notFound();
    }

    return (
        <div className="bg-grain min-h-screen pb-12">
            <PageBanner
                title={`Book List - ${data.className}`}
                subtitle={`Academic Session ${data.academicYear}`}
                image="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2073&auto=format&fit=crop"
            />
            
            <div className="container mx-auto px-4 py-8 max-w-5xl">
                <div className="mb-6">
                    <Button variant="outline" asChild className="gap-2 btn-magnetic bg-white text-navy hover:bg-navy hover:text-white transition-colors border-navy/20">
                        <Link href="/downloads">
                            <ArrowLeft size={16} />
                            Back to Downloads
                        </Link>
                    </Button>
                </div>

                <div className="space-y-8">
                    {/* Books Table */}
                    <Card className="card-premium overflow-hidden">
                        <CardHeader className="bg-navy text-white pb-4">
                            <CardTitle className="text-2xl font-display flex items-center gap-2">
                                <BookOpen size={24} className="text-gold" />
                                Textbooks
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-gray-50/50">
                                            <TableHead className="w-16 text-center font-bold">S.N.</TableHead>
                                            <TableHead className="font-bold">Subject</TableHead>
                                            <TableHead className="font-bold">Publisher's</TableHead>
                                            <TableHead className="font-bold">Book Title</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {data.books.map((book) => (
                                            <TableRow key={book.sn}>
                                                <TableCell className="text-center font-medium">{book.sn}</TableCell>
                                                <TableCell>{book.subject}</TableCell>
                                                <TableCell>{book.publisher}</TableCell>
                                                <TableCell>{book.bookTitle}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Notebooks Table */}
                    <Card className="card-premium overflow-hidden mt-8">
                        <CardHeader className="bg-gray-100 text-navy pb-4 border-b border-gray-200">
                            <CardTitle className="text-2xl font-display flex items-center gap-2">
                                <PenTool size={24} className="text-navy/70" />
                                Note Books
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-gray-50/50">
                                            <TableHead className="w-16 text-center font-bold">S.N.</TableHead>
                                            <TableHead className="font-bold">Line Type</TableHead>
                                            <TableHead className="font-bold">Size / Pages</TableHead>
                                            <TableHead className="font-bold text-center">Quantity</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {data.notebooks.map((nb) => (
                                            <TableRow key={nb.sn}>
                                                <TableCell className="text-center font-medium">{nb.sn}</TableCell>
                                                <TableCell>{nb.type}</TableCell>
                                                <TableCell>{nb.details}</TableCell>
                                                <TableCell className="text-center">{nb.qty}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
