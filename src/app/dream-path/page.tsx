
import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dream Path - Sanskar International Academy',
    description: 'Charting Futures: Your Dream Path Starts Here.',
};

export default function DreamPathPage() {
    return (
        <main className="bg-light-grey font-body text-gray-800">
            <div className="w-full mx-auto">
                {/* Scroll Snap Container if we want it, main page usually scrolls naturally. 
            The user had .section-snap { scroll-snap-align: start; } 
            We can add a class for that if we enforce snap on the html/body, but generally confusing in Next.js layouts. 
            I will include the class but it might not work without parent snap-type. 
            I'll skip strict scroll snapping to avoid UX issues with the global layout, unless requested. 
            The user provided specific HTML so I will try to respect the structure. */}

                {/* Hero Section */}
                <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
                    <Image alt="Graduation ceremony with students throwing caps in the air"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjznh7KzGJAOuzqBriyo7Xcdthn83c6LgCHU_G4gbH334hCPXk_YJWEw7fyLwFwRWWEbH5dBu7vOUYzpc0Z56QNPob_oLmTdT-8j_YsHu30I_Qeesa9vts9yxddTL8WvbpdHHoQKEJffOxOI29s3JpttcJqY0LfVC91ImB8I7ug3rnb0zkfc3bHkA7GYoGGnQypHiLD5kmBzmKXC9PpW0Seqjz1dAQwIqUoZXL76xDzezq3H9ZnVlXft54ESIpFuWR4GjKJR3w9TMA"
                        fill
                        className="absolute inset-0 w-full h-full object-cover z-0"
                        priority unoptimized />
                    <div className="absolute inset-0 bg-black/50 z-10"></div>
                    <div className="relative z-20 px-6 text-white">
                        <h1 className="font-display text-5xl md:text-7xl font-bold mb-4">Charting Futures:</h1>
                        <h2 className="font-display text-4xl md:text-6xl font-bold">Your Dream Path Starts Here.</h2>
                    </div>
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white animate-bounce">
                        <span className="material-symbols-outlined text-4xl font-bold text-3xl">↓</span> {/* Fallback arrow if icon font missing */}
                    </div>
                </section>

                <div className="container mx-auto px-6 py-16 md:py-24 space-y-24 md:space-y-32">
                    {/* The Lawyer */}
                    <section className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
                        <div className="order-2 md:order-1">
                            <h2 className="font-display text-4xl md:text-5xl font-bold text-royal-blue mb-6">The Lawyer</h2>
                            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                                SIA cultivates the sharp minds and ethical hearts of future legal luminaries. Through rigorous debate clubs, moot court simulations, and a curriculum rich in critical thinking, we lay the foundation for a successful journey in law, empowering students to champion justice.
                            </p>
                            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 bg-gradient-to-br from-white to-gray-50">
                                <h3 className="font-display text-2xl font-bold text-gold-accent mb-4">Guidance Spotlight</h3>
                                <div className="flex items-center space-x-4">
                                    <div className="relative w-20 h-20 shrink-0">
                                        <Image alt="Portrait of a male lawyer"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuApUsn93bWYdUwiWA60e22YOrXzuTuVMGVf9snitdiJyKBIHQbkT_FOI3TeGM1QBZ51kiVQbls7GX7YjnskFJb-McwvfQLYDDOOYcv_q8iegfipWImuM5OiVAFHuEjDyGIdHNvbyu6mzMsznPbZVXrdWR4UE4CQf5sZ7KzaDXsCxuScKIbKHvcjFCAqQ0WuCCAt1aEN5T742kRcwJ_xLDONa1NixM3doOgSDEqJJsLWqmTm8E3adYyR3F8DpEbEuXm_eunq240xTbiF"
                                            fill
                                            className="rounded-full object-cover" unoptimized />
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg text-gray-900">Adv. Rohan Verma</p>
                                        <p className="text-sm text-gold-accent font-semibold">Khargone's Top Lawyer</p>
                                        <p className="text-sm text-gray-500 mt-1">"I mentor SIA students on building persuasive arguments and understanding the nuances of the legal system."</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 md:order-2 relative h-[400px] md:h-[500px]">
                            <Image alt="A young law student studying in a grand library"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlciHA36AA0bjz1b3u8jH_BT6BCC5y0pO81SH7iu0atQQaBrcSpG2DmPvJ-pVLBvwoxlK_VpIO4RBxajEh_VXVDBqbBgOT3r9soqGI0Ky5WWISzilyMpCv-AEpnkzy0nS4oT48Zu5oOnzaAu2Jdd03JSUA9pA-Bq-dcUwyh_2Jmnsowu6pDDseCstcVxjUmK5lfqZjdbDdZ44JCxlQMVMADrqNzf4u00C6d8BuBnBYo3wP-GUqiGUDHL72-kJyFViRundbLmfLQlWl"
                                fill
                                className="rounded-xl object-cover shadow-2xl" unoptimized />
                        </div>
                    </section>

                    {/* The Doctor */}
                    <section className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
                        <div className="relative h-[400px] md:h-[500px]">
                            <Image alt="A female doctor smiling warmly in a hospital setting"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTlz4BZwi40myYbA_BIKTmHaZSa_t3Gw0W79jdAFJ1-owczhZnhU4g4IrZL8EMK-ZXD4iyX4tf9p5nUil8rAzF1G0o4GSkiT65SsrUR6jhCLGH7ua98Hp4ekQxSCrkWMn2Cj5UPXKkK7VoPo-W3Nu9d2c8G8B8XBUZ_vh5Knu6N3VBy0P04RGZcSCC6aLOS3tnA_lgkFfRwNTWZlTYVzjVCJOQ0kKcnndf9OQBFkeYVXPhr6h-_45Pt3zkHMZ7QUFmGy7rAWk4ZjZK"
                                fill
                                className="rounded-xl object-cover shadow-2xl" unoptimized />
                        </div>
                        <div>
                            <h2 className="font-display text-4xl md:text-5xl font-bold text-royal-blue mb-6">The Doctor</h2>
                            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                                At SIA, we nurture the compassion and precision required for a career in medicine. Our advanced biology and chemistry labs, combined with partnerships with local healthcare professionals, provide an unparalleled springboard for aspiring doctors to heal and serve.
                            </p>
                            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 bg-gradient-to-br from-white to-gray-50">
                                <h3 className="font-display text-2xl font-bold text-gold-accent mb-4">Guidance Spotlight</h3>
                                <div className="flex items-center space-x-4">
                                    <div className="relative w-20 h-20 shrink-0">
                                        <Image alt="Portrait of a female surgeon"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRFiGukG2kYx5ahV9TKvM4i218QELXgINlWA1n7Fyg0RdNFe5sXUHgGfz1y_I5ThhPsBNtVcoGlNyRhaMyVeP8PKhKMKdS1jistYfyjtEhmW5Rge15W_NBCtFeqFii6sYWtWovSNi0RU0rJi4oq14S1r2rXfROHO0T13f_cDqsHSZjUwn4b90RPRimToZL4NHf2wxU5nTvMeBHJR1vngattg7xAr-FwuG2wDFRs-77SO4sUmexE1D6XMMVL6nsA6VNg9uUWYj6F6UZ"
                                            fill
                                            className="rounded-full object-cover" unoptimized />
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg text-gray-900">Dr. Ananya Sharma</p>
                                        <p className="text-sm text-gold-accent font-semibold">Leading Surgeon</p>
                                        <p className="text-sm text-gray-500 mt-1">"I provide hands-on workshops for SIA students, offering a real-world glimpse into the life of a surgeon."</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* The Engineer */}
                    <section className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
                        <div className="order-2 md:order-1">
                            <h2 className="font-display text-4xl md:text-5xl font-bold text-royal-blue mb-6">The Engineer</h2>
                            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                                Innovation is at the core of our engineering program. From robotics clubs to coding bootcamps, SIA provides the tools and challenges for students to build, create, and solve the problems of tomorrow, shaping them into visionary engineers.
                            </p>
                            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 bg-gradient-to-br from-white to-gray-50">
                                <h3 className="font-display text-2xl font-bold text-gold-accent mb-4">Guidance Spotlight</h3>
                                <div className="flex items-center space-x-4">
                                    <div className="relative w-20 h-20 shrink-0">
                                        <Image alt="Portrait of a male engineer in a hard hat"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0ehX9FMJSsTFm_bho9g_aMEGfE57WmC8GrVn75su-mKtkwILb85AkNUm1AhRYB0TQ7jvuLSxyBL7KwSwzEXghxIl6hPvOTx2ljv1XS_8UI42Kv7ONOp70_RtXIvx8Xid7ddmVRuBAAGuVQkSgmzATMxlvrNjOPZ20wcOj9W2siWQz1sGuarBeqRRGNYdzsrtAbVwr5z4LuHhnJK9lfDXIOPEPEMLYly5PTipx6nuuOpgST-iJLbNn1dQm2WgFn78FYdfB-7HqT-qj"
                                            fill
                                            className="rounded-full object-cover" unoptimized />
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg text-gray-900">Mr. Sameer Patel</p>
                                        <p className="text-sm text-gold-accent font-semibold">Chief Technology Officer</p>
                                        <p className="text-sm text-gray-500 mt-1">"I guide students through complex projects, helping them bridge the gap between theory and practical application."</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 md:order-2 relative h-[400px] md:h-[500px]">
                            <Image alt="An engineer working with advanced robotics in a lab"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnL4xUqo39HJ35evDBwE0i7GPuzVxBoJvGHl3xVwxP3vlxQuyt8LtAco722xNIBLSy4GuXfcRmQPDiBf71kKXBkpMkXcP3RBroObQ9DSThqjSMFpLN9Grhjh3lVrnK99de5oa1ZDArlK6UoPzzSCTup44sMl9gGhd_A7xFgKWu_rffFsqwFYOhYeJh7lttbx6C31WjZnbvudaKJwSNT5SVFAFyAf1HwOk7bi9ryQsX93LJDj20dTZSh4HFoOyOpNowdhVm63_IwlIy"
                                fill
                                className="rounded-xl object-cover shadow-2xl" unoptimized />
                        </div>
                    </section>

                    {/* The Scientist */}
                    <section className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
                        <div className="relative h-[400px] md:h-[500px]">
                            <Image alt="A scientist in a modern laboratory looking into a microscope"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPsjIFXc6Oj0suaeEsFFImwKFr7HXrl_RLeG4CHT87AQXVSFFUNwWLj8ZwU_6wd9pTA5ELqHLR78BPN-8h68annhFW16TAm3HwKcofZWS1feHhNXg8yrHofH8NkbvGEaiwpZlfi9sFIXoP-wVZLnzzXWyZCsr5_8O2ygHO1PReWTINICxpO6gK1n8Hiyjk4gI8EaU_P2UpI7DotTdYOFXWJVqo4UIjSjWkuIhYjazh0dLZxTuwIHlzKb9AaLbNT6egJv8mM0zTEjK6"
                                fill
                                className="rounded-xl object-cover shadow-2xl" unoptimized />
                        </div>
                        <div>
                            <h2 className="font-display text-4xl md:text-5xl font-bold text-royal-blue mb-6">The Scientist</h2>
                            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                                Fostering curiosity is the first step towards discovery. Our state-of-the-art labs and research-oriented curriculum encourage students to question, experiment, and innovate, preparing them for groundbreaking careers in scientific research and development.
                            </p>
                            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 bg-gradient-to-br from-white to-gray-50">
                                <h3 className="font-display text-2xl font-bold text-gold-accent mb-4">Guidance Spotlight</h3>
                                <div className="flex items-center space-x-4">
                                    <div className="relative w-20 h-20 shrink-0">
                                        <Image alt="Portrait of a leading female scientist"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOWsvAh92uOwBMkP4_6ZFpxtVqW0AYc_R0V2-aQq0vdj3LdZQIwT8oU0tGa8nE2QPvo7zPG3iXhJur9dTVxnsBmmxwbTbDYEg89IZsgltV8z1zu5ovDO4I9u89SfI7bKUdcypjNrD0KWv6QXjinsglZ8AGcH-hlYwiugxkI4zqepQmKnNfqukEzXXhB4jcc-osc1ZBVmwBJdZoMiLNKNUSSAZe_AsEEd3TV0H1S3oj4XCdNGeToHSMSHlG6OwGq8ZWwrZuwt28i4op"
                                            fill
                                            className="rounded-full object-cover" unoptimized />
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg text-gray-900">Dr. Priya Rao</p>
                                        <p className="text-sm text-gold-accent font-semibold">Leading Scientist</p>
                                        <p className="text-sm text-gray-500 mt-1">"I engage students in real-world research projects, igniting their passion for scientific inquiry and ethical research."</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* The IAS Officer */}
                    <section className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
                        <div className="order-2 md:order-1">
                            <h2 className="font-display text-4xl md:text-5xl font-bold text-royal-blue mb-6">The IAS Officer</h2>
                            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                                We instill a strong sense of civic duty and leadership. Our specialized curriculum in social sciences, public policy, and ethics, combined with leadership training programs, prepares students for the challenges and responsibilities of serving the nation.
                            </p>
                            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 bg-gradient-to-br from-white to-gray-50">
                                <h3 className="font-display text-2xl font-bold text-gold-accent mb-4">Guidance Spotlight</h3>
                                <div className="flex items-center space-x-4">
                                    <div className="relative w-20 h-20 shrink-0">
                                        <Image alt="Portrait of a distinguished male IAS Officer"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuApUsn93bWYdUwiWA60e22YOrXzuTuVMGVf9snitdiJyKBIHQbkT_FOI3TeGM1QBZ51kiVQbls7GX7YjnskFJb-McwvfQLYDDOOYcv_q8iegfipWImuM5OiVAFHuEjDyGIdHNvbyu6mzMsznPbZVXrdWR4UE4CQf5sZ7KzaDXsCxuScKIbKHvcjFCAqQ0WuCCAt1aEN5T742kRcwJ_xLDONa1NixM3doOgSDEqJJsLWqmTm8E3adYyR3F8DpEbEuXm_eunq240xTbiF"
                                            fill
                                            className="rounded-full object-cover" unoptimized />
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg text-gray-900">Mr. Vikram Singh</p>
                                        <p className="text-sm text-gold-accent font-semibold">Distinguished IAS Officer</p>
                                        <p className="text-sm text-gray-500 mt-1">"I share insights on governance and public administration, mentoring students to become the ethical leaders of tomorrow."</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 md:order-2 relative h-[400px] md:h-[500px]">
                            <Image alt="A confident young professional standing in front of a government building"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlciHA36AA0bjz1b3u8jH_BT6BCC5y0pO81SH7iu0atQQaBrcSpG2DmPvJ-pVLBvwoxlK_VpIO4RBxajEh_VXVDBqbBgOT3r9soqGI0Ky5WWISzilyMpCv-AEpnkzy0nS4oT48Zu5oOnzaAu2Jdd03JSUA9pA-Bq-dcUwyh_2Jmnsowu6pDDseCstcVxjUmK5lfqZjdbDdZ44JCxlQMVMADrqNzf4u00C6d8BuBnBYo3wP-GUqiGUDHL72-kJyFViRundbLmfLQlWl"
                                fill
                                className="rounded-xl object-cover shadow-2xl" unoptimized />
                        </div>
                    </section>

                    {/* The Entrepreneur */}
                    <section className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
                        <div className="relative h-[400px] md:h-[500px]">
                            <Image alt="A young entrepreneur presenting a business idea in a modern office"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTlz4BZwi40myYbA_BIKTmHaZSa_t3Gw0W79jdAFJ1-owczhZnhU4g4IrZL8EMK-ZXD4iyX4tf9p5nUil8rAzF1G0o4GSkiT65SsrUR6jhCLGH7ua98Hp4ekQxSCrkWMn2Cj5UPXKkK7VoPo-W3Nu9d2c8G8B8XBUZ_vh5Knu6N3VBy0P04RGZcSCC6aLOS3tnA_lgkFfRwNTWZlTYVzjVCJOQ0kKcnndf9OQBFkeYVXPhr6h-_45Pt3zkHMZ7QUFmGy7rAWk4ZjZK"
                                fill
                                className="rounded-xl object-cover shadow-2xl" unoptimized />
                        </div>
                        <div>
                            <h2 className="font-display text-4xl md:text-5xl font-bold text-royal-blue mb-6">The Entrepreneur</h2>
                            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                                SIA is an incubator for big ideas. Through business plan competitions, startup workshops, and mentorship from successful entrepreneurs, we empower students to transform their innovative concepts into impactful ventures and lead the next wave of industry.
                            </p>
                            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 bg-gradient-to-br from-white to-gray-50">
                                <h3 className="font-display text-2xl font-bold text-gold-accent mb-4">Guidance Spotlight</h3>
                                <div className="flex items-center space-x-4">
                                    <div className="relative w-20 h-20 shrink-0">
                                        <Image alt="Portrait of a successful female entrepreneur"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRFiGukG2kYx5ahV9TKvM4i218QELXgINlWA1n7Fyg0RdNFe5sXUHgGfz1y_I5ThhPsBNtVcoGlNyRhaMyVeP8PKhKMKdS1jistYfyjtEhmW5Rge15W_NBCtFeqFii6sYWtWovSNi0RU0rJi4oq14S1r2rXfROHO0T13f_cDqsHSZjUwn4b90RPRimToZL4NHf2wxU5nTvMeBHJR1vngattg7xAr-FwuG2wDFRs-77SO4sUmexE1D6XMMVL6nsA6VNg9uUWYj6F6UZ"
                                            fill
                                            className="rounded-full object-cover" unoptimized />
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg text-gray-900">Ms. Aisha Khanna</p>
                                        <p className="text-sm text-gold-accent font-semibold">Successful Entrepreneur</p>
                                        <p className="text-sm text-gray-500 mt-1">"I coach students on the art of the pitch and business strategy, helping them navigate the path from idea to enterprise."</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
