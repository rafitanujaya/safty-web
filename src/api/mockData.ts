export type ThreatCategory = 'Phishing' | 'Malware' | 'Suspicious' | 'Adware' | 'Safe';
export type SeverityLevel = 'Critical' | 'High' | 'Medium' | 'Low';
export type ActivityAction = 'Blocked Download' | 'Phishing Prevented' | 'Tracker Blocked' | 'Malicious Redirect Prevented' | 'Background Scan';

export interface OverviewStats {
  totalThreats: number;
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
  status: 'Blocked' | 'Warning' | 'Passed';
  category: ThreatCategory;
  timestamp: string;
  severity: SeverityLevel;
  riskScore: number; // 0-100
}

export interface FlaggedWebsite {
  domain: string;
  count: number;
  riskScore: number;
}

export interface ActivityEvent {
  id: string;
  action: ActivityAction;
  domain: string;
  timestamp: string;
  severity: 'high' | 'medium' | 'low' | 'info';
}

export interface UserInsight {
  trendInsight: string;
  originInsight: string;
  weeklyRiskScore: number;
  preventedIncidents: number;
}

// ----------------------------------------------------
// DUMMY DATA
// ----------------------------------------------------

export const mockOverviewStats: OverviewStats = {
  totalThreats: 14250,
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
  { name: 'Critical', value: 8, color: '#ef4444' }, // Red
  { name: 'High', value: 15, color: '#f97316' },     // Orange
  { name: 'Medium', value: 35, color: '#eab308' },   // Yellow
  { name: 'Low', value: 42, color: '#3b82f6' },      // Blue
];

export const mockDetections: Detection[] = [
  { id: '1', domain: 'secure-login-paypal-verify.com', status: 'Blocked', category: 'Phishing', severity: 'Critical', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), riskScore: 98 },
  { id: '2', domain: 'freetmovies-hd-online.net', status: 'Blocked', category: 'Malware', severity: 'High', timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(), riskScore: 85 },
  { id: '3', domain: 'bank-of-america-update.info', status: 'Warning', category: 'Suspicious', severity: 'Medium', timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), riskScore: 65 },
  { id: '4', domain: 'app-verify-wallet.io', status: 'Blocked', category: 'Phishing', severity: 'Critical', timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), riskScore: 92 },
  { id: '5', domain: 'unknown-ads-tracker.com', status: 'Passed', category: 'Adware', severity: 'Low', timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(), riskScore: 40 },
];

export const mockTopFlagged: FlaggedWebsite[] = [
  { domain: 'secure-login-update.com', count: 142, riskScore: 96 },
  { domain: 'free-crypto-giveaway.net', count: 98, riskScore: 92 },
  { domain: 'verify-account-info.co', count: 76, riskScore: 89 },
  { domain: 'download-movies-now.me', count: 65, riskScore: 85 },
  { domain: 'invoice-document-782.zip.com', count: 54, riskScore: 88 },
];

export const mockUserInsight: UserInsight = {
  trendInsight: "Phishing attempts increased by 23% this week.",
  originInsight: "Most threats originated from embedded ad networks.",
  weeklyRiskScore: 24,
  preventedIncidents: 14250,
};

export const initialMockActivities: ActivityEvent[] = [
  { id: 'a1', action: 'Phishing Prevented', domain: 'secure-login-paypal.com', timestamp: new Date().toISOString(), severity: 'high' },
  { id: 'a2', action: 'Background Scan', domain: 'github.com', timestamp: new Date(Date.now() - 10000).toISOString(), severity: 'info' },
  { id: 'a3', action: 'Tracker Blocked', domain: 'blog-crypto-update.net', timestamp: new Date(Date.now() - 25000).toISOString(), severity: 'medium' },
];
