import React from "react";
import { ResponsiveContainer, PieChart, Pie, Legend, Cell } from "recharts";

const data = [
  { name: "Group A", value: 400, color: "#8884d8" },
  { name: "Group B", value: 300, color: "#82ca9d" },
  { name: "Group C", value: 300, color: "#ffbb28" },
  { name: "Group D", value: 200, color: "#ff8042" },
];

const HomePieChart = () => {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie dataKey="value" data={data} label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HomePieChart;
