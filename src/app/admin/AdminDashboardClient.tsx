
"use client";

import React, { useState } from "react";
import { Loader2, RefreshCw, Database } from "lucide-react";
import { Button } from "@/components/ui/button";


export default function AdminDashboardClient() {
  // Mock user for admin dashboard view
  const user = { displayName: 'Administrator' };
  const [seeding, setSeeding] = useState(false);
  const [message, setMessage] = useState("");

  const handleSeed = async () => {
    if (!confirm("Are you sure you want to re-seed/update the site data? This ensures all Google Sheet data is synced.")) return;

    setSeeding(true);
    setMessage("Updating site data...");
    try {
      const res = await fetch('/api/admin/seed-data?key=sia_seed_2026');
      const data = await res.json();
      if (data.success) {
        const stats = `Synced: ${data.results.achievements} Achievements, ${data.results.news} News, ${data.results.events} Events`;
        setMessage(`✅ Success! ${stats}`);
        // alert(`Success! ${stats}`);
      } else {
        setMessage("❌ Update failed: " + (data.error || "Unknown error"));
      }
    } catch (e) {
      console.error(e);
      setMessage("❌ Error connecting to server.");
    } finally {
      setSeeding(false);
    }
  };

  return (
    <section className="p-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        Welcome, {user?.displayName || 'Administrator'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-6 rounded-xl shadow-sm">
          <h3 className="font-bold text-lg text-blue-900">Manage Content</h3>
          <p className="text-sm text-gray-600 mt-1">
            Add or update sections like Principal’s message, highlights, etc.
          </p>
        </div>
        <div className="bg-green-100 p-6 rounded-xl shadow-sm">
          <h3 className="font-bold text-lg text-green-900">View Submissions</h3>
          <p className="text-sm text-gray-600 mt-1">
            See contact form and admission inquiries.
          </p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-xl shadow-sm">
          <h3 className="font-bold text-lg text-yellow-900">Analytics</h3>
          <p className="text-sm text-gray-600 mt-1">
            Track engagement and performance metrics.
          </p>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-xl text-navy flex items-center gap-2">
              <Database className="w-5 h-5 text-gold" />
              System Data Sync
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Manually trigger a data refresh from Google Sheets to the Database.
            </p>
          </div>
          <Button
            onClick={handleSeed}
            disabled={seeding}
            className="bg-navy hover:bg-navy/90 text-white"
          >
            {seeding ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Update Site Data
              </>
            )}
          </Button>
        </div>

        {message && (
          <div className={`p-4 rounded-lg text-sm font-medium ${message.includes('Success') ? 'bg-green-50 text-green-700' : message.includes('Updating') ? 'bg-blue-50 text-blue-700' : 'bg-red-50 text-red-700'}`}>
            {message}
          </div>
        )}
      </div>
    </section>
  );
}
