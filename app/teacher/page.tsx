import { prisma } from '@/app/lib/prisma'
import Link from 'next/link'
import { MdAddCircleOutline } from "react-icons/md";
import Image from 'next/image';

export default async function LandingPage() {

return (
  <div className="min-h-screen flex flex-col">
    <main className="flex-1 flex items-center justify-center pt-20 px-4 h-screen">
      <div className='bg-white/30 backdrop-blur-sm border border-white/20 shadow-xl rounded-xl p-20'>
        <div className="text-center">
            <div className="inline-flex items-center gap-4 mb-8">
            <div>
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text">
                Welcome
            </h1>
            <h2 className="text-xl md:text-4xl bg-clip-text">
                Teacher
            </h2>
            </div>
            <Image 
                src="/icons/waving-hand.svg" 
                width={80} 
                height={80} 
                alt="Waving hand"
                className="mt-4"
            />
            </div>

            <p className="text-3xl md:text-4xl font-semibold mb-4">
            Alice Smith
            </p>
            
            <div className="flex items-center gap-4 mb-8">
            <Image 
                src="/icons/calendar.svg" 
                width={48} 
                height={48} 
                alt="School icon"
                className="flex-shrink-0"
            />
            Your visit date
            </div>

            {/* First button - vertically stacked */}
            <Link href="" className="block border-2 px-6 py-3 mt-8 mx-auto w-fit hover:bg-gray-300">
            Your Students
            </Link>
            
            {/* Second button - stacks below first */}
            <Link href="staff/school-registration" className="inline-flex items-center gap-2 border-2 px-6 py-3 mt-4 mx-auto w-fit hover:bg-gray-300">
            <MdAddCircleOutline className="text-xl" />
            Register Parents of your Students
            </Link>
        </div>
    </div>
    </main>
  </div>
)
}
