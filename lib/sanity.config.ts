
import { defineConfig } from 'sanity';
import { visionTool } from '@sanity/vision';
import * as schemaTypes from '../sanity/schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'portfolio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [visionTool()],
  schema: {
    types: schemaTypes.schemaTypes,
  },
});
