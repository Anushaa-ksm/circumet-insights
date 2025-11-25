export interface MaterialDatabase {
  [key: string]: {
    energy: number;
    co2: number;
    circularity_base: number;
  };
}

export const materialDB: MaterialDatabase = {
  aluminium: { energy: 15.2, co2: 12.5, circularity_base: 75 },
  copper: { energy: 7.5, co2: 6.8, circularity_base: 65 },
  steel: { energy: 20.0, co2: 18.0, circularity_base: 60 },
  nickel: { energy: 35.0, co2: 28.0, circularity_base: 50 },
  iron: { energy: 18.5, co2: 16.2, circularity_base: 58 },
  zinc: { energy: 13.0, co2: 11.5, circularity_base: 62 },
  brass: { energy: 12.0, co2: 10.2, circularity_base: 68 },
  bronze: { energy: 14.0, co2: 12.0, circularity_base: 66 },
  titanium: { energy: 45.0, co2: 38.0, circularity_base: 45 },
};

export interface LCAInputs {
  material: string;
  energy: number;
  transport: number;
  recycled: number;
}

export interface LCAResults {
  materialCO2: number;
  energyCO2: number;
  transportCO2: number;
  totalCO2: number;
  circularityScore: number;
  recommendations: string[];
}

export const runLCAModel = (inputs: LCAInputs): LCAResults => {
  const materialData = materialDB[inputs.material.toLowerCase()];
  
  if (!materialData) {
    throw new Error(`Material "${inputs.material}" not found in database`);
  }

  // Use provided energy or fallback to database default
  const energyUsed = inputs.energy > 0 ? inputs.energy : materialData.energy;

  // Calculate CO2 components
  const materialCO2 = materialData.co2;
  const energyCO2 = energyUsed * 0.5; // 0.5 kg CO2 per kWh
  const transportCO2 = inputs.transport * 0.00015; // 0.00015 kg CO2 per km
  const totalCO2 = materialCO2 + energyCO2 + transportCO2;

  // Calculate circularity score (0-100)
  const baseScore = materialData.circularity_base;
  const recycledBonus = inputs.recycled * 0.3;
  const transportPenalty = (inputs.transport / 1000) * 2;
  const energyPenalty = (energyUsed / 50) * 10;
  
  let circularityScore = baseScore + recycledBonus - transportPenalty - energyPenalty;
  circularityScore = Math.max(0, Math.min(100, circularityScore));

  // Generate recommendations
  const recommendations: string[] = [];
  
  if (inputs.recycled < 50) {
    recommendations.push(
      `Increase recycled content to ${Math.min(inputs.recycled + 20, 100)}% to improve circularity by ${(20 * 0.3).toFixed(0)} points`
    );
  }
  
  if (inputs.transport > 500) {
    recommendations.push(
      "Consider local sourcing to reduce transport emissions and improve circularity score"
    );
  }
  
  if (energyUsed > 10) {
    recommendations.push(
      "Optimize energy efficiency or switch to renewable energy sources to reduce carbon footprint"
    );
  }

  if (recommendations.length === 0) {
    recommendations.push("Excellent sustainability profile! Maintain current practices.");
  }

  return {
    materialCO2,
    energyCO2,
    transportCO2,
    totalCO2,
    circularityScore,
    recommendations,
  };
};
