import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Droplet, Egg, Leaf, Wheat } from "lucide-react";

import {
	type AllergenTag,
	type DietaryTag,
	RecipeCard,
} from "@/app/components/RecipeCard";

const meta = {
	title: "Components/Recipe Feed/RecipeCard",
	component: RecipeCard,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		title: {
			control: "text",
		},
		description: {
			control: "text",
		},
		imageSrc: {
			control: "text",
		},
		imageAlt: {
			control: "text",
		},
		rating: {
			control: { type: "number", min: 0, max: 5, step: 0.1 },
		},
		reviewCount: {
			control: { type: "number", min: 0, step: 1 },
		},
		prepTime: {
			control: "text",
		},
		href: {
			control: "text",
		},
	},
} satisfies Meta<typeof RecipeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample dietary tags
const veganTag: DietaryTag = {
	label: "Vegan",
	icon: Leaf,
	iconAlt: "Plant-based",
};

const glutenFreeTag: DietaryTag = {
	label: "Gluten-free option",
	icon: Wheat,
	iconAlt: "No wheat",
};

const dairyFreeTag: DietaryTag = {
	label: "Dairy-free",
	icon: Droplet,
	iconAlt: "No dairy",
};

// Sample allergens
const eggAllergen: AllergenTag = {
	label: "Contains eggs",
	icon: Egg,
};

const wheatAllergen: AllergenTag = {
	label: "Contains wheat",
	icon: Wheat,
};

// Default story
export const Default: Story = {
	args: {
		title: "Creamy Garlic Pesto Pasta",
		description:
			"Silky smooth pasta tossed in a cashew-based garlic pesto sauce with sun-dried tomatoes and fresh basil.",
		imageSrc:
			"https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=250&fit=crop",
		imageAlt: "A bowl of creamy garlic pesto pasta",
		rating: 4.6,
		reviewCount: 876,
		prepTime: "30 min",
		dietaryTags: [veganTag, glutenFreeTag],
		allergens: [wheatAllergen],
	},
};

// Card without rating
export const NoRating: Story = {
	args: {
		title: "Spicy Thai Green Curry",
		description:
			"Traditional green curry with coconut milk, Thai basil, and fresh vegetables for a vibrant, aromatic dish.",
		imageSrc:
			"https://images.unsplash.com/photo-1455619452474-d2be8b1e4e31?w=400&h=250&fit=crop",
		imageAlt: "A bowl of green curry",
		reviewCount: 542,
		prepTime: "25 min",
		dietaryTags: [veganTag],
		allergens: [],
	},
};

// Card with many dietary tags
export const ManyTags: Story = {
	args: {
		title: "Rainbow Buddha Bowl",
		description:
			"Colorful assortment of quinoa, roasted vegetables, and tahini dressing in one nutritious bowl.",
		imageSrc:
			"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=250&fit=crop",
		imageAlt: "A rainbow Buddha bowl with vegetables",
		rating: 4.9,
		reviewCount: 1203,
		prepTime: "20 min",
		dietaryTags: [veganTag, glutenFreeTag, dairyFreeTag],
		allergens: [],
	},
};

// Card with multiple allergens
export const MultipleAllergens: Story = {
	args: {
		title: "Classic Pancakes",
		description:
			"Fluffy, golden pancakes served with maple syrup, fresh berries, and a dollop of whipped cream.",
		imageSrc:
			"https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=250&fit=crop",
		imageAlt: "Stack of fluffy pancakes with berries",
		rating: 4.8,
		reviewCount: 2341,
		prepTime: "15 min",
		dietaryTags: [],
		allergens: [eggAllergen, wheatAllergen],
	},
};

// Minimal card (no tags, no allergens, no rating)
export const Minimal: Story = {
	args: {
		title: "Garden Salad",
		description: "Fresh mixed greens with seasonal vegetables and vinaigrette.",
		imageSrc:
			"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=250&fit=crop",
		imageAlt: "A fresh garden salad",
		reviewCount: 95,
		prepTime: "10 min",
	},
};

// Card with href (clickable)
export const Clickable: Story = {
	args: {
		title: "Mediterranean Salmon",
		description:
			"Pan-seared salmon with lemon, olives, and fresh herbs for a light and healthy meal.",
		imageSrc:
			"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=250&fit=crop",
		imageAlt: "Pan-seared salmon with olives",
		rating: 4.7,
		reviewCount: 654,
		prepTime: "35 min",
		dietaryTags: [glutenFreeTag],
		allergens: [],
		href: "/recipes/mediterranean-salmon",
	},
};

// Grid layout showing multiple cards
export const Grid: Story = {
	render: () => (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			<RecipeCard
				title="Creamy Garlic Pesto Pasta"
				description="Silky smooth pasta with cashew pesto and sun-dried tomatoes."
				imageSrc="https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=250&fit=crop"
				imageAlt="Pasta dish"
				rating={4.6}
				reviewCount={876}
				prepTime="30 min"
				dietaryTags={[veganTag, glutenFreeTag]}
				allergens={[wheatAllergen]}
				href="/recipes/pasta"
			/>
			<RecipeCard
				title="Thai Green Curry"
				description="Traditional curry with coconut milk and fresh Thai basil."
				imageSrc="https://images.unsplash.com/photo-1455619452474-d2be8b1e4e31?w=400&h=250&fit=crop"
				imageAlt="Curry dish"
				rating={4.8}
				reviewCount={542}
				prepTime="25 min"
				dietaryTags={[veganTag]}
				allergens={[]}
				href="/recipes/curry"
			/>
			<RecipeCard
				title="Buddha Bowl"
				description="Quinoa, roasted vegetables, and tahini dressing."
				imageSrc="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=250&fit=crop"
				imageAlt="Buddha bowl"
				rating={4.9}
				reviewCount={1203}
				prepTime="20 min"
				dietaryTags={[veganTag, glutenFreeTag, dairyFreeTag]}
				allergens={[]}
				href="/recipes/buddha-bowl"
			/>
		</div>
	),
};

// All states together
export const AllStates: Story = {
	render: () => (
		<div className="space-y-8">
			<div>
				<h2 className="text-xl font-bold mb-4">With Rating & Tags</h2>
				<RecipeCard
					title="Featured Recipe"
					description="A highly-rated recipe with dietary tags and allergen information."
					imageSrc="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=250&fit=crop"
					imageAlt="Featured recipe"
					rating={4.7}
					reviewCount={1204}
					prepTime="30 min"
					dietaryTags={[veganTag, glutenFreeTag]}
					allergens={[wheatAllergen]}
				/>
			</div>
			<div>
				<h2 className="text-xl font-bold mb-4">Without Rating</h2>
				<RecipeCard
					title="New Recipe"
					description="A newly added recipe without ratings yet."
					imageSrc="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=250&fit=crop"
					imageAlt="New recipe"
					reviewCount={0}
					prepTime="15 min"
					dietaryTags={[veganTag]}
					allergens={[]}
				/>
			</div>
			<div>
				<h2 className="text-xl font-bold mb-4">Minimal</h2>
				<RecipeCard
					title="Simple Recipe"
					description="A basic recipe with minimal information."
					imageSrc="https://images.unsplash.com/photo-1435521927519-51d6a3160e78?w=400&h=250&fit=crop"
					imageAlt="Simple recipe"
					reviewCount={42}
					prepTime="20 min"
				/>
			</div>
		</div>
	),
};
