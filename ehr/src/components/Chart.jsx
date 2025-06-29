import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts"

const Chart = () => {
    const data = [
        { name: "NPOs", value: 30 },
        { name: "Contributors", value: 45 },
        { name: "Users", value: 15 },
        { name: "Lorem", value: 10 },
      ];
      const COLORS = ["#0095f6", "#ef4444", "#facc15", "#10b981"];

  return (
    <div className="chart-box">
    {/* <h3 >Tasks Stats</h3> */}
    <div className="chart">
    <PieChart width={350} height={230}>
                 <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                   >
                    {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} /> ))}
             </Pie>
            <Tooltip />
            <Legend />
        </PieChart>
    </div>
</div>
  )
}

export default Chart