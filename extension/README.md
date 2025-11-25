# CircuMet Autofill Chrome Extension

## Installation Instructions

1. **Open Chrome Extensions Page**
   - Go to `chrome://extensions/`
   - Or click the three dots menu → More Tools → Extensions

2. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top right corner

3. **Load the Extension**
   - Click "Load unpacked"
   - Navigate to and select the `extension` folder
   - The extension should now appear in your extensions list

4. **Pin the Extension (Optional)**
   - Click the puzzle icon in Chrome toolbar
   - Find "CircuMet Autofill"
   - Click the pin icon to keep it visible

## How to Use

1. **Visit a material/product webpage**
   - Example: aluminium sheet specifications, copper rod product page, etc.

2. **Click the extension icon**
   - The popup will open

3. **Click "Autofill from Page"**
   - The extension will scan the page for material data
   - Fields will be auto-populated if data is found
   - You can manually edit any field

4. **Click "Run Model"**
   - View the Circularity Score gauge
   - See CO₂ breakdown chart
   - Read sustainability recommendations

5. **Reset to start over**

## Features

- ✅ Automatic data extraction from webpages
- ✅ LCA calculation with built-in material database
- ✅ Circularity Score (0-100) with visual gauge
- ✅ CO₂ emissions breakdown chart
- ✅ Personalized sustainability recommendations
- ✅ Works completely offline
- ✅ Manual override for all fields

## Supported Materials

- Aluminium
- Copper
- Steel
- Nickel
- Iron
- Zinc
- Brass
- Bronze
- Titanium

## Model Information

**Version:** demo-simple-v0.1  
**Formula:**
- Total CO₂ = material_CO₂ + (energy × 0.5) + (transport_km × 0.00015)
- Circularity Score = base + (recycled% × 0.3) − (transport/1000 × 2) − (energy/50 × 10)

Values are approximate and for demonstration purposes.
