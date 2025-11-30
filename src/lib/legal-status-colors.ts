// Centralized legal status color definitions for consistency across the app
// All components should import from here

export type LegalStatus = 
  | 'recreational' 
  | 'medical' 
  | 'decriminalized' 
  | 'illegal' 
  | 'mixed'
  | 'Recreational' 
  | 'Medical' 
  | 'Decriminalized' 
  | 'Illegal' 
  | 'Mixed';

// Normalize status to lowercase for consistent handling
export const normalizeStatus = (status: string): string => {
  return status.toLowerCase();
};

// Tailwind class-based colors for badges and UI elements
export const getStatusBadgeClasses = (status: string): string => {
  const normalized = normalizeStatus(status);
  switch (normalized) {
    case 'recreational':
      return 'bg-green-500/90 text-white hover:bg-green-500';
    case 'medical':
      return 'bg-amber-500/90 text-white hover:bg-amber-500';
    case 'decriminalized':
      return 'bg-blue-500/90 text-white hover:bg-blue-500';
    case 'mixed':
      return 'bg-purple-500/90 text-white hover:bg-purple-500';
    case 'illegal':
      return 'bg-red-600/90 text-white hover:bg-red-600';
    default:
      return 'bg-zinc-500/90 text-white hover:bg-zinc-500';
  }
};

// Outline/border style for transparent backgrounds
export const getStatusOutlineClasses = (status: string): string => {
  const normalized = normalizeStatus(status);
  switch (normalized) {
    case 'recreational':
      return 'text-green-400 border-green-500/50 bg-green-500/10';
    case 'medical':
      return 'text-amber-400 border-amber-500/50 bg-amber-500/10';
    case 'decriminalized':
      return 'text-blue-400 border-blue-500/50 bg-blue-500/10';
    case 'mixed':
      return 'text-purple-400 border-purple-500/50 bg-purple-500/10';
    case 'illegal':
      return 'text-red-400 border-red-500/50 bg-red-500/10';
    default:
      return 'text-zinc-400 border-zinc-500/50 bg-zinc-500/10';
  }
};

// Dot indicator colors (for lists)
export const getStatusDotClass = (status: string): string => {
  const normalized = normalizeStatus(status);
  switch (normalized) {
    case 'recreational':
      return 'bg-green-500';
    case 'medical':
      return 'bg-amber-500';
    case 'decriminalized':
      return 'bg-blue-500';
    case 'mixed':
      return 'bg-purple-500';
    case 'illegal':
      return 'bg-red-500';
    default:
      return 'bg-zinc-500';
  }
};

// Hex colors for SVG/Canvas elements (maps, charts)
export const STATUS_HEX_COLORS: Record<string, string> = {
  recreational: '#22c55e', // green-500
  medical: '#f59e0b',      // amber-500
  decriminalized: '#3b82f6', // blue-500
  mixed: '#8b5cf6',        // purple-500
  illegal: '#ef4444',      // red-500
  default: '#71717a',      // zinc-500
};

export const getStatusHexColor = (status: string): string => {
  const normalized = normalizeStatus(status);
  return STATUS_HEX_COLORS[normalized] || STATUS_HEX_COLORS.default;
};

// Display labels for statuses
export const getStatusLabel = (status: string): string => {
  const normalized = normalizeStatus(status);
  switch (normalized) {
    case 'recreational':
      return 'Recreational';
    case 'medical':
      return 'Medical';
    case 'decriminalized':
      return 'Decriminalized';
    case 'mixed':
      return 'Mixed';
    case 'illegal':
      return 'Illegal';
    default:
      return status;
  }
};
