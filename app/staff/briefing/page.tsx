import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Navbar from '@/app/components/ui/Navbar'
import { MdOutlineFileDownload } from "react-icons/md";


export default async function StaffBriefing() {
  let school = null
  let teacher = null

  try {
    const targetDate = new Date('2026-03-16T00:00:00.000Z')
    
    school = await prisma.school.findFirst({
      where: {
        checkin_date: {
          equals: targetDate,
          not: null
        }
      },
      include: {
        teachers: true
      }
    })

    if (!school || school.teachers.length === 0) {
      notFound()
    }

    teacher = school.teachers[0]
    
  } catch (error) {
    console.error('Prisma error:', error)
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar userType='Staff' />
        <div className="max-w-2xl mx-auto p-8">
          <h1 className="text-4xl font-bold mb-4">Today's Briefing</h1>
          <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
            <p className="text-red-800">No briefing data available</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userType='Staff' />
      <div className="max-w-2xl mx-auto p-8 pt-24 pb-12"> {/* pt-24 for navbar space */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Today's Briefing</h1>
          <p className="text-lg text-gray-600">
            <span className="font-semibold">Date:</span> 16 March 2026
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">School: {school.name}</h2>
            <p className="text-lg text-gray-600 mb-2">Check-in Date: 16 March 2026</p>
            <p className="text-lg text-gray-600">Teacher: {teacher.name}</p>
            <button className="flex items-center gap-2 px-4 py-1 bg-gray-400 text-white rounded-lg hover:bg-gray-600 transition-colors mb-6">
                    <MdOutlineFileDownload className="w-5 h-5" />
                    Download PDF
                </button>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6">Briefing:</h3>
            <div className='pb-4'>
              <h4 className="font-medium text-lg mb-3">Students with special dietary restrictions</h4>
              <ul className="space-y-2 ml-4">
                <li>• Peter Baxter - Nut allergy</li>
                <li>• Sarah Lawrence - Shellfish</li>
              </ul>
            </div>
            <div className='pb-4'>
              <h4 className="font-medium text-lg mb-3">Students with medical needs</h4>
              <ul className="space-y-2 ml-4">
                <li>• Tim Hoffmann - Asthma</li>
                <li>• Petra Pulmonova - Diabetes</li>
              </ul>
            </div>
            <div className='pb-4'>
              <h4 className="font-medium text-lg mb-3">Students with other circumstances</h4>
              <ul className="space-y-2 ml-4">
                <li>• Tom Holland - Learning Disability</li>
                <li>• Shelly Fish - ADHD</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
