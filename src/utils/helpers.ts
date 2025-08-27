// Color utility functions
export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Active': return 'bg-green-900/20 text-green-400';
    case 'Upcoming': return 'bg-blue-900/20 text-blue-400';
    case 'Ended': return 'bg-muted text-muted-foreground';
    case 'Completed': return 'bg-green-900/20 text-green-400';
    case 'Processing': return 'border border-yellow-400/20 text-yellow-400';
    default: return 'bg-muted text-muted-foreground';
  }
};

export const getTierColor = (tier: string): string => {
  return tier === 'Verified' ? 'bg-blue-900/20 text-blue-400' : 'bg-muted text-muted-foreground';
};

export const getRankColor = (rank: number): string => {
  if (rank === 1) return 'text-yellow-400';
  if (rank === 2) return 'text-gray-300';
  if (rank === 3) return 'text-amber-600';
  return 'text-muted-foreground';
};

// Animation delay helpers
export const getAnimationDelay = (index: number, baseDelay: number = 0): string => {
  return `${baseDelay + index * 0.1}s`;
};

// Format date helper
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
};

// Mock data generators
export const generateMockTestResults = () => ({
  eslint: { passed: true, issues: 0 },
  syntax: { passed: true, errors: [] },
  logic: { passed: true, score: 0.85 },
  comparison: { score: 0.65, threshold: 0.7, passed: true },
  performance: { executionTime: 120, memoryUsage: '45MB' }
});

// Progress animation helper
export const animateProgress = (setValue: (value: number) => void, target: number, duration: number = 300) => {
  let current = 0;
  const increment = target / (duration / 10);
  const timer = setInterval(() => {
    current = Math.min(current + increment, target);
    setValue(current);
    if (current >= target) clearInterval(timer);
  }, 10);
  return timer;
};