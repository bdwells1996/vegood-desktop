import { TestimonialCarousel } from '@/components'
import { testimonials } from './testimonials'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        {children}
      </div>
      <div className="hidden md:flex w-[40%] bg-primary-800 shrink-0">
        <TestimonialCarousel testimonials={testimonials} />
      </div>
    </div>
  )
}
