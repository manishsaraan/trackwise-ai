import { useState } from 'react';

import { Check, Copy } from 'lucide-react';

const CopyButton = ({ text, onCopy }: { text: string; onCopy: () => void }) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(text);
		setCopied(true);
		onCopy();
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<button onClick={handleCopy} className="btn btn-ghost btn-xs">
			{copied ? <Check className="w-3 h-3 text-success" /> : <Copy className="w-3 h-3" />}
		</button>
	);
};

export default CopyButton;
