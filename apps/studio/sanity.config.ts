import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes, structure } from "@mertmaks/content";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "replace-me";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

export default defineConfig({
  name: "mertmaks-studio",
  title: "MERTMAX CMS",
  projectId,
  dataset,
  basePath: "/",
  plugins: [
    structureTool({ structure }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
