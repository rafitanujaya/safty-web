export type ThreatCategory = 'Phishing' | 'Malware' | 'Suspicious' | 'Adware' | 'Command & Control';
export type SeverityLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type EventType = 'PHISHING_PREVENTED' | 'DOWNLOAD_BLOCKED' | 'SUSPICIOUS_INTERACTION' | 'TRACKER_BLOCKED' | 'BACKGROUND_SCAN';
export type ActionTaken = 'BLOCKED' | 'WARNING' | 'LOGGED';

export interface OverviewStats {
  totalThreatsBlocked: number;
  phishingDetections: number;
  maliciousActivity: number;
  suspiciousInteractions: number;
}

export interface TrendDataPoint {
  date: string;
  phishing: number;
  malicious: number;
  suspicious: number;
}

export interface CategoryData {
  name: SeverityLevel;
  value: number;
  color: string;
}

export interface Detection {
  id: string;
  domain: string;
  action_taken: ActionTaken;
  category: ThreatCategory;
  detected_at: string;
  severity: SeverityLevel;
  riskScore: number; // 0-100
}

export interface FlaggedWebsite {
  domain: string;
  total_intercepts: number;
  riskScore: number;
}

export interface ActivityEvent {
  id: string;
  event_type: EventType;
  action_taken: ActionTaken;
  domain: string;
  detected_at: string;
  severity: SeverityLevel;
}

export interface SystemInsight {
  trendInsight: string;
  originInsight: string;
  weeklyRiskScore: number;
  preventedIncidents: number;
}

// ----------------------------------------------------
// DUMMY DATA
// ----------------------------------------------------

export const mockOverviewStats: OverviewStats = {
  totalThreatsBlocked: 14250,
  phishingDetections: 4210,
  maliciousActivity: 6720,
  suspiciousInteractions: 3320,
};

export const mockTrendData: TrendDataPoint[] = [
  { date: 'Mon', phishing: 120, malicious: 45, suspicious: 400 },
  { date: 'Tue', phishing: 150, malicious: 60, suspicious: 380 },
  { date: 'Wed', phishing: 220, malicious: 110, suspicious: 550 },
  { date: 'Thu', phishing: 180, malicious: 80, suspicious: 420 },
  { date: 'Fri', phishing: 300, malicious: 150, suspicious: 600 },
  { date: 'Sat', phishing: 140, malicious: 50, suspicious: 300 },
  { date: 'Sun', phishing: 130, malicious: 40, suspicious: 320 },
];

export const mockCategoryData: CategoryData[] = [
  { name: 'CRITICAL', value: 8, color: '#ef4444' }, // Red
  { name: 'HIGH', value: 15, color: '#f97316' },     // Orange
  { name: 'MEDIUM', value: 35, color: '#eab308' },   // Yellow
  { name: 'LOW', value: 42, color: '#3b82f6' },      // Blue
];

export const mockDetections: Detection[] = [
  { id: '1', domain: 'secure-login-paypal-verify.com', action_taken: 'BLOCKED', category: 'Phishing', severity: 'CRITICAL', detected_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(), riskScore: 98 },
  { id: '2', domain: 'freetmovies-hd-online.net', action_taken: 'BLOCKED', category: 'Malware', severity: 'HIGH', detected_at: new Date(Date.now() - 1000 * 60 * 25).toISOString(), riskScore: 85 },
  { id: '3', domain: 'bank-of-america-update.info', action_taken: 'WARNING', category: 'Suspicious', severity: 'MEDIUM', detected_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(), riskScore: 65 },
  { id: '4', domain: 'app-verify-wallet.io', action_taken: 'BLOCKED', category: 'Phishing', severity: 'CRITICAL', detected_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(), riskScore: 92 },
  { id: '5', domain: 'unknown-ads-tracker.com', action_taken: 'LOGGED', category: 'Adware', severity: 'LOW', detected_at: new Date(Date.now() - 1000 * 60 * 180).toISOString(), riskScore: 40 },
];

export const mockTopFlagged: FlaggedWebsite[] = [
  { domain: 'secure-login-update.com', total_intercepts: 142, riskScore: 96 },
  { domain: 'free-crypto-giveaway.net', total_intercepts: 98, riskScore: 92 },
  { domain: 'verify-account-info.co', total_intercepts: 76, riskScore: 89 },
  { domain: 'download-movies-now.me', total_intercepts: 65, riskScore: 85 },
  { domain: 'invoice-document-782.zip.com', total_intercepts: 54, riskScore: 88 },
];

export const mockUserInsight: SystemInsight = {
  trendInsight: "Phishing attempts increased by 23% this week.",
  originInsight: "Most threats originated from a small set of domains associated with malware distribution networks.",
  weeklyRiskScore: 24,
  preventedIncidents: 14250,
};

export const initialMockActivities: ActivityEvent[] = [
  { id: 'a1', event_type: 'PHISHING_PREVENTED', action_taken: 'BLOCKED', domain: 'secure-login-paypal.com', detected_at: new Date().toISOString(), severity: 'HIGH' },
  { id: 'a2', event_type: 'BACKGROUND_SCAN', action_taken: 'LOGGED', domain: 'github.com', detected_at: new Date(Date.now() - 10000).toISOString(), severity: 'LOW' },
  { id: 'a3', event_type: 'TRACKER_BLOCKED', action_taken: 'BLOCKED', domain: 'blog-crypto-update.net', detected_at: new Date(Date.now() - 25000).toISOString(), severity: 'MEDIUM' },
];
