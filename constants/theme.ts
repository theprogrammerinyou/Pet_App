/**
 * App theme – warm, lively pet-care palette
 */
export const theme = {
  colors: {
    primary: '#CB93A5',
    primaryDark: '#A86B7D',
    primaryLight: '#E8C4CE',
    accent: '#7BA05B',
    accentLight: '#B8D4A0',
    background: '#F5F0ED',
    backgroundWarm: '#FDF8F6',
    surface: '#FFFFFF',
    text: '#2D2926',
    textSecondary: 'rgba(45, 41, 38, 0.75)',
    textMuted: 'rgba(45, 41, 38, 0.5)',
    border: 'rgba(45, 41, 38, 0.12)',
    borderLight: 'rgba(45, 41, 38, 0.08)',
    success: '#2E7D32',
    error: '#C62828',
    tabBar: '#FFFFFF',
    cardHighlight: '#FFF5F7',
    gold: '#D4A84B',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    full: 9999,
  },
  typography: {
    title: 20,
    subtitle: 17,
    body: 15,
    caption: 13,
    small: 11,
  },
  shadow: {
    card: {
      shadowColor: '#1F2937',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 4,
    },
    button: {
      shadowColor: '#FF6B8B',
      shadowOffset: {width: 0, height: 6},
      shadowOpacity: 0.25,
      shadowRadius: 10,
      elevation: 6,
    },
  },
};

export type Theme = typeof theme;
