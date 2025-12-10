
import React from 'react';
import { Section } from '@/components/common/Section';

export const metadata = {
    title: 'Terms of Service | Sanskar International Academy',
    description: 'Terms of Service for Sanskar International Academy website.',
};

export default function TermsPage() {
    return (
        <main className="bg-gray-50 min-h-screen">
            <Section id="terms" title="Terms of Service" subtitle="Last Updated: December 2024">
                <div className="prose prose-lg max-w-4xl mx-auto text-gray-700">
                    <p>
                        Welcome to the official website of Sanskar International Academy. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions.
                    </p>

                    <h3>1. Acceptance of Terms</h3>
                    <p>
                        By accessing this website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree, please do not use our website.
                    </p>

                    <h3>2. Use of Content</h3>
                    <p>
                        All content provided on this website, including text, images, logos, and graphics, is the property of Sanskar International Academy. You may not reproduce, distribute, or use any content for commercial purposes without our prior written permission.
                    </p>

                    <h3>3. User Conduct</h3>
                    <p>
                        You agree to use this website only for lawful purposes. You strictly are prohibited from:
                    </p>
                    <ul>
                        <li>Using the website to transmit malicious code or viruses.</li>
                        <li>Attempting to gain unauthorized access to our administrative systems.</li>
                        <li>Submitting false or misleading information in our forms.</li>
                    </ul>

                    <h3>4. Accuracy of Information</h3>
                    <p>
                        While we strive to keep the information on our website accurate and up-to-date, Sanskar International Academy makes no warranties regarding the completeness or accuracy of the academic calendars, fee structures, or other details. Official documents available at the school office take precedence.
                    </p>

                    <h3>5. Updates to Terms</h3>
                    <p>
                        We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the site constitutes your acceptance of such changes.
                    </p>
                </div>
            </Section>
        </main>
    );
}
