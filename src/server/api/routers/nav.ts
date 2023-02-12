import { createTRPCRouter, publicProcedure } from '../trpc';

export const navRouter = createTRPCRouter({
  getItems: publicProcedure
    .query(async ({ ctx }) => {
      console.log(ctx.prisma);
      
      // return ctx.prisma.example.findFirst()
      // await ctx.prisma.navItem.findMany({select: { name: true }});
      // console.log({items});
      // return items;
      return {}
    }),
});
