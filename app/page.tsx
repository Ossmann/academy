'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center'>
      <div className="justify-center bg-white/60 backdrop-blur-sm border border-white/20 shadow-xl rounded-xl p-12 max-w-2xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Select your Login
          </h1>
        </div>
        
        <div className="flex flex-row gap-8 w-full justify-center">
          <Link
            href="/staff"
            className="relative flex items-center px-8 py-5 bg-white/60 border border-gray-700 text-gray-800 dark:text-gray-100 rounded-lg transition-colors duration-150 hover:bg-gray-200 dark:hover:bg-gray-800 w-72 h-20"
          >
            <Image
              src="/icons/Powerhouse_P.png"
              alt="Academy Staff"
              width={28}
              height={28}
              className="flex-shrink-0 absolute left-4"
            />
            <span className="absolute inset-0 flex items-center justify-center text-lg font-medium">
              Academy Staff
            </span>
          </Link>
          
          <Link
            href="/teacher"
            className="relative flex items-center px-8 py-5 bg-white/60 border border-gray-700 text-gray-800 dark:text-gray-100 rounded-lg transition-colors duration-150 hover:bg-gray-200 dark:hover:bg-gray-800 w-72 h-20"
          >
            <Image
              src="/icons/teacher.svg"
              alt="Teacher"
              width={36}
              height={36}
              className="flex-shrink-0 absolute left-3 top-1/2 -translate-y-1/2"
            />
            <span className="absolute inset-0 flex items-center justify-center text-lg font-medium">
              Teacher
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
