import { useMemo } from "react";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

export interface PieDatum {
  name: string;
  value: number;
}

interface Props {
  /** rótulo central do gráfico (ex.: Ticker) */
  label?: string;
  /** quantidade de fatias simuladas (default: 5) */
  slices?: number;
}

/** PieChart dark com dados aleatórios (para protótipo) */
export default function PieChartComponent({ label, slices = 5 }: Props) {
  const data: PieDatum[] = useMemo(() => {
    // gera valores aleatórios que somam ~100
    const vals = Array.from({ length: slices }, () => 10 + Math.random() * 30);
    const total = vals.reduce((a, b) => a + b, 0);
    return vals.map((v, i) => ({
      name: `Série ${i + 1}`,
      value: Math.round((v / total) * 100),
    }));
  }, [slices]);

  const COLORS = ["#22c55e", "#0ea5e9", "#8b5cf6", "#f59e0b", "#ef4444", "#14b8a6"];

  return (
    <div style={{ width: "100%", height: "100%", background: "#111827", borderRadius: 8 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={2}
          >
            {data.map((_, idx) => (
              <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ background: `$COLORS[idx % COLORS.length]`, border: "1px solid #334155", color: "#fff" }}
          />
          <Legend wrapperStyle={{ color: "#e5e7eb" }} />
        </PieChart>
      </ResponsiveContainer>
      {label && (
        <div
          style={{
            position: "relative", top: -200, textAlign: "center",
            color: "#cbd5e1", fontWeight: 600, pointerEvents: "none",
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
}
