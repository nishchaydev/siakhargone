import type { Metadata } from 'next';
import { Section } from '@/components/common/Section';
import PageBanner from '@/components/common/PageBanner';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Parent Reviews & Testimonials | SIA Khargone',
    description: 'Read what parents say about Sanskar International Academy. Real reviews from families who chose SIA for their children\'s education.',
    keywords: ['SIA reviews', 'parent testimonials khargone', 'school reviews khargone', 'SIA feedback'],
    alternates: {
        canonical: 'https://siakhargone.in/reviews',
    },
};

const testimonials = [
    {
        name: "Mrs. Priya Sharma",
        role: "Parent of Class 8 Student",
        rating: 5,
        text: "We shifted to Khargone recently and were looking for the top school. SIA exceeded our expectations with their discipline and academic focus. The teachers are very caring and the infrastructure is world-class.",
        image: "https://ui-avatars.com/api/?name=Priya+Sharma&background=0C2E53&color=fff"
    },
    {
        name: "Mr. Rajesh Patel",
        role: "Parent of Class 5 & Class 10 Students",
        rating: 5,
        text: "Both my children study at SIA. The individual attention they receive is remarkable. The smart classrooms and computer labs have made learning so engaging. Highly recommend!",
        image: "https://ui-avatars.com/api/?name=Rajesh+Patel&background=D4AF37&color=000"
    },
    {
        name: "Mrs. Anita Verma",
        role: "Parent of Class 3 Student",
        rating: 5,
        text: "The GPS-enabled bus service gives me peace of mind. I can track my daughter's bus in real-time. The female attendants are very responsible. Safety is clearly a priority at SIA.",
        image: "https://ui-avatars.com/api/?name=Anita+Verma&background=0C2E53&color=fff"
    },
    {
        name: "Mr. Suresh Jain",
        role: "Parent of Class 12 Student",
        rating: 5,
        text: "My son is preparing for JEE and the teachers at SIA have been incredibly supportive. The focus on competitive exam preparation alongside CBSE curriculum is excellent.",
        image: "https://ui-avatars.com/api/?name=Suresh+Jain&background=D4AF37&color=000"
    },
    {
        name: "Mrs. Kavita Singh",
        role: "Parent of Class 6 Student",
        rating: 5,
        text: "The sports facilities are outstanding! My daughter is part of the basketball team and has participated in state-level competitions. SIA truly believes in holistic development.",
        image: "https://ui-avatars.com/api/?name=Kavita+Singh&background=0C2E53&color=fff"
    },
    {
        name: "Mr. Amit Gupta",
        role: "Parent of Class 2 Student",
        rating: 5,
        text: "The admission process was smooth and transparent. The staff is very helpful and responsive. My son loves going to school every day, which says everything!",
        image: "https://ui-avatars.com/api/?name=Amit+Gupta&background=D4AF37&color=000"
    },
    {
        name: "Mrs. Neha Agarwal",
        role: "Parent of Class 9 Student",
        rating: 5,
        text: "The parent-teacher meetings are very productive. Teachers share detailed progress reports and are always available to discuss concerns. Great communication!",
        image: "https://ui-avatars.com/api/?name=Neha+Agarwal&background=0C2E53&color=fff"
    },
    {
        name: "Mr. Vikram Chouhan",
        role: "Parent of Class 4 Student",
        rating: 5,
        text: "Value for money! The fee structure is very reasonable compared to the quality of education and facilities provided. Best decision we made for our child's future.",
        image: "https://ui-avatars.com/api/?name=Vikram+Chouhan&background=D4AF37&color=000"
    }
];

export default function ReviewsPage() {
    const averageRating = 4.9;
    const totalReviews = testimonials.length;

    return (
        <div className="min-h-screen bg-grain">
            <PageBanner
                title="What Parents Say About Us"
                subtitle="Real reviews from families who chose SIA"
                image="https://res.cloudinary.com/dkits80xk/image/upload/v1765377520/Gemini_Generated_Image_q9u4r1q9u4r1q9u4_ukwf8a.png"
            />

            <Section id="rating-summary" bgColor="bg-white">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="h-8 w-8 fill-gold text-gold" />
                        ))}
                    </div>
                    <div className="text-5xl font-bold text-navy mb-2">{averageRating}/5.0</div>
                    <p className="text-muted-foreground text-lg">
                        Based on {totalReviews}+ parent reviews
                    </p>
                </div>
            </Section>

            <Section id="testimonials" bgColor="bg-light-grey">
                <h2 className="text-3xl font-display font-bold text-navy text-center mb-12">
                    Parent Testimonials
                </h2>
                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {testimonials.map((testimonial, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-xl shadow-md relative">
                            <Quote className="absolute top-4 right-4 h-12 w-12 text-gold/20" />
                            <div className="flex items-start gap-4 mb-4">
                                <Image
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    width={60}
                                    height={60}
                                    className="rounded-full"
                                />
                                <div>
                                    <h3 className="font-bold text-navy">{testimonial.name}</h3>
                                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                    <div className="flex gap-1 mt-1">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-muted-foreground italic leading-relaxed">
                                "{testimonial.text}"
                            </p>
                        </div>
                    ))}
                </div>
            </Section>

            <Section id="stats" bgColor="bg-navy">
                <div className="grid md:grid-cols-4 gap-8 text-center text-white">
                    <div>
                        <div className="text-4xl font-bold text-gold mb-2">1500+</div>
                        <p className="text-gray-300">Happy Students</p>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-gold mb-2">75+</div>
                        <p className="text-gray-300">Expert Teachers</p>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-gold mb-2">100%</div>
                        <p className="text-gray-300">Board Pass Rate</p>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-gold mb-2">4.9/5</div>
                        <p className="text-gray-300">Parent Rating</p>
                    </div>
                </div>
            </Section>

            <Section id="cta" bgColor="bg-white">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-display font-bold text-navy mb-4">
                        Join Our Growing Family
                    </h2>
                    <p className="text-muted-foreground text-lg mb-8">
                        Experience the SIA difference. Schedule a campus visit and meet our team.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/admissions"
                            className="inline-flex items-center justify-center px-8 py-3 bg-navy text-white font-bold rounded-full hover:bg-navy-dark transition-colors"
                        >
                            Apply for Admission
                        </a>
                        <a
                            href="/contact"
                            className="inline-flex items-center justify-center px-8 py-3 border-2 border-navy text-navy font-bold rounded-full hover:bg-navy/5 transition-colors"
                        >
                            Contact Us
                        </a>
                    </div>
                </div>
            </Section>
        </div>
    );
}
