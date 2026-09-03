import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { topicSchema } from 'starlight-sidebar-topics/schema';
import { blogSchema } from 'starlight-blog/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: (context) =>
				blogSchema(context)
					.merge(topicSchema)
					.merge(
						z.object({
							// Optional. Versioned living notes only (e.g. Synthetic Fixtures).
							// Source of truth for the note's version; git carries the history.
							version: z.string().optional(),
						})
					),
		}),
	}),
};