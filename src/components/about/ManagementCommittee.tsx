"use client";

import { Section } from "@/components/common/Section";

interface CommitteeMember {
    sn: number;
    name: string;
    designation: string;
}

interface ManagementCommitteeProps {
    members: CommitteeMember[];
}

export function ManagementCommittee({ members }: ManagementCommitteeProps) {
    if (!members || members.length === 0) return null;

    return (
        <Section id="committee" title="School Managing Committee" subtitle="Dedicated leadership for excellence" bgColor="bg-light-grey">
            <div className="max-w-5xl mx-auto px-4">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    {/* Header */}
                    <div className="px-8 py-10 md:px-12 border-b border-gray-100 bg-white">
                        <h3 className="uppercase tracking-widest text-xs md:text-sm font-bold text-gray-400 mb-2">School Managing Committee</h3>
                        <p className="text-3xl md:text-4xl font-display font-medium text-navy-dark">2026-27</p>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                    <th className="py-6 px-8 md:px-12 font-bold text-navy text-xs md:text-sm uppercase tracking-wider w-24">S. No.</th>
                                    <th className="py-6 px-8 md:px-12 font-bold text-navy text-xs md:text-sm uppercase tracking-wider">Name of Committee Member</th>
                                    <th className="py-6 px-8 md:px-12 font-bold text-navy text-xs md:text-sm uppercase tracking-wider">Designation</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {members.map((member, index) => (
                                    <tr key={index} className="hover:bg-gray-50/80 transition-colors group">
                                        <td className="py-5 px-8 md:px-12 text-gray-500 font-medium">{member.sn}</td>
                                        <td className="py-5 px-8 md:px-12 text-navy-dark font-medium text-lg group-hover:text-gold-accent transition-colors">{member.name}</td>
                                        <td className="py-5 px-8 md:px-12 text-gray-600 font-medium bg-gray-50/30">{member.designation}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Section>
    );
}
