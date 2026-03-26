import { redirect } from "next/navigation";
import { signOutAction } from "@/actions/auth";
import { Button } from "@/components/Button";
import { auth } from "@/lib/auth";
import { ProfileForm } from "./ProfileForm";

export default async function MyAccountPage() {
	const session = await auth();

	if (!session?.user) {
		redirect("/login");
	}

	const { firstName, lastName, email } = session.user;

	return (
		<div className="mx-auto max-w-6xl p-8">
			<h1 className="mb-8 text-3xl font-medium">My Profile</h1>

			<div className="mb-8 rounded-lg border border-border p-6">
				<ProfileForm
					firstName={firstName ?? ""}
					lastName={lastName ?? ""}
					email={email ?? ""}
				/>
			</div>

			<form action={signOutAction}>
				<Button type="submit" variant="destructive">
					Sign out
				</Button>
			</form>
		</div>
	);
}
