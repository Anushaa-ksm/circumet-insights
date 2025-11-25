import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface MaterialData {
  material: string;
  processType: string;
  productType: string;
  energy: string;
  transport: string;
  recycled: string;
}

interface MaterialInputProps {
  data: MaterialData;
  onChange: (data: MaterialData) => void;
}

const materials = ["aluminium", "copper", "steel", "nickel", "iron", "zinc", "brass", "bronze", "titanium"];
const processes = ["extrusion", "rolling", "casting", "forging", "machining", "forming", "drawing"];
const products = ["sheet", "rod", "wire", "plate", "bar", "coil", "tube", "profile"];

export const MaterialInput = ({ data, onChange }: MaterialInputProps) => {
  const updateField = (field: keyof MaterialData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="material">Material</Label>
        <Select value={data.material} onValueChange={(value) => updateField("material", value)}>
          <SelectTrigger id="material">
            <SelectValue placeholder="Select material" />
          </SelectTrigger>
          <SelectContent>
            {materials.map((m) => (
              <SelectItem key={m} value={m}>
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="processType">Process Type</Label>
        <Select value={data.processType} onValueChange={(value) => updateField("processType", value)}>
          <SelectTrigger id="processType">
            <SelectValue placeholder="Select process" />
          </SelectTrigger>
          <SelectContent>
            {processes.map((p) => (
              <SelectItem key={p} value={p}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="productType">Product Type</Label>
        <Select value={data.productType} onValueChange={(value) => updateField("productType", value)}>
          <SelectTrigger id="productType">
            <SelectValue placeholder="Select product" />
          </SelectTrigger>
          <SelectContent>
            {products.map((p) => (
              <SelectItem key={p} value={p}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="energy">Energy Consumption (kWh/kg)</Label>
        <Input
          id="energy"
          type="number"
          step="0.1"
          value={data.energy}
          onChange={(e) => updateField("energy", e.target.value)}
          placeholder="0.0"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="transport">Transport Distance (km)</Label>
        <Input
          id="transport"
          type="number"
          step="1"
          value={data.transport}
          onChange={(e) => updateField("transport", e.target.value)}
          placeholder="0"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="recycled">Recycled Content (%)</Label>
        <Input
          id="recycled"
          type="number"
          min="0"
          max="100"
          step="1"
          value={data.recycled}
          onChange={(e) => updateField("recycled", e.target.value)}
          placeholder="0"
        />
      </div>
    </div>
  );
};
