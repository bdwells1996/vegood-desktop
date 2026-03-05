import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-4xl font-bold">VeGood</h1>
      <p className="text-content-tertiary">Discover and share vegetarian &amp; vegan recipes</p>
      <div className="flex gap-4">
        <Link
          href="/login"
          className="rounded-md bg-primary-500 px-6 py-3 text-white font-medium hover:bg-primary-600 transition-colors"
        >
          Log in
        </Link>
        <Link
          href="/signup"
          className="rounded-md border border-primary-200 bg-primary-50 px-6 py-3 text-primary-700 font-medium hover:bg-primary-100 transition-colors"
        >
          Sign up
        </Link>
        <Link
          href="/browse"
          className="rounded-md px-6 py-3 text-primary-500 font-medium hover:bg-primary-50 transition-colors"
        >
          Browse
        </Link>
      </div>
    </div>
  )
}
