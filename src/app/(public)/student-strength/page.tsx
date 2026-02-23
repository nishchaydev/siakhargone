import { studentStrengthData, grandTotal, SESSION } from '@/data/studentStrength';
import type { Metadata } from 'next';
import PageBanner from '@/components/common/PageBanner';

export const metadata: Metadata = {
    title: `Student Strength ${SESSION} | Sanskar International Academy`,
    description: `ClassWise student strength report for Sanskar International Academy, Khargone for session ${SESSION}. Total strength: ${grandTotal.total} students.`,
};

export default function StudentStrengthPage() {
    return (
        <div className="bg-grain min-h-screen">
            <PageBanner
                title="Student Strength"
                subtitle={`ClassWise Report for Session ${SESSION}`}
            />

            <div className="container mx-auto px-4 py-12 max-w-5xl">
                {/* Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
                    {[
                        { label: "Total Students", value: grandTotal.total, color: "bg-navy text-white" },
                        { label: "Girls", value: grandTotal.girls, color: "bg-pink-50 text-pink-700 border border-pink-200" },
                        { label: "Boys", value: grandTotal.boys, color: "bg-blue-50 text-blue-700 border border-blue-200" },
                        { label: "RTE", value: grandTotal.rte, color: "bg-green-50 text-green-700 border border-green-200" },
                        { label: "On Hold", value: grandTotal.hold, color: "bg-amber-50 text-amber-700 border border-amber-200" },
                    ].map((card) => (
                        <div key={card.label} className={`rounded-xl p-4 text-center ${card.color}`}>
                            <p className="text-2xl md:text-3xl font-bold font-display">{card.value}</p>
                            <p className="text-xs font-semibold uppercase tracking-wider mt-1 opacity-80">{card.label}</p>
                        </div>
                    ))}
                </div>

                {/* Main Table */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                    <div className="bg-navy px-6 py-4">
                        <h2 className="text-white font-display font-bold text-lg md:text-xl">
                            ClassWise Student Strength — Session {SESSION}
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-navy/5 border-b border-navy/10">
                                    <th className="text-left px-4 py-3 font-bold text-navy uppercase tracking-wider text-xs">Class</th>
                                    <th className="text-left px-4 py-3 font-bold text-navy uppercase tracking-wider text-xs">Section</th>
                                    <th className="text-center px-4 py-3 font-bold text-green-700 uppercase tracking-wider text-xs">RTE</th>
                                    <th className="text-center px-4 py-3 font-bold text-pink-700 uppercase tracking-wider text-xs">Girls</th>
                                    <th className="text-center px-4 py-3 font-bold text-blue-700 uppercase tracking-wider text-xs">Boys</th>
                                    <th className="text-center px-4 py-3 font-bold text-navy uppercase tracking-wider text-xs">Total</th>
                                    <th className="text-center px-4 py-3 font-bold text-amber-700 uppercase tracking-wider text-xs">Hold</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentStrengthData.map((classData, classIndex) => (
                                    <>
                                        {classData.sections.map((sec, secIndex) => (
                                            <tr
                                                key={`${classData.className}-${sec.section}`}
                                                className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                                            >
                                                {secIndex === 0 ? (
                                                    <td
                                                        rowSpan={classData.sections.length}
                                                        className="px-4 py-2.5 font-bold text-navy text-base align-middle"
                                                    >
                                                        {classData.className}
                                                    </td>
                                                ) : null}
                                                <td className="px-4 py-2.5 text-gray-600">{sec.section}</td>
                                                <td className="px-4 py-2.5 text-center text-gray-700">{sec.rte}</td>
                                                <td className="px-4 py-2.5 text-center text-pink-600 font-medium">{sec.girls}</td>
                                                <td className="px-4 py-2.5 text-center text-blue-600 font-medium">{sec.boys}</td>
                                                <td className="px-4 py-2.5 text-center font-semibold text-navy">{sec.total}</td>
                                                <td className="px-4 py-2.5 text-center text-gray-500">{sec.hold}</td>
                                            </tr>
                                        ))}
                                        {/* Class Total Row */}
                                        <tr
                                            key={`${classData.className}-total`}
                                            className="bg-navy/[0.03] border-b-2 border-navy/10"
                                        >
                                            <td colSpan={2} className="px-4 py-2.5 font-bold text-navy text-right text-xs uppercase tracking-wider">
                                                {classData.className} Total
                                            </td>
                                            <td className="px-4 py-2.5 text-center font-bold text-green-700">{classData.classTotal.rte}</td>
                                            <td className="px-4 py-2.5 text-center font-bold text-pink-700">{classData.classTotal.girls}</td>
                                            <td className="px-4 py-2.5 text-center font-bold text-blue-700">{classData.classTotal.boys}</td>
                                            <td className="px-4 py-2.5 text-center font-extrabold text-navy text-base">{classData.classTotal.total}</td>
                                            <td className="px-4 py-2.5 text-center font-bold text-amber-700">{classData.classTotal.hold}</td>
                                        </tr>
                                    </>
                                ))}

                                {/* Grand Total */}
                                <tr className="bg-navy text-white">
                                    <td colSpan={2} className="px-4 py-4 font-bold text-lg font-display">
                                        Grand Total
                                    </td>
                                    <td className="px-4 py-4 text-center font-bold text-green-300 text-lg">{grandTotal.rte}</td>
                                    <td className="px-4 py-4 text-center font-bold text-pink-300 text-lg">{grandTotal.girls}</td>
                                    <td className="px-4 py-4 text-center font-bold text-blue-300 text-lg">{grandTotal.boys}</td>
                                    <td className="px-4 py-4 text-center font-extrabold text-gold text-xl">{grandTotal.total}</td>
                                    <td className="px-4 py-4 text-center font-bold text-amber-300 text-lg">{grandTotal.hold}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer note */}
                <p className="text-center text-xs text-gray-400 mt-6">
                    Data as per official records for Academic Session {SESSION}. RTE = Right to Education quota.
                </p>
            </div>
        </div>
    );
}
