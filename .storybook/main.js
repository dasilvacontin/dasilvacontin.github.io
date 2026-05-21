/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  stories: [
    './GettingStarted.stories.js',
    '../components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [],
  staticDirs: ['../images'],
  framework: '@storybook/html-vite',
  async viteFinal(viteConfig) {
    viteConfig.server ??= {};
    viteConfig.server.watch ??= {};
    const ignored = viteConfig.server.watch.ignored;
    const extra = ['**/_site/**', '**/.jekyll-cache/**'];
    viteConfig.server.watch.ignored = Array.isArray(ignored)
      ? [...ignored, ...extra]
      : [ignored, ...extra].filter(Boolean);
    return viteConfig;
  },
};

export default config;
