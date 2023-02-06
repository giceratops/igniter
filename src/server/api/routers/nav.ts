import { createTRPCRouter, publicProcedure } from '../trpc';

export const navRouter = createTRPCRouter({
  getItems: publicProcedure
    .query(async ({ ctx }) => {
      const items = await ctx.prisma.navItem.findMany();
      console.log({items});
      return items;
    }),
});
