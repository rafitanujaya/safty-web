export type ThreatCategory = 'Safe' | 'Suspicious' | 'Malicious' | 'Phishing' | 'Unknown';
export type ActivityAction = 'Blocked Download' | 'Phishing Detected' | 'Suspicious Form Blocked' | 'Malicious Redirect Prevented' | 'Scan Completed';

export interface OverviewStats {
  totalScanned: number;
  suspiciousDetected: number;
  safeWebsites: number;
  todayAlerts: number;
}

export interface TrendDataPoint {
  date: string;
  safe: number;
  suspicious: number;
  malicious: number;
}

export interface CategoryData {
  name: ThreatCategory;
  value: number;
  color: string;
}

export interface Detection {
  id: string;
  domain: string;
  status: 'Blocked' | 'Warning' | 'Passed';
  category: ThreatCategory;
  timestamp: string;
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
  weeklyRiskScore: number; // 0-100
  preventedIncidents: number;
  nearMissEvents: number;
  scoreDelta: number; // e.g. -5 means risk dropped by 5
}

// ----------------------------------------------------
// DUMMY DATA
// ----------------------------------------------------

export const mockOverviewStats: OverviewStats = {
  totalScanned: 14250,
  suspiciousDetected: 124,
  safeWebsites: 14101,
  todayAlerts: 18,
};

export const mockTrendData: TrendDataPoint[] = [
  { date: 'Mon', safe: 1800, suspicious: 12, malicious: 2 },
  { date: 'Tue', safe: 1950, suspicious: 15, malicious: 4 },
  { date: 'Wed', safe: 2100, suspicious: 22, malicious: 7 },
  { date: 'Thu', safe: 1850, suspicious: 18, malicious: 3 },
  { date: 'Fri', safe: 2200, suspicious: 30, malicious: 8 },
  { date: 'Sat', safe: 2400, suspicious: 14, malicious: 1 },
  { date: 'Sun', safe: 1950, suspicious: 13, malicious: 2 },
];

export const mockCategoryData: CategoryData[] = [
  { name: 'Safe', value: 92, color: '#10b981' },
  { name: 'Suspicious', value: 4, color: '#f59e0b' },
  { name: 'Malicious', value: 2, color: '#ef4444' },
  { name: 'Phishing', value: 1.5, color: '#8b5cf6' },
  { name: 'Unknown', value: 0.5, color: '#64748b' },
];

export const mockDetections: Detection[] = [
  { id: '1', domain: 'secure-login-paypal-verify.com', status: 'Blocked', category: 'Phishing', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), riskScore: 98 },
  { id: '2', domain: 'freetmovies-hd-online.net', status: 'Blocked', category: 'Malicious', timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(), riskScore: 85 },
  { id: '3', domain: 'bank-of-america-update.info', status: 'Warning', category: 'Suspicious', timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), riskScore: 65 },
  { id: '4', domain: 'app-verify-wallet.io', status: 'Blocked', category: 'Phishing', timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), riskScore: 92 },
  { id: '5', domain: 'unknown-ads-tracker.com', status: 'Passed', category: 'Unknown', timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(), riskScore: 40 },
];

export const mockTopFlagged: FlaggedWebsite[] = [
  { domain: 'secure-login-update.com', count: 142, riskScore: 96 },
  { domain: 'free-crypto-giveaway.net', count: 98, riskScore: 92 },
  { domain: 'verify-account-info.co', count: 76, riskScore: 89 },
  { domain: 'download-movies-now.me', count: 65, riskScore: 85 },
  { domain: 'invoice-document-782.zip.com', count: 54, riskScore: 88 },
];

export const mockUserInsight: UserInsight = {
  weeklyRiskScore: 24,
  preventedIncidents: 12,
  nearMissEvents: 3,
  scoreDelta: -4,
};

export const initialMockActivities: ActivityEvent[] = [
  { id: 'a1', action: 'Phishing Detected', domain: 'secure-login-paypal.com', timestamp: new Date().toISOString(), severity: 'high' },
  { id: 'a2', action: 'Scan Completed', domain: 'github.com', timestamp: new Date(Date.now() - 10000).toISOString(), severity: 'info' },
  { id: 'a3', action: 'Suspicious Form Blocked', domain: 'blog-crypto-update.net', timestamp: new Date(Date.now() - 25000).toISOString(), severity: 'medium' },
];
