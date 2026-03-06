"use client";

import { Quote } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Icon } from "@/components/Icon";
import { TestimonialProgressDots } from "./TestimonialProgressDots";

export interface TestimonialItem {
	id: string;
	avatarSrc: string;
	avatarAlt: string;
	quote: string;
	name: string;
	role: string;
}

interface TestimonialCarouselProps {
	testimonials: TestimonialItem[];
	intervalMs?: number;
}

export function TestimonialCarousel({
	testimonials,
	intervalMs = 8000,
}: TestimonialCarouselProps) {
	const [activeIndex, setActiveIndex] = useState(0);
	const [isPaused, setIsPaused] = useState(false);

	useEffect(() => {
		if (isPaused) return;
		const timer = setTimeout(() => {
			setActiveIndex((prev) => (prev + 1) % testimonials.length);
		}, intervalMs);
		return () => clearTimeout(timer);
	}, [isPaused, intervalMs, testimonials.length]);

	const current = testimonials[activeIndex];

	return (
		<section
			className="flex h-full w-full flex-col items-center justify-center px-12 py-16 text-center"
			onMouseEnter={() => setIsPaused(true)}
			onMouseLeave={() => setIsPaused(false)}
			aria-label="Testimonial carousel"
		>
			<div
				key={activeIndex}
				className="flex flex-col items-center gap-6 w-full"
				style={{ animation: "fadeIn 500ms ease-in-out" }}
			>
				{/* Quote + Attribution */}
				<figure className="flex flex-col items-center gap-6">
					<div className="h-20 w-20 shrink-0 overflow-hidden rounded-full ring-4 ring-white/20">
						<Image
							src={current.avatarSrc}
							alt={current.avatarAlt}
							className="w-full h-full object-cover"
							width={80}
							height={80}
						/>
					</div>
					<blockquote className="w-full max-w-[448px]">
						<p className="font-regular text-h3 leading-[27px] text-white">
							<Icon
								icon={Quote}
								size="sm"
								strokeWidth={0}
								className="mr-2 inline fill-current align-top text-green-500 rotate-y-180"
							/>
							{current.quote}
							<Icon
								icon={Quote}
								size="sm"
								strokeWidth={0}
								className="ml-2 inline fill-current align-top text-green-500"
							/>
						</p>
					</blockquote>
					<figcaption className="flex flex-col items-center">
						<span className="text-white font-semibold text-body-lg">
							{current.name}
						</span>
						<cite className="text-white/60 text-body not-italic">
							{current.role}
						</cite>
					</figcaption>
				</figure>
			</div>

			<TestimonialProgressDots
				count={testimonials.length}
				activeIndex={activeIndex}
				intervalMs={intervalMs}
				isPaused={isPaused}
				onDotClick={setActiveIndex}
			/>
		</section>
	);
}
