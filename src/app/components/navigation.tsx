"use client";
import { UserButton } from "@stackframe/stack";
import Link from "next/link";

export default function TopNavBar() {
  return (
    <header className="w-full bg-base-100 shadow-md">
      <div className="  mx-auto  flex items-center justify-between py-4 px-6">
        <Link href="/" className="text-2xl font-bold">
          TrackWiseAI
        </Link>
        <div className="dropdown dropdown-end">
          <UserButton showUserInfo={true} />
        </div>
      </div>
    </header>
  );
}
