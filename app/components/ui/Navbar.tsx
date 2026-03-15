'use client'

interface NavbarProps {
  userType: string;
}

export default function Navbar({ userType }: NavbarProps) {
  return (
    <nav className="w-full px-6 py-3">
      <div className="flex items-center justify-end">
        <span className="text-black font-medium">
          {userType}
        </span>
      </div>
    </nav>
  );
}
