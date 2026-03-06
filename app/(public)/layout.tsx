import { TestimonialCarousel } from "@/components";
import { LeafAccent } from "./_components/LeafAccent/LeafAccent";
import { testimonials } from "./testimonials";

export default function PublicLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex min-h-screen">
			<div className="flex-1 flex items-center justify-center px-4 box-border ">
				{children}
			</div>
			<div className="hidden md:flex w-[40%] bg-primary-900 shrink-0 relative overflow-hidden">
				<TestimonialCarousel testimonials={testimonials} />
				<p className="text-white/50 text-body absolute left-6 bottom-6">
					Trusted by 50,000+ plant-based food lovers
				</p>
				<LeafAccent
					variant="monstera"
					className="absolute -top-8 -left-6 w-44 h-44 rotate-12 opacity-15"
				/>
				<LeafAccent
					variant="fern"
					className="absolute top-10 right-4 w-32 h-52 rotate-15 opacity-10"
				/>
				<LeafAccent
					variant="leaf-spray"
					className="absolute top-4 left-[32%] w-24 h-28 rotate-140 opacity-10"
				/>
				<LeafAccent
					variant="eucalyptus"
					className="absolute top-[28%] -left-4 w-28 h-52 rotate-6 opacity-10"
				/>
				<LeafAccent
					variant="leaf-veined"
					className="absolute top-[45%] left-[18%] w-28 h-32 rotate-20 opacity-10"
				/>
				<LeafAccent
					variant="seed-pods"
					className="absolute top-[52%] right-20 w-16 h-20 rotate-15 opacity-10"
				/>
				<LeafAccent
					variant="botanical"
					className="absolute bottom-24 left-[28%] w-18 h-24 rotate-6 opacity-10"
				/>
				<LeafAccent
					variant="leaf-small"
					className="absolute bottom-10 -left-2 w-32 h-32 rotate-160 opacity-10"
				/>
				<LeafAccent
					variant="fern"
					className="absolute -bottom-8 right-6 w-32 h-48 rotate-190 opacity-10"
				/>
			</div>
		</div>
	);
}
