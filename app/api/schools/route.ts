import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const schools = await prisma.school.findMany({
      include: {
        teachers: true,
      },
      orderBy: {
        name: 'asc',
      },
    })

    return Response.json(schools)
  } catch (err) {
    console.error('Failed to fetch schools:', err)
    return Response.json({ error: 'Failed to fetch schools' }, { status: 500 })
  }
}
