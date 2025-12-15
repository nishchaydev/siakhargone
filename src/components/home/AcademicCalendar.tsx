"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { events } from "@/data/events";
import { format, isSameDay, parseISO } from "date-fns";
import { CalendarDays, MapPin } from "lucide-react";

export function AcademicCalendar() {
    const [date, setDate] = useState<Date | undefined>(new Date());

    // Function to highlight dates that have events
    const hasEvent = (day: Date) => {
        return events.some(event => isSameDay(parseISO(event.date), day));
    };

    const selectedEvents = date
        ? events.filter(event => isSameDay(parseISO(event.date), date))
        : [];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Calendar Side */}
            <div className="bg-white rounded-xl shadow-lg border p-4">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md mx-auto"
                    modifiers={{ hasEvent: (date) => hasEvent(date) }}
                    modifiersStyles={{
                        hasEvent: {
                            fontWeight: 'bold',
                            textDecoration: 'underline',
                            color: 'var(--primary)',
                        }
                    }}
                    footer={
                        <div className="text-center text-xs text-muted-foreground mt-4">
                            * Dates with dots/lines indicate upcoming school events.
                        </div>
                    }
                />
            </div>

            {/* Events Detail Side */}
            <div className="relative min-h-[350px]">
                <h3 className="text-2xl font-display font-bold text-navy mb-4 flex items-center gap-2">
                    <CalendarDays className="h-6 w-6 text-gold" />
                    Events on {date ? format(date, "MMMM do, yyyy") : "Selected Date"}
                </h3>

                <AnimatePresence mode="wait">
                    {selectedEvents.length > 0 ? (
                        <motion.div
                            key={date?.toISOString()}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4"
                        >
                            {selectedEvents.map(event => (
                                <Card key={event.id} className="border-l-4 border-l-gold shadow-sm hover:shadow-md transition-shadow">
                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between items-start">
                                            <CardTitle className="text-lg font-bold text-navy">{event.title}</CardTitle>
                                            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                                                {format(parseISO(event.date), "EEE")}
                                            </Badge>
                                        </div>
                                        <CardDescription className="flex items-center gap-1 text-xs">
                                            <MapPin className="h-3 w-3" /> School Campus
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {event.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-xl bg-gray-50 text-center p-6"
                        >
                            <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                                <CalendarDays className="h-6 w-6 text-gray-400" />
                            </div>
                            <h4 className="font-semibold text-gray-900">No events scheduled</h4>
                            <p className="text-sm text-gray-500 max-w-xs mt-2">
                                There are no specific academic or sports events listed for this date. Regular classes will be held as per schedule.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
