import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

const COLORS = ["#00C49F", "#FF8042", "#0088FE"];

export default function PFCChecker() {
  const [food, setFood] = useState("");
  const [grams, setGrams] = useState(100);
  const [result, setResult] = useState(null);

  const foodDatabase = {
    "アボカド": { kcal: 187, p: 2, f: 18, c: 2 },
    "卵": { kcal: 151, p: 12, f: 11, c: 1 },
    "鶏もも": { kcal: 204, p: 18, f: 14, c: 0 },
    "納豆": { kcal: 200, p: 16, f: 10, c: 12 },
    "サバ缶": { kcal: 190, p: 20, f: 12, c: 0 },
    "チーズ": { kcal: 313, p: 25, f: 26, c: 1 },
  };

  const handleCheck = () => {
    const data = foodDatabase[food];
    if (!data) {
      alert("データが見つかりませんでした。対応食材：アボカド、卵、鶏もも、納豆、サバ缶、チーズ");
      return;
    }
    const factor = grams / 100;
    const calculated = {
      kcal: Math.round(data.kcal * factor),
      p: +(data.p * factor).toFixed(1),
      f: +(data.f * factor).toFixed(1),
      c: +(data.c * factor).toFixed(1),
    };
    setResult(calculated);
  };

  const dataForChart = result
    ? [
        { name: "たんぱく質", value: result.p },
        { name: "脂質", value: result.f },
        { name: "炭水化物", value: result.c },
      ]
    : [];

  const scatterData = result
    ? [
        {
          p: result.p,
          f: result.f,
        },
      ]
    : [];

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">🍳 PFC密度チェッカー</h1>
      <div className="space-y-2">
        <input
          type="text"
          value={food}
          onChange={(e) => setFood(e.target.value)}
          placeholder="食材名（例：アボカド）"
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          value={grams}
          onChange={(e) => setGrams(e.target.value)}
          placeholder="グラム数"
          className="w-full border p-2 rounded"
        />
        <button onClick={handleCheck} className="bg-green-500 text-white px-4 py-2 rounded">
          計算する
        </button>
      </div>
      {result && (
        <div className="bg-white shadow rounded p-4">
          <p>🌟 カロリー: {result.kcal} kcal</p>
          <p>🍗 たんぱく質: {result.p} g</p>
          <p>🧈 脂質: {result.f} g</p>
          <p>🍞 炭水化物: {result.c} g</p>
          <div style={{ height: 300, marginTop: "1rem" }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={dataForChart} dataKey="value" nameKey="name" outerRadius={100} label>
                  {dataForChart.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ height: 300, marginTop: "2rem" }}>
            <h2 className="text-lg font-bold mb-2">🗺 栄養密度マップ</h2>
            <ResponsiveContainer>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
                <CartesianGrid />
                <XAxis type="number" dataKey="p" name="たんぱく質密度" unit="g" />
                <YAxis type="number" dataKey="f" name="脂質密度" unit="g" />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter name="この食材" data={scatterData} fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
