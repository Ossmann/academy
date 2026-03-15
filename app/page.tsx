'use client'

import LoginButton from "./components/ui/LoginButton";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <LoginButton destination="/staff" />
    </div>
  );
}