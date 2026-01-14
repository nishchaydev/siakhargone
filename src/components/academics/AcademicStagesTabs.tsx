"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, BookOpen, Brain, GraduationCap } from "lucide-react";
import { MotionDiv } from '@/components/common/Motion';

const stages = [
    {
        id: "pre-primary",
        label: "Pre-Primary",
        fullTitle: "Foundation Stage (Nursery - KG II)",
        description: "Play-based learning focusing on curiosity, motor skills, and social development.",
        subjects: ["English", "Hindi", "Mathematics", "EVS (General Awareness)", "Art & Craft", "Music & Dance", "Physical Education"],
        methodology: [
            "Play-way Method",
            "Montessori Approach",
            "Activity-based Learning",
            "Storytelling & Puppetry",
            "Nature Walks"
        ],
        assessment: "Continuous observation and qualitative feedback. No formal examinations to ensure a stress-free environment."
    },
    {
        id: "primary",
        label: "Primary",
        fullTitle: "Preparatory Stage (Class I - V)",
        description: "Building strong foundations in literacy, numeracy, and critical thinking.",
        subjects: ["English", "Hindi", "Mathematics", "EVS / Science", "Social Studies", "Computer Science", "General Knowledge", "Value Education"],
        methodology: [
            "Experiential Learning",
            "Project-based Learning",
            "Interactive Smart Classes",
            "Group Discussions",
            "Field Trips"
        ],
        assessment: "Periodic assessments focusing on core competencies, subject enrichment, and notebook submission."
    },
    {
        id: "middle",
        label: "Middle",
        fullTitle: "Middle Stage (Class VI - VIII)",
        description: "Encouraging independent thinking, exploration, and subject specialization.",
        subjects: ["English", "Hindi", "Sanskrit", "Mathematics", "Science", "Social Science", "Computer / AI", "Arts & Vocational Skills"],
        methodology: [
            "Inquiry-based Learning",
            "Lab Experiments",
            "Inter-disciplinary Projects",
            "Debates & Quizzes",
            "Coding & Robotics Workshops"
        ],
        assessment: "Balanced approach with periodic tests (Unit Tests), term-end examinations, and internal assessments."
    },
    {
        id: "secondary",
        label: "Secondary",
        fullTitle: "Secondary Stage (Class IX - X)",
        description: "Rigorous academic preparation focusing on board examination standards and career foundations.",
        subjects: ["English Language & Lit.", "Hindi Course B", "Mathematics (Standard/Basic)", "Science", "Social Science", "Information Technology (AI)"],
        methodology: [
            "Concept-driven Teaching",
            "Problem-solving Sessions",
            "Lab-based Practical Learning",
            "Sample Paper Practice",
            "Career Counseling"
        ],
        assessment: "Aligned with CBSE Board patterns. Periodic Tests, Multiple Assessments, Portfolio, and Subject Enrichment Activities."
    },
    {
        id: "senior",
        label: "Senior Secondary",
        fullTitle: "Senior Secondary (Class XI - XII)",
        description: "Specialized streams providing in-depth knowledge for higher education and competitive exams.",
        subjects: [
            "Science Stream: Physics, Chemistry, Maths/Biology, English, PE/CS",
            "Commerce Stream: Accountancy, Business Studies, Economics, English, PE/Maths",
            "Humanities: History, Political Science, Geography/Psychology, English, PE/IP"
        ],
        methodology: [
            "Lecture & Demonstration",
            "Advanced Lab Work",
            "Case Studies (Commerce/Humanities)",
            "Competitive Exam Prep (JEE/NEET)",
            "Research Projects"
        ],
        assessment: "Strict adherence to CBSE Board guidelines. Unit Tests, Half-Yearly, Pre-Boards, and Practical Examinations."
    }
];

export function AcademicStagesTabs() {
    return (
        <div className="w-full">
            <Tabs defaultValue="pre-primary" className="w-full flex flex-col items-center">
                <TabsList className="grid w-full max-w-4xl grid-cols-2 md:grid-cols-5 h-auto p-1 bg-navy/5 gap-2 md:gap-0 mb-8 rounded-xl">
                    {stages.map((stage) => (
                        <TabsTrigger
                            key={stage.id}
                            value={stage.id}
                            className="data-[state=active]:bg-navy data-[state=active]:text-white py-3 rounded-lg text-sm md:text-xs lg:text-sm font-medium transition-all"
                        >
                            {stage.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {stages.map((stage) => (
                    <TabsContent key={stage.id} value={stage.id} className="w-full max-w-5xl">
                        <MotionDiv
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="grid gap-6 md:grid-cols-3"
                        >
                            {/* Main Info Card */}
                            <div className="md:col-span-2 space-y-6">
                                <Card className="border-t-4 border-t-navy shadow-md">
                                    <CardHeader>
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 bg-navy/10 rounded-lg text-navy">
                                                <GraduationCap size={24} />
                                            </div>
                                            <CardTitle className="text-2xl text-navy">{stage.fullTitle}</CardTitle>
                                        </div>
                                        <CardDescription className="text-base">{stage.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div>
                                            <h4 className="font-bold text-navy mb-3 flex items-center gap-2">
                                                <BookOpen size={18} /> Key Subjects
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {stage.subjects.map((sub, i) => (
                                                    <Badge key={i} variant="secondary" className="text-navy bg-indigo-50 hover:bg-indigo-100">
                                                        {sub}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-navy mb-3 flex items-center gap-2">
                                                <Brain size={18} /> Teaching Methodology
                                            </h4>
                                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                {stage.methodology.map((method, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                                        <CheckCircle2 size={16} className="text-green-600 mt-0.5 shrink-0" />
                                                        {method}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Sidebar Assessment Card */}
                            <div className="md:col-span-1">
                                <Card className="bg-gold/5 border-gold/20 h-full shadow-sm">
                                    <CardHeader>
                                        <CardTitle className="text-lg text-navy-dark">Assessment Pattern</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-gray-700 leading-relaxed">
                                            {stage.assessment}
                                        </p>

                                        <div className="mt-6 pt-6 border-t border-gold/10">
                                            <h5 className="font-bold text-sm text-navy mb-2">Highlights</h5>
                                            <ul className="space-y-2 text-xs text-muted-foreground">
                                                <li className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                                                    Holistic Development
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                                                    Focus on Understanding
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                                                    Regular Parent Updates
                                                </li>
                                            </ul>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </MotionDiv>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}
