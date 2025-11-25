import { useEffect, useState } from "react";

interface CircularGaugeProps {
  score: number;
  size?: number;
}

export const CircularGauge = ({ score, size = 180 }: CircularGaugeProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 100);
    return () => clearTimeout(timer);
  }, [score]);

  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;

  const getColor = (score: number) => {
    if (score >= 70) return "hsl(var(--gauge-good))";
    if (score >= 40) return "hsl(var(--gauge-medium))";
    return "hsl(var(--gauge-poor))";
  };

  const getLabel = (score: number) => {
    if (score >= 70) return "Excellent";
    if (score >= 40) return "Good";
    return "Needs Improvement";
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="hsl(var(--muted))"
            strokeWidth="12"
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={getColor(animatedScore)}
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold" style={{ color: getColor(animatedScore) }}>
            {Math.round(animatedScore)}
          </span>
          <span className="text-xs text-muted-foreground">out of 100</span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold" style={{ color: getColor(animatedScore) }}>
          {getLabel(animatedScore)}
        </p>
        <p className="text-xs text-muted-foreground">Circularity Score</p>
      </div>
    </div>
  );
};
