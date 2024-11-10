"use client";

import { UserButton } from "@stackframe/stack";

export default function Navigation() {
  return (
    <div className="navbar bg-base-300/20 border-t border-base-300 py-3 px-10">
      <div className="flex-1"></div>

      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <UserButton showUserInfo={true} />
        </div>
      </div>
    </div>
  );
}
