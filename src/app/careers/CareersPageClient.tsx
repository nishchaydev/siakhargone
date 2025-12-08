"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Job } from "@/lib/definitions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Briefcase, MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ApplicationForm } from "./ApplicationForm";

import { fallbackJobs } from "@/data/fallbackData";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function CareersPageClient() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Use fallback data directly since Firebase is removed
  const jobsToDisplay = fallbackJobs;
  const isLoading = false;

  const openPositions = jobsToDisplay.filter(job => job.status === 'Open');
  const showLoading = isLoading && openPositions.length === 0;

  const handleApplySuccess = () => {
    setSelectedJob(null);
  };

  return (
    <>
      <section className="relative h-64 md:h-80 w-full">
        <Image
          src="https://images.unsplash.com/photo-1521790797524-b2497295b8a0?q=80&w=2070&auto=format&fit=crop"
          alt="Team collaborating in an office"
          fill
          className="object-cover"
          data-ai-hint="team collaboration"
          priority
        />
        <div className="absolute inset-0 bg-primary/70" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-primary-foreground p-4">
          <motion.h1
            className="text-4xl font-bold md:text-5xl font-headline"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join Our Team
          </motion.h1>
          <motion.p
            className="mt-2 max-w-2xl text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Build the future with Sanskar International Academy.
          </motion.p>
        </div>
      </section>
      <section id="openings" className="py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline text-primary">
              Current Openings
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              We're looking for passionate individuals to join our mission of educational excellence.
            </p>
          </div>

          {showLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-10 w-28" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : openPositions.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {openPositions.map((job) => (
                <motion.div key={job.id} variants={itemVariants}>
                  <Card className="flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        <Badge variant={job.status === 'Open' ? 'default' : 'secondary'} className="bg-green-100 text-green-800">{job.status}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                        <div className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" />{job.department}</div>
                        <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{job.location}</div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardDescription>{job.description}</CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" onClick={() => setSelectedJob(job)}>Apply Now</Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
              <Briefcase className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-xl font-semibold">No Openings Available</h3>
              <p className="mt-2 text-muted-foreground">Please check back later for future opportunities.</p>
            </div>
          )}
        </div>
      </section>
      <Dialog open={!!selectedJob} onOpenChange={(isOpen) => !isOpen && setSelectedJob(null)}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Apply for {selectedJob?.title}</DialogTitle>
            <DialogDescription>
              Submit your application by filling out the form below.
            </DialogDescription>
          </DialogHeader>
          {selectedJob && (
            <ApplicationForm
              job={selectedJob}
              onSuccess={handleApplySuccess}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
