import Link from "next/link";
import { Button } from "@/components/Button";
import Logo from "@/components/Logo";
import { auth } from "@/lib/auth";

export default async function Nav() {
	const session = await auth();
	const isAuthenticated = !!session?.user;

	return (
		<nav className="flex items-center justify-between px-8 py-4">
			<Link href="/">
				<Logo />
			</Link>
			<div className="flex items-center gap-2">
				{isAuthenticated ? (
					<Link href="/my-account" tabIndex={-1}>
						<Button variant="ghost" size="sm">
							My Profile
						</Button>
					</Link>
				) : (
					<>
						<Link href="/login" tabIndex={-1}>
							<Button variant="ghost" size="sm">
								Log in
							</Button>
						</Link>
						<Link href="/signup" tabIndex={-1}>
							<Button size="sm">Sign up</Button>
						</Link>
					</>
				)}
			</div>
		</nav>
	);
}
