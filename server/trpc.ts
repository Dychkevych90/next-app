import { initTRPC } from '@trpc/server';

const t = initTRPC.create();

//const t = initTRPC.context<{ signGuestBook: () => Promise<void> }>().create();

export const router = t.router;
export const publicProcedure = t.procedure;