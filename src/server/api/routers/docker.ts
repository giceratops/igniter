import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '../trpc';
import Docker from 'dockerode';
import { observable } from '@trpc/server/observable';

const docker = new Docker();
enum ContainerState {
  running = 'running',
  restarting = 'restarting',
  created = 'created',
  paused = 'paused',
  exited = 'exited',
  removing = 'removing',
  dead = 'dead',
}

export const dockerRouter = createTRPCRouter({
  listContainers: publicProcedure
    .input(z.object({
      filter: z.string()
    }).optional())
    .query(async ({ input }) => {
      return (await docker.listContainers({ all: true }))
        //.filter((info) => info.Image.includes('inductiveautomation/ignition'))
        .filter((info) => !input?.filter || info.Names[0]?.includes(input.filter))
        .sort((a, b) => {
          const values = Object.keys(ContainerState);
          return values.indexOf(a.State) - values.indexOf(b.State);
        });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
  listImages: publicProcedure
    .query(async ({ input }) => {
      return await docker.listImages({ all: true });
    }),
  downloadImage: publicProcedure.
    mutation(async () => {
      // return await docker.pruneImages({  });
      console.log('oi')
      return await docker.pull('inductiveautomation/ignition:8.1.22', (err: any, stream: any) => {

        const onFinished = (err: any, output: any) => {
          //output is an array with output json parsed objects
          //...
          console.log(output)
        }
        const onProgress = (event: any) => {
          console.log(event)
        }
        docker.modem.followProgress(stream, onFinished, onProgress);
      })
    }),
  onDownloadImage: publicProcedure.
    subscription(() => {
      return observable<any>((emit) => {
        return ;
      });
    })
});
