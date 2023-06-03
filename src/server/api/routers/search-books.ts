import { z } from "zod";
import { env } from "../../../env.mjs";

import { createTRPCRouter, publicProcedure } from "y/server/api/trpc";

type Volume = {
  id: string;
  etag: string;
  kind: string;
  selfLink: string;
  volumeInfo: {
    title: string;
    subtitle: string;
    description: string;
    authors: string[];
    publisher: string;
    publishedDate: string;

    industryIdentifiers: {
      type: string;
      identifier: string;
    };
    pageCount: number;
    printType: string;
    categories: string[];
    maturityRating: string;
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
  };
};

type SearchResult = {
  kind: string;
  totalVolumes: number;
  items: Volume[];
};

export const searchBooksRouter = createTRPCRouter({
  search: publicProcedure.input(z.string()).query(async ({ input }) => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${input}&key=${env.GOOGLE_API_KEY}`;
    const apiResponse: Response = await fetch(url);
    //Read more on this url: https://www.allthingstypescript.dev/p/typescript-how-do-you-provide-types
    //Then change the below logic accordingly or at least understand the concerns
    const data = (await apiResponse.json()) as SearchResult;
    return data;
  }),
});
