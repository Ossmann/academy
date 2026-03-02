import { prisma } from '../lib/prisma'

async function main() {
  const school = await prisma.school.create({
    data: {
      name: 'Queensland Academy',
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
