import { createTRPCRouter } from "y/server/api/trpc";
import { exampleRouter } from "y/server/api/routers/example";
import { searchBooksRouter } from "./routers/search-books";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  searchBooks: searchBooksRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
