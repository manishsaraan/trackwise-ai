import { ReactNode } from 'react';
import { DropdownItem } from '@/components/dropdown-options/dropdown-options-item';

interface DropdownWrapperProps {
	children: ReactNode;
	trigger?: ReactNode;
	className?: string;
	disabled?: boolean;
}

export function DropdownWrapper({ children, trigger, className = '', disabled = false }: DropdownWrapperProps) {
	return (
		<div className={`dropdown dropdown-end ${className} ${disabled ? 'opacity-50' : ''}`}>
			<label
				tabIndex={disabled ? undefined : 0}
				className={`btn btn-ghost btn-sm ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
			>
				{trigger}
			</label>
			{!disabled && (
				<ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-xl bg-base-100 rounded-box w-52">
					{children}
				</ul>
			)}
		</div>
	);
}

