'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\app\studio\[[...tool]]\page.tsx` route
 */

import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {schemaTypes} from './schemas'
import {structure} from './sanity/structure'
import { visionTool } from '@sanity/vision'
import { apiVersion ,dataset,projectId} from './sanity/env'
  
export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
  },
  plugins: [
    deskTool(),
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
