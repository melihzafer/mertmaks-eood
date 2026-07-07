import { createClient } from "@sanity/client";
import {
  isSanityWriteConfigured,
  sanityApiVersion,
  sanityDataset,
  sanityProjectId,
  sanityWriteToken,
} from "./env";

export const sanityWriteClient = isSanityWriteConfigured
  ? createClient({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: sanityApiVersion,
      useCdn: false,
      token: sanityWriteToken,
      perspective: "published",
      stega: false,
    })
  : null;

