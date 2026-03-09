import { render, screen } from "@testing-library/react";
import { Leaf, Wheat } from "lucide-react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { AllergenTag, DietaryTag } from "./RecipeCard";
import { RecipeCard } from "./RecipeCard";

// Mock Next.js Image component
vi.mock("next/image", () => ({
	default: ({ src, alt, fill, className, sizes, priority }: any) => (
		<img
			src={src}
			alt={alt}
			data-testid="recipe-card-image"
			className={className}
		/>
	),
}));

// Mock Next.js Link component
vi.mock("next/link", () => ({
	default: ({ children, href }: any) => (
		<a href={href} data-testid="recipe-card-link">
			{children}
		</a>
	),
}));

// Mock Icon component
vi.mock("@/components/Icon", () => ({
	Icon: ({ icon: IconComponent, size, className }: any) => (
		<IconComponent
			data-testid="icon"
			className={className}
			aria-hidden="true"
		/>
	),
}));

// Mock StarRating component
vi.mock("@/app/components/StarRating", () => ({
	StarRating: ({ rating }: any) => (
		<div data-testid="star-rating" data-rating={rating}>
			{rating}★
		</div>
	),
}));

describe("RecipeCard Component", () => {
	const defaultProps = {
		title: "Creamy Garlic Pesto Pasta",
		description:
			"Silky smooth pasta tossed in a cashew-based garlic pesto sauce.",
		imageSrc: "/images/pasta.jpg",
		imageAlt: "A bowl of creamy garlic pesto pasta",
		reviewCount: 876,
		prepTime: "30 min",
	};

	describe("Rendering", () => {
		it("should render the recipe title", () => {
			render(<RecipeCard {...defaultProps} />);
			expect(screen.getByText("Creamy Garlic Pesto Pasta")).toBeInTheDocument();
		});

		it("should render the description", () => {
			render(<RecipeCard {...defaultProps} />);
			expect(screen.getByText(/Silky smooth pasta/)).toBeInTheDocument();
		});

		it("should render the prep time badge", () => {
			render(<RecipeCard {...defaultProps} />);
			expect(screen.getByText("30 min")).toBeInTheDocument();
		});

		it("should render the recipe image", () => {
			render(<RecipeCard {...defaultProps} />);
			expect(screen.getByTestId("recipe-card-image")).toBeInTheDocument();
		});

		it("should render the article with aria-label", () => {
			const { container } = render(<RecipeCard {...defaultProps} />);
			const article = container.querySelector("article");
			expect(article).toHaveAttribute(
				"aria-label",
				"Creamy Garlic Pesto Pasta",
			);
		});
	});

	describe("Rating Display", () => {
		it("should render rating when provided", () => {
			render(<RecipeCard {...defaultProps} rating={4.6} />);
			expect(screen.getByTestId("star-rating")).toBeInTheDocument();
		});

		it("should display formatted rating and review count", () => {
			render(<RecipeCard {...defaultProps} rating={4.6} reviewCount={876} />);
			expect(screen.getByText("4.6 (876)")).toBeInTheDocument();
		});

		it("should format large review counts with locale string", () => {
			render(<RecipeCard {...defaultProps} rating={5} reviewCount={1234567} />);
			expect(screen.getByText(/1,234,567/)).toBeInTheDocument();
		});

		it("should not render rating when not provided", () => {
			render(<RecipeCard {...defaultProps} />);
			expect(screen.queryByTestId("star-rating")).not.toBeInTheDocument();
		});
	});

	describe("Dietary Tags", () => {
		it("should render dietary tags when provided", () => {
			const dietaryTags: DietaryTag[] = [
				{ label: "Vegan", icon: Leaf, iconAlt: "Plant-based" },
			];
			render(<RecipeCard {...defaultProps} dietaryTags={dietaryTags} />);
			expect(screen.getByText("Vegan")).toBeInTheDocument();
		});

		it("should render multiple dietary tags", () => {
			const dietaryTags: DietaryTag[] = [
				{ label: "Vegan", icon: Leaf },
				{ label: "Gluten-free", icon: Wheat },
			];
			render(<RecipeCard {...defaultProps} dietaryTags={dietaryTags} />);
			expect(screen.getByText("Vegan")).toBeInTheDocument();
			expect(screen.getByText("Gluten-free")).toBeInTheDocument();
		});

		it("should not render dietary tags section when empty", () => {
			const { container } = render(
				<RecipeCard {...defaultProps} dietaryTags={[]} />,
			);
			const dietarySection = container.querySelector(".flex.flex-wrap");
			expect(dietarySection).not.toBeInTheDocument();
		});
	});

	describe("Allergens", () => {
		it("should render allergens section when provided", () => {
			const allergens: AllergenTag[] = [
				{ label: "Contains gluten", icon: Wheat },
			];
			render(<RecipeCard {...defaultProps} allergens={allergens} />);
			expect(screen.getByText("Allergens")).toBeInTheDocument();
		});

		it("should render multiple allergen icons", () => {
			const allergens: AllergenTag[] = [
				{ label: "Contains gluten", icon: Wheat },
				{ label: "Contains nuts", icon: Leaf },
			];
			render(<RecipeCard {...defaultProps} allergens={allergens} />);
			const allergensList = screen.getByRole("list", { name: "Allergens" });
			expect(allergensList).toBeInTheDocument();
			expect(allergensList.children).toHaveLength(2);
		});

		it("should not render allergens section when empty", () => {
			render(<RecipeCard {...defaultProps} allergens={[]} />);
			expect(screen.queryByText("Allergens")).not.toBeInTheDocument();
		});
	});

	describe("Linking", () => {
		it("should render as article without href", () => {
			const { container } = render(<RecipeCard {...defaultProps} />);
			expect(container.querySelector("article")).toBeInTheDocument();
			expect(screen.queryByTestId("recipe-card-link")).not.toBeInTheDocument();
		});

		it("should wrap content in Link when href is provided", () => {
			render(<RecipeCard {...defaultProps} href="/recipes/pasta" />);
			const link = screen.getByTestId("recipe-card-link");
			expect(link).toHaveAttribute("href", "/recipes/pasta");
			expect(link.querySelector("article")).toBeInTheDocument();
		});
	});

	describe("Image", () => {
		it("should render image with correct src and alt", () => {
			render(<RecipeCard {...defaultProps} />);
			const image = screen.getByTestId("recipe-card-image");
			expect(image).toHaveAttribute("src", "/images/pasta.jpg");
			expect(image).toHaveAttribute(
				"alt",
				"A bowl of creamy garlic pesto pasta",
			);
		});
	});

	describe("Layout", () => {
		it("should have rounded corners and shadow", () => {
			const { container } = render(<RecipeCard {...defaultProps} />);
			const article = container.querySelector("article");
			expect(article).toHaveClass("rounded-xl", "shadow-card-md");
		});
	});

	describe("Accessibility", () => {
		it("should have appropriate ARIA attributes", () => {
			const { container } = render(<RecipeCard {...defaultProps} />);
			const article = container.querySelector("article");
			expect(article).toHaveAttribute("aria-label");
		});

		it("should have proper heading hierarchy", () => {
			render(<RecipeCard {...defaultProps} />);
			const heading = screen.getByText("Creamy Garlic Pesto Pasta");
			expect(heading.tagName).toBe("H3");
		});

		it("should have allergen list with aria-label", () => {
			const allergens: AllergenTag[] = [
				{ label: "Contains gluten", icon: Wheat },
			];
			render(<RecipeCard {...defaultProps} allergens={allergens} />);
			expect(
				screen.getByRole("list", { name: "Allergens" }),
			).toBeInTheDocument();
		});
	});
});
