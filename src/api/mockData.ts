export type ThreatCategory = 'Phishing' | 'Malware' | 'Suspicious' | 'Adware' | 'Command & Control';
export type SeverityLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type EventType = 'PHISHING_PREVENTED' | 'DOWNLOAD_BLOCKED' | 'SUSPICIOUS_INTERACTION' | 'TRACKER_BLOCKED' | 'BACKGROUND_SCAN' | 'REDIRECT_BLOCKED' | 'FORM_BLOCKED';
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

// ── Dangerous Files ──────────────────────────────────
export type FileType = 'exe' | 'zip' | 'pdf' | 'doc' | 'js' | 'bat' | 'msi' | 'dmg' | 'apk';

export interface DangerousFile {
  id: string;
  fileName: string;
  fileType: FileType;
  sourceDomain: string;
  riskScore: number;
  detectionReason: string;
  action_taken: 'BLOCKED' | 'WARNING';
  detected_at: string;
  fileSize: string;
}

// ── Education Articles ───────────────────────────────
export interface EducationArticle {
  id: string;
  title: string;
  summary: string;
  category: 'Phishing' | 'Malware' | 'Social Engineering' | 'Downloads' | 'Privacy';
  readTime: string;
  imageUrl: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

// ── Protection Settings / Config ─────────────────────
export interface ProtectionConfig {
  realtimeProtection: boolean;
  formBlocking: boolean;
  downloadScanning: boolean;
  trackerBlocking: boolean;
  redirectProtection: boolean;
  riskThreshold: number; // 0-100
  deviceName: string;
  lastSync: string;
  extensionVersion: string;
}

// ── Threat History ───────────────────────────────────
export interface ThreatHistoryEntry {
  id: string;
  timestamp: string;
  domain: string;
  category: ThreatCategory;
  action_taken: ActionTaken;
  severity: SeverityLevel;
  riskScore: number;
  eventType: EventType;
  detectionMethod: string;
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
  { id: 'a4', event_type: 'DOWNLOAD_BLOCKED', action_taken: 'BLOCKED', domain: 'free-tools-download.com', detected_at: new Date(Date.now() - 45000).toISOString(), severity: 'HIGH' },
  { id: 'a5', event_type: 'REDIRECT_BLOCKED', action_taken: 'BLOCKED', domain: 'suspicious-redirect.xyz', detected_at: new Date(Date.now() - 62000).toISOString(), severity: 'MEDIUM' },
  { id: 'a6', event_type: 'FORM_BLOCKED', action_taken: 'WARNING', domain: 'fake-survey-site.com', detected_at: new Date(Date.now() - 80000).toISOString(), severity: 'LOW' },
];

// ── Dangerous Files Mock Data ────────────────────────
export const mockDangerousFiles: DangerousFile[] = [
  {
    id: 'f1',
    fileName: 'invoice_2024.exe.zip',
    fileType: 'zip',
    sourceDomain: 'billing-update-center.com',
    riskScore: 98,
    detectionReason: 'Double extension with embedded executable — known malware dropper pattern',
    action_taken: 'BLOCKED',
    detected_at: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    fileSize: '2.4 MB',
  },
  {
    id: 'f2',
    fileName: 'free-movie-player.exe',
    fileType: 'exe',
    sourceDomain: 'free-media-downloads.net',
    riskScore: 92,
    detectionReason: 'Unsigned executable from untrusted domain with trojan signature match',
    action_taken: 'BLOCKED',
    detected_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    fileSize: '14.7 MB',
  },
  {
    id: 'f3',
    fileName: 'bank-statement.pdf.exe',
    fileType: 'exe',
    sourceDomain: 'secure-banking-doc.info',
    riskScore: 88,
    detectionReason: 'PDF disguised as executable — social engineering attack vector',
    action_taken: 'WARNING',
    detected_at: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    fileSize: '892 KB',
  },
  {
    id: 'f4',
    fileName: 'system-update-v3.2.msi',
    fileType: 'msi',
    sourceDomain: 'update-your-system-now.com',
    riskScore: 85,
    detectionReason: 'MSI package with registry modification capabilities from unverified publisher',
    action_taken: 'BLOCKED',
    detected_at: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    fileSize: '23.1 MB',
  },
  {
    id: 'f5',
    fileName: 'crypto-wallet-setup.dmg',
    fileType: 'dmg',
    sourceDomain: 'getcryptowallet-free.io',
    riskScore: 78,
    detectionReason: 'Fake cryptocurrency wallet installer with keylogger behavior',
    action_taken: 'BLOCKED',
    detected_at: new Date(Date.now() - 1000 * 60 * 720).toISOString(),
    fileSize: '45.6 MB',
  },
  {
    id: 'f6',
    fileName: 'document-macro.doc',
    fileType: 'doc',
    sourceDomain: 'office-share-docs.com',
    riskScore: 65,
    detectionReason: 'Office document with suspicious VBA macro attempting PowerShell execution',
    action_taken: 'WARNING',
    detected_at: new Date(Date.now() - 1000 * 60 * 1440).toISOString(),
    fileSize: '340 KB',
  },
  {
    id: 'f7',
    fileName: 'payload-loader.js',
    fileType: 'js',
    sourceDomain: 'cdn-analytics-scripts.com',
    riskScore: 72,
    detectionReason: 'Obfuscated JavaScript attempting to download secondary payload',
    action_taken: 'BLOCKED',
    detected_at: new Date(Date.now() - 1000 * 60 * 2880).toISOString(),
    fileSize: '18 KB',
  },
];

// ── Education Mock Data ──────────────────────────────
export const mockEducationArticles: EducationArticle[] = [
  {
    id: 'e1',
    title: 'How Phishing Sites Mimic Bank Login Pages',
    summary: 'Learn how attackers create pixel-perfect replicas of legitimate banking portals and the red flags to watch for before entering your credentials.',
    category: 'Phishing',
    readTime: '5 min read',
    imageUrl: '',
    difficulty: 'Beginner',
  },
  {
    id: 'e2',
    title: 'Why Double Extension Files Are Dangerous',
    summary: 'Files named "invoice.pdf.exe" exploit how Windows hides extensions. Understand this common malware delivery technique and how to protect yourself.',
    category: 'Downloads',
    readTime: '3 min read',
    imageUrl: '',
    difficulty: 'Beginner',
  },
  {
    id: 'e3',
    title: 'Social Engineering: The Human Factor in Cybersecurity',
    summary: 'Most successful cyberattacks start by manipulating people, not technology. Discover the psychological tricks hackers use to gain your trust.',
    category: 'Social Engineering',
    readTime: '7 min read',
    imageUrl: '',
    difficulty: 'Intermediate',
  },
  {
    id: 'e4',
    title: 'Understanding Browser Trackers & Your Privacy',
    summary: 'Third-party trackers follow your every click across the web. Learn how tracker blocking works and why it matters for your digital privacy.',
    category: 'Privacy',
    readTime: '4 min read',
    imageUrl: '',
    difficulty: 'Beginner',
  },
  {
    id: 'e5',
    title: 'Recognizing Malicious Email Attachments',
    summary: 'Not every email attachment is what it seems. Explore the telltale signs of weaponized documents, macros, and how to verify attachments safely.',
    category: 'Malware',
    readTime: '6 min read',
    imageUrl: '',
    difficulty: 'Intermediate',
  },
  {
    id: 'e6',
    title: 'How Malicious Redirects Steal Your Data',
    summary: 'Clicking a legitimate-looking link can redirect you through a chain of malicious servers. Learn the anatomy of redirect attacks and how Safty stops them.',
    category: 'Phishing',
    readTime: '5 min read',
    imageUrl: '',
    difficulty: 'Advanced',
  },
];

// ── Protection Config Mock Data ──────────────────────
export const mockProtectionConfig: ProtectionConfig = {
  realtimeProtection: true,
  formBlocking: true,
  downloadScanning: true,
  trackerBlocking: true,
  redirectProtection: true,
  riskThreshold: 65,
  deviceName: 'Chrome — MacBook Pro',
  lastSync: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
  extensionVersion: '2.4.1',
};

// ── Threat History Mock Data ─────────────────────────
export const mockThreatHistory: ThreatHistoryEntry[] = [
  { id: 'h1', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), domain: 'secure-login-paypal-verify.com', category: 'Phishing', action_taken: 'BLOCKED', severity: 'CRITICAL', riskScore: 98, eventType: 'PHISHING_PREVENTED', detectionMethod: 'URL Pattern Analysis' },
  { id: 'h2', timestamp: new Date(Date.now() - 1000 * 60 * 18).toISOString(), domain: 'free-movie-player.exe', category: 'Malware', action_taken: 'BLOCKED', severity: 'HIGH', riskScore: 92, eventType: 'DOWNLOAD_BLOCKED', detectionMethod: 'File Signature Scan' },
  { id: 'h3', timestamp: new Date(Date.now() - 1000 * 60 * 42).toISOString(), domain: 'ads-tracker-network.com', category: 'Adware', action_taken: 'BLOCKED', severity: 'LOW', riskScore: 35, eventType: 'TRACKER_BLOCKED', detectionMethod: 'Blocklist Match' },
  { id: 'h4', timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(), domain: 'bank-of-america-update.info', category: 'Phishing', action_taken: 'WARNING', severity: 'MEDIUM', riskScore: 65, eventType: 'PHISHING_PREVENTED', detectionMethod: 'Heuristic Analysis' },
  { id: 'h5', timestamp: new Date(Date.now() - 1000 * 60 * 150).toISOString(), domain: 'suspicious-redirect.xyz', category: 'Suspicious', action_taken: 'BLOCKED', severity: 'MEDIUM', riskScore: 72, eventType: 'REDIRECT_BLOCKED', detectionMethod: 'Redirect Chain Analysis' },
  { id: 'h6', timestamp: new Date(Date.now() - 1000 * 60 * 200).toISOString(), domain: 'fake-survey-rewards.com', category: 'Phishing', action_taken: 'BLOCKED', severity: 'HIGH', riskScore: 88, eventType: 'FORM_BLOCKED', detectionMethod: 'Form Behavior Analysis' },
  { id: 'h7', timestamp: new Date(Date.now() - 1000 * 60 * 320).toISOString(), domain: 'app-verify-wallet.io', category: 'Phishing', action_taken: 'BLOCKED', severity: 'CRITICAL', riskScore: 96, eventType: 'PHISHING_PREVENTED', detectionMethod: 'URL Pattern Analysis' },
  { id: 'h8', timestamp: new Date(Date.now() - 1000 * 60 * 480).toISOString(), domain: 'cdn-analytics-scripts.com', category: 'Malware', action_taken: 'BLOCKED', severity: 'HIGH', riskScore: 82, eventType: 'DOWNLOAD_BLOCKED', detectionMethod: 'Script Behavior Analysis' },
  { id: 'h9', timestamp: new Date(Date.now() - 1000 * 60 * 600).toISOString(), domain: 'getcryptowallet-free.io', category: 'Malware', action_taken: 'BLOCKED', severity: 'HIGH', riskScore: 78, eventType: 'DOWNLOAD_BLOCKED', detectionMethod: 'File Signature Scan' },
  { id: 'h10', timestamp: new Date(Date.now() - 1000 * 60 * 720).toISOString(), domain: 'office-share-docs.com', category: 'Suspicious', action_taken: 'WARNING', severity: 'MEDIUM', riskScore: 58, eventType: 'SUSPICIOUS_INTERACTION', detectionMethod: 'Macro Analysis' },
  { id: 'h11', timestamp: new Date(Date.now() - 1000 * 60 * 960).toISOString(), domain: 'update-your-system-now.com', category: 'Malware', action_taken: 'BLOCKED', severity: 'HIGH', riskScore: 85, eventType: 'DOWNLOAD_BLOCKED', detectionMethod: 'File Signature Scan' },
  { id: 'h12', timestamp: new Date(Date.now() - 1000 * 60 * 1200).toISOString(), domain: 'free-robux-generator.net', category: 'Phishing', action_taken: 'BLOCKED', severity: 'HIGH', riskScore: 90, eventType: 'PHISHING_PREVENTED', detectionMethod: 'URL Pattern Analysis' },
  { id: 'h13', timestamp: new Date(Date.now() - 1000 * 60 * 1440).toISOString(), domain: 'unknown-ads-tracker.com', category: 'Adware', action_taken: 'LOGGED', severity: 'LOW', riskScore: 28, eventType: 'TRACKER_BLOCKED', detectionMethod: 'Blocklist Match' },
  { id: 'h14', timestamp: new Date(Date.now() - 1000 * 60 * 2000).toISOString(), domain: 'billing-update-center.com', category: 'Phishing', action_taken: 'BLOCKED', severity: 'CRITICAL', riskScore: 95, eventType: 'PHISHING_PREVENTED', detectionMethod: 'URL Pattern Analysis' },
  { id: 'h15', timestamp: new Date(Date.now() - 1000 * 60 * 2880).toISOString(), domain: 'install-helper-tool.com', category: 'Malware', action_taken: 'BLOCKED', severity: 'MEDIUM', riskScore: 68, eventType: 'DOWNLOAD_BLOCKED', detectionMethod: 'Heuristic Analysis' },
];
