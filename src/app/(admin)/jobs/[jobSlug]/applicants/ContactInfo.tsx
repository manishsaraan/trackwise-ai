import CopyButton from "@/app/components/CopyButton";
import { LucideIcon } from "lucide-react";
import { useState } from "react";

const ContactInfo = ({
  icon: Icon,
  value,
  label,
}: {
  icon: LucideIcon;
  value: string;
  label: string;
}) => {
  const [showCopied, setShowCopied] = useState(false);

  const getMaskedValue = (value: string, type: "email" | "phone") => {
    if (type === "email") {
      const [username, domain] = value.split("@");
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
          {getMaskedValue(value, label.toLowerCase() as "email" | "phone")}
        </span>
        <div
          className="tooltip ml-auto shrink-0"
          data-tip={showCopied ? "Copied!" : "Click to copy"}
        >
          <CopyButton
            text={value}
            onCopy={() => {
              setShowCopied(true);
              setTimeout(() => setShowCopied(false), 2000);
            }}
            className="btn btn-ghost btn-xs p-0 h-auto min-h-0"
            iconClassName="w-3 h-3"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
