import { prisma } from '@/app/lib/prisma'
import Navbar from '../components/ui/Navbar'
import Link from 'next/link'
import { MdAddCircleOutline } from "react-icons/md";
import Image from 'next/image';

export default async function LandingPage() {
  // Get today's date (midnight to midnight)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const school = await prisma.school.findFirst({
    where: {
      checkin_date: {
        gte: today,
        lt: tomorrow
      }
    }
  })

return (
  <div className="min-h-screen flex flex-col">
    <Navbar userType="staff" />
    <main className="flex-1 flex items-center justify-center pt-20 px-4 h-screen">
      <div className="text-center">
        <div className="inline-flex items-center gap-4 mb-8">
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text">
            Welcome
          </h1>
          <Image 
            src="/icons/waving-hand.svg" 
            width={80} 
            height={80} 
            alt="Waving hand"
            className="mt-4"
          />
        </div>

        <p className="text-3xl md:text-4xl font-semibold mb-4">
          Staff Member
        </p>
        
        <div className="flex items-center gap-4 mb-8">
          <Image 
            src="/icons/school.svg" 
            width={48} 
            height={48} 
            alt="School icon"
            className="flex-shrink-0"
          />
          <p className="text-xl">
            Today: {school?.name || 'No school scheduled'}
          </p>
        </div>

        {/* First button - vertically stacked */}
        <Link href="" className="block border-2 px-6 py-3 mt-8 mx-auto w-fit hover:bg-gray-300">
          Today's briefing
        </Link>
        
        {/* Second button - stacks below first */}
        <Link href="staff/school-registration" className="inline-flex items-center gap-2 border-2 px-6 py-3 mt-4 mx-auto w-fit hover:bg-gray-300">
          <MdAddCircleOutline className="text-xl" />
          Invite New School
        </Link>
      </div>
    </main>
  </div>
)
}
