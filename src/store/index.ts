import { create } from 'zustand';

interface AppState {
  // UI State
  isNavOpen: boolean;
  isDarkMode: boolean;
  activeSection: string;
  isLoading: boolean;
  progress: number;
  
  // Animation State
  hasAnimationPlayed: Record<string, boolean>;
  
  // Actions
  setNavOpen: (isOpen: boolean) => void;
  setDarkMode: (isDarkMode: boolean) => void;
  setActiveSection: (section: string) => void;
  setLoading: (isLoading: boolean) => void;
  setProgress: (progress: number) => void;
  markAnimationPlayed: (animationId: string) => void;
  resetAnimations: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  // UI State
  isNavOpen: false,
  isDarkMode: true,
  activeSection: 'hero',
  isLoading: true,
  progress: 0,
  
  // Animation State
  hasAnimationPlayed: {},
  
  // Actions
  setNavOpen: (isOpen) => set({ isNavOpen: isOpen }),
  setDarkMode: (isDarkMode) => set({ isDarkMode }),
  setActiveSection: (section) => set({ activeSection: section }),
  setLoading: (isLoading) => set({ isLoading }),
  setProgress: (progress) => set({ progress }),
  markAnimationPlayed: (animationId) => 
    set((state) => ({ 
      hasAnimationPlayed: { 
        ...state.hasAnimationPlayed, 
        [animationId]: true 
      } 
    })),
  resetAnimations: () => set({ hasAnimationPlayed: {} })
}));