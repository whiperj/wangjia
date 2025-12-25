
import React from 'react';
import { QuizSession } from '../types';

interface ResultsViewProps {
  session: QuizSession;
  onRetry: () => void;
  onHome: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({ session, onRetry, onHome }) => {
  const total = session.questions.length;
  const correctCount = session.questions.reduce((acc, q) => {
    return acc + (session.userAnswers[q.id] === q.correctAnswer ? 1 : 0);
  }, 0);
  const scorePercent = Math.round((correctCount / total) * 100);
  const timeTaken = session.endTime ? Math.round((session.endTime - session.startTime) / 1000) : 0;
  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-dark max-w-md mx-auto shadow-2xl">
      <header className="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-border-dark px-4 py-3 flex items-center justify-between">
        <button onClick={onHome} className="flex items-center justify-center p-2 rounded-full hover:bg-gray-800 group">
          <span className="material-symbols-outlined text-white group-hover:text-primary transition-colors">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold tracking-tight text-white">测试结果</h1>
        <button onClick={onHome} className="text-primary font-semibold text-sm px-2 py-1 rounded hover:bg-primary/10">完成</button>
      </header>

      <main className="flex-1 px-4 py-6 flex flex-col gap-6 no-scrollbar pb-32">
        <section className="flex flex-col items-center justify-center py-4">
          <div className="relative flex items-center justify-center size-40 rounded-full bg-surface-dark shadow-lg ring-4 ring-primary/20">
            <div 
              className="absolute inset-0 rounded-full conic-gradient-progress p-2 mask-progress" 
              style={{ '--percentage': `${scorePercent}%` } as any}
            ></div>
            <div className="flex flex-col items-center z-10">
              <span className="text-5xl font-black text-primary tracking-tighter">{scorePercent}<span className="text-2xl align-top">%</span></span>
              <span className="text-xs text-text-secondary font-medium mt-1 uppercase tracking-wide">总得分</span>
            </div>
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-xl font-bold text-white">{scorePercent >= 80 ? '做得不错！继续加油' : '再接再厉！'}</h2>
            <p className="text-sm text-text-secondary mt-1">你已超越了 {scorePercent - 5}% 的练习者</p>
          </div>
        </section>

        <section className="grid grid-cols-3 gap-3">
          <div className="bg-surface-dark p-4 rounded-xl flex flex-col items-center justify-center gap-1 border border-border-dark">
            <span className="text-xs text-text-secondary font-medium">正确数</span>
            <span className="text-xl font-bold text-white">{correctCount}<span className="text-sm text-text-secondary font-normal">/{total}</span></span>
          </div>
          <div className="bg-surface-dark p-4 rounded-xl flex flex-col items-center justify-center gap-1 border border-border-dark">
            <span className="text-xs text-text-secondary font-medium">用时</span>
            <span className="text-xl font-bold text-white">{minutes}:{seconds.toString().padStart(2, '0')}</span>
          </div>
          <div className="bg-surface-dark p-4 rounded-xl flex flex-col items-center justify-center gap-1 border border-border-dark">
            <span className="text-xs text-text-secondary font-medium">准确率</span>
            <span className="text-xl font-bold text-green-500">{scorePercent}%</span>
          </div>
        </section>

        <div className="flex items-center justify-between pt-2">
          <h3 className="text-lg font-bold text-white">答题详情</h3>
          <div className="flex items-center gap-2 text-xs font-medium">
            <div className="flex items-center gap-1"><div className="size-2 rounded-full bg-green-500"></div> Correct</div>
            <div className="flex items-center gap-1"><div className="size-2 rounded-full bg-red-500"></div> Incorrect</div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {session.questions.map((q, idx) => {
            const isCorrect = session.userAnswers[q.id] === q.correctAnswer;
            return (
              <div key={q.id} className={`bg-surface-dark rounded-xl shadow-sm border-l-4 overflow-hidden ${isCorrect ? 'border-green-500' : 'border-red-500'}`}>
                <div className="p-4 flex gap-4">
                  <div className="shrink-0 pt-1">
                    <div className={`flex items-center justify-center size-6 rounded-full ${isCorrect ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                      <span className="material-symbols-outlined text-[18px]">{isCorrect ? 'check' : 'close'}</span>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <p className="text-base font-medium text-slate-200 leading-snug">
                      {idx + 1}. {q.text}
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                      <p className="text-sm text-text-secondary">
                        你的答案: <span className={`${isCorrect ? 'text-green-500' : 'text-red-500'} font-semibold ${!isCorrect && 'line-through decoration-red-500'}`}>
                          {session.userAnswers[q.id] || '未作答'}
                        </span>
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-text-secondary">
                          正确答案: <span className="text-green-500 font-semibold">{q.correctAnswer}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                {!isCorrect && (
                  <div className="bg-[#151921] p-4 border-t border-border-dark flex flex-col gap-3">
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-primary text-sm mt-0.5">lightbulb</span>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">错误解析</span>
                        <p className="text-sm text-slate-300 leading-relaxed">{q.explanation}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-primary text-sm mt-0.5">translate</span>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">中文翻译</span>
                        <p className="text-sm text-slate-300 leading-relaxed">{q.translation}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background-dark/95 backdrop-blur-lg border-t border-border-dark">
        <div className="max-w-md mx-auto grid grid-cols-2 gap-4">
          <button onClick={onHome} className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-surface-dark text-white font-semibold border border-border-dark hover:bg-gray-700 transition-colors">
            <span className="material-symbols-outlined text-[20px]">home</span>
            <span>返回首页</span>
          </button>
          <button onClick={onRetry} className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-white font-semibold shadow-lg shadow-primary/30 hover:bg-blue-600 transition-colors">
            <span className="material-symbols-outlined text-[20px]">refresh</span>
            <span>错题重练</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ResultsView;
