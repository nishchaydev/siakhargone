"use client";

import { Section } from "@/components/common/Section";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import { faqs } from "@/lib/static-data";

export function HomeFAQ() {
    // faqs imported from static-data

    return (
        <Section title="Frequently Asked Questions" subtitle="Common queries about CBSE education in Khargone" className="bg-white">
            <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left font-display font-semibold text-navy hover:text-gold transition-colors text-lg">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </Section>
    );
}
