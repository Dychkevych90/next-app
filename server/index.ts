import {publicProcedure, router} from './trpc';
import {prisma} from "@/lib/prisma";
import {z} from "zod";
import {createPostSchema, createUserSchema} from "@/schema/userSchema";

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
  createUser: publicProcedure
    .input(createUserSchema)
    .mutation(async ({ input }) => {
      const { username, email } = input
      
      const result = await prisma.user.create({
        data: {
          username,
          email,
        },
      });
      return {
        status: 201,
        message: "User created successfully",
        result: result,
      };
    }),
  createPost: publicProcedure
    .input(createPostSchema)
    .mutation(async ({ input }) => {
      const { title, desc } = input
      
      const result = await prisma.post.create({
        data: {
          title,
          desc,
        },
      });
      return {
        status: 201,
        message: "post created successfully",
        result: result,
      };
    }),
});
export type AppRouter = typeof appRouter

// const server = createHTTPServer({
//   router: appRouter,
// });
//
// server.listen(3000);