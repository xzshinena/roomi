// Theme constants for React Native styling
export const Theme = {
  // Spacing
  spacingXS: 4,
  spacingS: 8,
  spacingM: 12,
  spacingL: 16,
  spacingXL: 20,
  spacingXXL: 24,

  // Corner Radius
  cornerRadiusS: 8,
  cornerRadiusM: 12,
  cornerRadiusL: 16,
  cornerRadiusXL: 24,

  // Shadows
  shadowSmall: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
  },
  shadowMedium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 8,
  },
  shadowLarge: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 12,
    elevation: 12,
  },

  // Colors
  primaryColor: '#8B5CF6', // purple
  secondaryColor: '#14B8A6', // teal
  accentColor: '#FB923C', // orange

  // Event Colors (with transparency)
  eventColors: [
    '#FB923C33', // orange with opacity
    '#8B5CF633', // purple with opacity
    '#3B82F633', // blue with opacity
    '#EC489633', // pink with opacity
    '#FDE04733', // yellow with opacity
    '#10B98133', // green with opacity
    '#6366F133', // indigo with opacity
  ],

  // Event Border Colors
  eventColorBorders: [
    '#FB923C', // orange
    '#8B5CF6', // purple
    '#3B82F6', // blue
    '#EC4899', // pink
    '#FDE047', // yellow
    '#10B981', // green
    '#6366F1', // indigo
  ],

  // Text Colors
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',

  // Background Colors
  backgroundPrimary: '#FFFFFF',
  backgroundSecondary: '#F9FAFB',
  backgroundTertiary: '#F3F4F6',
};

export type ShadowStyle = typeof Theme.shadowSmall;
