import React from 'react';
import { 
  BarChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid,
  Legend 
} from 'recharts';

export function MonthlySavingsChart({ historicalData }) {
  return (
    <div style={{ width: '100%', height: 350, background: '#fff', padding: '16px', borderRadius: '8px' }}>
      <h3>Ahorro Mensual vs Meta</h3>
      <ResponsiveContainer>
        <BarChart data={historicalData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="monthName" />
          <YAxis/>
          <Tooltip />
          <Legend />
          <Bar dataKey="savings" name="Ahorro Real (€)" fill="#319795" />
          <Line type="monotone" dataKey="targetSavings" name="Meta de Ahorro (€)" stroke="#DD6B20" strokeWidth={2} dot={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}