import { create } from 'zustand';

interface DashboardState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  timeRange: '24h' | '7d' | '30d';
  setTimeRange: (range: '24h' | '7d' | '30d') => void;
  activeActivityTab: 'all' | 'high-risk';
  setActiveActivityTab: (tab: 'all' | 'high-risk') => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  timeRange: '7d',
  setTimeRange: (range) => set({ timeRange: range }),
  activeActivityTab: 'all',
  setActiveActivityTab: (tab) => set({ activeActivityTab: tab }),
}));
