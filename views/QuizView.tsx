
import React, { useState, useEffect } from 'react';
import { QuizSession } from '../types';
import { getWordDefinition } from '../services/geminiService';

interface QuizViewProps {
  session: QuizSession;
  onFinish: (session: QuizSession) => void;
  onBack: () => void;
}

const QuizView: React.FC<QuizViewProps> = ({ session, onFinish, onBack }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [wordData, setWordData] = useState<any>(null);
  const [wordLoading, setWordLoading] = useState(false);

  const currentQuestion = session.questions[currentIdx];
  const progress = ((currentIdx + 1) / session.questions.length) * 100;

  const handleSelectOption = (option: string) => {
    setUserAnswers({ ...userAnswers, [currentQuestion.id]: option });
  };

  const nextQuestion = () => {
    if (currentIdx < session.questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      onFinish({ ...session, userAnswers, endTime: Date.now() });
    }
  };

  const handleWordClick = async (word: string) => {
    const cleaned = word.replace(/[.,!?()]/g, '');
    setSelectedWord(cleaned);
    setWordLoading(true);
    setWordData(null);
    try {
      const data = await getWordDefinition(cleaned);
      setWordData(data);
    } catch (e) {
      console.error(e);
    } finally {
      setWordLoading(false);
    }
  };

  const renderQuestionText = (text: string) => {
    const words = text.split(' ');
    return words.map((word, i) => (
      <span 
        key={i} 
        onClick={() => handleWordClick(word)}
        className="cursor-pointer hover:bg-primary/20 hover:text-primary transition-colors rounded px-0.5"
      >
        {word}{' '}
      </span>
    ));
  };

  return (
    <div className="relative flex h-screen w-full max-w-md mx-auto flex-col overflow-hidden bg-background-dark border-x border-border-dark">
      <header className="flex items-center justify-between p-4 pb-2 z-20 shrink-0">
        <button onClick={onBack} className="text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-surface-dark">
          <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
        </button>
        <h2 className="text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center truncate px-2">
          {session.config.materialName}
        </h2>
        <button className="flex items-center justify-center size-10 rounded-full hover:bg-surface-dark text-text-secondary">
          <span className="material-symbols-outlined text-2xl">pause_circle</span>
        </button>
      </header>

      <div className="px-6 py-2 shrink-0">
        <div className="flex justify-between items-end mb-2">
          <span className="text-sm font-medium text-primary">Question {currentIdx + 1}<span className="text-text-secondary text-xs font-normal"> / {session.questions.length}</span></span>
          <span className="text-xs font-medium text-text-secondary">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 w-full bg-surface-dark rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 pb-24 scroll-smooth no-scrollbar">
        <div className="bg-card-dark rounded-2xl shadow-sm p-5 mb-6 border border-border-dark relative">
          <div className="w-full h-32 rounded-xl bg-gradient-to-r from-blue-900 to-slate-900 mb-4 overflow-hidden relative">
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>
            <div className="absolute bottom-3 left-4">
              <div className="bg-black/40 backdrop-blur-md px-2 py-1 rounded text-xs font-medium text-white/80 border border-white/10 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">article</span> Reading Material
              </div>
            </div>
          </div>
          
          <div className="relative text-lg leading-relaxed text-slate-200 font-normal">
            <div className="relative inline-block">
              {renderQuestionText(currentQuestion.text)}
            </div>
          </div>
          
          <div className="mt-4 flex items-center gap-2 text-xs text-primary/80 bg-primary/10 w-fit px-3 py-1.5 rounded-full mx-auto">
            <span className="material-symbols-outlined text-[14px]">touch_app</span>
            <span>点击单词可查看释义</span>
          </div>
        </div>

        <div className="mb-2 px-1">
          <div className="flex items-start gap-3">
            <div className="bg-primary/20 text-primary rounded px-2 py-0.5 text-xs font-bold mt-1 shrink-0">Q{currentIdx + 1}</div>
            <p className="text-slate-100 text-base font-medium leading-normal">
              Based on the text above, choose the correct answer.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-4">
          {currentQuestion.options?.map((option, idx) => (
            <label key={idx} className={`group relative flex items-center gap-4 rounded-xl border p-4 cursor-pointer transition-all active:scale-[0.99] ${
              userAnswers[currentQuestion.id] === option 
                ? 'border-primary bg-primary/10' 
                : 'border-border-dark bg-card-dark hover:border-primary/50'
            }`}>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 transition-opacity">
                {userAnswers[currentQuestion.id] === option ? (
                  <div className="size-6 bg-primary rounded-full flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  </div>
                ) : (
                  <div className="size-6 border-2 border-border-dark rounded-full group-hover:border-primary/50"></div>
                )}
              </div>
              <input 
                type="radio" className="peer sr-only" name="quiz-answer" 
                checked={userAnswers[currentQuestion.id] === option}
                onChange={() => handleSelectOption(option)}
              />
              <div className="flex flex-col">
                <span className={`font-medium text-lg transition-colors ${userAnswers[currentQuestion.id] === option ? 'text-primary' : 'text-slate-300 group-hover:text-primary'}`}>
                  {option}
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {selectedWord && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedWord(null)}>
          <div className="bg-surface-dark border border-border-dark w-full max-w-xs rounded-2xl p-6 shadow-2xl animate-in zoom-in duration-200" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-xl font-bold text-primary">{selectedWord}</h4>
              <button onClick={() => setSelectedWord(null)} className="text-text-secondary hover:text-white">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            {wordLoading ? (
              <div className="flex flex-col items-center py-4">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mb-2"></div>
                <span className="text-sm text-text-secondary">AI 正在查询...</span>
              </div>
            ) : wordData ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded uppercase">{wordData.pronunciation || 'IPA'}</span>
                  <button className="text-primary hover:scale-110 transition-transform"><span className="material-symbols-outlined">volume_up</span></button>
                </div>
                <p className="text-lg text-white font-medium">{wordData.definition}</p>
                {wordData.example && (
                  <p className="text-sm text-text-secondary italic">"{wordData.example}"</p>
                )}
              </div>
            ) : (
              <p className="text-text-secondary">Could not find definition.</p>
            )}
          </div>
        </div>
      )}

      <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-background-dark via-background-dark to-transparent pt-12">
        <button 
          onClick={nextQuestion}
          disabled={!userAnswers[currentQuestion.id]}
          className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-lg h-14 rounded-xl shadow-lg shadow-primary/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
        >
          <span>{currentIdx === session.questions.length - 1 ? '提交测试' : '检查答案'}</span>
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default QuizView;
