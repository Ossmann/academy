'use client'

import Link from 'next/link';
import Image from 'next/image';

interface NavbarProps {
  userType: string;
}

export default function Navbar({ userType }: NavbarProps) {
  return (
    <nav className="w-full">
      <div className="bg-white/20 backdrop-blur-sm border border-white/20 shadow-xl p-4 flex items-center justify-between">
        <Link href="/staff" className="pl-10 flex-shrink-0">
          <Image 
            src="/icons/house.svg" 
            alt="House" 
            width={26} 
            height={26}
            className="hover:opacity-80 transition-opacity duration-200"
          />
        </Link>
        <span className="text-black font-lg pr-10">
          {userType}
        </span>
      </div>
    </nav>
  );
}
