import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid 
} from 'recharts';

export function AccumulatedSavingsChart({ historicalData }) {
  let accumulated = 0;
  const dataWithAccumulated = historicalData.map(item => {
    accumulated += item.savings;
    return {
      ...item,
      accumulatedSavings: accumulated
    };
  });

  return (
    <div style={{ width: '100%', height: 350, background: '#fff', padding: '16px', borderRadius: '8px' }}>
      <h3>Evolución del Ahorro Acumulado</h3>
      <ResponsiveContainer>
        <AreaChart data={dataWithAccumulated}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="monthName" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="accumulatedSavings" name="Acumulado (€)" stroke="#38A169" fill="#9AE6B4" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}