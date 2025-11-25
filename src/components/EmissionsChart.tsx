import { useEffect, useState } from "react";

interface EmissionsData {
  materialCO2: number;
  energyCO2: number;
  transportCO2: number;
  totalCO2: number;
}

interface EmissionsChartProps {
  data: EmissionsData;
}

export const EmissionsChart = ({ data }: EmissionsChartProps) => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, [data]);

  const maxValue = Math.max(data.materialCO2, data.energyCO2, data.transportCO2, 1);
  
  const bars = [
    { label: "Material", value: data.materialCO2, color: "hsl(var(--chart-1))" },
    { label: "Energy", value: data.energyCO2, color: "hsl(var(--chart-2))" },
    { label: "Transport", value: data.transportCO2, color: "hsl(var(--chart-3))" },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {bars.map((bar, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{bar.label}</span>
              <span className="text-muted-foreground">{bar.value.toFixed(2)} kg CO₂</span>
            </div>
            <div className="h-8 bg-muted rounded-lg overflow-hidden">
              <div
                className="h-full transition-all duration-1000 ease-out rounded-lg flex items-center justify-end pr-2"
                style={{
                  width: animated ? `${(bar.value / maxValue) * 100}%` : "0%",
                  backgroundColor: bar.color,
                }}
              >
                {animated && bar.value > 0 && (
                  <span className="text-xs font-semibold text-white">
                    {((bar.value / data.totalCO2) * 100).toFixed(0)}%
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="pt-3 border-t">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Total CO₂</span>
          <span className="text-2xl font-bold text-primary">{data.totalCO2.toFixed(2)} kg</span>
        </div>
      </div>
    </div>
  );
};
