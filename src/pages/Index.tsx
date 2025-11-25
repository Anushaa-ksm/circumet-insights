import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MaterialInput, MaterialData } from "@/components/MaterialInput";
import { CircularGauge } from "@/components/CircularGauge";
import { EmissionsChart } from "@/components/EmissionsChart";
import { RecommendationsCard } from "@/components/RecommendationsCard";
import { runLCAModel, LCAResults } from "@/lib/lcaModel";
import { simulateAutofill } from "@/lib/autofillSimulator";
import { toast } from "sonner";
import { Sparkles, RotateCcw, Play, Leaf } from "lucide-react";

const Index = () => {
  const [materialData, setMaterialData] = useState<MaterialData>({
    material: "",
    processType: "",
    productType: "",
    energy: "",
    transport: "",
    recycled: "",
  });

  const [results, setResults] = useState<LCAResults | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleAutofill = () => {
    const autofilledData = simulateAutofill();
    setMaterialData(autofilledData);
    setShowResults(false);
    toast.success("Data autofilled from simulated webpage");
  };

  const handleReset = () => {
    setMaterialData({
      material: "",
      processType: "",
      productType: "",
      energy: "",
      transport: "",
      recycled: "",
    });
    setResults(null);
    setShowResults(false);
    toast.info("Form reset");
  };

  const handleRunModel = () => {
    if (!materialData.material) {
      toast.error("Please select a material");
      return;
    }

    try {
      const lcaResults = runLCAModel({
        material: materialData.material,
        energy: parseFloat(materialData.energy) || 0,
        transport: parseFloat(materialData.transport) || 0,
        recycled: parseFloat(materialData.recycled) || 0,
      });

      setResults(lcaResults);
      setShowResults(true);
      toast.success("LCA model completed successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to run model");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background p-4">
      <div className="max-w-4xl mx-auto py-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Leaf className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              CircuMet Autofill
            </h1>
          </div>
          <p className="text-muted-foreground">
            Chrome Extension for Automated LCA Analysis
          </p>
          <p className="text-xs text-muted-foreground bg-muted/50 inline-block px-3 py-1 rounded-full">
            Web Demo Version • Model: demo-simple-v0.1
          </p>
        </div>

        {/* Main Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Material Data Input</CardTitle>
            <CardDescription>
              Enter material specifications or autofill from webpage data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Action Buttons */}
            <div className="flex gap-2 flex-wrap">
              <Button onClick={handleAutofill} variant="default" className="gap-2">
                <Sparkles className="w-4 h-4" />
                Autofill from Page
              </Button>
              <Button onClick={handleRunModel} className="gap-2 bg-primary">
                <Play className="w-4 h-4" />
                Run Model
              </Button>
              <Button onClick={handleReset} variant="outline" className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
            </div>

            <Separator />

            {/* Input Form */}
            <MaterialInput data={materialData} onChange={setMaterialData} />
          </CardContent>
        </Card>

        {/* Results Section */}
        {showResults && results && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <Card className="shadow-lg" style={{ boxShadow: "var(--shadow-card)" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-primary" />
                  Sustainability Analysis Results
                </CardTitle>
                <CardDescription>
                  {materialData.material.charAt(0).toUpperCase() + materialData.material.slice(1)} •{" "}
                  {materialData.processType.charAt(0).toUpperCase() + materialData.processType.slice(1)} •{" "}
                  {materialData.productType.charAt(0).toUpperCase() + materialData.productType.slice(1)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Circularity Score */}
                <div className="flex justify-center py-4">
                  <CircularGauge score={results.circularityScore} />
                </div>

                <Separator />

                {/* Emissions Breakdown */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">CO₂ Emissions Breakdown</h3>
                  <EmissionsChart
                    data={{
                      materialCO2: results.materialCO2,
                      energyCO2: results.energyCO2,
                      transportCO2: results.transportCO2,
                      totalCO2: results.totalCO2,
                    }}
                  />
                </div>

                <Separator />

                {/* Recommendations */}
                <div>
                  <RecommendationsCard recommendations={results.recommendations} />
                </div>

                {/* Disclaimer */}
                <p className="text-xs text-muted-foreground text-center bg-muted/50 p-3 rounded-lg">
                  Model version: demo-simple-v0.1 • Values are approximate and for demonstration purposes
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
