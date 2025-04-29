export const theme = {
  colors: {
    // Base
    background: '#242323',
    card: '#2E2D2D',
    header: '#1B1A1A',
    border: '#3A3939',

    // Text
    text: {
      primary: '#FFFFFF',
      secondary: '#CCCCCC',
      tertiary: '#999999',
      disabled: '#666666',
    },

    // Links and Actions
    link: {
      DEFAULT: '#F78C6B',
      hover: '#FFB49A',
    },
    button: {
      primary: {
        bg: '#F78C6B',
        text: '#1B1A1A',
      },
      secondary: {
        bg: '#3A3939',
        text: '#CCCCCC',
      },
      hover: '#FF9E80',
    },

    // Support
    support: {
      success: '#4CAF50',
      warning: '#FFC107',
      error: '#F44336',
      info: '#2196F3',
    },

    // Alternative Accents
    accent: {
      secondary: '#9B8FFF',
      hover: '#B7AFFF',
    },
  },
} as const;
