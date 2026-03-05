'use client'

import { useAuth } from "@/hooks/useAuth"
import Link from "next/link"

export default function BrowsePage() {
  const { user, isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-content-tertiary">Loading...</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Browse Recipes</h1>
        {isAuthenticated ? (
          <Link href="/my-account" className="text-primary-500 hover:underline">
            My account
          </Link>
        ) : (
          <div className="flex gap-4">
            <Link href="/login" className="text-primary-500 hover:underline">
              Log in
            </Link>
            <Link href="/signup" className="text-primary-500 hover:underline">
              Sign up
            </Link>
          </div>
        )}
      </div>

      {isAuthenticated ? (
        <div>
          <p className="mb-6 text-content-tertiary">
            Welcome back, {user?.firstName}! Here are all our recipes.
          </p>
          <div className="rounded-lg border border-border p-6">
            <p className="font-medium">Full recipe library — members only</p>
            <p className="mt-2 text-content-tertiary text-sm">
              You have access to all recipes, nutritional info, and personalised recommendations.
            </p>
          </div>
        </div>
      ) : (
        <div>
          <p className="mb-6 text-content-tertiary">
            Sign in to unlock the full recipe library and personalised recommendations.
          </p>
          <div className="rounded-lg border border-border p-6 opacity-60">
            <p className="font-medium">Featured recipes (preview)</p>
            <p className="mt-2 text-content-tertiary text-sm">
              <Link href="/signup" className="text-primary-500 hover:underline">
                Create a free account
              </Link>{" "}
              to see all recipes.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
