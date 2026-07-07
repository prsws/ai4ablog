// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightUiTweaks from 'starlight-ui-tweaks';
import starlightScrollToTop from 'starlight-scroll-to-top';
import starlightPageActions from "starlight-page-actions";
import starlightBlog from 'starlight-blog';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
    site: 'https://prsws.github.io',
    base: '/ai4ablog',
    fonts: [
      {
        name: 'Roboto',
        cssVariable: '--font-roboto',
        provider: fontProviders.fontsource(),
      },
    ],
    integrations: [starlight({
		    plugins: [
                starlightBlog({
                  title: 'News',
                  postCount: 5,              // posts per listing page
                  recentPostCount: 5,        // sidebar recent list
                }),
		        starlightUiTweaks({
		          footer: {
		            showSocialIcons: true,
		            copyright: "José F. Reyes-Santana. All rights reserved.",
		            firstColumn: {
		              title: "Legal",
		              links: [
		                { label: "Terms of Use", href: "/general/termsofuse" },
		                { label: "Privacy Policy", href: "/general/privacypolicy"},
		              ],
		            },
		            secondColumn: {
		              title: "",
		              links: [
		                { label: "", href: "#" },
		              ],
		            },
		            thirdColumn: {
		              title: "",
		              links: [
		                { label: "", href: "#" },
		              ],
		            },
		            fourthColumn: {
		              title: "",
		              links: [
		                { label: "", href: "#" },
		              ],
		            },
		          },
		        }),
		        starlightScrollToTop(),
            starlightPageActions({
              baseUrl: "https://starlight-page-actions.dlcastillop.com",
              share: false,
            }),
		    ],
        title: 'AI for Aging',
        logo: {
          src: "./src/assets/Pepa_Logo_V0_NoBG.png",
          replacesTitle: false,
        },
        description: "Home of Pepa — a self-hosted, octopus-inspired, cognitive infrastructure blueprint to help the elderly preserve memory, organize knowledge, and maintain agency through deterministic AI-assisted systems.",
        favicon: "./src/assets/Pepa_Logo_V0_NoBG.png",
        social: [
          { icon: 'email', label: 'Email', href: 'mailto:editor@ai4aging.org' },
          { icon: 'github', label: 'GitHub', href: 'https://github.com/prsws/ai4ablog' },
        ],
        sidebar: [
            {
                label: 'Start Here',
                collapsed: true,
                items: [
                    { label: 'Manifesto', slug: 'general/manifesto' },
                    { label: 'Use Cases', slug: 'general/usecases' },
                    { label: 'A Holistic View', slug: 'general/holisticview' },
                    { label: 'TL;DR Build your 1st Pepa', slug: 'guides/buildyour1stpepa' },
                ],
            },
            {
                label: 'Head',
                collapsed: true,
                items: [{ autogenerate: { directory: 'head' } }],
            },
            {
                label: 'Arms',
                collapsed: true,
                items: [
                    { label: 'Automation', items: [{ autogenerate: { directory: 'arms/automation' }}] },
                    { label: 'Knowledge', items: [{ autogenerate: { directory: 'arms/knowledge' }}] },
                    { label: 'Memory', items: [{ autogenerate: { directory: 'arms/memory' }}] },
                    { label: 'Reasoning', items: [{ autogenerate: { directory: 'arms/reasoning' }}] },
                ],
            },
            {
                label: 'Beak',
                collapsed: true,
                items: [{ autogenerate: { directory: 'beak' } }],
            },
            {
                label: 'Reference',
                collapsed: true,
                items: [{ autogenerate: { directory: 'reference' } }],
            },
            {
                label: 'Misc',
                collapsed: true,
                items: [
                    { label: 'About José', slug: 'general/aboutjose' },
                    { label: 'Terms of Use', slug: 'general/termsofuse' },
                    { label: 'Privacy Policy', slug: 'general/privacypolicy' },
                ],
            },
        ],
        customCss: ["./src/styles/global.css"],
		}), mdx()],
});