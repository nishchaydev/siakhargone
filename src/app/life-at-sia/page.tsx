
import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import { Shield, Bus, Video } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Life at SIA - World-Class Campus & Facilities',
    description: 'Explore the exceptional environment we have created to inspire learning, growth, and innovation at Sanskar International Academy.',
};

export default function LifeAtSiaPage() {
    return (
        <main className="bg-light-grey font-body text-gray-800">

            {/* Hero Section */}
            <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-center overflow-hidden">
                <Image src="/siakhargone-content/album/photo-for-uploads/infrastructure-photos/building-photos/infrastructure-building-2.webp" // Campus image
                    alt="SIA Campus Aerial View"
                    fill
                    className="absolute inset-0 w-full h-full object-cover"
                    priority unoptimized />
                <div className="absolute inset-0 bg-black/40 z-10" />
                <div className="relative z-20 container mx-auto px-6 text-white">
                    <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">World-Class Campus & Facilities</h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto font-light">
                        Explore the exceptional environment we've created to inspire learning, growth, and innovation at every turn.
                    </p>
                </div>
            </section>

            {/* Intro Section */}
            <section className="py-20 md:py-28 container mx-auto px-6 text-center">
                <h2 className="font-display text-4xl md:text-5xl font-bold text-royal-blue mb-6">An Environment Built for Excellence</h2>
                <div className="h-1 w-24 bg-gold-accent mx-auto mb-8 rounded-full" />
                <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed mb-16">
                    Our sprawling campus is thoughtfully designed to provide a secure, stimulating, and globally-minded atmosphere. From advanced labs to expansive sports fields, every facility is crafted to support a comprehensive and enriching educational journey.
                </p>

                {/* Feature Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
                    {[
                        {
                            title: "Science & Tech Labs",
                            desc: "State-of-the-art labs for hands-on exploration in physics, chemistry, biology, and computer science.",
                            img: "/siakhargone-content/album/photo-for-uploads/lab/chemistry-lab/lab-chemistry-1.webp",
                        },
                        {
                            title: "Sports Complex",
                            desc: "International standard facilities for a wide range of sports, fostering teamwork and physical well-being.",
                            img: "/siakhargone-content/album/photo-for-uploads/sports-achievements/sports-achievements-1.webp",
                        },
                        {
                            title: "Smart Classrooms",
                            desc: "Technology-enabled classrooms that make learning interactive, engaging, and highly effective.",
                            img: "/siakhargone-content/album/photo-for-uploads/infrastructure-photos/class-room-photos/infrastructure-classroom-1.webp",
                        },
                        {
                            title: "Performing Arts Center",
                            desc: "Dedicated spaces for music, dance, and drama, allowing students to explore their creative talents.",
                            img: "/siakhargone-content/album/photo-for-uploads/annual-function/annual-function-3.webp",
                        },
                    ].map((feature, idx) => (
                        <div key={idx} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden group">
                            <div className="relative h-48 overflow-hidden">
                                <Image src={feature.img}
                                    alt={feature.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105" unoptimized />
                            </div>
                            <div className="p-6">
                                <h3 className="font-display text-xl font-bold text-royal-blue mb-2">{feature.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Facility Showcase - Section 1 */}
            <section className="bg-white py-20 px-6">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-4xl font-bold text-gray-900 inline-block border-b-4 border-gold-accent pb-2">Facility Showcase</h2>
                    </div>

                    {/* Advanced Learning Spaces */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="h-64 relative rounded-2xl overflow-hidden col-span-2">
                                <Image src="/siakhargone-content/album/photo-for-uploads/infrastructure-photos/library-photos/infrastructure-library-1.webp" alt="Library" fill className="object-cover" unoptimized />
                            </div>
                            <div className="h-48 relative rounded-2xl overflow-hidden">
                                <Image src="/siakhargone-content/album/photo-for-uploads/lab/biology-lab/lab-biology-1.webp" alt="Lab microscope" fill className="object-cover" unoptimized />
                            </div>
                            <div className="h-48 relative rounded-2xl overflow-hidden">
                                <Image src="/siakhargone-content/album/photo-for-uploads/infrastructure-photos/class-room-photos/infrastructure-classroom-2.webp" alt="Student writing" fill className="object-cover" unoptimized />
                            </div>
                        </div>
                        <div>
                            <h3 className="font-display text-3xl font-bold text-royal-blue mb-4">Advanced Learning Spaces</h3>
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                Our classrooms and labs are equipped with the latest technology to facilitate a modern, interactive learning experience. From digital smart boards to fully-equipped science labs, we provide the tools for students to excel academically and develop critical thinking skills.
                            </p>
                            <a href="#" className="text-gold-accent font-semibold hover:text-navy transition-colors flex items-center gap-2">
                                Explore Academics <span>→</span>
                            </a>
                        </div>
                    </div>

                    {/* Holistic Development Centers */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1">
                            <h3 className="font-display text-3xl font-bold text-royal-blue mb-4">Holistic Development Centers</h3>
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                We believe in nurturing well-rounded individuals. Our extensive sports facilities, performing arts studios, and creative spaces encourage students to pursue their passions, develop new skills, and maintain a healthy, balanced lifestyle outside the classroom.
                            </p>
                            <a href="#" className="text-gold-accent font-semibold hover:text-navy transition-colors flex items-center gap-2">
                                Discover Life at SIA <span>→</span>
                            </a>
                        </div>
                        <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
                            <div className="h-64 relative rounded-2xl overflow-hidden col-span-2">
                                <Image src="/siakhargone-content/album/photo-for-uploads/sports-achievements/sports-achievements-2.webp" alt="Sports Area" fill className="object-cover" unoptimized />
                            </div>
                            <div className="h-48 relative rounded-2xl overflow-hidden">
                                <Image src="/siakhargone-content/album/photo-for-uploads/sports-achievements/sports-achievements-3.webp" alt="Sports Activity" fill className="object-cover" unoptimized />
                            </div>
                            <div className="h-48 relative rounded-2xl overflow-hidden">
                                <Image src="/siakhargone-content/album/photo-for-uploads/annual-function/dsc_2441.webp" alt="Cultural Activity" fill className="object-cover" unoptimized />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Safety & Security */}
            <section className="bg-royal-blue text-white py-20 px-6">
                <div className="container mx-auto text-center">
                    <h2 className="font-display text-4xl font-bold mb-4">Safety & Security</h2>
                    <div className="h-1 w-20 bg-gold-accent mx-auto mb-8 rounded-full" />
                    <p className="max-w-2xl mx-auto text-lg text-blue-100 mb-16">
                        We ensure a safe and secure learning environment for every student through comprehensive measures and constant vigilance.
                    </p>

                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6 text-gold-accent">
                                <Video size={32} />
                            </div>
                            <h3 className="font-bold text-xl mb-3">24/7 CCTV Surveillance</h3>
                            <p className="text-blue-100 text-sm">The entire campus is monitored to ensure a secure environment.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6 text-gold-accent">
                                <Shield size={32} />
                            </div>
                            <h3 className="font-bold text-xl mb-3">Trained Security Staff</h3>
                            <p className="text-blue-100 text-sm">A team of professional and well-trained security personnel stationed at all key points.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6 text-gold-accent">
                                <Bus size={32} />
                            </div>
                            <h3 className="font-bold text-xl mb-3">Secure Transportation</h3>
                            <p className="text-blue-100 text-sm">Our fleet of buses is equipped with GPS tracking and supervised by trained staff.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Footer-ish */}
            <section className="py-20 px-6">
                <div className="container mx-auto">
                    <div className="bg-[#E2C67E] rounded-3xl p-12 text-center md:flex md:items-center md:justify-between md:text-left relative overflow-hidden">
                        <div className="relative z-10 md:max-w-xl">
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-royal-blue mb-4">Experience Our Campus First-Hand</h2>
                            <p className="text-gray-800 font-medium">
                                Words and pictures can only show so much. We invite you to visit our campus and see for yourself what makes Sanskar International Academy a special place to learn and grow.
                            </p>
                        </div>
                        <div className="mt-8 md:mt-0 relative z-10">
                            <button className="bg-royal-blue text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-navy-dark transition-transform transform hover:-translate-y-1">
                                Schedule a School Tour
                            </button>
                        </div>
                        {/* Decorative Circle */}
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/20 rounded-full pointer-events-none" />
                    </div>
                </div>
            </section>

        </main>
    );
}
