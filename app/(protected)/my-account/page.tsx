import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { signOutAction } from "@/actions/auth"
import { Button } from "@/components/Button"

export default async function MyAccountPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  const { firstName, lastName, email } = session.user

  return (
    <div className="mx-auto max-w-xl p-8">
      <h1 className="mb-8 text-3xl font-bold">My Account</h1>

      <div className="mb-8 flex flex-col gap-4 rounded-lg border border-border p-6">
        <div>
          <p className="text-sm text-content-tertiary">Name</p>
          <p className="font-medium">{firstName} {lastName}</p>
        </div>
        <div>
          <p className="text-sm text-content-tertiary">Email</p>
          <p className="font-medium">{email}</p>
        </div>
      </div>

      <form action={signOutAction}>
        <Button type="submit" variant="destructive">
          Sign out
        </Button>
      </form>
    </div>
  )
}
