// Dark Fantasy Theme for D&D Companion App
// Optimized for gaming sessions in low light

export const colors = {
  // Primary - Deep purple/mystical
  primary: '#8B5CF6',
  primaryDark: '#7C3AED',
  primaryLight: '#A78BFA',
  
  // Secondary - Crimson/blood red
  secondary: '#DC2626',
  secondaryDark: '#B91C1C',
  
  // Accent - Gold/treasure
  accent: '#F59E0B',
  accentDark: '#D97706',
  
  // Backgrounds - Dark theme
  background: '#0F0F0F',
  backgroundSecondary: '#1A1A1A',
  backgroundTertiary: '#262626',
  
  // Surface colors
  surface: '#1F1F1F',
  surfaceHover: '#2A2A2A',
  
  // Text
  text: '#F5F5F5',
  textSecondary: '#A3A3A3',
  textMuted: '#737373',
  
  // Borders
  border: '#404040',
  borderLight: '#525252',
  
  // Status colors
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
  
  // D&D specific colors
  hp: '#DC2626',
  mana: '#3B82F6',
  stamina: '#10B981',
  
  // Dice colors
  d4: '#EF4444',
  d6: '#F59E0B',
  d8: '#10B981',
  d10: '#3B82F6',
  d12: '#8B5CF6',
  d20: '#F59E0B',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const typography = {
  // Headers
  h1: { 
    fontSize: 32, 
    fontWeight: '700' as const, 
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  h2: { 
    fontSize: 24, 
    fontWeight: '600' as const, 
    lineHeight: 32,
    letterSpacing: -0.3,
  },
  h3: { 
    fontSize: 20, 
    fontWeight: '600' as const, 
    lineHeight: 28,
  },
  h4: { 
    fontSize: 18, 
    fontWeight: '600' as const, 
    lineHeight: 26,
  },
  
  // Body text
  body: { 
    fontSize: 16, 
    fontWeight: '400' as const, 
    lineHeight: 24,
  },
  bodyLarge: { 
    fontSize: 18, 
    fontWeight: '400' as const, 
    lineHeight: 28,
  },
  bodySmall: { 
    fontSize: 14, 
    fontWeight: '400' as const, 
    lineHeight: 20,
  },
  
  // Special
  caption: { 
    fontSize: 12, 
    fontWeight: '400' as const, 
    lineHeight: 16,
  },
  button: { 
    fontSize: 16, 
    fontWeight: '600' as const, 
    lineHeight: 24,
  },
  label: { 
    fontSize: 14, 
    fontWeight: '500' as const, 
    lineHeight: 20,
  },
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 12,
  },
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
};

// Animation durations
export const animation = {
  fast: 150,
  normal: 250,
  slow: 350,
};
