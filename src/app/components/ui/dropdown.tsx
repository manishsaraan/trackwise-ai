import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface DropdownWrapperProps {
  children: ReactNode;
  trigger?: ReactNode;
  className?: string;
  disabled?: boolean;
}

interface DropdownItemProps {
  icon?: LucideIcon;
  text: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  disabledMessage?: string;
}

export function DropdownWrapper({
  children,
  trigger,
  className = "",
  disabled = false,
}: DropdownWrapperProps) {
  return (
    <div
      className={`dropdown dropdown-end ${className} ${
        disabled ? "opacity-50" : ""
      }`}
    >
      <label
        tabIndex={disabled ? undefined : 0}
        className={`btn btn-ghost btn-sm ${
          disabled ? "cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        {trigger}
      </label>
      {!disabled && (
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow-xl bg-base-100 rounded-box w-52"
        >
          {children}
        </ul>
      )}
    </div>
  );
}

export function DropdownItem({
  icon: Icon,
  text,
  onClick,
  className = "",
  disabled = false,
  disabledMessage,
}: DropdownItemProps) {
  return (
    <li>
      <a
        onClick={disabled ? undefined : onClick}
        className={`
          flex items-center gap-2
          ${
            disabled
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer hover:bg-base-200"
          }
          ${className}
        `}
        title={disabled ? disabledMessage : undefined}
      >
        {Icon && <Icon className="w-4 h-4" />}
        {text}
      </a>
    </li>
  );
}
