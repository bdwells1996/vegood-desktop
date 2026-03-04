import {
	AlertCircle,
	ArrowRight,
	Bell,
	Check,
	Heart,
	Mail,
	Search,
	Star,
	Trash2,
	X,
} from "lucide-react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Icon, type IconSize } from "@/app/components/Icon";

const meta = {
	title: "Components/Icon",
	component: Icon,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		size: {
			control: "select",
			options: ["xs", "sm", "md", "lg", "xl"] satisfies IconSize[],
		},
		strokeWidth: {
			control: { type: "number", min: 0.5, max: 3, step: 0.25 },
		},
	},
	args: {
		icon: Check,
	},
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		icon: Check,
		size: "md",
	},
};

export const AllSizes: Story = {
	render: () => (
		<div className="flex items-end gap-6">
			{(["xs", "sm", "md", "lg", "xl"] as IconSize[]).map((size) => (
				<div key={size} className="flex flex-col items-center gap-2">
					<Icon icon={Check} size={size} />
					<span className="font-mono text-[11px] text-slate-400">{size}</span>
				</div>
			))}
		</div>
	),
};

export const StrokeWidths: Story = {
	render: () => (
		<div className="flex items-center gap-6">
			{[0.5, 1, 1.5, 2, 2.5, 3].map((sw) => (
				<div key={sw} className="flex flex-col items-center gap-2">
					<Icon icon={Check} size="lg" strokeWidth={sw} />
					<span className="font-mono text-[11px] text-slate-400">{sw}</span>
				</div>
			))}
		</div>
	),
};

export const CommonIcons: Story = {
	render: () => (
		<div className="flex flex-wrap items-center gap-4">
			{[
				{ icon: Check, name: "Check" },
				{ icon: X, name: "X" },
				{ icon: AlertCircle, name: "AlertCircle" },
				{ icon: Mail, name: "Mail" },
				{ icon: Bell, name: "Bell" },
				{ icon: Search, name: "Search" },
				{ icon: Heart, name: "Heart" },
				{ icon: Star, name: "Star" },
				{ icon: Trash2, name: "Trash2" },
				{ icon: ArrowRight, name: "ArrowRight" },
			].map(({ icon, name }) => (
				<div key={name} className="flex flex-col items-center gap-2">
					<Icon icon={icon} size="md" aria-label={name} />
					<span className="font-mono text-[11px] text-slate-400">{name}</span>
				</div>
			))}
		</div>
	),
};

export const WithAriaLabel: Story = {
	args: {
		icon: Bell,
		size: "md",
		"aria-label": "Notifications",
	},
};

export const ExtraSmall: Story = { args: { icon: Check, size: "xs" } };
export const Small: Story = { args: { icon: Check, size: "sm" } };
export const Medium: Story = { args: { icon: Check, size: "md" } };
export const Large: Story = { args: { icon: Check, size: "lg" } };
export const ExtraLarge: Story = { args: { icon: Check, size: "xl" } };
