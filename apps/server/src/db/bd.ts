// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({data:{name: 'ddd', email: 'test5@mail.com'}})
    // const user = await prisma.user.create({data:{name: 'AAAA', email: 'test2@mail.com'}}) // ... you will write your Prisma Client queries here
    console.log('user', user)
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
