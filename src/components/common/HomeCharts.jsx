import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "5k", uv: 2190, pv: 2400, amt: 2400 },
  { name: "10k", uv: 1674, pv: 1398, amt: 2210 },
  { name: "15k", uv: 2399, pv: 9800, amt: 2290 },
  { name: "20k", uv: 3480, pv: 3908, amt: 2000 },
  { name: "25k", uv: 780, pv: 4800, amt: 2181 },
  { name: "30k", uv: 8790, pv: 3800, amt: 2500 },
  { name: "35k", uv: 2390, pv: 4300, amt: 2100 },
  { name: "40", uv: 2000, pv: 2400, amt: 2400 },
  { name: "45k", uv: 1674, pv: 1398, amt: 2210 },
  { name: "50k", uv: 2399, pv: 9800, amt: 2290 },
  { name: "55k", uv: 2480, pv: 3908, amt: 2000 },
  { name: "60k", uv: 780, pv: 4800, amt: 2181 },
];

const MyAreaChart = () => {
  return (
    <div className="h-[250px] mt-[20px] w-[98%]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#444" }} />
          <YAxis tick={{ fontSize: 12, fill: "#444" }} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#26683A"
            fill="url(#colorUv)"
          />
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#26683A" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#26683A" stopOpacity={0} />
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyAreaChart;
