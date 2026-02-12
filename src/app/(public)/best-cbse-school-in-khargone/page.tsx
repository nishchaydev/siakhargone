import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Check, Star, Trophy, Users, BookOpen, Shield, ArrowRight, MapPin, Phone } from 'lucide-react';
import { cloudinary } from '@/lib/cloudinary-images';
import { schoolData } from '@/data/schoolData';

export const metadata: Metadata = {
    title: 'Best CBSE School in Khargone | Sanskar International Academy',
    description: 'Looking for the best CBSE school in Khargone? Sanskar International Academy (SIA) offers excellence in education, world-class infrastructure, and holistic development. Established 2004.',
    keywords: ['Best school in Khargone', 'Best CBSE school in Khargone', 'School in Khargone', 'SIA Khargone', 'Top CBSE Schools MP'],
    alternates: {
        canonical: 'https://siakhargone.in/best-cbse-school-in-khargone',
    }
};

export default function BestSchoolLandingPage() {
    return (
        <main className="min-h-screen bg-background">
            {/* SCHEMA MARKUP */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "School",
                        "name": "Sanskar International Academy (SIA)",
                        "url": "https://siakhargone.in",
                        "logo": "https://siakhargone.in/logo.png",
                        "image": cloudinary.infrastructure.building[0],
                        "description": "Sanskar International Academy is a leading CBSE school in Khargone, offering world-class education from Nursery to Class 12.",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "Gowadi Fata, Khargone - Khandwa Road",
                            "addressLocality": "Khargone",
                            "addressRegion": "Madhya Pradesh",
                            "postalCode": "451001",
                            "addressCountry": "IN"
                        },
                        "contactPoint": {
                            "@type": "ContactPoint",
                            "telephone": schoolData.contact.phone[0],
                            "contactType": "admissions"
                        },
                        "sameAs": [
                            schoolData.social.facebook,
                            schoolData.social.instagram,
                            schoolData.social.youtube
                        ]
                    })
                }}
            />

            {/* 1. HERO SECTION */}
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={cloudinary.infrastructure.building[0]}
                        alt="Best CBSE School in Khargone - Sanskar International Academy Campus"
                        fill
                        className="object-cover"
                        priority
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-transparent" />
                </div>

                <div className="container relative z-10 px-4 md:px-6">
                    <div className="max-w-3xl space-y-6 animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 backdrop-blur-md border border-gold/30 text-gold font-bold text-sm uppercase tracking-wider">
                            <Trophy className="w-4 h-4" />
                            <span>Established {schoolData.stats.established} • CBSE Affiliated</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight">
                            Best CBSE School in Khargone – <br />
                            <span className="text-gold">Sanskar International Academy</span>
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed">
                            Empowering students with academic excellence, holistic development,
                            and modern infrastructure. Join the premier educational institution in Khargone.
                        </p>
                        <ul className="flex flex-wrap gap-4 text-white/80 text-sm md:text-base">
                            <li className="flex items-center gap-2"><Check className="text-gold w-5 h-5" /> CBSE Affiliation No. {schoolData.affiliationNo}</li>
                            <li className="flex items-center gap-2"><Check className="text-gold w-5 h-5" /> {schoolData.stats.students} Students</li>
                            <li className="flex items-center gap-2"><Check className="text-gold w-5 h-5" /> {schoolData.stats.awardsWon} Awards</li>
                        </ul>
                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                            <Button asChild size="lg" className="bg-gold hover:bg-gold-dark text-navy font-bold text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-gold/20 transition-all">
                                <Link href="/admissions">Admissions Open 2026-27</Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-medium text-lg px-8 py-6 rounded-full">
                                <Link href="/contact">Enquire Now</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. WHY WE ARE CONSIDERED BEST */}
            <section className="py-20 bg-white">
                <div className="container px-4 md:px-6">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-navy">Why Parents in Khargone<br />Choose Us</h2>
                        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                            At Sanskar International Academy, we combine tradition with modernity to create an environment where excellence is a habit.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: BookOpen, title: "Academic Results", desc: "Consistently producing district toppers with a focus on deep conceptual understanding and competitive exam readiness." },
                            { icon: Users, title: "Faculty Quality", desc: "Diverse team of highly qualified, experienced educators dedicated to personalized mentorship." },
                            { icon: Trophy, title: "Co-curricular Excellence", desc: "Award-winning programs in sports, arts, and debate that foster confidence and leadership." },
                            { icon: Shield, title: "Infrastructure", desc: "State-of-the-art campus with smart labs, digital libraries, and extensive sports facilities." },
                            { icon: Star, title: "Student Leadership", desc: "Strong student council and house systems that build character and responsibility." },
                            { icon: Check, title: "Holistic Development", desc: "A balanced approach ensuring physical, emotional, and intellectual growth for every child." },
                        ].map((feature, idx) => (
                            <div key={idx} className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className="w-14 h-14 rounded-full bg-navy/10 flex items-center justify-center mb-6 text-navy">
                                    <feature.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold text-navy mb-3">{feature.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. BOARD RESULTS & ACADEMIC PERFORMANCE */}
            <section className="py-20 bg-navy text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <Image src={cloudinary.academics.banner} alt="Academic Excellence" fill className="object-cover" />
                </div>
                <div className="container relative z-10 px-4 md:px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="md:w-1/2 space-y-6">
                            <h2 className="text-3xl md:text-5xl font-display font-bold">Board Results & <br />Academic Performance</h2>
                            <p className="text-white/80 text-lg leading-relaxed">
                                Our students consistently outperform benchmarks in CBSE Board Exams. With a legacy of district toppers and 100% pass rates, SIA assures academic success.
                            </p>
                            <ul className="space-y-4 pt-2">
                                <li className="flex items-center gap-3 text-lg font-medium"><Check className="text-gold" /> 100% Pass Rate in Class 10th & 12th</li>
                                <li className="flex items-center gap-3 text-lg font-medium"><Check className="text-gold" /> District Toppers for last 3 years</li>
                                <li className="flex items-center gap-3 text-lg font-medium"><Check className="text-gold" /> High Distinction Rate in Science & Commerce</li>
                            </ul>
                            <div className="pt-6">
                                <Button asChild className="bg-white text-navy hover:bg-gold hover:text-navy font-bold rounded-full px-8 py-6 text-lg">
                                    <Link href="/results">View Detailed Results</Link>
                                </Button>
                            </div>
                        </div>
                        <div className="md:w-1/2 grid grid-cols-2 gap-4">
                            {[
                                { val: "100%", lbl: "Board Pass Rate" },
                                { val: "95%+", lbl: "Highest Score" },
                                { val: "50+", lbl: "Distinctions" },
                                { val: "Top 5", lbl: "District Ranks" }
                            ].map((stat, i) => (
                                <div key={i} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-center hover:bg-white/20 transition-colors">
                                    <div className="text-4xl font-bold text-gold mb-2">{stat.val}</div>
                                    <div className="text-sm font-medium text-white/90">{stat.lbl}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. FACILITIES & CAMPUS */}
            <section className="py-20 bg-gray-50">
                <div className="container px-4 md:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-navy mb-4">Facilities & Campus</h2>
                        <p className="text-muted-foreground text-lg">Modern resources designed to empower 21st-century learners.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { img: cloudinary.lab.physics[0], title: "Advanced Sci-Tech Labs", desc: "Physics, Chemistry, Biology & Computer Labs" },
                            { img: cloudinary.infrastructure.library[0], title: "Digital Library", desc: "Extensive collection of books & digital resources" },
                            { img: cloudinary.academics.methodology, title: "Smart Classrooms", desc: "Interactive digital boards in every class" },
                            { img: cloudinary.beyondAcademics.sports, title: "Sports Infrastructure", desc: "Grounds for Cricket, Football, Swimming & more" },
                            { img: cloudinary.infrastructure.building[0], title: "Safe & Green Campus", desc: "CCTV surveillance & lush green environment" },
                            { img: cloudinary.infrastructure.indoreGames[0], title: "Indoor Activity Halls", desc: "Space for Table Tennis, Chess, Yoga & Arts" },
                        ].map((fac, idx) => (
                            <div key={idx} className="group relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                                <Image src={fac.img} alt={fac.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                                <div className="absolute bottom-6 left-6 text-white">
                                    <h3 className="text-xl font-bold mb-1">{fac.title}</h3>
                                    <p className="text-sm text-white/80">{fac.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Button asChild variant="outline" size="lg" className="rounded-full border-navy text-navy hover:bg-navy hover:text-white px-8">
                            <Link href="/gallery">Explore Our Gallery</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* 5. COMPARISON SECTION */}
            <section className="py-20 bg-white">
                <div className="container px-4 md:px-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-5xl font-display font-bold text-navy mb-4">Choosing a CBSE School in Khargone:<br />What to Consider</h2>
                            <p className="text-muted-foreground text-lg">Choose the right environment for your child's growth.</p>
                        </div>

                        <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
                            <table className="w-full border-collapse">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="p-6 text-left font-display font-bold text-xl text-gray-600 w-1/3">Feature</th>
                                        <th className="p-6 text-center font-display font-bold text-2xl text-navy bg-gold/20 border-b-4 border-gold w-1/3">SIA Comparison</th>
                                        <th className="p-6 text-center font-display font-bold text-xl text-gray-500 w-1/3">Standard Schools</th>
                                    </tr>
                                </thead>
                                <tbody className="text-lg divide-y divide-gray-100">
                                    {[
                                        { feat: "Teaching Methodology", sia: "Experiential & Concept-Based", other: "Traditional Rote Learning" },
                                        { feat: "Student-Teacher Ratio", sia: "25:1 (Individual Focus)", other: "40:1 or Higher" },
                                        { feat: "Holistic Development", sia: "Integrated Sports, Arts & Skills", other: "Academics Only Focus" },
                                        { feat: "Technology Integration", sia: "Smart Boards, ERP & Apps", other: "Limited / Basic" },
                                        { feat: "Safety & Security", sia: "GPS Buses, CCTV, Gated Campus", other: "Standard Basic Security" },
                                    ].map((row, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-6 font-semibold text-navy">{row.feat}</td>
                                            <td className="p-6 text-center bg-gold/5 font-bold text-navy">
                                                {row.sia}
                                            </td>
                                            <td className="p-6 text-center text-gray-500">{row.other}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. PARENT TESTIMONIALS */}
            <section className="py-20 bg-navy text-white">
                <div className="container px-4 md:px-6">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-16">Parent Testimonials</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: "Mr. R. Sharma", role: "Parent of Grade 10", text: "The dedicated faculty at SIA has transformed my son's approach to learning. He is now more confident and academically disciplined." },
                            { name: "Mrs. P. Patel", role: "Parent of Grade 5", text: "SIA offers the perfect balance of sports and studies. The infrastructure is by far the best I have seen in Khargone." },
                            { name: "Mrs. A. Verma", role: "Parent of Grade 8", text: "We moved here recently, and SIA made the transition so smooth. The school culture is very welcoming and values-driven." },
                        ].map((t, idx) => (
                            <div key={idx} className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 relative hover:bg-white/10 transition-colors">
                                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gold text-navy rounded-full flex items-center justify-center font-serif text-4xl shadow-lg">"</div>
                                <div className="flex flex-col h-full justify-between">
                                    <p className="text-white/90 italic mb-6 leading-relaxed text-lg">"{t.text}"</p>
                                    <div>
                                        <div className="font-bold text-gold text-lg">{t.name}</div>
                                        <div className="text-sm text-white/50">{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. ADMISSIONS OPEN CTA */}
            <section className="py-24 bg-gold relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="container relative z-10 px-4 text-center">
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-navy mb-6">Admissions Open 2026–27</h2>
                    <p className="text-xl md:text-2xl text-navy/80 mb-10 max-w-2xl mx-auto font-medium">
                        Secure your child's future at Khargone's widely trusted CBSE school. Limited seats available.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button asChild size="lg" className="bg-navy hover:bg-navy-light text-white font-bold text-xl px-12 py-8 rounded-full shadow-2xl">
                            <Link href="/admissions">Apply Now</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="bg-transparent border-2 border-navy text-navy hover:bg-navy hover:text-white font-bold text-xl px-12 py-8 rounded-full">
                            <Link href="/contact">Contact Us</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* 8. FAQS */}
            <section className="py-20 bg-white">
                <div className="container px-4 md:px-6 max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-navy text-center mb-12">Frequently Asked Questions</h2>
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {[
                            { q: "Which is a good CBSE school in Khargone?", a: "Sanskar International Academy (SIA) is widely regarded as one of the leading CBSE schools in Khargone due to its 100% board results, modern infrastructure, and focus on holistic child development." },
                            { q: "What is the admission process?", a: "The admission process involves filling out an application form (online or offline), followed by a student interaction/assessment. Admission is granted based on merit and seat availability." },
                            { q: "What facilities does SIA offer?", a: "SIA offers state-of-the-art facilities including smart classrooms, advanced science & computer labs, a digital library, GPS-enabled transport, and extensive sports facilities for cricket, swimming, and more." },
                            { q: "Does the school provide transport facilities?", a: "Yes, SIA provides safe and reliable GPS-enabled transport facilities covering Khargone city and nearby sub-urban areas." },
                        ].map((item, idx) => (
                            <AccordionItem key={idx} value={`item-${idx}`} className="border rounded-xl px-6 bg-gray-50 data-[state=open]:bg-white data-[state=open]:shadow-md transition-all">
                                <AccordionTrigger className="text-lg font-bold text-navy text-left py-6">{item.q}</AccordionTrigger>
                                <AccordionContent className="text-muted-foreground text-base pb-6 leading-relaxed">
                                    {item.a}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>

            {/* 9. STRONG INTERNAL LINKING (SEO FOOTER) */}
            <section className="py-16 bg-navy-dark text-white/50 border-t border-white/5">
                <div className="container px-4 md:px-6">
                    <h3 className="font-bold text-white text-lg mb-6 uppercase tracking-wider">Quick Links</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-8 text-sm">
                        <Link href="/admissions" className="hover:text-gold transition-colors">Admissions Process</Link>
                        <Link href="/academics" className="hover:text-gold transition-colors">Academic Curriculum</Link>
                        <Link href="/results" className="hover:text-gold transition-colors">Board Exam Results</Link>
                        <Link href="/gallery" className="hover:text-gold transition-colors">Campus Gallery</Link>
                        <Link href="/contact" className="hover:text-gold transition-colors">Contact Us</Link>
                        <Link href="/about/overview" className="hover:text-gold transition-colors">About SIA</Link>
                        <Link href="/beyond-academics" className="hover:text-gold transition-colors">Sports & Activities</Link>
                        <Link href="/about/management" className="hover:text-gold transition-colors">School Management</Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
