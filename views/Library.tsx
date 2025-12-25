
import React, { useState, useRef } from 'react';
import Layout from '../components/Layout';
import { View, PDFMaterial } from '../types';

interface LibraryProps {
  materials: PDFMaterial[];
  onStartConfig: (material: PDFMaterial) => void;
  onImport: (file: File) => void;
}

const Library: React.FC<LibraryProps> = ({ materials, onStartConfig, onImport }) => {
  const [filter, setFilter] = useState('all');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredMaterials = materials.filter(m => {
    if (filter === 'all') return true;
    if (filter === 'recent') return true; 
    if (filter === 'incomplete') return m.status !== 'completed';
    if (filter === 'completed') return m.status === 'completed';
    return true;
  });

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImport(file);
    }
  };

  return (
    <Layout activeView={View.LIBRARY} onNavigate={() => {}}>
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="application/pdf" 
        className="hidden" 
      />
      <header className="sticky top-0 z-50 bg-background-dark/95 backdrop-blur-md px-4 pt-4 pb-2 border-b border-border-dark/50">
        <div className="flex items-center h-12 justify-between">
          <div></div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleImportClick}
              className="flex items-center justify-center text-primary font-medium text-base active:opacity-70"
            >
              <span className="material-symbols-outlined text-[24px]">add_circle</span>
              <span className="ml-1">导入</span>
            </button>
            <button className="text-text-secondary text-base font-bold shrink-0">编辑</button>
          </div>
        </div>
        <h1 className="text-white text-[28px] font-bold leading-tight mb-2">我的材料</h1>
      </header>

      <div className="px-4 py-3">
        <div className="flex w-full rounded-xl bg-[#1E232E] items-center h-12 shadow-sm">
          <div className="text-text-secondary pl-4 flex items-center justify-center">
            <span className="material-symbols-outlined">search</span>
          </div>
          <input 
            className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder:text-text-secondary pl-2 text-base" 
            placeholder="搜索文件名..." 
          />
        </div>
      </div>

      <div className="flex gap-3 px-4 pb-2 overflow-x-auto no-scrollbar">
        {['全部', '最近导入', '未完成', '已完成'].map((label, idx) => {
          const value = ['all', 'recent', 'incomplete', 'completed'][idx];
          const active = filter === value;
          return (
            <button 
              key={value}
              onClick={() => setFilter(value)}
              className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 transition-all ${active ? 'bg-primary text-white' : 'bg-[#1E232E] border border-border-dark text-white'}`}
            >
              <p className="text-sm font-medium">{label}</p>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-1 mt-2">
        {filteredMaterials.map((mat) => (
          <div key={mat.id} className="group relative flex items-center gap-4 px-4 py-3 justify-between bg-transparent hover:bg-[#1E232E]/50 transition-colors rounded-xl mx-2">
            <div className="flex items-center gap-4 flex-1 overflow-hidden">
              <div className={`flex items-center justify-center rounded-xl shrink-0 size-12 ${mat.status === 'completed' ? 'bg-green-900/20 text-green-400' : 'bg-primary/10 text-white'}`}>
                <span className="material-symbols-outlined text-[28px]">
                  {mat.status === 'completed' ? 'check_circle' : 'picture_as_pdf'}
                </span>
              </div>
              <div className="flex flex-col justify-center flex-1 min-w-0">
                <p className="text-white text-base font-medium leading-normal truncate">{mat.name}</p>
                <div className="flex items-center gap-2 text-text-secondary text-xs">
                  <span>{mat.date}</span>
                  <span className="w-1 h-1 rounded-full bg-border-dark"></span>
                  <span>{mat.size}</span>
                </div>
              </div>
            </div>
            <div className="shrink-0 flex items-center gap-3">
              <button 
                onClick={() => onStartConfig(mat)}
                className={`flex items-center justify-center rounded-lg h-8 px-4 text-sm font-medium transition-all ${
                  mat.status === 'completed' 
                    ? 'text-primary' 
                    : mat.status === 'in_progress' 
                      ? 'bg-surface-dark border border-border-dark text-white' 
                      : 'bg-primary text-white shadow-sm shadow-blue-500/20'
                }`}
              >
                <span>{mat.status === 'completed' ? '复习' : mat.status === 'in_progress' ? '继续练习' : '生成测试'}</span>
              </button>
              <button className="text-text-secondary hover:text-white">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Library;
