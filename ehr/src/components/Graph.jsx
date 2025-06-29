import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";


const Graph = () => {
    const data = [
        { name: "Jan", Contributors: 120 },
        { name: "Feb", Contributors: 200 },
        { name: "Mar", Contributors: 150 },
        { name: "Apr", Contributors: 300 },
        { name: "May", Contributors: 400 },
        { name: "Jun", Contributors: 320 },
        { name: "Jul", Contributors: 500 },
        { name: "Aug", Contributors: 450 },
        { name: "Sep", Contributors: 380 },
        { name: "Oct", Contributors: 420 },
        { name: "Nov", Contributors: 480 },
        { name: "Dec", Contributors: 530 },
      ];
      const COLORS = {
        line: "#0095f6", // Fresh green for the line
        grid: "#D1D5DB", // Neutral gray for the grid
        tooltipBg: "#ffffff", // Dark slate for the tooltip
        tooltipText: "#FFFFFF", // White text for contrast
      };
  return (
    <div className="contributors-chart">
        <ResponsiveContainer width="100%" height={230} className="res-container">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
          <CartesianGrid stroke={COLORS.grid} strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: COLORS.tooltipBg,
              color: COLORS.tooltipText,
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="Contributors"
            stroke={COLORS.line}
            strokeWidth={3}
            dot={{ r: 5, fill: COLORS.line }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Graph