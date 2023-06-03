import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "y/server/api/trpc";
import { env } from "../../../env.mjs";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  create: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    const newExample = await ctx.prisma.example.create({
      data: {
        exampleText: input,
      },
    });

    return newExample;
  }),

  getUserAccessToken: publicProcedure
    .input(z.object({ userId: z.string(), provider: z.string() }))
    .query(async ({ input }) => {
      const url = `https://api.clerk.dev/v1/users/${input.userId}/oauth_access_tokens/${input.provider}`;
      const apiResponse: Response = await fetch(url, {
        headers: { Authorization: `Bearer ${env.CLERK_SECRET_KEY}` },
      });

      const data = (await apiResponse.json()) as unknown;
      return data;
    }),
});
