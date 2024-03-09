import { z } from "zod"

export const createUserSchema = z.object({
  username: z.string(),
  email: z.string(),
})

export const createPostSchema = z.object({
  title: z.string(),
  desc: z.string(),
  image: z.string()
})

export type createUserSchema = z.TypeOf<typeof createUserSchema>
export type createPostSchema = z.TypeOf<typeof createPostSchema>