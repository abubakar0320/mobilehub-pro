import { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export const metadata: Metadata = {
  title: "Admin Dashboard | MobileHub Pro",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen flex"
      style={{ background: "#0f0f14", color: "#e4e4e7" }}
    >
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-h-screen ml-[260px]">
        <AdminHeader />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
