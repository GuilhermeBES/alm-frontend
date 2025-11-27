import { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type Props = {
  label: string;
  points?: number;
  start?: number;
  vol?: number;
  height?: number | string;
};

export default function LineChartComponent({
  label,
  points = 120,
  start = 30,
  vol = 0.025,
  height = 340,
}: Props) {
  const data = useMemo(() => {
    const arr: { t: string; price: number }[] = [];
    let p = start;
    for (let i = 0; i < points; i++) {
      const noise = (Math.random() - 0.5) * 2 * vol;
      p = Math.max(0.01, p * (1 + noise));
      arr.push({
        t: `D${i + 1}`,
        price: Number(p.toFixed(2)),
      });
    }
    return arr;
  }, [points, start, vol]);

  return (
    <div style={{ width: "100%", height, background: "#111827", borderRadius: 8 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 16, right: 24, bottom: 8, left: 0 }}>
          <CartesianGrid stroke="#1f2937" strokeDasharray="4 4" />
          <XAxis dataKey="t" tick={{ fill: "#cbd5e1" }} />
          <YAxis tick={{ fill: "#cbd5e1" }} domain={["dataMin", "dataMax"]} />
          <Tooltip
            contentStyle={{ background: "#0f172a", border: "1px solid #334155", color: "#e5e7eb" }}
            labelStyle={{ color: "#94a3b8" }}
            formatter={(v: number) => [`R$ ${v.toFixed(2)}`, label]}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#f59e0b"
            strokeWidth={2.2}
            dot={false}
            name={label}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
