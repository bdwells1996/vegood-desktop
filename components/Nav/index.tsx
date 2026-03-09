import Link from 'next/link';
import Logo from '@/components/Logo';
import { Button } from '@/components/Button';

export default function Nav() {
  return (
    <nav className="flex items-center justify-between px-8 py-4">
      <Logo />
      <div className="flex items-center gap-2">
        <Link href="/login" tabIndex={-1}>
          <Button variant="ghost" size="sm">
            Log in
          </Button>
        </Link>
        <Link href="/signup" tabIndex={-1}>
          <Button size="sm">Sign up</Button>
        </Link>
      </div>
    </nav>
  );
}
