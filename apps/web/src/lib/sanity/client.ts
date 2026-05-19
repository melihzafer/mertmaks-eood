import { createClient } from "@sanity/client";
import {
  isSanityConfigured,
  sanityApiVersion,
  sanityDataset,
  sanityProjectId,
  sanityReadToken,
} from "./env";

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: sanityApiVersion,
      useCdn: false,
      token: sanityReadToken,
      perspective: "published",
      stega: false,
    })
  : null;
