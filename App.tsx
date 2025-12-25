
import React, { useState, useCallback } from 'react';
import { View, PDFMaterial, QuizConfig, QuizSession } from './types';
import Dashboard from './views/Dashboard';
import Library from './views/Library';
import QuizConfigView from './views/QuizConfigView';
import QuizView from './views/QuizView';
import ResultsView from './views/ResultsView';
import ProfileView from './views/ProfileView';
import StatisticsView from './views/StatisticsView';

const MOCK_MATERIALS: PDFMaterial[] = [
  { id: '1', name: '2023_IELTS_Reading_Test_4.pdf', date: '2小时前', size: '2.5MB', progress: 45, status: 'in_progress' },
  { id: '2', name: 'The_Economist_May_2024.pdf', date: '昨天', size: '1.2MB', progress: 0, status: 'not_started' },
  { id: '3', name: 'CET-6_Vocab_Master.pdf', date: '2023-11-20', size: '4.8MB', progress: 100, status: 'completed' }
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [materials, setMaterials] = useState<PDFMaterial[]>(MOCK_MATERIALS);
  const [activeConfig, setActiveConfig] = useState<QuizConfig | null>(null);
  const [activeSession, setActiveSession] = useState<QuizSession | null>(null);

  const navigateTo = useCallback((view: View) => {
    setCurrentView(view);
  }, []);

  const handleImport = useCallback((file: File) => {
    const newMaterial: PDFMaterial = {
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      date: '刚刚',
      size: `${(file.size / (1024 * 1024)).toFixed(1)}MB`,
      progress: 0,
      status: 'not_started'
    };
    setMaterials(prev => [newMaterial, ...prev]);
    // Optionally automatically start config for the new file
    startConfig(newMaterial);
  }, []);

  const startConfig = (material: PDFMaterial) => {
    setActiveConfig({
      materialId: material.id,
      materialName: material.name,
      type: 'mixed',
      quantity: 15,
      difficulty: 'intermediate',
      includeChineseAnalysis: true,
      focusGrammar: false
    });
    setCurrentView(View.CONFIG);
  };

  const startQuiz = (session: QuizSession) => {
    setActiveSession(session);
    setCurrentView(View.QUIZ);
  };

  const finishQuiz = (session: QuizSession) => {
    setActiveSession(session);
    setCurrentView(View.RESULTS);
  };

  const renderView = () => {
    switch (currentView) {
      case View.DASHBOARD:
        return <Dashboard materials={materials} onStartConfig={startConfig} onNavigate={navigateTo} onImport={handleImport} />;
      case View.LIBRARY:
        return <Library materials={materials} onStartConfig={startConfig} onImport={handleImport} />;
      case View.CONFIG:
        return activeConfig ? <QuizConfigView config={activeConfig} onStart={startQuiz} onBack={() => navigateTo(View.LIBRARY)} /> : null;
      case View.QUIZ:
        return activeSession ? <QuizView session={activeSession} onFinish={finishQuiz} onBack={() => navigateTo(View.DASHBOARD)} /> : null;
      case View.RESULTS:
        return activeSession ? <ResultsView session={activeSession} onRetry={() => setCurrentView(View.QUIZ)} onHome={() => navigateTo(View.DASHBOARD)} /> : null;
      case View.PROFILE:
        return <ProfileView onNavigate={navigateTo} />;
      case View.STATISTICS:
        return <StatisticsView onBack={() => navigateTo(View.DASHBOARD)} />;
      default:
        return <Dashboard materials={materials} onStartConfig={startConfig} onNavigate={navigateTo} onImport={handleImport} />;
    }
  };

  return (
    <div className="dark">
      {renderView()}
    </div>
  );
};

export default App;
