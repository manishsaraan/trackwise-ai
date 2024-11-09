"use client";

import { DropdownWrapper, DropdownItem } from "@/app/components/ui/dropdown";
import { Eye, Users, ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

export default function JobActions({ jobSlug }: { jobSlug: string }) {
  const router = useRouter();
  return (
    <DropdownWrapper trigger={<MoreHorizontal className="w-4 h-4" />}>
      <DropdownItem
        icon={Eye}
        text="View Details"
        onClick={() => router.push(`/jobs/${jobSlug}`)}
      />
      <DropdownItem
        icon={Users}
        text="View Applicants"
        onClick={() => router.push(`/jobs/${jobSlug}/applicants`)}
      />
      <DropdownItem
        icon={ArrowUpDown}
        text="Close Job"
        onClick={() => {
          /* handle status change */
        }}
      />
    </DropdownWrapper>
  );
}
