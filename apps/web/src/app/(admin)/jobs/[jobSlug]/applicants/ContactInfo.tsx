import { useState } from 'react';

import CopyButton from '@/components/copy-button';
import { LucideIcon } from 'lucide-react';

const ContactInfo = ({ icon: Icon, value, label }: { icon: LucideIcon; value: string; label: string }) => {
	const [showCopied, setShowCopied] = useState(false);

	const getMaskedValue = (value: string, type: 'email' | 'phone') => {
		if (type === 'email') {
			const [username, domain] = value.split('@');
			return `${username.charAt(0)}***@${domain}`;
		}
		return value;
	};

	if (!value) {
		return null;
	}
	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center gap-2 bg-base-200 hover:bg-base-300 transition-colors rounded-lg px-3 py-1.5 w-[220px]">
				<Icon className="w-4 h-4 text-base-content/60 shrink-0" />
				<span className="text-sm font-medium truncate">
					{getMaskedValue(value, label.toLowerCase() as 'email' | 'phone')}
				</span>
				<div className="tooltip ml-auto shrink-0" data-tip={showCopied ? 'Copied!' : 'Click to copy'}>
					<CopyButton
						text={value}
						onCopy={() => {
							setShowCopied(true);
							setTimeout(() => setShowCopied(false), 2000);
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default ContactInfo;
