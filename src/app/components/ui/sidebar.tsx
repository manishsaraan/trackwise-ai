"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col items-center h-screen sticky top-0 overflow-y-auto space-y-4 w-56 py-6 bg-base-200">
      <div className="w-full px-4">
        <Link href="/" className="text-lg font-semibold">
          TrackWiseAI
        </Link>
      </div>

      <ul className="menu menu-lg w-full px-0 text-sm">
        <li>
          <Link
            href="/jobs/create"
            className={`flex rounded-none items-center gap-3 ${
              pathname === "/jobs/create" ? "active" : ""
            }`}
          >
            <i className="fa-solid fa-inbox fa-fw"></i>
            <span>Post New Job</span>
          </Link>
        </li>
        <li>
          <Link
            href="/jobs"
            className={`flex rounded-none items-center gap-3 ${
              pathname === "/jobs" ? "active" : ""
            }`}
          >
            <i className="fa-solid fa-user fa-fw"></i>
            <span>My Jobs</span>
          </Link>
        </li>
        <li>
          <Link
            href="/handler/account-settings"
            className={`flex rounded-none items-center gap-3 ${
              pathname === "/handler/account-settings" ? "active" : ""
            }`}
          >
            <i className="fa-solid fa-gear fa-fw"></i>
            <span>Settings</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}
