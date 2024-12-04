import { LucideIcon } from "lucide-react";

interface DropdownItemProps {
    icon?: LucideIcon;
    text: string;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    disabledMessage?: string;
}

export function DropdownItem({
	icon: Icon,
	text,
	onClick,
	className = '',
	disabled = false,
	disabledMessage,
}: DropdownItemProps) {
	return (
		<li>
			<a
				onClick={disabled ? undefined : onClick}
				className={`
          flex items-center gap-2
          ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-base-200'}
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
