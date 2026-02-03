
import React from 'react';
import { Section } from '@/components/common/Section';

import PageBanner from '@/components/common/PageBanner';

export const metadata = {
    title: 'Terms of Service | Sanskar International Academy',
    description: 'Terms of Service for Sanskar International Academy website.',
};

export default function TermsPage() {
    return (
        <div className="bg-grain min-h-screen">
            <PageBanner
                title="Terms of Service"
                subtitle="Guidelines for using our website and services."
                image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop"
            />
            <Section id="terms" title="User Agreement" subtitle="Effective Date: January 1, 2026" bgColor="bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="prose prose-lg prose-headings:font-display prose-headings:text-navy prose-p:text-gray-600 prose-li:text-gray-600 max-w-none">
                        <p className="lead text-xl text-navy/80 font-medium">
                            Welcome to the official website of Sanskar International Academy (SIA). By accessing or using our digital platforms, you agree to comply with and be bound by the following terms and conditions.
                        </p>

                        <hr className="border-gold/30 my-8" />

                        <h3>1. Acceptance of Terms</h3>
                        <p>
                            By accessing <strong>siakhargone.in</strong>, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. These terms apply to all visitors, users, and others who access the service.
                        </p>

                        <h3>2. Intellectual Property Rights</h3>
                        <p>
                            All content provided on this website, including but not limited to text, photographs, graphics, school logos, and curriculum materials, is the exclusive property of <strong>Sanskar International Academy</strong>.
                        </p>
                        <ul>
                            <li>You may not reproduce, distribute, or exploit any content for commercial purposes without prior written content.</li>
                            <li>Student photographs are protected under privacy laws and may not be downloaded or misused.</li>
                        </ul>

                        <h3>3. User Conduct</h3>
                        <p>
                            When using our interactive features (such as the Admission Form, Contact Form, or Student Portal), you agree to:
                        </p>
                        <ul>
                            <li>Provide accurate, current, and complete information.</li>
                            <li>Not attempt to gain unauthorized access to any portion of the site or school servers.</li>
                            <li>Not submit false enquiries or spam.</li>
                        </ul>

                        <h3>4. Limitation of Liability</h3>
                        <p>
                            While we strive for accuracy, Sanskar International Academy does not warrant that the website content is error-free.
                        </p>
                        <ul>
                            <li><strong>Academic Calendars:</strong> Dates are subject to change based on government directives or administrative decisions.</li>
                            <li><strong>Fee Structure:</strong> Fees displayed are for information purposes. Final fee calculations are provided by the Accounts Office.</li>
                        </ul>

                        <h3>5. Third-Party Links</h3>
                        <p>
                            Our website may contain links to third-party websites (e.g., CBSE, Payment Gateways). We strictly are not responsible for the content or privacy practices of these external sites.
                        </p>

                        <h3>6. Contact Information</h3>
                        <p>
                            For any legal queries regarding these terms, please contact us at:
                        </p>
                        <div className="bg-navy/5 p-6 rounded-xl not-prose border-l-4 border-gold">
                            <p className="font-bold text-navy text-lg m-0">Principal's Office</p>
                            <p className="m-0 text-gray-700">Sanskar International Academy (SIA)</p>
                            <p className="m-0 text-gray-700">Khandwa Road, Khargone (M.P.) - 451001</p>
                            <p className="m-0 text-gray-700 mt-2">Email: <a href="mailto:sanskar.khargone@gmail.com" className="text-gold hover:underline">sanskar.khargone@gmail.com</a></p>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}
