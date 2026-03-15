//route.ts 
// add new values to Tacher and School Model 
// when a new Teacher is created

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { 
      schoolName, 
      teacherName, 
      teacherEmail, 
      password, 
      checkinDate, 
      checkoutDate 
    } = await request.json();

    // Check if school already exists
    let school = await prisma.school.findFirst({
      where: { name: schoolName }
    });

    // Create or update school
    if (!school) {
      school = await prisma.school.create({
        data: {
          name: schoolName,
          checkin_date: checkinDate ? new Date(checkinDate) : null,
          checkout_date: checkoutDate ? new Date(checkoutDate) : null,
        }
      });
    } else {
      school = await prisma.school.update({
        where: { id: school.id },
        data: {
          checkin_date: checkinDate ? new Date(checkinDate) : null,
          checkout_date: checkoutDate ? new Date(checkoutDate) : null,
        }
      });
    }

    // Check if teacher email already exists
    const existingTeacher = await prisma.teacher.findUnique({
      where: { email: teacherEmail }
    });

    if (existingTeacher) {
      return NextResponse.json(
        { error: 'Teacher with this email already exists' },
        { status: 400 }
      );
    }

    const teacher = await prisma.teacher.create({
      data: {
        name: teacherName,
        email: teacherEmail,
        password: password || null,  // Safe fallback
        schoolId: school.id,
      }
    });

    return NextResponse.json({
      message: 'Created Teacher & School and sent Invite Link(tbd)',
      teacher,
      school
    });

  } catch (error: any) {
    console.error('Error creating teacher:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create teacher' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
