import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, Label } from 'recharts';

const CITY_COLORS = ['#38bdf8', '#22d3ee', '#34d399', '#a3e635', '#f59e0b', '#fb7185', '#f97316', '#60a5fa'];

export function CityChart({
  data,
  labelKey = 'city',
  title = 'City Momentum',
  subtitle = 'Top 8 cities by listing volume',
  ariaLabel = 'Businesses by City chart'
}) {
  const chartData = data
    .map(item => ({ label: item[labelKey] || 'Unknown', count: item.count || 0 }))
    .sort((first, second) => second.count - first.count)
    .slice(0, 8);
  const totalCount = chartData.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="chart-container" aria-label={ariaLabel}>
      <div className="chart-header">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="count"
            nameKey="label"
            cx="50%"
            cy="50%"
            innerRadius={62}
            outerRadius={112}
            paddingAngle={3}
            minAngle={4}
            labelLine={false}
            label={({ percent }) => (percent >= 0.08 ? `${(percent * 100).toFixed(0)}%` : '')}
          >
            <Label
              position="center"
              value={`${totalCount.toLocaleString()} Total`}
              fill="#e2e8f0"
              fontSize={13}
              fontWeight={800}
            />
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={CITY_COLORS[index % CITY_COLORS.length]}
                stroke="rgba(2, 6, 23, 0.55)"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: '#0b1730', border: '1px solid rgba(148, 163, 184, 0.32)', borderRadius: 12 }}
            labelStyle={{ color: '#f8fafc', fontWeight: 700 }}
            itemStyle={{ color: '#dbeafe' }}
            formatter={(value, name) => [`${value.toLocaleString()} listings`, name]}
          />
          <Legend
            verticalAlign="bottom"
            height={42}
            iconType="circle"
            wrapperStyle={{ paddingTop: 10, fontSize: 12, color: '#cbd5e1', lineHeight: '1.5' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
