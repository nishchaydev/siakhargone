
"use client";

import React from "react";

export default function AdminDashboardClient() {
  // Mock user for admin dashboard view
  const user = { displayName: 'Administrator' };

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
    </section>
  );
}
