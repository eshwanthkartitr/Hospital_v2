import type { StructureBuilder } from 'sanity/desk'

export const structure = (S: StructureBuilder) =>
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
      // Add more document types here as needed
    ])
