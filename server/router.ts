import { publicProcedure, router } from './trpc';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import prisma from "@/lib/prisma";

const db = { // fake database with users
  users: [
    "user1", "user2", "user3"
  ]
}

const appRouter = router({
  getUsers: publicProcedure
    .query( () => {
      return prisma.user.findMany();
    }),
});
export type AppRouter = typeof appRouter

const server = createHTTPServer({
  router: appRouter,
});

server.listen(3000);