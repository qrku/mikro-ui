import { useEffect } from 'react'
import type { Preview } from '@storybook/nextjs-vite'
import '../src/components/primitives/tokens.css'

const preview: Preview = {
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

  globalTypes: {
    theme: {
      description: 'Theme for components',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    theme: 'light',
  },

  decorators: [
    (Story, context) => {
      const theme = context.globals.theme ?? 'light';

      useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        document.body.style.background = 'var(--color-page-bg)';
        document.body.style.color = 'var(--color-ink)';
      }, [theme]);

      return <Story />;
    },
  ],
};

export default preview;
