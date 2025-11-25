import { MaterialData } from "@/components/MaterialInput";

// Simulates extracting data from a webpage
// In a real Chrome extension, this would use content scripts

export const sampleWebpageData = [
  {
    name: "Aluminium Extrusion Sheet",
    data: {
      material: "aluminium",
      processType: "extrusion",
      productType: "sheet",
      energy: "14.8",
      transport: "320",
      recycled: "65",
    },
  },
  {
    name: "Copper Wire Rod",
    data: {
      material: "copper",
      processType: "drawing",
      productType: "wire",
      energy: "8.2",
      transport: "180",
      recycled: "45",
    },
  },
  {
    name: "Steel Rolled Plate",
    data: {
      material: "steel",
      processType: "rolling",
      productType: "plate",
      energy: "19.5",
      transport: "650",
      recycled: "30",
    },
  },
  {
    name: "Titanium Forged Bar",
    data: {
      material: "titanium",
      processType: "forging",
      productType: "bar",
      energy: "42.0",
      transport: "890",
      recycled: "15",
    },
  },
];

export const simulateAutofill = (): MaterialData => {
  // Randomly select a sample
  const sample = sampleWebpageData[Math.floor(Math.random() * sampleWebpageData.length)];
  return sample.data;
};
