'use client'

import Link from "next/link";

interface LoginButtonProps {
  destination?: string;
}

export default function LoginButton({ destination = "/schoolList" }: LoginButtonProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <Link
        href={destination}
        className="px-6 py-3 border border-gray-700 text-gray-800 dark:text-gray-100 rounded-md transition-colors duration-150 hover:bg-gray-200 dark:hover:bg-gray-800"
      >
        Login
      </Link>
    </div>
  );
}
