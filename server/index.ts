import {publicProcedure, router} from './trpc';
import {prisma} from "@/lib/prisma";
import {z} from "zod";

export const appRouter = router({
  postList: publicProcedure
    .query(async () => {
      return prisma.post.findMany();
    }),
  getById: publicProcedure
    .input(z.string())
    .query(async (opts) => {
      const { input } = opts;
    
      return prisma.post.findUnique({
        where: {
          id: input
        }
      });
  }),
  // createUser: publicProcedure
  //   .input(createTodoSchema).mutation(async ({ input }) => {
  //     const { title, description } = input
  //
  //     const result = await prisma.todo.create({
  //       data: {
  //         title: title,
  //         description: description,
  //       },
  //     });
  //     return {
  //       status: 201,
  //       message: "Todo created successfully",
  //       result: result,
  //     };
  //   }),
});
export type AppRouter = typeof appRouter

// const server = createHTTPServer({
//   router: appRouter,
// });
//
// server.listen(3000);