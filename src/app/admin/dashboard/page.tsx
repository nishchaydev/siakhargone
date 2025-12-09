
import type { Metadata } from 'next';
import AdminDashboardClient from '../AdminDashboardClient';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Manage website content for Sanskar International Academy.',
};

export default function AdminDashboardPage() {
    return <AdminDashboardClient />;
}
