"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus, Briefcase, Settings } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col items-start h-screen sticky top-0 overflow-y-auto space-y-6 py-4 w-64 bg-base-200">
      <nav className="w-full">
        <ul className="menu menu-lg w-full px-0 text-base [&_.active]:bg-primary [&_.active]:text-primary-content rounded-none">
          <li>
            <Link
              href="/jobs/create"
              className={`flex items-center gap-3 px-6 py-3 rounded-none ${
                pathname === "/jobs/create" ? "active" : ""
              }`}
            >
              <Plus className="w-5 h-5" />
              <span>Post New Job</span>
            </Link>
          </li>
          <li>
            <Link
              href="/jobs"
              className={`flex items-center gap-3 px-6 py-3 rounded-none ${
                pathname === "/jobs" ? "active" : ""
              }`}
            >
              <Briefcase className="w-5 h-5" />
              <span>My Jobs</span>
            </Link>
          </li>
          <li>
            <Link
              href="/handler/account-settings"
              className={`flex items-center gap-3 px-6 py-3 rounded-none ${
                pathname === "/handler/account-settings" ? "active" : ""
              }`}
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
