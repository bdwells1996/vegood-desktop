import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';
import { Leaf } from 'lucide-react';

describe('Badge Component', () => {
	describe('Rendering', () => {
		it('should render a badge with label only', () => {
			render(<Badge variant="grey" label="30 min" />);
			expect(screen.getByText('30 min')).toBeInTheDocument();
		});

		it('should render a badge with icon and label (green variant)', () => {
			render(
				<Badge variant="green" icon={Leaf} label="Vegan" />
			);
			expect(screen.getByText('Vegan')).toBeInTheDocument();
		});

		it('should render an icon-only badge (grey variant)', () => {
			render(
				<Badge
					variant="grey"
					icon={Leaf}
					iconAlt="Contains nuts"
				/>
			);
			expect(screen.getByRole('img', { name: 'Contains nuts' })).toBeInTheDocument();
		});

		it('should render with aria-label when only icon is present', () => {
			render(
				<Badge
					variant="grey"
					icon={Leaf}
					iconAlt="Gluten-free"
				/>
			);
			const badge = screen.getByRole('img', { name: 'Gluten-free' });
			expect(badge).toHaveAttribute('aria-label', 'Gluten-free');
		});

		it('should render with aria-label from label when no iconAlt provided', () => {
			render(<Badge variant="grey" label="30 min" />);
			const badge = screen.getByRole('img', { name: '30 min' });
			expect(badge).toHaveAttribute('aria-label', '30 min');
		});
	});

	describe('Variants', () => {
		it('should apply green variant styling', () => {
			const { container } = render(
				<Badge variant="green" label="Vegan" icon={Leaf} />
			);
			const badge = container.querySelector('span[role="img"]');
			expect(badge).toHaveClass('border-primary-200', 'bg-primary-100');
		});

		it('should apply grey variant styling', () => {
			const { container } = render(
				<Badge variant="grey" label="30 min" />
			);
			const badge = container.querySelector('span[role="img"]');
			expect(badge).toHaveClass('border-neutral-200', 'bg-neutral-50');
		});
	});

	describe('Icon Behavior', () => {
		it('should render icon with aria-hidden when label is present', () => {
			const { container } = render(
				<Badge variant="green" icon={Leaf} label="Vegan" />
			);
			const iconSpan = container.querySelector('span[aria-hidden="true"]');
			expect(iconSpan).toBeInTheDocument();
		});

		it('should apply icon-only styling when only icon is present', () => {
			const { container } = render(
				<Badge variant="grey" icon={Leaf} iconAlt="Nuts" />
			);
			const badge = container.querySelector('span[role="img"]');
			expect(badge).toHaveClass('size-7', 'rounded-full', 'justify-center');
		});

		it('should not have icon-only styling when label is present', () => {
			const { container } = render(
				<Badge variant="green" icon={Leaf} label="Vegan" />
			);
			const badge = container.querySelector('span[role="img"]');
			expect(badge).toHaveClass('gap-1.5', 'h-7', 'px-2.5', 'rounded-full');
			expect(badge).not.toHaveClass('size-7');
		});
	});

	describe('Custom Classes', () => {
		it('should apply additional className prop', () => {
			const { container } = render(
				<Badge
					variant="grey"
					label="30 min"
					className="shadow-sm absolute top-3 right-3"
				/>
			);
			const badge = container.querySelector('span[role="img"]');
			expect(badge).toHaveClass('shadow-sm', 'absolute', 'top-3', 'right-3');
		});
	});

	describe('Accessibility', () => {
		it('should have role="img" on badge container', () => {
			render(<Badge variant="grey" label="30 min" />);
			const badge = screen.getByRole('img');
			expect(badge).toBeInTheDocument();
		});

		it('should have proper text content for screen readers', () => {
			render(
				<Badge variant="green" icon={Leaf} label="Vegan" iconAlt="Plant-based" />
			);
			const badge = screen.getByRole('img', { name: 'Plant-based' });
			expect(badge).toBeInTheDocument();
		});
	});
});
