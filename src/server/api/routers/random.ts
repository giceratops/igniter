import { observable } from '@trpc/server/observable';
import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '../trpc';

export const randomRouter = createTRPCRouter({

  randomNumber: publicProcedure.subscription(() => {
    return observable<number>((emit) => {
      const int = setInterval(() => {
        emit.next(Math.random());
      }, 1000);
      return () => {
        clearInterval(int);
      };
    });
  }),
})