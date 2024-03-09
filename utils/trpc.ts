import {createTRPCProxyClient, httpBatchLink} from '@trpc/client';
import { createTRPCNext } from '@trpc/next';

import type { AppRouter } from '@/server';

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000',
    }),
  ],
});