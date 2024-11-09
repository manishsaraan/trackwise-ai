"use client";

import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface DropdownWrapperProps {
  children: ReactNode;
  trigger?: ReactNode;
  className?: string;
}

interface DropdownItemProps {
  icon?: LucideIcon;
  text: string;
  onClick?: () => void;
  className?: string;
}

export function DropdownWrapper({
  children,
  trigger,
  className = "",
}: DropdownWrapperProps) {
  return (
    <div className={`dropdown dropdown-end ${className}`}>
      <label tabIndex={0} className="btn btn-ghost btn-sm">
        {trigger}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow-xl bg-base-100 rounded-box w-52"
      >
        {children}
      </ul>
    </div>
  );
}

export function DropdownItem({
  icon: Icon,
  text,
  onClick,
  className = "",
}: DropdownItemProps) {
  return (
    <li>
      <a onClick={onClick} className={`flex items-center gap-2 ${className}`}>
        {Icon && <Icon className="w-4 h-4" />}
        {text}
      </a>
    </li>
  );
}
