
import React from 'react';
import Layout from '../components/Layout';
import { View } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { name: 'Mon', hours: 1.2, questions: 15 },
  { name: 'Tue', hours: 2.5, questions: 40 },
  { name: 'Wed', hours: 0.8, questions: 10 },
  { name: 'Thu', hours: 3.2, questions: 50 },
  { name: 'Fri', hours: 1.5, questions: 20 },
  { name: 'Sat', hours: 4.0, questions: 70 },
  { name: 'Sun', hours: 2.1, questions: 30 },
];

const StatisticsView: React.FC<{onBack: () => void}> = ({onBack}) => {
  return (
    <Layout activeView={View.STATISTICS} onNavigate={() => {}}>
      <header className="sticky top-0 z-50 flex items-center justify-between px-5 py-4 bg-background-dark/90 backdrop-blur-md border-b border-border-dark">
        <h2 className="text-xl font-bold tracking-tight text-white">学习统计</h2>
        <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-[24px]">calendar_month</span>
        </button>
      </header>

      <div className="px-4 py-6 space-y-6 no-scrollbar">
        <section className="bg-surface-dark p-6 rounded-3xl border border-border-dark">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-text-secondary text-sm font-medium">本周学习时长</h3>
              <p className="text-3xl font-black text-white mt-1">15.3 <span className="text-base font-medium text-text-secondary">h</span></p>
            </div>
            <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold">+12% vs last week</div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2b6cee" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2b6cee" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#3b4354" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9da6b9', fontSize: 12}} />
                <Tooltip contentStyle={{backgroundColor: '#1c1f27', border: '1px solid #3b4354', borderRadius: '12px'}} />
                <Area type="monotone" dataKey="hours" stroke="#2b6cee" fillOpacity={1} fill="url(#colorHours)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="bg-surface-dark p-6 rounded-3xl border border-border-dark">
          <h3 className="text-white text-lg font-bold mb-6">每日答题数</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3b4354" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9da6b9', fontSize: 12}} />
                <Tooltip cursor={{fill: 'rgba(43, 108, 238, 0.1)'}} contentStyle={{backgroundColor: '#1c1f27', border: '1px solid #3b4354', borderRadius: '12px'}} />
                <Bar dataKey="questions" fill="#2b6cee" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface-dark p-5 rounded-3xl border border-border-dark">
            <h4 className="text-text-secondary text-xs font-bold uppercase mb-2">最高准确率</h4>
            <p className="text-2xl font-black text-white">98%</p>
            <p className="text-[10px] text-text-secondary mt-1">CET-6 Reading Task</p>
          </div>
          <div className="bg-surface-dark p-5 rounded-3xl border border-border-dark">
            <h4 className="text-text-secondary text-xs font-bold uppercase mb-2">词汇增长</h4>
            <p className="text-2xl font-black text-white">+124</p>
            <p className="text-[10px] text-text-secondary mt-1">最近 7 天</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StatisticsView;
