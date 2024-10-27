'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\app\studio\[[...tool]]\page.tsx` route
 */

import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {schemaTypes} from './schemas'
import { visionTool } from '@sanity/vision'
import { apiVersion, dataset, projectId} from './sanity/env'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
  },
  plugins: [
    deskTool({
      structure: (S) => 
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Projects')
              .child(
                S.documentList()
                  .title('Projects')
                  .filter('_type == "project"')
              ),
          ]),
    }),
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
