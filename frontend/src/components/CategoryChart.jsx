import React from 'react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  Tooltip, LabelList, CartesianGrid
} from 'recharts';

export function CategoryChart({ data }) {
  const chartData = data
    .map(item => ({ category: item.category || 'Unknown', count: item.count || 0 }))
    .sort((first, second) => second.count - first.count)
    .slice(0, 8);

  return (
    <div className="chart-container" aria-label="Businesses by Category chart">
      <div className="chart-header">
        <h2>Category Distribution</h2>
        <p>Share of listings by business type</p>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={chartData} margin={{ top: 10, right: 18, bottom: 58, left: 0 }}>
          <defs>
            <linearGradient id="categoryGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(148, 163, 184, 0.2)" vertical={false} />
          <XAxis
            dataKey="category"
            tick={{ fill: '#cbd5e1', fontSize: 12 }}
            interval={0}
            angle={-24}
            textAnchor="end"
            tickLine={false}
            axisLine={false}
            height={72}
          />
          <YAxis tick={{ fill: '#cbd5e1', fontSize: 12 }} tickLine={false} axisLine={false} />
          <Tooltip
            cursor={{ fill: 'rgba(96, 165, 250, 0.12)' }}
            contentStyle={{ backgroundColor: '#0b1730', border: '1px solid rgba(148, 163, 184, 0.32)', borderRadius: 12 }}
            labelStyle={{ color: '#f8fafc', fontWeight: 700 }}
            itemStyle={{ color: '#dbeafe' }}
          />
          <Bar dataKey="count" fill="url(#categoryGradient)" radius={[12, 12, 0, 0]}>
            <LabelList dataKey="count" position="top" fill="#e2e8f0" fontSize={12} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
