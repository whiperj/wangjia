
import React from 'react';
import Layout from '../components/Layout';
import { View } from '../types';

const ProfileView: React.FC<{onNavigate: (v: View) => void}> = ({onNavigate}) => {
  return (
    <Layout activeView={View.PROFILE} onNavigate={onNavigate}>
      <div className="sticky top-0 z-50 flex items-center justify-between px-5 py-4 bg-background-dark/90 backdrop-blur-md">
        <h2 className="text-xl font-bold tracking-tight text-white">个人中心</h2>
        <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-[24px]">settings</span>
        </button>
      </div>

      <div className="flex flex-col items-center pt-2 pb-6 px-4">
        <div className="relative group cursor-pointer">
          <div 
            className="w-28 h-28 rounded-full bg-cover bg-center border-4 border-surface-dark shadow-xl" 
            style={{ backgroundImage: "url('https://picsum.photos/200/200?user')" }}
          ></div>
          <div className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1.5 border-4 border-background-dark flex items-center justify-center">
            <span className="material-symbols-outlined text-[16px] font-bold">edit</span>
          </div>
        </div>
        <div className="mt-4 text-center">
          <h1 className="text-2xl font-bold text-white">LearnWithJoy</h1>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="text-sm text-text-secondary">ID: 8839201</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/20 text-primary">正式会员</span>
          </div>
        </div>
      </div>

      <div className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: '累计学习', val: '12.5', unit: '小时', icon: 'schedule', color: 'text-orange-400', bg: 'bg-orange-500/10' },
            { label: '完成测试', val: '42', unit: '份', icon: 'quiz', color: 'text-blue-400', bg: 'bg-blue-500/10' },
            { label: '掌握词汇', val: '850', unit: '词', icon: 'school', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
            { label: '平均正确率', val: '85', unit: '%', icon: 'check_circle', color: 'text-purple-400', bg: 'bg-purple-500/10' }
          ].map((stat, i) => (
            <div key={i} className="bg-surface-dark p-4 rounded-2xl border border-border-dark flex flex-col items-start gap-1">
              <div className="flex items-center gap-2 mb-1">
                <div className={`p-1.5 rounded-lg ${stat.bg} ${stat.color}`}>
                  <span className="material-symbols-outlined text-[20px]">{stat.icon}</span>
                </div>
                <span className="text-xs font-medium text-text-secondary">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold text-white">{stat.val} <span className="text-sm font-normal text-text-secondary">{stat.unit}</span></p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 mb-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-[#1a4b9c] p-4 text-white shadow-lg">
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">升级会员 Pro</h3>
              <p className="text-sm text-blue-100 mt-1 opacity-90">解锁无限PDF导入与AI纠错功能</p>
            </div>
            <button className="shrink-0 bg-white text-primary text-sm font-bold px-4 py-2 rounded-lg shadow-sm">立即开通</button>
          </div>
        </div>
      </div>

      <div className="px-4 mb-6 space-y-3">
        <h3 className="px-1 text-xs font-semibold uppercase tracking-wider text-text-secondary">学习工具</h3>
        <div className="bg-surface-dark rounded-2xl overflow-hidden border border-border-dark">
          {[
            { label: '错题本', sub: '复习待纠正的 24 个难点', icon: 'book_4', color: 'text-red-400', bg: 'bg-red-500/10' },
            { label: '我的资料库', sub: '管理已导入的 PDF 课件', icon: 'folder_open', color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
            { label: '学习周报', sub: '', icon: 'bar_chart', color: 'text-teal-400', bg: 'bg-teal-500/10' }
          ].map((item, i) => (
            <div key={i} className="group flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 border-b border-border-dark last:border-0">
              <div className="flex items-center gap-4">
                <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${item.bg} ${item.color}`}>
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-medium text-white">{item.label}</span>
                  {item.sub && <span className="text-xs text-text-secondary">{item.sub}</span>}
                </div>
              </div>
              <span className="material-symbols-outlined text-text-secondary text-[20px]">chevron_right</span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProfileView;
