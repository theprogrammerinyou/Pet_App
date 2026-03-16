/**
 * App theme – Radical V2 Wow Factor
 */
export const theme = {
  colors: {
    // Solid rich colors
    primary: '#FF4D6D', // Deeper, more saturated pink/red
    primaryDark: '#C9184A',
    primaryLight: '#FFB3C6',
    accent: '#00F5D4', // Neon mint
    accentLight: '#80FFEA',

    // Gradients (to be used with react-native-linear-gradient if available, otherwise fallback)
    gradients: {
      primary: ['#FF0054', '#FF5400'], // Hot pink to electric orange
      secondary: ['#9D4EDD', '#FF4D6D'], // Deep purple to hot pink
      ocean: ['#00BBF9', '#00F5D4'], // Cyber blue to neon mint
      surface: ['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.85)'], // Glassmorphism
    },

    background: '#F0F2F5', // Very light grey with a blue tint for depth
    backgroundWarm: '#FAFAFA', // Almost white for contrast layers
    surface: '#FFFFFF',
    surfaceTranslucent: 'rgba(255, 255, 255, 0.7)',

    text: '#0F172A', // Slate 900 - almost black slate
    textSecondary: '#475569', // Slate 600
    textMuted: '#94A3B8', // Slate 400

    border: 'rgba(15, 23, 42, 0.08)',
    borderLight: 'rgba(15, 23, 42, 0.04)',

    success: '#10B981',
    error: '#EF4444',
    tabBar: 'rgba(255, 255, 255, 0.9)',
    cardHighlight: '#FFF0F4',
    gold: '#F59E0B',
  },
  spacing: {
    xs: 6,
    sm: 12,
    md: 20,
    lg: 32,
    xl: 48,
    xxl: 64,
  },
  borderRadius: {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 40,
    full: 9999,
  },
  typography: {
    hero: 42, // Massive hero banners
    title: 32, // H1
    subtitle: 22, // H2
    body: 16, // Normal text
    caption: 14, // Secondary text
    small: 12, // Meta data
  },
  shadow: {
    glass: {
      shadowColor: '#0F172A',
      shadowOffset: {width: 0, height: 12},
      shadowOpacity: 0.1,
      shadowRadius: 24,
      elevation: 10,
    },
    button: {
      shadowColor: '#FF0054',
      shadowOffset: {width: 0, height: 8},
      shadowOpacity: 0.35,
      shadowRadius: 16,
      elevation: 12,
    },
    card: {
      shadowColor: '#0F172A',
      shadowOffset: {width: 0, height: 6},
      shadowOpacity: 0.06,
      shadowRadius: 16,
      elevation: 6,
    },
  },
};

export type Theme = typeof theme;
