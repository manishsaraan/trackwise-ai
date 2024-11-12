"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus, Briefcase, Settings } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col items-center h-screen sticky top-0 overflow-y-auto space-y-4 w-56 py-6 bg-base-200">
      <div className="w-full px-3">
        <Link href="/" className="text-lg font-semibold">
          TrackWiseAI
        </Link>
      </div>

      <ul className="menu menu-lg w-full px-0 text-sm [&_.active]:bg-black/10">
        <li>
          <Link
            href="/jobs/create"
            className={`flex items-center gap-2 px-3 ${
              pathname === "/jobs/create" ? "active rounded-none" : ""
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Post New Job</span>
            <kbd
              className={`kbd kbd-sm ml-auto text-base-content opacity-60 ${
                pathname === "/jobs/create" ? "bg-white" : "bg-base-200"
              }`}
            >
              ⌘N
            </kbd>
          </Link>
        </li>
        <li>
          <Link
            href="/jobs"
            className={`flex items-center gap-2 px-3 ${
              pathname === "/jobs" ? "active rounded-none" : ""
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>My Jobs</span>
            <kbd
              className={`kbd kbd-sm ml-auto text-base-content opacity-60 ${
                pathname === "/jobs" ? "bg-white" : "bg-base-200"
              }`}
            >
              ⌘J
            </kbd>
          </Link>
        </li>
        <li>
          <Link
            href="/handler/account-settings"
            className={`flex items-center gap-2 px-3 ${
              pathname === "/handler/account-settings" ? "active" : ""
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
            <kbd
              className={`kbd kbd-sm ml-auto text-base-content opacity-60 ${
                pathname === "/handler/account-settings"
                  ? "bg-white"
                  : "bg-base-200"
              }`}
            >
              ⌘,
            </kbd>
          </Link>
        </li>
      </ul>
    </aside>
  );
}
