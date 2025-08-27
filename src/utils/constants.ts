// Settings page constants
export const SETTINGS_TABS = [
  { value: 'profile', label: 'Profile', icon: 'User' },
  { value: 'wallet', label: 'Wallet', icon: 'Wallet' },
  { value: 'notifications', label: 'Notifications', icon: 'Bell' },
  { value: 'security', label: 'Security', icon: 'Shield' },
  { value: 'api', label: 'API', icon: 'Key' },
] as const;

export const PAYOUT_METHODS = [
  { id: 'tao-direct', label: 'TAO Direct', description: 'Receive payments directly in TAO to your connected wallet' },
  { id: 'usdc-pool', label: 'USDC Pool', description: 'Convert to USDC via managed liquidity pool' },
  { id: 'usdt-pool', label: 'USDT Pool', description: 'Convert to USDT via managed liquidity pool' },
] as const;

export const NOTIFICATION_SETTINGS = [
  { id: 'submissions', title: 'Submission Status Updates', description: 'Get notified when your submissions are processed', enabled: true },
  { id: 'payouts', title: 'Payout Notifications', description: 'Receive alerts when payouts are processed', enabled: true },
  { id: 'challenges', title: 'Challenge Announcements', description: 'Get notified about new challenges and updates', enabled: true },
  { id: 'leaderboard', title: 'Leaderboard Updates', description: 'Notifications about ranking changes', enabled: false },
] as const;

export const SECURITY_ITEMS = [
  { label: 'Daily Submission Limit', value: '1 per challenge', badgeClass: 'text-foreground' },
  { label: 'Trust Tier', value: 'Standard', badgeClass: 'bg-muted text-muted-foreground' },
  { label: 'Account Status', value: 'Verified', badgeClass: 'bg-green-900/20 text-green-400' },
] as const;

export const PRIVACY_SETTINGS = [
  { id: 'profile-visibility', title: 'Profile Visibility', description: 'Allow your profile to be visible on leaderboards', enabled: true },
  { id: 'score-history', title: 'Public Score History', description: 'Make your submission scores publicly viewable', enabled: true },
] as const;

// Challenge constants
export const CHALLENGE_BUTTONS = [
  { icon: 'FileText', label: 'Template' },
  { icon: 'TestTube', label: 'Test Guide' },
  { icon: 'ExternalLink', label: 'Submit' },
] as const;

export const TEMPLATE_BUTTONS = [
  { icon: 'Download', label: 'Download Template' },
  { icon: 'Eye', label: 'View Documentation' },
  { icon: 'TestTube', label: 'Testing Guide' },
] as const;

// Miner profile constants
export const LEADERBOARD_STATS = [
  { title: "Total Miners", value: "4", subtitle: "Public profiles" },
  { title: "Avg Success Rate", value: "87.5%", subtitle: "All miners" },
  { title: "Total Distributed", value: "156.3 TAO", subtitle: "All time" },
  { title: "Active Today", value: "12", subtitle: "Miners online" },
] as const;

// Dashboard constants
export const DASHBOARD_STATS = [
  { title: "Total Earned", value: "4.12 TAO", subtitle: "≈$204.83 USD", icon: "DollarSign", color: "text-green-400" },
  { title: "Active Validators", value: "23", subtitle: "+2 from last week", icon: "Users", color: "text-blue-400" },
  { title: "Submissions", value: "2,847", subtitle: "Total platform", icon: "Trophy", color: "text-purple-400" },
  { title: "Success Rate", value: "87%", subtitle: "Your submissions", icon: "TrendingUp", color: "text-primary" },
] as const;

export const SUBMISSION_RULES_LEFT = [
  { icon: 'CheckCircle', color: 'text-green-400', text: 'ESLint check must pass (no malformed code)' },
  { icon: 'Target', color: 'text-blue-400', text: 'Minimum score threshold: >0.5 (varies by challenge)' },
  { icon: 'Info', color: 'text-purple-400', text: 'Comparison score must be <0.7' },
] as const;

export const SUBMISSION_RULES_RIGHT = [
  { icon: 'Clock', color: 'text-orange-400', text: 'Submissions decay from day 10, fully by day 15' },
  { icon: 'AlertTriangle', color: 'text-primary', text: 'Higher comparison scores negatively affect final score' },
  { icon: 'Info', color: 'text-cyan-400', text: 'Resubmissions: (old_score < new_score) && comparison < 0.9' },
] as const;