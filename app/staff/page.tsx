import { prisma } from '@/app/lib/prisma'
import Link from 'next/link'
import { MdAddCircleOutline } from "react-icons/md";
import Image from 'next/image';
import Calendar from '../components/Calendar';
import { LuClipboardList } from "react-icons/lu";

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

  const schools = await prisma.school.findMany({
    select: {
      id: true,
      name: true,
      checkin_date: true,
      checkout_date: true,
      createdAt: true
    }
  });

return (
  <div className="min-h-screen flex flex-col">
    <main className="flex-1 flex items-center justify-center pt-20 px-4 h-screen">
      <div className='bg-white/50 backdrop-blur-sm border border-white/20 shadow-xl rounded-xl p-20'>
        <div className="text-center">
            <div className="inline-flex items-center gap-4 ">
            <h1 className="text-3xl md:text-6xl font-bold bg-clip-text">
                Welcome Ben
            </h1>
            <Image 
                src="/icons/waving-hand.svg" 
                width={80} 
                height={80} 
                alt="Waving hand"
                className="mt-4"
            />
            </div>

            <p className="text-lg md:text-2xl mb-4">
            Staff Member
            </p>

            {/* Calendar */}
              <Calendar />
            



            {/* Content */}
            <div className="flex items-center justify-center gap-4 mb-8 max-w-md mx-auto">
              <Image
                src="/icons/school.svg"
                width={48}
                height={48}
                alt="School icon"
                className="flex-shrink-0"
              />
              
              <div className="flex flex-col">
                <p className="text-xl">Today's School:</p>
                <p className="text-xl font-medium">
                  {school?.name || 'No school scheduled'}
                </p>
              </div>
            </div>


            <div className="inline-flex gap-4 mt-8">
              {/* First button */}
              <Link
                href="staff/briefing"
                className="inline-flex items-center justify-center gap-2 border-2 px-6 py-3 w-64 hover:bg-gray-300"
              >
                <LuClipboardList className="text-lg align-middle" />
                Today's Briefing
              </Link>

              {/* Second button */}
              <Link
                href="staff/school-registration"
                className="inline-flex items-center justify-center gap-2 border-2 px-6 py-3 w-64 hover:bg-gray-300"
              >
                <MdAddCircleOutline className="text-lg align-middle" />
                Invite New School
              </Link>
            </div>

        </div>
    </div>
    </main>
  </div>
)
}
