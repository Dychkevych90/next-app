import {fetchRequestHandler} from '@trpc/server/adapters/fetch'

import {appRouter} from "@/server";
import {NextRequest, NextResponse} from "next/server";

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => ({}),
  })

export { handler as GET, handler as POST };