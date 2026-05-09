import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export function SourceChart({
  data,
  labelKey = 'source',
  title = 'Source Coverage',
  subtitle = 'Contribution by ingestion channel',
  ariaLabel = 'Businesses by Source chart'
}) {
  const chartData = data
    .map(item => ({ label: item[labelKey] || 'Unknown', count: item.count || 0, percentage: item.percentage || 0 }))
    .sort((first, second) => second.count - first.count)
    .slice(0, 8);

  return (
    <div className="chart-container" aria-label={ariaLabel}>
      <div className="chart-header">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={chartData} margin={{ top: 18, right: 22, bottom: 42, left: 0 }}>
          <defs>
            <linearGradient id="sourceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#f97316" stopOpacity={0.06} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(148, 163, 184, 0.2)" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: '#cbd5e1', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            interval={0}
            angle={-22}
            textAnchor="end"
            height={64}
          />
          <YAxis tick={{ fill: '#cbd5e1', fontSize: 12 }} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: '#0b1730', border: '1px solid rgba(148, 163, 184, 0.32)', borderRadius: 12 }}
            labelStyle={{ color: '#f8fafc', fontWeight: 700 }}
            itemStyle={{ color: '#dbeafe' }}
          />
          <Area type="monotone" dataKey="count" stroke="#ea580c" strokeWidth={2.6} fillOpacity={1} fill="url(#sourceGradient)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
