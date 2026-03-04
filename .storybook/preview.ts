import type { Preview } from '@storybook/nextjs-vite'

// Import Tailwind and global styles
import '../app/globals.css'

const preview: Preview = {
  decorators: [
    (Story) => {
      document.documentElement.style.setProperty('--font-inter', '"Inter", system-ui, -apple-system, sans-serif');
      document.documentElement.style.setProperty('--font-geist-mono', '"Geist Mono", ui-monospace, monospace');
      return Story();
    },
  ],
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;