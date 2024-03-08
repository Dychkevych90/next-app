import {createTRPCClient, createTRPCProxyClient, httpBatchLink} from '@trpc/client';
import { appRouter } from '@/server';

// export const trpc = createTRPCProxyClient<AppRouter>({
//   links: [
//     httpBatchLink({
//       url: 'http://localhost:3000',
//     }),
//   ],
// });

export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/api/trpc",
    }),
  ],
});

// const aloha = async() => {
//   const user = await trpc.postList.query();
//   console.log('user', user)
// }
//
// aloha().then(r => console.log('e', r))

// const user2 = await trpc.greeting.query();
//
// console.log('User 2:', user2);

// const users = await trpc.postList.query();
// //    ^?
// console.log('Users:', users);
//
// const user = await serverClient.getById('65eacfc270a7e756cc386360');
// //    ^?
// console.log('User 1:', user);