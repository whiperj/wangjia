
import React, { useRef } from 'react';
import Layout from '../components/Layout';
import { View, PDFMaterial } from '../types';

interface DashboardProps {
  materials: PDFMaterial[];
  onStartConfig: (material: PDFMaterial) => void;
  onNavigate: (view: View) => void;
  onImport: (file: File) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ materials, onStartConfig, onNavigate, onImport }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCardClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImport(file);
    }
  };

  return (
    <Layout activeView={View.DASHBOARD} onNavigate={onNavigate}>
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="application/pdf" 
        className="hidden" 
      />
      {/* Top App Bar */}
      <div className="sticky top-0 z-40 bg-background-dark/95 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-border-dark/30">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 border border-border-dark" style={{ backgroundImage: 'url("https://picsum.photos/100/100")' }}></div>
            <div className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-background-dark"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-text-secondary font-medium">欢迎回来</span>
            <h2 className="text-sm font-bold leading-tight tracking-wide">Alex</h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-text-secondary hover:text-white hover:bg-surface-dark rounded-full transition-colors">
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>notifications</span>
          </button>
          <button className="p-2 text-text-secondary hover:text-white hover:bg-surface-dark rounded-full transition-colors">
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>settings</span>
          </button>
        </div>
      </div>

      <div className="px-5 pt-8 pb-6 flex flex-col gap-3">
        <h1 className="text-white text-3xl font-black leading-tight tracking-[-0.033em]">
          开启英语<br />提升之旅
        </h1>
        <p className="text-text-secondary text-base font-normal leading-relaxed">
          将 PDF 学习材料转化为交互式测试，<br />随时随地高效备考。
        </p>
      </div>

      <div className="px-4 mb-8">
        <div 
          onClick={handleCardClick}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-[#1a55c2] shadow-lg shadow-primary/25 group cursor-pointer active:scale-[0.98] transition-all duration-200"
        >
          <div className="absolute top-0 right-0 -mr-10 -mt-10 size-48 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-10 -mb-10 size-32 bg-black/20 rounded-full blur-2xl"></div>
          <div className="relative z-10 flex flex-col items-center justify-center py-8 px-6 text-center gap-4">
            <div className="size-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 shadow-inner">
              <span className="material-symbols-outlined text-white" style={{ fontSize: '32px' }}>upload_file</span>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-white text-xl font-bold tracking-tight">导入 PDF 学习材料</h2>
              <p className="text-blue-100/90 text-sm font-medium">支持教材、真题试卷、阅读文章</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white text-base font-bold">核心功能</h3>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border-dark bg-surface-dark p-3 text-center">
            <div className="text-blue-400 bg-blue-400/10 p-2 rounded-lg">
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>psychology</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <h4 className="text-white text-xs font-bold">智能出题</h4>
              <span className="text-text-secondary text-[10px]">自动生成习题</span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border-dark bg-surface-dark p-3 text-center">
            <div className="text-purple-400 bg-purple-400/10 p-2 rounded-lg">
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>translate</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <h4 className="text-white text-xs font-bold">即时翻译</h4>
              <span className="text-text-secondary text-[10px]">点词查释义</span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border-dark bg-surface-dark p-3 text-center">
            <div className="text-emerald-400 bg-emerald-400/10 p-2 rounded-lg">
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>check_circle</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <h4 className="text-white text-xs font-bold">深度纠错</h4>
              <span className="text-text-secondary text-[10px]">语法分析建议</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white text-base font-bold">最近导入</h3>
          <button 
            onClick={() => onNavigate(View.LIBRARY)}
            className="text-primary text-xs font-bold px-2 py-1 hover:bg-primary/10 rounded transition-colors"
          >
            查看全部
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {materials.slice(0, 2).map((mat) => (
            <div key={mat.id} className="group flex items-center gap-3 rounded-xl border border-border-dark bg-surface-dark p-3 hover:border-border-dark/80 transition-colors cursor-pointer" onClick={() => onStartConfig(mat)}>
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#252a36] text-red-400">
                <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>picture_as_pdf</span>
              </div>
              <div className="flex flex-1 flex-col justify-center min-w-0">
                <h4 className="text-white text-sm font-bold leading-tight truncate">{mat.name}</h4>
                <p className="text-text-secondary text-xs leading-normal mt-1">{mat.date} • 进度 {mat.progress}%</p>
              </div>
              <button className="text-text-secondary hover:text-white p-1">
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>more_vert</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
