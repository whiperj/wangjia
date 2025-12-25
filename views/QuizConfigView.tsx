
import React, { useState } from 'react';
import { QuizConfig, QuizSession, View } from '../types';
import { generateQuizFromMaterial } from '../services/geminiService';

interface QuizConfigViewProps {
  config: QuizConfig;
  onStart: (session: QuizSession) => void;
  onBack: () => void;
}

const QuizConfigView: React.FC<QuizConfigViewProps> = ({ config, onStart, onBack }) => {
  const [localConfig, setLocalConfig] = useState<QuizConfig>(config);
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    setLoading(true);
    try {
      const questions = await generateQuizFromMaterial(localConfig);
      onStart({
        config: localConfig,
        questions,
        currentQuestionIndex: 0,
        userAnswers: {},
        startTime: Date.now()
      });
    } catch (e) {
      console.error(e);
      alert('AI Generation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-dark text-white relative">
      <header className="flex items-center px-4 py-3 justify-between sticky top-0 z-50 bg-background-dark/95 backdrop-blur-sm">
        <button onClick={onBack} className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-800 text-white">
          <span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
        </button>
        <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">测试配置</h2>
      </header>

      <main className="flex-1 flex flex-col gap-6 px-4 pt-2 overflow-y-auto no-scrollbar pb-32">
        <section>
          <div className="flex items-center gap-4 bg-surface-dark p-4 rounded-2xl border border-border-dark">
            <div className="flex items-center justify-center rounded-xl bg-primary/10 shrink-0 size-12 text-primary">
              <span className="material-symbols-outlined text-[28px]">description</span>
            </div>
            <div className="flex flex-col justify-center flex-1 min-w-0">
              <p className="text-base font-semibold truncate text-white">{localConfig.materialName}</p>
              <p className="text-text-secondary text-sm truncate">当前素材</p>
            </div>
            <button onClick={onBack} className="shrink-0 h-9 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors text-gray-200">更改</button>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-bold leading-tight mb-3 px-1">题型选择</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'multiple_choice', label: '单项选择', desc: '标准四选一', icon: 'check_circle' },
              { id: 'fill_in_the_blank', label: '填空题', desc: '根据上下文填词', icon: 'edit_note' },
              { id: 'true_false', label: '判断题', desc: '快速正误判断', icon: 'fact_check' },
              { id: 'mixed', label: '混合模式', desc: '综合各类题型', icon: 'dashboard' },
            ].map((type) => (
              <button 
                key={type.id}
                onClick={() => setLocalConfig({...localConfig, type: type.id as any})}
                className={`relative group flex flex-col items-start p-4 rounded-xl transition-all ${
                  localConfig.type === type.id 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20 ring-2 ring-primary ring-offset-2 ring-offset-background-dark' 
                    : 'bg-surface-dark border border-border-dark text-text-secondary hover:border-primary/50'
                }`}
              >
                <div className="flex w-full justify-between items-start mb-2">
                  <span className="material-symbols-outlined text-[24px]">{type.icon}</span>
                  <span className={`material-symbols-outlined text-[20px] ${localConfig.type === type.id ? 'opacity-100' : 'opacity-20'}`}>
                    {localConfig.type === type.id ? 'radio_button_checked' : 'radio_button_unchecked'}
                  </span>
                </div>
                <span className={`font-semibold ${localConfig.type === type.id ? 'text-white' : 'text-gray-200'}`}>{type.label}</span>
                <span className="text-xs opacity-60 mt-1">{type.desc}</span>
              </button>
            ))}
          </div>
        </section>

        <section>
          <div className="flex justify-between items-end mb-4 px-1">
            <h3 className="text-lg font-bold leading-tight">题目数量</h3>
            <span className="text-2xl font-bold text-primary">{localConfig.quantity} <span className="text-sm font-normal text-text-secondary">题</span></span>
          </div>
          <div className="bg-surface-dark p-6 rounded-2xl border border-border-dark">
            <input 
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary" 
              max="50" min="5" step="5" type="range" 
              value={localConfig.quantity} 
              onChange={(e) => setLocalConfig({...localConfig, quantity: parseInt(e.target.value)})}
            />
            <div className="flex justify-between mt-3 text-xs font-medium text-text-secondary">
              <span>5</span><span>15</span><span>30</span><span>50</span>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-bold leading-tight mb-3 px-1">难度设定</h3>
          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {[
              { id: 'beginner', label: '初级', sub: 'CET-4' },
              { id: 'intermediate', label: '中级', sub: 'CET-6', promo: true },
              { id: 'advanced', label: '高级', sub: 'IELTS/TOEFL' }
            ].map((diff) => (
              <button 
                key={diff.id}
                onClick={() => setLocalConfig({...localConfig, difficulty: diff.id as any})}
                className={`flex-1 min-w-[100px] py-3 px-4 rounded-xl border transition-all text-center relative ${
                  localConfig.difficulty === diff.id 
                    ? 'bg-primary/10 border-2 border-primary' 
                    : 'bg-surface-dark border-border-dark hover:border-primary'
                }`}
              >
                {diff.promo && <div className="absolute -top-2 -right-2 bg-primary text-white text-[10px] px-2 py-0.5 rounded-full">推荐</div>}
                <div className={`font-semibold ${localConfig.difficulty === diff.id ? 'text-primary' : 'text-white'}`}>{diff.label}</div>
                <div className={`text-xs ${localConfig.difficulty === diff.id ? 'text-primary/80' : 'text-text-secondary'} mt-1`}>{diff.sub}</div>
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-surface-dark rounded-2xl border border-border-dark">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500">
                <span className="material-symbols-outlined">translate</span>
              </div>
              <div>
                <p className="font-medium text-white">包含中文解析</p>
                <p className="text-xs text-text-secondary">提供答案详解与翻译</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" className="sr-only peer" 
                checked={localConfig.includeChineseAnalysis} 
                onChange={(e) => setLocalConfig({...localConfig, includeChineseAnalysis: e.target.checked})}
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          <div className="flex items-center justify-between p-4 bg-surface-dark rounded-2xl border border-border-dark">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
                <span className="material-symbols-outlined">spellcheck</span>
              </div>
              <div>
                <p className="font-medium text-white">专注语法</p>
                <p className="text-xs text-text-secondary">侧重于语法结构考察</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" className="sr-only peer" 
                checked={localConfig.focusGrammar} 
                onChange={(e) => setLocalConfig({...localConfig, focusGrammar: e.target.checked})}
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </section>
      </main>

      <div className="fixed bottom-0 left-0 w-full p-4 bg-background-dark/90 backdrop-blur-md border-t border-border-dark z-50">
        <button 
          onClick={handleStart}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-primary/30 active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {loading ? (
            <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
          ) : (
            <span className="material-symbols-outlined">auto_awesome</span>
          )}
          <span>{loading ? '正在生成中...' : '开始生成'}</span>
        </button>
      </div>
    </div>
  );
};

export default QuizConfigView;
