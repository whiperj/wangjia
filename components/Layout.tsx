
import React from 'react';
import { View } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: View;
  onNavigate: (view: View) => void;
  hideNav?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onNavigate, hideNav }) => {
  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto relative bg-background-dark overflow-hidden">
      <main className="flex-1 pb-20">
        {children}
      </main>

      {!hideNav && (
        <nav className="fixed bottom-0 left-0 right-0 bg-surface-dark/95 backdrop-blur-lg border-t border-border-dark/50 pb-safe pt-2 px-6 z-50 h-[80px]">
          <div className="flex justify-between items-center max-w-md mx-auto h-full pb-4">
            <button 
              onClick={() => onNavigate(View.DASHBOARD)}
              className={`flex flex-1 flex-col items-center justify-center gap-1 transition-colors ${activeView === View.DASHBOARD ? 'text-primary' : 'text-text-secondary hover:text-white'}`}
            >
              <span className={`material-symbols-outlined ${activeView === View.DASHBOARD ? 'filled' : ''}`} style={{ fontSize: '26px' }}>home</span>
              <span className="text-[10px] font-bold">首页</span>
            </button>
            <button 
              onClick={() => onNavigate(View.LIBRARY)}
              className={`flex flex-1 flex-col items-center justify-center gap-1 transition-colors ${activeView === View.LIBRARY ? 'text-primary' : 'text-text-secondary hover:text-white'}`}
            >
              <span className={`material-symbols-outlined ${activeView === View.LIBRARY ? 'filled' : ''}`} style={{ fontSize: '26px' }}>library_books</span>
              <span className="text-[10px] font-medium">题库</span>
            </button>
            <button 
              onClick={() => onNavigate(View.STATISTICS)}
              className={`flex flex-1 flex-col items-center justify-center gap-1 transition-colors ${activeView === View.STATISTICS ? 'text-primary' : 'text-text-secondary hover:text-white'}`}
            >
              <span className={`material-symbols-outlined ${activeView === View.STATISTICS ? 'filled' : ''}`} style={{ fontSize: '26px' }}>analytics</span>
              <span className="text-[10px] font-medium">统计</span>
            </button>
            <button 
              onClick={() => onNavigate(View.PROFILE)}
              className={`flex flex-1 flex-col items-center justify-center gap-1 transition-colors ${activeView === View.PROFILE ? 'text-primary' : 'text-text-secondary hover:text-white'}`}
            >
              <span className={`material-symbols-outlined ${activeView === View.PROFILE ? 'filled' : ''}`} style={{ fontSize: '26px' }}>person</span>
              <span className="text-[10px] font-medium">我的</span>
            </button>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Layout;
