'use client'

import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react"

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <LoginButton />
      </main>
    </div>
  );
}

function LoginButton() {
  const { data: session } = useSession()
  if (session) {
    return (
      <button 
        onClick={() => signOut()}
        className="w-full max-w-sm px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
      >
        Sign out
      </button>
    )
  }
  return (
    <button 
      onClick={() => signIn("okta")}
      className="w-full max-w-sm px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-sm focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 hover:-translate-y-0.5"
    >
      Sign in with Okta (Google)
    </button>
  )
}
