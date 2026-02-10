import type { Metadata } from 'next';
import { Section } from '@/components/common/Section';
import PageBanner from '@/components/common/PageBanner';
import { Bus, MapPin, Clock, Shield } from 'lucide-react';
import { schoolData } from '@/data/schoolData';
import Schema from '@/components/seo/Schema';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata: Metadata = {
    title: 'School Bus Routes & Transportation | SIA Khargone',
    description: 'GPS-enabled school bus routes covering Khargone, Badgaon, Sanawad, Kasrawad and 12+ areas. Safe transport for students with female attendants.',
    keywords: ['school bus khargone', 'SIA transport', 'GPS bus tracking', 'school transportation'],
    alternates: {
        canonical: 'https://siakhargone.in/transportation',
    },
};

const busRoutes = [
    { area: "Khargone City Center", stops: ["Main Market", "Civil Lines", "Station Road"] },
    { area: "Badgaon", stops: ["Badgaon Chowk", "Gowadi Fata", "Khandwa Road"] },
    { area: "Sanawad", stops: ["Sanawad Bus Stand", "Sanawad Market", "Highway Junction"] },
    { area: "Kasrawad", stops: ["Kasrawad Chowk", "Kasrawad School Area"] },
    { area: "Barwaha", stops: ["Barwaha Main Road", "Barwaha Market"] },
    { area: "Mandleshwar", stops: ["Mandleshwar Bus Stand", "Narmada Road"] },
    { area: "Segaon", stops: ["Segaon Chowk", "Village Road"] },
    { area: "Gogawan", stops: ["Gogawan Main Road"] },
    { area: "Jhirnya", stops: ["Jhirnya Village", "Highway Stop"] },
    { area: "Bhikangaon", stops: ["Bhikangaon Market"] },
];

const faqs = [
    {
        question: "Does SIA provide school bus transportation?",
        answer: "Yes, we have a fleet of GPS-enabled buses covering 15+ routes across Khargone district including Sanawad, Barwaha, Mandleshwar, Kasrawad, and nearby areas."
    },
    {
        question: "Are the school buses GPS-enabled?",
        answer: "Yes, all our buses are equipped with GPS tracking systems. Parents can track the bus location in real-time for added safety and peace of mind."
    },
    {
        question: "What safety measures are in place for bus transport?",
        answer: "We have female attendants for younger children, CCTV cameras in all buses, trained drivers, first-aid kits, and strict adherence to safety protocols."
    },
    {
        question: "What are the bus timings?",
        answer: "Buses start pickup from 6:30 AM onwards depending on the route. Drop timings vary based on school dismissal time. Exact timings are shared with parents during admission."
    },
    {
        question: "Is transportation fee included in school fees?",
        answer: "Transportation is an optional facility with separate charges based on the distance from school. Please contact our office for route-specific fee details."
    }
];

export default function TransportationPage() {
    return (
        <div className="min-h-screen bg-grain">
            <Schema type="FAQ" data={faqs} />

            <PageBanner
                title="Safe & Reliable Transportation"
                subtitle="GPS-enabled buses covering 15+ routes across Khargone"
                image="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069"
            />

            <Section id="transport-features" bgColor="bg-white">
                <h2 className="text-3xl font-display font-bold text-navy text-center mb-12">
                    Why Our Transportation Stands Out
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="text-center">
                        <div className="bg-royal-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Shield className="h-8 w-8 text-royal-blue" />
                        </div>
                        <h3 className="font-bold text-navy mb-2">GPS Tracking</h3>
                        <p className="text-muted-foreground text-sm">
                            Real-time bus location tracking for parent peace of mind
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="bg-royal-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Bus className="h-8 w-8 text-royal-blue" />
                        </div>
                        <h3 className="font-bold text-navy mb-2">Modern Fleet</h3>
                        <p className="text-muted-foreground text-sm">
                            Well-maintained buses with comfortable seating
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="bg-royal-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Clock className="h-8 w-8 text-royal-blue" />
                        </div>
                        <h3 className="font-bold text-navy mb-2">Punctual Service</h3>
                        <p className="text-muted-foreground text-sm">
                            Timely pickup and drop with fixed schedules
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="bg-royal-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MapPin className="h-8 w-8 text-royal-blue" />
                        </div>
                        <h3 className="font-bold text-navy mb-2">Wide Coverage</h3>
                        <p className="text-muted-foreground text-sm">
                            15+ routes covering entire Khargone district
                        </p>
                    </div>
                </div>
            </Section>

            <Section id="routes" bgColor="bg-light-grey">
                <h2 className="text-3xl font-display font-bold text-navy text-center mb-12">
                    Our Bus Routes
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {busRoutes.map((route, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-gold">
                            <div className="flex items-start gap-3 mb-3">
                                <MapPin className="h-5 w-5 text-royal-blue mt-1 flex-shrink-0" />
                                <h3 className="font-bold text-navy text-lg">{route.area}</h3>
                            </div>
                            <ul className="space-y-2 ml-8">
                                {route.stops.map((stop, stopIdx) => (
                                    <li key={stopIdx} className="text-muted-foreground text-sm flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-gold rounded-full"></span>
                                        {stop}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <p className="text-center text-muted-foreground mt-8 max-w-2xl mx-auto">
                    Don't see your area? Contact us at <a href={`tel:${schoolData.contact.phone[0]}`} className="text-royal-blue font-semibold hover:underline">{schoolData.contact.phone[0]}</a> to check if we can add a stop near you.
                </p>
            </Section>

            <Section id="safety" bgColor="bg-white">
                <h2 className="text-3xl font-display font-bold text-navy text-center mb-12">
                    Safety First
                </h2>
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-navy">Safety Features</h3>
                        <ul className="space-y-3">
                            {[
                                "Female attendants for younger students",
                                "CCTV cameras in all buses",
                                "Trained and verified drivers",
                                "First-aid kits in every bus",
                                "Regular vehicle maintenance",
                                "Speed governors installed"
                            ].map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <Shield className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-muted-foreground">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-xl">
                        <h3 className="text-xl font-bold text-navy mb-4">Parent App Features</h3>
                        <p className="text-muted-foreground mb-4">
                            Track your child's bus in real-time with our parent app:
                        </p>
                        <ul className="space-y-2 text-muted-foreground">
                            <li>• Live GPS location</li>
                            <li>• Estimated arrival time</li>
                            <li>• Pickup/drop notifications</li>
                            <li>• Driver contact details</li>
                            <li>• Route information</li>
                        </ul>
                    </div>
                </div>
            </Section>

            <Section id="faq" bgColor="bg-light-grey">
                <h2 className="text-3xl font-display font-bold text-navy text-center mb-12">
                    Transportation FAQs
                </h2>
                <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <AccordionItem
                                key={idx}
                                value={`item-${idx}`}
                                className="border rounded-lg px-4 bg-white"
                            >
                                <AccordionTrigger className="text-left font-bold text-navy hover:text-gold-dark">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </Section>
        </div>
    );
}
