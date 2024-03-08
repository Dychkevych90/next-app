import { PrismaClient } from "@prisma/client";

//const prisma = new PrismaClient();

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// async function main() {
//   // await prisma.post.create({
//   //   data: {
//   //     title: 'blog title 22',
//   //     desc: 'Lorem ipsum — класичний варіант умовного беззмістовного тексту, що вставляється в макет сторінки. Lorem ipsum — це перекручений уривок з філософського трактату Цицерона «Про межі добра і зла», написаного в 45 році до нашої ери латиною.',
//   //     authorId: '65eacbca34f504342093d950',
//   //     image: 'https://frontend17.vercel.app/static/media/PopularCat8.2dee37a249e2cf11243d.png',
//   //   }
//   // })
//
//   // await prisma.post.update({
//   //   where: {
//   //     id: '65eacf7b70a7e756cc38635e',
//   //   },
//   //   data: {
//   //     image: 'https://frontend17.vercel.app/static/media/PopularCat8.2dee37a249e2cf11243d.png'
//   //   },
//   // })
//
//   const allUsers = await prisma.post.findMany()
//   const all = await prisma.user.findMany()
//   console.log('post', allUsers, 'all', all)
// }
//
// main()
//   .catch(async (e) => {
//     console.error(e)
//     process.exit(1)
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })