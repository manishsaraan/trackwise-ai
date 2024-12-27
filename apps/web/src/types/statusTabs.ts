import { CheckCircle, CheckCircle2, Clock, XCircle } from 'lucide-react';

const iconMap = {
	CheckCircle2: CheckCircle2,
	Clock: Clock,
	XCircle: XCircle,
	CheckCircle: CheckCircle,
};

type BaseStatusTabConfig = {	
	id: string;
	label: string; 
	color: string;
	description: string;
	count?: number;
}

export type StatusTabConfig = BaseStatusTabConfig & {
	iconName: keyof typeof iconMap;
}

export type StatusTabConfigWithoutIcon = BaseStatusTabConfig & {
	iconName: string;
}

export type StatusTabType = 'jobs' | 'applicants';
