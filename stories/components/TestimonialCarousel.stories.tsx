import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TestimonialCarousel } from "@/components";
import type { TestimonialItem } from "@/components";

const sampleTestimonials: TestimonialItem[] = [
	{
		id: "1",
		avatarSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop&crop=face",
		avatarAlt: "Sarah M.",
		quote: "VeGood completely changed how I think about food. Finding incredible plant-based restaurants near me used to take hours — now it takes seconds.",
		name: "Sarah M.",
		role: "Plant-based since 2021",
	},
	{
		id: "2",
		avatarSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=face",
		avatarAlt: "James K.",
		quote: "As someone transitioning to a vegan lifestyle, VeGood has been an invaluable guide. The reviews are honest and the community genuinely cares.",
		name: "James K.",
		role: "Vegan chef & food blogger",
	},
	{
		id: "3",
		avatarSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&h=160&fit=crop&crop=face",
		avatarAlt: "Priya R.",
		quote: "I travel constantly for work and VeGood means I never have to compromise on my values. Whether I'm in London or LA, I always find a great spot.",
		name: "Priya R.",
		role: "Sustainable living advocate",
	},
];

const meta = {
	title: "Components/TestimonialCarousel",
	component: TestimonialCarousel,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
	argTypes: {
		intervalMs: {
			control: { type: "number", min: 1000, step: 500 },
			description: "Auto-advance interval in milliseconds",
		},
	},
	decorators: [
		(Story) => (
			<div className="flex items-stretch h-screen bg-primary-800">
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof TestimonialCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		testimonials: sampleTestimonials,
		intervalMs: 6000,
	},
};

export const FastInterval: Story = {
	args: {
		testimonials: sampleTestimonials,
		intervalMs: 2000,
	},
};

export const SingleTestimonial: Story = {
	args: {
		testimonials: [sampleTestimonials[0]],
		intervalMs: 6000,
	},
};
