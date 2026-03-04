import { AlertCircle, Check, Mail } from "lucide-react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "@/app/components";

const meta = {
	title: "Components/Button",
	component: Button,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["primary", "secondary", "ghost", "destructive"],
		},
		size: {
			control: "select",
			options: ["xs", "sm", "md", "lg", "xl"],
		},
		disabled: {
			control: "boolean",
		},
		loading: {
			control: "boolean",
		},
		type: {
			control: "select",
			options: ["button", "submit", "reset"],
		},
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Size Stories
export const ExtraSmall: Story = {
	args: {
		size: "xs",
		children: "Button",
	},
};

export const Small: Story = {
	args: {
		size: "sm",
		children: "Button",
	},
};

export const Medium: Story = {
	args: {
		size: "md",
		children: "Button",
	},
};

export const Large: Story = {
	args: {
		size: "lg",
		children: "Button",
	},
};

export const ExtraLarge: Story = {
	args: {
		size: "xl",
		children: "Button",
	},
};

export const AllSizes: Story = {
	args: { children: "" },
	render: () => (
		<div className="flex items-end gap-4">
			<Button size="xs">XSmall</Button>
			<Button size="sm">Small</Button>
			<Button size="md">Medium</Button>
			<Button size="lg">Large</Button>
			<Button size="xl">XLarge</Button>
		</div>
	),
};

export const AllSizesWithIcon: Story = {
	args: { children: "" },
	render: () => (
		<div className="flex items-end gap-4">
			<Button size="xs" iconLeft={Check}>XSmall</Button>
			<Button size="sm" iconLeft={Check}>Small</Button>
			<Button size="md" iconLeft={Check}>Medium</Button>
			<Button size="lg" iconLeft={Check}>Large</Button>
			<Button size="xl" iconLeft={Check}>XLarge</Button>
		</div>
	),
};

// Primary Variant Stories
export const Primary: Story = {
	args: {
		variant: "primary",
		children: "Primary Button",
	},
};

export const PrimaryWithIcon: Story = {
	args: {
		variant: "primary",
		iconLeft: Check,
		children: "Confirm",
	},
};

export const PrimaryLoading: Story = {
	args: {
		variant: "primary",
		loading: true,
		children: "Loading...",
	},
};

export const PrimaryDisabled: Story = {
	args: {
		variant: "primary",
		disabled: true,
		children: "Disabled",
	},
};

// Secondary Variant Stories
export const Secondary: Story = {
	args: {
		variant: "secondary",
		children: "Secondary Button",
	},
};

export const SecondaryWithIcon: Story = {
	args: {
		variant: "secondary",
		iconLeft: Mail,
		children: "Send Email",
	},
};

export const SecondaryLoading: Story = {
	args: {
		variant: "secondary",
		loading: true,
		children: "Processing...",
	},
};

export const SecondaryDisabled: Story = {
	args: {
		variant: "secondary",
		disabled: true,
		children: "Disabled",
	},
};

// Ghost Variant Stories
export const Ghost: Story = {
	args: {
		variant: "ghost",
		children: "Ghost Button",
	},
};

export const GhostWithIcon: Story = {
	args: {
		variant: "ghost",
		iconLeft: Check,
		children: "Approve",
	},
};

export const GhostLoading: Story = {
	args: {
		variant: "ghost",
		loading: true,
		children: "Loading...",
	},
};

export const GhostDisabled: Story = {
	args: {
		variant: "ghost",
		disabled: true,
		children: "Disabled",
	},
};

// Destructive Variant Stories
export const Destructive: Story = {
	args: {
		variant: "destructive",
		children: "Delete",
	},
};

export const DestructiveWithIcon: Story = {
	args: {
		variant: "destructive",
		iconLeft: AlertCircle,
		children: "Delete Forever",
	},
};

export const DestructiveLoading: Story = {
	args: {
		variant: "destructive",
		loading: true,
		children: "Deleting...",
	},
};

export const DestructiveDisabled: Story = {
	args: {
		variant: "destructive",
		disabled: true,
		children: "Disabled",
	},
};

// Button Types
export const SubmitButton: Story = {
	args: {
		variant: "primary",
		type: "submit",
		children: "Submit Form",
	},
};

export const ResetButton: Story = {
	args: {
		variant: "secondary",
		type: "reset",
		children: "Reset Form",
	},
};
