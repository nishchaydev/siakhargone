
"use client";

import { useUser } from "@/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminLoginClient from "./AdminLoginClient";
import { Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // If user data has loaded and a user exists, redirect them away from the login page.
    if (!isUserLoading && user) {
      router.push("/admin/dashboard");
    }
  }, [user, isUserLoading, router]);

  // While checking auth state, show a full-screen loader.
  if (isUserLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // If a user is logged in, we are about to redirect, so render nothing to avoid a flash of the login form.
  if (user) {
    return null;
  }
  
  // Only render the login form if there is no user and the auth check is complete.
  return <AdminLoginClient />;
}
