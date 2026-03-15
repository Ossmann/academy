import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { schoolName, teacherName, teacherEmail } = await request.json();

    // Check if school already exists
    let school = await prisma.school.findFirst({
      where: { name: schoolName }
    });

    // Create school if it doesn't exist
    if (!school) {
      school = await prisma.school.create({
        data: {
          name: schoolName,
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

    // Create teacher
    const teacher = await prisma.teacher.create({
      data: {
        name: teacherName,
        email: teacherEmail,
        schoolId: school.id,
      }
    });

    return NextResponse.json({
      message: 'Teacher created successfully',
      teacher,
      school
    });

  } catch (error) {
    console.error('Error creating teacher:', error);
    return NextResponse.json(
      { error: 'Failed to create teacher' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
