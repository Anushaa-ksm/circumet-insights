import { Card } from "@/components/ui/card";
import { Lightbulb, ArrowRight } from "lucide-react";

interface RecommendationsCardProps {
  recommendations: string[];
}

export const RecommendationsCard = ({ recommendations }: RecommendationsCardProps) => {
  return (
    <Card className="p-5 bg-secondary/30 border-primary/20">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">Recommendations</h3>
      </div>
      <ul className="space-y-2">
        {recommendations.map((rec, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm">
            <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span className="text-foreground/90">{rec}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
};
