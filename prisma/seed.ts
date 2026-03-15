import { prisma } from '../lib/prisma'

async function main() {
  const school = await prisma.school.create({
    data: {
      name: 'Queensland Academy',
      checkin_date: new Date('2026-03-15'),  // Example check-in date
      checkout_date: new Date('2026-03-20'), // Example check-out date (5 days later)
      teachers: {
        create: [
          { name: 'Alice Smith', email: 'alice@example.com' },
          { name: 'Bob Johnson', email: 'bob@example.com' },
        ],
      },
    },
    include: { teachers: true },
  })

  console.log('Seeded school with teachers:', school)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
