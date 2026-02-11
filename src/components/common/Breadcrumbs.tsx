"use client";

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
    name: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav className="bg-white border-b border-gray-200" aria-label="Breadcrumb">
            <div className="container mx-auto px-4 py-3">
                <ol className="flex items-center space-x-2 text-sm">
                    <li>
                        <Link href="/" className="text-gray-500 hover:text-navy transition-colors">
                            Home
                        </Link>
                    </li>
                    {items.map((item, index) => (
                        <li key={index} className="flex items-center space-x-2">
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                            {index === items.length - 1 || !item.href ? (
                                <span className="text-navy font-medium">{item.name}</span>
                            ) : (
                                <Link href={item.href} className="text-gray-500 hover:text-navy transition-colors">
                                    {item.name}
                                </Link>
                            )}
                        </li>
                    ))}
                </ol>
            </div>
        </nav>
    );
}
