# 🚀 CircuMet Autofill - Installation Guide

## Quick Start (3 Steps)

### Step 1: Generate Icons (Optional but Recommended)
1. Open `icons/convert-icons.html` in your browser
2. Click "Generate & Download Icons"
3. Three PNG files will download automatically
4. Move them to the `icons/` folder

**OR** use placeholder icons (extension will work but look generic)

### Step 2: Load Extension in Chrome
1. Open Chrome and go to: `chrome://extensions/`
2. Enable **Developer mode** (toggle in top-right)
3. Click **"Load unpacked"**
4. Select the `extension` folder (this folder)
5. Done! The extension is now installed

### Step 3: Pin Extension (Optional)
1. Click the puzzle piece icon in Chrome toolbar
2. Find "CircuMet Autofill"
3. Click the pin icon to keep it visible

---

## 📖 How to Use

### Basic Usage
1. Visit any materials/metals webpage (e.g., product specifications, supplier pages)
2. Click the CircuMet extension icon
3. Click **"🔍 Autofill from Page"**
4. Review and edit values if needed
5. Click **"⚡ Run Model"**
6. View results:
   - Circularity Score gauge
   - CO₂ emissions breakdown
   - Sustainability recommendations

### Manual Entry
- Skip autofill and enter values manually
- All fields are editable
- Click Reset to clear

---

## 🧪 Test Webpages

Try the extension on these types of pages:

**Sample Materials Pages:**
- Aluminium sheet specifications
- Copper rod product listings
- Steel manufacturing data sheets
- Metal supplier catalogs
- Industrial process descriptions

**What It Looks For:**
- Material names (aluminium, copper, steel, etc.)
- Process keywords (extrusion, rolling, casting, forging)
- Product types (sheet, rod, wire, plate, bar, tube)
- Energy values with units (kWh, MJ, GJ)
- Transport distances (km)
- Recycled content (%)
- CO₂ emissions data

---

## 🔧 Troubleshooting

**Extension doesn't appear after loading:**
- Make sure you selected the correct `extension` folder
- Check that manifest.json exists in the folder
- Reload the extension from chrome://extensions/

**Autofill doesn't work:**
- Make sure you're on a page with visible material data
- Try entering values manually
- Check the browser console for errors (F12)

**Icons look generic:**
- Generate PNG icons using convert-icons.html
- Or create your own 16x16, 48x48, 128x128 PNG icons
- Place them in the icons/ folder

**Results don't display:**
- Make sure all required fields have values
- Check that Energy, Transport, and Recycled % are numbers
- Try clicking Reset and entering values again

---

## ✨ Features

✅ **Automatic Data Extraction** - Scans webpages for material data  
✅ **LCA Calculation** - Built-in material database & model  
✅ **Circularity Scoring** - 0-100 score with visual gauge  
✅ **CO₂ Analysis** - Breakdown by material, energy, transport  
✅ **Smart Recommendations** - Actionable sustainability tips  
✅ **Offline Operation** - No backend or internet required  
✅ **Manual Override** - Edit any auto-filled value  

---

## 📊 Supported Materials

- Aluminium / Aluminum
- Copper
- Steel
- Nickel
- Iron
- Zinc
- Brass
- Bronze
- Titanium

---

## 🔬 Model Details

**Version:** demo-simple-v0.1

**CO₂ Formula:**
```
Total CO₂ = Material_CO₂ + (Energy × 0.5) + (Transport_km × 0.00015)
```

**Circularity Score:**
```
Score = Base + (Recycled% × 0.3) − (Transport/1000 × 2) − (Energy/50 × 10)
Range: 0-100 (clamped)
```

**Recommendations Logic:**
- Recycled < 50% → Suggest increasing recycled content
- Transport > 500km → Recommend local sourcing
- Energy > 10 kWh/kg → Suggest efficiency improvements

---

## 📁 File Structure

```
extension/
├── manifest.json          # Extension configuration
├── popup.html            # UI interface
├── popup.js              # Logic & calculations
├── content_script.js     # Page scraping
├── icons/                # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   ├── icon128.png
│   ├── icon.svg          # Source SVG
│   └── convert-icons.html # Icon generator
├── README.md             # User documentation
└── INSTALLATION.md       # This file
```

---

## 🎯 Next Steps

1. **Test it:** Try the extension on different materials pages
2. **Customize:** Edit popup.html/popup.js to adjust styling or logic
3. **Expand:** Add more materials to the database in popup.js
4. **Share:** The extension works offline, perfect for demos

---

## ⚠️ Disclaimer

This extension uses simplified LCA calculations for demonstration purposes. Values are approximate and should not be used for official environmental reporting or compliance. Always consult professional LCA tools and data sources for production use.

---

**Questions or Issues?**  
Check the README.md for technical details or open an issue in the project repository.
