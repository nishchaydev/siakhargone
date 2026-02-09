
import React from "react";
import { schoolData } from "@/data/schoolData";
import { Section } from '@/components/common/Section';

import PageBanner from '@/components/common/PageBanner';

export const metadata = {
    title: 'Privacy Policy | Sanskar International Academy',
    description: 'Privacy Policy for Sanskar International Academy website.',
};

export default function PrivacyPolicyPage() {
    return (
        <div className="bg-gray-50 min-h-screen">
            <PageBanner
                title="Privacy Policy"
                subtitle="Committed to protecting your personal information."
            />
            <Section id="privacy-policy" title="Policy Details" subtitle="Last Updated: January 2026">
                <div className="prose prose-lg max-w-4xl mx-auto text-gray-700">
                    <p>
                        At Sanskar International Academy, we value your trust and are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your information when you visit our website or interact with our admissions and administrative services.
                    </p>

                    <h3>1. Information We Collect</h3>
                    <p>
                        We may collect personal information that you voluntarily provide to us when you:
                    </p>
                    <ul>
                        <li>Fill out an enquiry or contact form.</li>
                        <li>Apply for admission online.</li>
                        <li>Subscribe to our newsletters or updates.</li>
                    </ul>
                    <p>
                        This information may include your name, email address, phone number, and student details necessary for the admissions process.
                    </p>

                    <h3>2. How We Use Your Information</h3>
                    <p>
                        The information we collect is used strictly for school-related purposes, including:
                    </p>
                    <ul>
                        <li>Responding to your queries and admission requests.</li>
                        <li>Sending important academic updates and school notifications.</li>
                        <li>Improving our website functionality and user experience.</li>
                    </ul>

                    <h3>3. Data Security</h3>
                    <p>
                        We implement appropriate technical and organizational measures to ensure your data is secure and protected against unauthorized access, alteration, or disclosure.
                    </p>

                    <h3>4. Cookies</h3>
                    <p>
                        Our website may use cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, although this may affect some website features.
                    </p>

                    <h3>5. Contact Us</h3>
                    <p>
                        If you have any questions regarding this Privacy Policy, please contact us at:
                        <br />
                        <strong>Email:</strong> info@sanskaracademy.in
                        <br />
                        <strong>Phone:</strong> {schoolData.contact.phone[0]}
                    </p>
                </div>
            </Section>
        </div>
    );
}
