export interface TestimonialItem {
  id: string
  avatarSrc: string
  avatarAlt: string
  quote: string
  name: string
  role: string
}

export const testimonials: TestimonialItem[] = [
  {
    id: '1',
    avatarSrc: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop&crop=face',
    avatarAlt: 'Sarah M.',
    quote: 'VeGood completely changed how I think about food. Finding incredible plant-based restaurants near me used to take hours — now it takes seconds. I\'ve discovered so many amazing places I never would have found on my own.',
    name: 'Sarah M.',
    role: 'Plant-based since 2021',
  },
  {
    id: '2',
    avatarSrc: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=face',
    avatarAlt: 'James K.',
    quote: 'As someone transitioning to a vegan lifestyle, VeGood has been an invaluable guide. The reviews are honest and the community genuinely cares about helping each other find the best sustainable options.',
    name: 'James K.',
    role: 'Vegan chef & food blogger',
  },
  {
    id: '3',
    avatarSrc: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&h=160&fit=crop&crop=face',
    avatarAlt: 'Priya R.',
    quote: 'I travel constantly for work and VeGood means I never have to compromise on my values. Whether I\'m in London or LA, I can always find a spot that aligns with my plant-based lifestyle.',
    name: 'Priya R.',
    role: 'Sustainable living advocate',
  },
  {
    id: '4',
    avatarSrc: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&h=160&fit=crop&crop=face',
    avatarAlt: 'Marcus T.',
    quote: 'The depth of information on VeGood is unmatched. Every restaurant listing tells me exactly what I need to know — from sourcing practices to menu options. It\'s the platform the plant-based community deserved.',
    name: 'Marcus T.',
    role: 'Environmental scientist',
  },
]
