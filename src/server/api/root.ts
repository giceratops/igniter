import { createTRPCRouter } from './trpc';
import { exampleRouter } from './routers/example';
import { dockerRouter } from './routers/docker';
import { randomRouter } from './routers/random';
import { navRouter } from './routers/nav';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  docker: dockerRouter,
  random: randomRouter,
  nav: navRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
